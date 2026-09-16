import {
  Project,
  AssessmentAnswer,
  AssessmentResult,
  SDGImpactSummary,
  ImpactSignalItem,
  ConfidenceLevel
} from '../types';
import { DEMO_QUESTIONS, DEMO_THEMES } from '../data/methodologyConfig';
import { UN_SDGS, getSdgByNumber, getSdgTarget } from '../data/sdgs';

export function calculateAssessmentResults(
  project: Project,
  answers: Record<string, AssessmentAnswer>
): AssessmentResult {
  const answeredQuestionIds = Object.keys(answers).filter(
    qId => answers[qId]?.selectedOptionIds && answers[qId].selectedOptionIds.length > 0
  );

  const answeredQuestionsCount = answeredQuestionIds.length;
  const totalQuestionsCount = DEMO_QUESTIONS.length;
  const totalThemesCount = DEMO_THEMES.length;

  // Determine which themes have at least one answered question
  const assessedThemeIds = new Set<string>();
  DEMO_QUESTIONS.forEach(q => {
    if (answeredQuestionIds.includes(q.id)) {
      assessedThemeIds.add(q.themeId);
    }
  });
  const themesAssessedCount = assessedThemeIds.size;

  // SDG aggregators: keyed by SDG number (1..17)
  const sdgAccumulators: Record<number, {
    positiveScore: number;
    negativeScore: number;
    contributingQuestions: Set<string>;
    positiveSignals: ImpactSignalItem[];
    negativeSignals: ImpactSignalItem[];
    needsEvidenceCount: number;
    notesCount: number;
  }> = {};

  UN_SDGS.forEach(sdg => {
    sdgAccumulators[sdg.number] = {
      positiveScore: 0,
      negativeScore: 0,
      contributingQuestions: new Set<string>(),
      positiveSignals: [],
      negativeSignals: [],
      needsEvidenceCount: 0,
      notesCount: 0,
    };
  });

  let totalPositiveScore = 0;
  let totalNegativeScore = 0;
  let evidenceGapsCount = 0;

  // Evaluate each question answer
  DEMO_QUESTIONS.forEach(question => {
    const answer = answers[question.id];
    if (!answer || !answer.selectedOptionIds || answer.selectedOptionIds.length === 0) {
      return;
    }

    const hasNotes = Boolean(answer.notes && answer.notes.trim().length > 0);

    answer.selectedOptionIds.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (!option) return;

      if (option.isNotEnoughInfo) {
        evidenceGapsCount += 1;
      }

      option.effects.forEach((effect, effectIdx) => {
        const sdgAcc = sdgAccumulators[effect.sdgNumber];
        if (!sdgAcc) return;

        sdgAcc.contributingQuestions.add(question.code);
        if (hasNotes) {
          sdgAcc.notesCount += 1;
        }

        const target = getSdgTarget(effect.sdgNumber, effect.targetCode);
        const targetTitle = target ? target.title : `Target ${effect.targetCode}`;

        const signalStrength: 'Emerging' | 'Moderate' | 'Strong' =
          Math.abs(effect.score) >= 3 ? 'Strong' :
          Math.abs(effect.score) === 2 ? 'Moderate' : 'Emerging';

        const signalItem: ImpactSignalItem = {
          id: `${question.code}-${option.id}-${effectIdx}`,
          questionCode: question.code,
          questionTitle: question.title,
          selectedOptionLabel: option.label,
          impactArea: effect.impactArea,
          sdgNumber: effect.sdgNumber,
          targetCode: effect.targetCode,
          targetTitle: targetTitle,
          direction: effect.direction,
          score: effect.score,
          signalStrength: signalStrength,
          explanation: effect.explanation,
          evidenceNote: answer.notes,
          confidence: answer.confidenceLevel || 'medium',
          attentionRequired: effect.attentionRequired,
          suggestedAction: effect.suggestedAction,
        };

        if (effect.direction === 'positive') {
          sdgAcc.positiveScore += effect.score;
          totalPositiveScore += effect.score;
          sdgAcc.positiveSignals.push(signalItem);
        } else if (effect.direction === 'negative') {
          // Keep negative score as positive magnitude for display / clarity
          const negMag = Math.abs(effect.score);
          sdgAcc.negativeScore += negMag;
          totalNegativeScore += negMag;
          sdgAcc.negativeSignals.push(signalItem);
        }
      });
    });
  });

  // Calculate overall confidence level
  const p2Answer = answers['P2']?.selectedOptionIds?.[0];
  let overallConfidence: 'High' | 'Moderate' | 'Low' | 'Preliminary' = 'Preliminary';
  if (p2Answer === 'p2-opt-1') {
    overallConfidence = 'High';
  } else if (p2Answer === 'p2-opt-2') {
    overallConfidence = 'Moderate';
  } else if (p2Answer === 'p2-opt-3' || p2Answer === 'p2-opt-4') {
    overallConfidence = 'Low';
  } else if (answeredQuestionsCount > 5) {
    overallConfidence = 'Moderate';
  }

  // Build SDG impact summaries for all SDGs that have either positive or negative activity
  const sdgSummaries: SDGImpactSummary[] = [];

  UN_SDGS.forEach(sdg => {
    const acc = sdgAccumulators[sdg.number];
    const totalActivity = acc.positiveScore + acc.negativeScore;
    if (totalActivity > 0 || acc.contributingQuestions.size > 0) {
      let sdgConfidence: ConfidenceLevel = 'medium';
      if (acc.notesCount >= 2 && overallConfidence === 'High') {
        sdgConfidence = 'high';
      } else if (acc.needsEvidenceCount > 0) {
        sdgConfidence = 'low';
      }

      sdgSummaries.push({
        sdgNumber: sdg.number,
        sdg: sdg,
        positiveScore: acc.positiveScore,
        negativeScore: acc.negativeScore,
        contributingResponsesCount: acc.contributingQuestions.size,
        positiveSignals: acc.positiveSignals,
        negativeSignals: acc.negativeSignals,
        evidenceFlags: {
          needsEvidenceCount: acc.needsEvidenceCount,
          notesCount: acc.notesCount,
          confidence: sdgConfidence,
        }
      });
    }
  });

  // Sort SDG summaries by highest combined score descending
  sdgSummaries.sort((a, b) => {
    const scoreA = a.positiveScore + a.negativeScore * 1.5;
    const scoreB = b.positiveScore + b.negativeScore * 1.5;
    return scoreB - scoreA;
  });

  // Extract top positive signals and negative signals for summary cards
  const allPositiveSignals: ImpactSignalItem[] = [];
  const allNegativeSignals: ImpactSignalItem[] = [];

  sdgSummaries.forEach(s => {
    allPositiveSignals.push(...s.positiveSignals);
    allNegativeSignals.push(...s.negativeSignals);
  });

  // Sort signals by score descending
  allPositiveSignals.sort((a, b) => b.score - a.score);
  allNegativeSignals.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

  return {
    projectId: project.id,
    project: project,
    themesAssessedCount: themesAssessedCount,
    totalThemesCount: totalThemesCount,
    totalQuestionsCount: totalQuestionsCount,
    answeredQuestionsCount: answeredQuestionsCount,
    totalPositiveScore: totalPositiveScore,
    totalNegativeScore: totalNegativeScore,
    positiveSignalsCount: allPositiveSignals.length,
    negativeSignalsCount: allNegativeSignals.length,
    evidenceGapsCount: evidenceGapsCount,
    overallConfidence: overallConfidence,
    sdgSummaries: sdgSummaries,
    topPositiveSignals: allPositiveSignals.slice(0, 5),
    topNegativeSignals: allNegativeSignals,
    assessedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
}

export function getSignalLevelBadge(strength: 'Emerging' | 'Moderate' | 'Strong') {
  switch (strength) {
    case 'Strong':
      return { label: 'Strong Signal', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    case 'Moderate':
      return { label: 'Moderate Signal', bg: 'bg-green-50 text-green-800 border-green-200' };
    case 'Emerging':
      return { label: 'Emerging Signal', bg: 'bg-stone-100 text-stone-700 border-stone-200' };
  }
}
