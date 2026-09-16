import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  ShieldAlert,
  Droplets,
  Layers,
  Sun,
  Sprout,
  Users,
  Check
} from 'lucide-react';
import {
  Project,
  Question,
  AssessmentAnswer,
  ConfidenceLevel
} from '../../types';
import { DEMO_QUESTIONS, DEMO_THEMES, getThemeById } from '../../data/methodologyConfig';
import { SDGBadge } from '../common/SDGBadge';

interface AssessmentFlowScreenProps {
  project: Project;
  answers: Record<string, AssessmentAnswer>;
  onSaveAnswer: (questionId: string, answer: AssessmentAnswer) => void;
  onComplete: () => void;
  onNavigateToReview: () => void;
  onPreFillDemoAnswers: () => void;
}

export const AssessmentFlowScreen: React.FC<AssessmentFlowScreenProps> = ({
  project,
  answers,
  onSaveAnswer,
  onComplete,
  onNavigateToReview,
  onPreFillDemoAnswers,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);

  const currentQuestion: Question = DEMO_QUESTIONS[currentQuestionIndex];
  const currentTheme = getThemeById(currentQuestion.themeId);

  const totalQuestions = DEMO_QUESTIONS.length;
  const currentAnswer = answers[currentQuestion.id] || {
    questionId: currentQuestion.id,
    selectedOptionIds: [],
    notes: '',
    confidenceLevel: 'medium',
  };

  const selectedOptionIds = currentAnswer.selectedOptionIds || [];

  // Theme icons
  const getThemeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-amber-700" />;
      case 'Sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Sprout': return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'Users': return <Users className="w-4 h-4 text-rose-600" />;
      default: return <Sprout className="w-4 h-4 text-forest-700" />;
    }
  };

  // Option selection logic
  const handleOptionToggle = (optionId: string) => {
    let newSelected: string[];

    if (currentQuestion.type === 'single') {
      newSelected = [optionId];
    } else {
      // Multiple choice
      if (selectedOptionIds.includes(optionId)) {
        newSelected = selectedOptionIds.filter(id => id !== optionId);
      } else {
        // If clicking "none of these" or "not applicable", clear others
        const clickedOption = currentQuestion.options.find(o => o.id === optionId);
        if (clickedOption?.isNotApplicable || optionId.includes('none')) {
          newSelected = [optionId];
        } else {
          // Deselect "none of these" if selecting an active practice
          newSelected = [...selectedOptionIds.filter(id => !id.includes('none')), optionId];
        }
      }
    }

    onSaveAnswer(currentQuestion.id, {
      ...currentAnswer,
      selectedOptionIds: newSelected,
    });
  };

  const handleNotesChange = (notes: string) => {
    onSaveAnswer(currentQuestion.id, {
      ...currentAnswer,
      notes,
    });
  };

  const handleConfidenceChange = (confidenceLevel: ConfidenceLevel) => {
    onSaveAnswer(currentQuestion.id, {
      ...currentAnswer,
      confidenceLevel,
    });
  };

  const isCurrentAnswered = selectedOptionIds.length > 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      onNavigateToReview();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate overall answered percentage
  const totalAnsweredCount = Object.keys(answers).filter(
    qId => answers[qId]?.selectedOptionIds?.length > 0
  ).length;
  const progressPercent = Math.round((totalAnsweredCount / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Top Header & Progress */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">{project.name}</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500">{project.location.city}, {project.location.country}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPreFillDemoAnswers}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-forest-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              title="Populate with verified reference field answers"
            >
              <FileText className="w-3 h-3 text-emerald-700" />
              <span>Autofill Baseline</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToReview}
              className="text-stone-600 hover:text-stone-900 text-xs font-semibold px-2 py-1 rounded hover:bg-stone-100 cursor-pointer"
            >
              Review All ({totalAnsweredCount}/{totalQuestions})
            </button>
          </div>
        </div>

        {/* Question Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 mb-1.5">
            <span className="flex items-center gap-1.5">
              {getThemeIcon(currentTheme?.icon)}
              <strong className="text-stone-800">Theme {currentTheme?.number}: {currentTheme?.name}</strong>
            </span>
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions} ({progressPercent}% Completed)
            </span>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-forest-800 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* 5 Themes Breadcrumb pills */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
          {DEMO_THEMES.map(theme => {
            const isCurrent = theme.id === currentQuestion.themeId;
            const themeQuestions = DEMO_QUESTIONS.filter(q => q.themeId === theme.id);
            const answeredInTheme = themeQuestions.filter(
              q => answers[q.id]?.selectedOptionIds?.length > 0
            ).length;
            const isCompleted = answeredInTheme === themeQuestions.length;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  const firstQIdx = DEMO_QUESTIONS.findIndex(q => q.themeId === theme.id);
                  if (firstQIdx >= 0) setCurrentQuestionIndex(firstQIdx);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-forest-900 text-white font-bold'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {isCompleted && !isCurrent && <Check className="w-3 h-3 text-emerald-700" />}
                <span>T{theme.number}: {theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        {/* Question Header */}
        <div className="space-y-2 border-b border-stone-100 pb-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {currentQuestion.code} • {currentQuestion.type === 'multiple' ? 'Select All That Apply' : 'Single Choice'}
            </span>
            {currentQuestion.required && (
              <span className="text-[11px] text-stone-400 font-medium">Required</span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {currentQuestion.title}
          </h2>

          <div className="flex items-start gap-2 pt-1 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/70">
            <HelpCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-stone-800 font-semibold">Why this matters:</strong> {currentQuestion.description}
            </p>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Select Your Response:
          </div>

          <div className="space-y-2.5">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOptionIds.includes(option.id);

              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-forest-800 bg-emerald-50/50 shadow-sm ring-1 ring-forest-800'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  {/* Radio / Checkbox Indicator */}
                  <div className="pt-0.5 flex-shrink-0">
                    {currentQuestion.type === 'single' ? (
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-forest-800 bg-forest-900' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-forest-800 bg-forest-900 text-white' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    )}
                  </div>

                  {/* Option Copy & Impact Preview Tag */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${isSelected ? 'text-forest-950' : 'text-stone-800'}`}>
                        {option.label}
                      </span>

                      {/* Illustrative SDG tags preview on hover/select */}
                      {option.effects && option.effects.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {option.effects.map((eff, effIdx) => (
                            <span
                              key={effIdx}
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                eff.direction === 'positive'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}
                            >
                              <SDGBadge sdgNumber={eff.sdgNumber} size="sm" className="!w-4 !h-4 !text-[9px]" />
                              <span>{eff.targetCode}</span>
                              <span>({eff.score > 0 ? `+${eff.score}` : eff.score})</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {option.isNotEnoughInfo && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          Flags Evidence Gap
                        </span>
                      )}
                    </div>

                    {option.description && (
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence & Qualitative Notes Section (Expandable) */}
        <div className="border-t border-stone-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowEvidenceDrawer(!showEvidenceDrawer)}
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-900 hover:text-forest-700 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>{showEvidenceDrawer ? 'Hide Evidence & Notes' : '+ Add Qualitative Evidence / Field Notes'}</span>
              {currentAnswer.notes && !showEvidenceDrawer && (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Note Recorded
                </span>
              )}
            </button>

            {currentQuestion.confidenceApplicable && (
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Confidence:</span>
                {(['high', 'medium', 'low'] as const).map(conf => (
                  <button
                    key={conf}
                    type="button"
                    onClick={() => handleConfidenceChange(conf)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize cursor-pointer ${
                      currentAnswer.confidenceLevel === conf
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {conf}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showEvidenceDrawer && (
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 animate-in fade-in duration-150">
              <label className="block text-xs font-semibold text-stone-800">
                Ground Evidence, Metrics, or Context Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={currentAnswer.notes || ''}
                onChange={e => handleNotesChange(e.target.value)}
                placeholder="e.g. Volumetric meter logs, soil testing lab report date, farmer attendance rosters, or local aquifer department observation..."
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
              <p className="text-[11px] text-stone-500">
                Documenting source evidence elevates the credibility and confidence status in the final assessment report.
              </p>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-stone-200">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentQuestionIndex === 0
                ? 'text-stone-300 cursor-not-allowed'
                : 'text-stone-700 hover:bg-stone-100 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-card transition-all flex items-center gap-2 cursor-pointer ${
                isLastQuestion
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-forest-900 hover:bg-forest-800 text-white'
              }`}
            >
              <span>{isLastQuestion ? 'Review & Calculate Impact' : 'Next Question'}</span>
              {isLastQuestion ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
