import React from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { SDGImpactSummary } from '../../types';
import { SDGBadge } from '../common/SDGBadge';
import { getSignalLevelBadge } from '../../services/assessmentEngine';

interface SDGDetailModalProps {
  summary: SDGImpactSummary | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SDGDetailModal: React.FC<SDGDetailModalProps> = ({
  summary,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !summary) return null;

  const { sdg, positiveSignals, negativeSignals, positiveScore, negativeScore, evidenceFlags } = summary;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-elevated border border-stone-200 text-left relative flex flex-col">
        {/* Modal Top Header */}
        <div
          className="p-6 text-white rounded-t-3xl relative overflow-hidden"
          style={{ backgroundColor: sdg.color }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
              UN SDG {sdg.number}
            </span>
            <span className="text-xs font-medium text-white/90">
              Target Level Analysis
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {sdg.title}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl leading-relaxed">
            {sdg.description}
          </p>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/20 text-xs">
            <span className="bg-white/20 px-2.5 py-1 rounded-md font-semibold">
              Positive Signal Score: +{positiveScore}
            </span>
            {negativeScore > 0 && (
              <span className="bg-white/20 px-2.5 py-1 rounded-md font-semibold">
                Trade-off Signal: -{negativeScore}
              </span>
            )}
            <span className="bg-white/20 px-2.5 py-1 rounded-md font-medium">
              {summary.contributingResponsesCount} Contributing Responses
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Targets Impacted */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Mapped SDG Targets
            </h3>
            <div className="space-y-2">
              {sdg.targets.map(target => (
                <div
                  key={target.id}
                  className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-forest-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Target {target.code}
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      {target.title}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {target.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Positive Signals Breakdown */}
          {positiveSignals.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Positive Contribution Signals ({positiveSignals.length})</span>
              </div>

              <div className="space-y-3">
                {positiveSignals.map(sig => {
                  const badge = getSignalLevelBadge(sig.signalStrength);

                  return (
                    <div
                      key={sig.id}
                      className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-forest-950">
                            {sig.impactArea}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Target {sig.targetCode}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                          {badge.label} (+{sig.score})
                        </span>
                      </div>

                      <div className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/60">
                        <strong className="text-forest-950">Why this appears:</strong> {sig.explanation}
                      </div>

                      <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span><strong>Trigger Question:</strong> [{sig.questionCode}] {sig.questionTitle}</span>
                        <span><strong>Selected:</strong> {sig.selectedOptionLabel}</span>
                      </div>

                      {sig.evidenceNote && (
                        <div className="text-[11px] text-stone-600 bg-stone-100/80 p-2 rounded flex items-start gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-stone-500 flex-shrink-0 mt-0.5" />
                          <span><strong>User Evidence Note:</strong> {sig.evidenceNote}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Negative Signals / Trade-Offs Breakdown */}
          {negativeSignals.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Trade-offs & Potential Attention Signals ({negativeSignals.length})</span>
              </div>

              <div className="space-y-3">
                {negativeSignals.map(sig => (
                  <div
                    key={sig.id}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-950">
                          {sig.impactArea}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          Target {sig.targetCode}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-rose-50 text-rose-800 border-rose-200">
                        Attention Signal ({sig.score})
                      </span>
                    </div>

                    <div className="text-xs text-stone-800 bg-white p-2.5 rounded-lg border border-amber-200/60">
                      <strong className="text-rose-900">Why flagged:</strong> {sig.explanation}
                    </div>

                    {sig.suggestedAction && (
                      <div className="text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Suggested Remedial Action: </span>
                          <span>{sig.suggestedAction}</span>
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] text-stone-500">
                      Triggered by answer to <strong>[{sig.questionCode}]</strong>: &ldquo;{sig.selectedOptionLabel}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Methodology Standard in Modal */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-800">Methodology Framework:</strong> These effects derive from structured SDG Champions scoring rules.
              Indicators correlate reported agronomic practices with UN 2030 target criteria and qualitative field evidence.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-3xl flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold cursor-pointer"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
