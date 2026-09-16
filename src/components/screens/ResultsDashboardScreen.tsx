import React, { useState } from 'react';
import {
  Target,
  FileSpreadsheet,
  Edit3,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { AssessmentResult, SDGImpactSummary } from '../../types';
import { SDGBadge } from '../common/SDGBadge';
import { SDGDetailModal } from '../modals/SDGDetailModal';
import { getSignalLevelBadge } from '../../services/assessmentEngine';

interface ResultsDashboardScreenProps {
  result: AssessmentResult;
  onNavigateToReport: () => void;
  onNavigateToFlow: () => void;
  onNavigateToNewProject: () => void;
}

export const ResultsDashboardScreen: React.FC<ResultsDashboardScreenProps> = ({
  result,
  onNavigateToReport,
  onNavigateToFlow,
  onNavigateToNewProject,
}) => {
  const [selectedSdgSummary, setSelectedSdgSummary] = useState<SDGImpactSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSdg = (summary: SDGImpactSummary) => {
    setSelectedSdgSummary(summary);
    setIsModalOpen(true);
  };

  const { project } = result;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-soft">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-forest-950 border border-emerald-300">
              <Target className="w-3.5 h-3.5 text-emerald-700" />
              SDG Impact Evaluation
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 font-medium">Assessed: {result.assessedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
            <span><strong>Location:</strong> {project.location.display}</span>
            <span>•</span>
            <span><strong>Scale:</strong> {project.area} {project.areaUnit}</span>
            <span>•</span>
            <span><strong>Farming Model:</strong> {project.farmingModel}</span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToFlow}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-500" />
            <span>Edit Responses</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToReport}
            className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-card hover:shadow-elevated transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            <span>View Full Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Themes Assessed */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Themes Assessed
          </div>
          <div className="text-3xl font-extrabold text-forest-950">
            {result.themesAssessedCount} <span className="text-base font-medium text-stone-400">/ {result.totalThemesCount}</span>
          </div>
          <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{result.answeredQuestionsCount} of {result.totalQuestionsCount} Questions Completed</span>
          </div>
        </div>

        {/* KPI 2: Positive Contribution Signals */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Positive Signals
          </div>
          <div className="text-3xl font-extrabold text-emerald-700">
            +{result.totalPositiveScore} <span className="text-xs font-semibold text-stone-500">score</span>
          </div>
          <div className="text-xs text-stone-600 font-medium">
            Across {result.sdgSummaries.filter(s => s.positiveScore > 0).length} UN SDGs ({result.positiveSignalsCount} target signals)
          </div>
        </div>

        {/* KPI 3: Potential Negative Impacts / Trade-Offs */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-soft space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            Trade-offs & Attention Flags
          </div>
          <div className="text-3xl font-extrabold text-amber-900">
            {result.negativeSignalsCount} <span className="text-xs font-semibold text-amber-700">signals</span>
          </div>
          <div className="text-xs text-amber-900 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparent trade-off tracking</span>
          </div>
        </div>

        {/* KPI 4: Evidence & Confidence */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Overall Confidence
          </div>
          <div className="text-3xl font-extrabold text-stone-900">
            {result.overallConfidence}
          </div>
          <div className="text-xs text-stone-500">
            {result.evidenceGapsCount > 0
              ? `${result.evidenceGapsCount} items require field data`
              : 'Supported by operational evidence'}
          </div>
        </div>
      </div>

      {/* SECTION A: SDG Impact Overview Matrix */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Thematic Mapping Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              SDG Impact Signals Matrix
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Positive Contribution
            </span>
            <span className="flex items-center gap-1.5 text-amber-900 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Potential Trade-off / Attention
            </span>
          </div>
        </div>

        {/* Visual Bars for Each Impacted SDG */}
        <div className="space-y-3.5">
          {result.sdgSummaries.map(summary => {
            const { sdg, positiveScore, negativeScore } = summary;
            const maxScore = 12; // visual baseline
            const posWidth = Math.min(100, Math.round((positiveScore / maxScore) * 100));
            const negWidth = Math.min(100, Math.round((negativeScore / maxScore) * 100));

            return (
              <div
                key={sdg.number}
                onClick={() => handleOpenSdg(summary)}
                className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-card bg-stone-50/40 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <SDGBadge sdgNumber={sdg.number} size="md" />
                    <div>
                      <div className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        SDG {sdg.number}: {sdg.title}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {summary.contributingResponsesCount} Contributing Practices • Targets: {sdg.targets.map(t => t.code).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {positiveScore > 0 && (
                          <span className="text-emerald-700">+{positiveScore} Pos</span>
                        )}
                        {negativeScore > 0 && (
                          <span className="text-amber-700">-{negativeScore} Trade-off</span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400">Click to view evidence &rarr;</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full h-3 bg-stone-200/70 rounded-full overflow-hidden flex">
                  {posWidth > 0 && (
                    <div
                      style={{ width: `${posWidth}%`, backgroundColor: sdg.color }}
                      className="h-full transition-all duration-300"
                      title={`Positive Signal: +${positiveScore}`}
                    />
                  )}
                  {negWidth > 0 && (
                    <div
                      style={{ width: `${negWidth}%` }}
                      className="h-full bg-amber-500 transition-all duration-300"
                      title={`Trade-off Signal: -${negativeScore}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION B & C: Positive Signals & Trade-Offs (2-Col Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION B: Positive Contribution Signals */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Demonstrated Strengths
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-0.5">
              Positive Contribution Signals
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Practices implemented by the project that produce demonstrable sustainable alignment.
            </p>
          </div>

          <div className="space-y-4">
            {result.topPositiveSignals.map((sig, idx) => {
              const badge = getSignalLevelBadge(sig.signalStrength);

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <SDGBadge sdgNumber={sig.sdgNumber} size="sm" />
                      <div>
                        <div className="text-xs font-bold text-forest-950">
                          {sig.impactArea}
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-800">
                          Target {sig.targetCode} • {sig.targetTitle}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label} (+{sig.score})
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/60 leading-relaxed">
                    <strong className="text-forest-950 font-semibold">Why it appears: </strong>
                    {sig.explanation}
                  </p>

                  <div className="text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-1 pt-1">
                    <span>From: <em>[{sig.questionCode}] {sig.selectedOptionLabel}</em></span>
                    {sig.evidenceNote && (
                      <span className="text-emerald-800 font-medium">Evidence recorded</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION C: Potential Negative Impacts / Trade-offs (MANDATORY) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-soft space-y-6">
          <div className="border-b border-amber-100 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Essential Trade-Off Transparency
            </div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1.5">
              Potential Negative Impacts & Risks
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Sustainable agriculture inherently involves operational trade-offs. The framework tracks these openly to ensure balanced, audit-ready sustainability reporting.
            </p>
          </div>

          {result.topNegativeSignals.length > 0 ? (
            <div className="space-y-4">
              {result.topNegativeSignals.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <SDGBadge sdgNumber={sig.sdgNumber} size="sm" />
                      <div>
                        <div className="text-xs font-bold text-amber-950">
                          {sig.impactArea}
                        </div>
                        <div className="text-[10px] font-semibold text-amber-800">
                          Related to Target {sig.targetCode}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-rose-50 text-rose-800 border-rose-200">
                      Attention Signal ({sig.score})
                    </span>
                  </div>

                  <div className="text-xs text-stone-800 bg-white p-2.5 rounded-xl border border-amber-200/70 leading-relaxed">
                    <strong className="text-rose-900 font-semibold">Why flagged: </strong>
                    {sig.explanation}
                  </div>

                  {sig.suggestedAction && (
                    <div className="text-xs text-amber-900 bg-amber-100/70 p-2.5 rounded-xl border border-amber-300/70 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Remedial Action for Investigation: </span>
                        <span>{sig.suggestedAction}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-stone-500 pt-1">
                    Source: Triggered by response to <strong>[{sig.questionCode}]</strong>: &ldquo;{sig.selectedOptionLabel}&rdquo;
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-stone-800">No Critical Trade-Offs Flagged</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No acute risks were reported in current responses. Regular monitoring of aquifer water balances and chemical disposal is advised.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* SECTION D & E: Evidence & SDG Detail Directory */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Interactive Drilldown
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Relevant SDGs Directory
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Click any SDG to inspect target mappings, contributing responses, and methodology rules.
            </p>
          </div>

          <div className="text-xs text-stone-500">
            {result.sdgSummaries.length} SDGs Active in Current Profile
          </div>
        </div>

        {/* SDG Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.sdgSummaries.map(summary => (
            <div
              key={summary.sdgNumber}
              onClick={() => handleOpenSdg(summary)}
              className="p-4 rounded-2xl border border-stone-200 hover:border-forest-700 hover:shadow-card transition-all cursor-pointer bg-white flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <SDGBadge sdgNumber={summary.sdgNumber} size="md" />
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider group-hover:text-forest-800 transition-colors">
                    Inspect Targets &rarr;
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-forest-950 transition-colors">
                    SDG {summary.sdgNumber}: {summary.sdg.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                    {summary.sdg.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">+{summary.positiveScore}</span>
                  {summary.negativeScore > 0 && (
                    <span className="text-amber-700 font-bold">-{summary.negativeScore}</span>
                  )}
                </div>
                <span className="text-[11px] text-stone-500 font-medium">
                  {summary.contributingResponsesCount} responses
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal Component */}
      <SDGDetailModal
        summary={selectedSdgSummary}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
