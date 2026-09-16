import React from 'react';
import {
  Printer,
  Download,
  ArrowLeft,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Calendar,
  Layers,
  BarChart3
} from 'lucide-react';
import { AssessmentResult } from '../../types';
import { SDGBadge } from '../common/SDGBadge';

interface ReportViewScreenProps {
  result: AssessmentResult;
  onNavigateBack: () => void;
}

export const ReportViewScreen: React.FC<ReportViewScreenProps> = ({
  result,
  onNavigateBack,
}) => {
  const { project, sdgSummaries, topPositiveSignals, topNegativeSignals } = result;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex items-center justify-between no-print bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Wrapper */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-card space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest-900 text-emerald-400 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-stone-900 text-lg tracking-tight">
                Agriculture<span className="text-emerald-700">4allSDGs</span>
              </span>
              <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Official Assessment
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight pt-2">
              Agricultural Impact Assessment Report
            </h1>
            <p className="text-xs text-stone-500">
              Agricultural Sustainability & UN SDG Alignment Report • SDG Champions Framework
            </p>
          </div>

          <div className="text-right text-xs space-y-1 sm:self-end">
            <div className="text-stone-400 uppercase font-semibold text-[10px] tracking-wider">
              Document Reference
            </div>
            <div className="font-bold text-stone-800">REF-{project.id.toUpperCase()}</div>
            <div className="text-stone-500">Evaluation Date: {result.assessedAt}</div>
          </div>
        </div>

        {/* Project Metadata Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Project Name</div>
            <div className="font-bold text-stone-900 mt-0.5">{project.name}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Locality & Country</div>
            <div className="font-bold text-stone-900 mt-0.5">{project.location.display}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Area & Model</div>
            <div className="font-bold text-stone-900 mt-0.5">{project.area} {project.areaUnit} • {project.farmingModel}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Lifecycle Stage</div>
            <div className="font-bold text-stone-900 mt-0.5">{project.stage} Stage</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3 print-break-inside-avoid">
          <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-200 pb-1.5">
            Executive Summary
          </h2>
          <p className="text-xs text-stone-700 leading-relaxed">
            This comprehensive assessment analyzes the agricultural practices deployed by{' '}
            <strong>{project.name}</strong> across five core sustainability dimensions: Water Management,
            Soil Health & Land Stewardship, Energy & Climate, Biodiversity & Resource Use, and People & Farmer Livelihoods.
          </p>
          <p className="text-xs text-stone-700 leading-relaxed">
            The project demonstrates strong positive contribution signals across{' '}
            <strong>SDG 6 (Clean Water and Sanitation)</strong>,{' '}
            <strong>SDG 2 (Zero Hunger)</strong>,{' '}
            <strong>SDG 7 (Affordable and Clean Energy)</strong>,{' '}
            <strong>SDG 12 (Responsible Consumption)</strong>, and{' '}
            <strong>SDG 13 (Climate Action)</strong>. Concurrently, the assessment tracks operational
            trade-offs—including shared aquifer recharge balances and backup energy transition pathways—to ensure robust, audit-ready ESG alignment.
          </p>
        </div>

        {/* Summary Metric Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center print-break-inside-avoid">
          <div className="p-3 border border-stone-200 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-stone-400">Themes Evaluated</div>
            <div className="text-xl font-bold text-stone-900 mt-1">{result.themesAssessedCount} / 5</div>
          </div>
          <div className="p-3 border border-stone-200 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-stone-400">Positive Score</div>
            <div className="text-xl font-bold text-emerald-700 mt-1">+{result.totalPositiveScore}</div>
          </div>
          <div className="p-3 border border-stone-200 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-stone-400">Trade-Off Signals</div>
            <div className="text-xl font-bold text-amber-700 mt-1">-{result.totalNegativeScore}</div>
          </div>
          <div className="p-3 border border-stone-200 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-stone-400">Audit Confidence</div>
            <div className="text-xl font-bold text-stone-900 mt-1">{result.overallConfidence}</div>
          </div>
        </div>

        {/* SDG Contribution Matrix Table */}
        <div className="space-y-3 print-break-inside-avoid">
          <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-200 pb-1.5">
            SDG Contribution Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-stone-200">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-600">
                  <th className="p-3">SDG Goal</th>
                  <th className="p-3">Primary Target(s)</th>
                  <th className="p-3 text-center">Positive Signal</th>
                  <th className="p-3 text-center">Trade-Off Signal</th>
                  <th className="p-3">Key Contributing Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {sdgSummaries.map(summary => (
                  <tr key={summary.sdgNumber} className="hover:bg-stone-50/50">
                    <td className="p-3 font-semibold text-stone-900 flex items-center gap-2">
                      <SDGBadge sdgNumber={summary.sdgNumber} size="sm" />
                      <span>SDG {summary.sdgNumber}: {summary.sdg.shortTitle}</span>
                    </td>
                    <td className="p-3 text-stone-600">
                      {summary.sdg.targets.map(t => `Target ${t.code}`).join(', ')}
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-700">
                      {summary.positiveScore > 0 ? `+${summary.positiveScore}` : '—'}
                    </td>
                    <td className="p-3 text-center font-bold text-amber-700">
                      {summary.negativeScore > 0 ? `-${summary.negativeScore}` : '—'}
                    </td>
                    <td className="p-3 text-stone-600 truncate max-w-xs">
                      {summary.positiveSignals[0]?.impactArea || summary.negativeSignals[0]?.impactArea || 'Context baseline'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Positive Contribution Signals Breakdown */}
        <div className="space-y-3 print-break-inside-avoid">
          <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-200 pb-1.5">
            Key Positive Contributions
          </h2>
          <div className="space-y-2">
            {topPositiveSignals.map((sig, idx) => (
              <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-900">
                    SDG {sig.sdgNumber} (Target {sig.targetCode}): {sig.impactArea}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Score: +{sig.score}
                  </span>
                </div>
                <p className="text-stone-600">{sig.explanation}</p>
                {sig.evidenceNote && (
                  <div className="text-[11px] text-stone-500 font-medium">
                    Field Evidence on Record: {sig.evidenceNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trade-Offs & Attention Signals Breakdown */}
        <div className="space-y-3 print-break-inside-avoid">
          <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-200 pb-1.5 text-amber-900">
            Trade-Offs & Areas Requiring Operational Monitoring
          </h2>
          <div className="space-y-2">
            {topNegativeSignals.map((sig, idx) => (
              <div key={idx} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-950">
                    SDG {sig.sdgNumber} (Target {sig.targetCode}): {sig.impactArea}
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    Attention ({sig.score})
                  </span>
                </div>
                <p className="text-stone-700">{sig.explanation}</p>
                {sig.suggestedAction && (
                  <div className="text-[11px] text-amber-900 font-bold">
                    Recommended Action: {sig.suggestedAction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Official Governance Standard Note */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1.5 print-break-inside-avoid">
          <div className="font-bold text-stone-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Assessment Governance & Accreditation Standards
          </div>
          <p className="leading-relaxed">
            This impact assessment report has been generated using the Agriculture4allSDGs evaluation engine developed for SDG Champions, France.
            Scoring algorithms map specific agricultural practices to corresponding United Nations 2030 Agenda indicators and targets.
            All reported metrics are subject to ongoing field verification and localized stakeholder consultations.
          </p>
        </div>
      </div>
    </div>
  );
};
