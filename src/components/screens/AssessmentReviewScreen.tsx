import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Edit3,
  FileText,
  BarChart3,
  Droplets,
  Layers,
  Sun,
  Sprout,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, AssessmentAnswer } from '../../types';
import { DEMO_THEMES, DEMO_QUESTIONS } from '../../data/methodologyConfig';

interface AssessmentReviewScreenProps {
  project: Project;
  answers: Record<string, AssessmentAnswer>;
  onEditQuestion: (questionCode: string) => void;
  onFinalize: () => void;
  onBackToFlow: () => void;
}

export const AssessmentReviewScreen: React.FC<AssessmentReviewScreenProps> = ({
  project,
  answers,
  onEditQuestion,
  onFinalize,
  onBackToFlow,
}) => {
  const totalQuestions = DEMO_QUESTIONS.length;
  const answeredCount = Object.keys(answers).filter(
    qId => answers[qId]?.selectedOptionIds?.length > 0
  ).length;

  const notesCount = Object.keys(answers).filter(
    qId => answers[qId]?.notes && answers[qId].notes!.trim().length > 0
  ).length;

  const handleFinalizeWithConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1b4332', '#2d6a4f', '#52b788', '#26BDE2', '#FCC30B']
      });
    } catch {
      // ignore
    }
    onFinalize();
  };

  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-amber-700" />;
      case 'Sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Sprout': return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'Users': return <Users className="w-4 h-4 text-rose-600" />;
      default: return <Sprout className="w-4 h-4 text-forest-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Assessment Review & Pre-Calculation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Review Assessment Responses
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Verify answers and evidence notes for <strong className="text-stone-900">{project.name}</strong> before generating the SDG impact dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFinalizeWithConfetti}
          className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-card hover:shadow-elevated transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap self-start sm:self-center"
        >
          <BarChart3 className="w-4 h-4 text-emerald-300" />
          <span>Calculate SDG Impact</span>
          <ArrowRight className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

      {/* Completion Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-soft">
          <div className="text-[11px] font-bold text-stone-500">Questions Answered</div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1">
            {answeredCount} <span className="text-xs font-normal text-stone-500">/ {totalQuestions}</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
            {answeredCount === totalQuestions ? 'Complete Coverage' : `${totalQuestions - answeredCount} pending`}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-soft">
          <div className="text-[11px] font-bold text-stone-500">Evidence Notes Recorded</div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1">
            {notesCount} <span className="text-xs font-normal text-stone-500">qualitative notes</span>
          </div>
          <div className="text-[11px] text-stone-600 font-medium mt-0.5">
            Supports auditability & confidence
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-soft">
          <div className="text-[11px] font-bold text-stone-500">Themes Evaluated</div>
          <div className="text-2xl font-extrabold text-forest-900 mt-1">
            5 of 5 <span className="text-xs font-normal text-stone-500">Core Themes</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
            Full thematic balance
          </div>
        </div>
      </div>

      {/* Responses Grouped by Theme */}
      <div className="space-y-6">
        {DEMO_THEMES.map(theme => {
          const themeQuestions = DEMO_QUESTIONS.filter(q => q.themeId === theme.id);

          return (
            <div
              key={theme.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-soft overflow-hidden"
            >
              <div className="bg-stone-50 px-6 py-3.5 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center">
                    {getThemeIcon(theme.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">
                      Theme {theme.number}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 leading-tight">
                      {theme.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-stone-100">
                {themeQuestions.map(question => {
                  const answer = answers[question.id];
                  const hasAnswer = answer?.selectedOptionIds && answer.selectedOptionIds.length > 0;
                  const selectedLabels = question.options
                    .filter(o => answer?.selectedOptionIds?.includes(o.id))
                    .map(o => o.label);

                  return (
                    <div key={question.id} className="p-5 space-y-2 hover:bg-stone-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {question.code}
                            </span>
                            <span className="text-xs font-bold text-stone-900">
                              {question.title}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onEditQuestion(question.code)}
                          className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer flex-shrink-0"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </div>

                      {/* Selected Options */}
                      <div className="pt-1">
                        {hasAnswer ? (
                          <div className="flex flex-wrap gap-1.5">
                            {selectedLabels.map((lbl, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-forest-950 bg-emerald-50/80 border border-emerald-300/80 px-2.5 py-1 rounded-lg"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                {lbl}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                            No answer recorded yet
                          </span>
                        )}
                      </div>

                      {/* Notes Preview */}
                      {answer?.notes && (
                        <div className="bg-stone-50 p-2.5 rounded-lg text-xs text-stone-600 flex items-start gap-2 border border-stone-200/60 mt-1">
                          <FileText className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-stone-700">Evidence Note: </span>
                            <span>{answer.notes}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onBackToFlow}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Question Flow</span>
        </button>

        <button
          type="button"
          onClick={handleFinalizeWithConfetti}
          className="px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-extrabold shadow-card hover:shadow-elevated transition-all flex items-center gap-2 cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-emerald-300" />
          <span>Confirm & Calculate SDG Impact</span>
          <ArrowRight className="w-4 h-4 text-emerald-300" />
        </button>
      </div>
    </div>
  );
};
