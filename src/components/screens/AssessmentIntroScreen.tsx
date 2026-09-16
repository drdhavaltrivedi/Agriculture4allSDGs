import React from 'react';
import {
  Sprout,
  ArrowRight,
  Clock,
  ShieldCheck,
  Droplets,
  Layers,
  Sun,
  Users,
  MapPin,
  Target,
  FileText
} from 'lucide-react';
import { Project } from '../../types';
import { DEMO_THEMES } from '../../data/methodologyConfig';

interface AssessmentIntroScreenProps {
  project: Project;
  onBegin: () => void;
  onLoadDemoAnswers?: () => void;
  hasExistingAnswers?: boolean;
}

export const AssessmentIntroScreen: React.FC<AssessmentIntroScreenProps> = ({
  project,
  onBegin,
  onLoadDemoAnswers,
  hasExistingAnswers = false,
}) => {
  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-700" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Users': return <Users className="w-5 h-5 text-rose-600" />;
      default: return <Sprout className="w-5 h-5 text-forest-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Intro Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-forest-950 border border-emerald-300">
          <Target className="w-3.5 h-3.5 text-emerald-700" />
          <span>SDG Impact Assessment Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Agriculture Impact Assessment
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl">
          Evaluate how practices implemented in <strong className="text-stone-900 font-semibold">{project.name}</strong> align with the United Nations Sustainable Development Goals.
        </p>
      </div>

      {/* Project Context Snapshot */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
          Active Project Profile
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-stone-500">Initiative</div>
            <div className="text-base font-bold text-stone-900">{project.name}</div>
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{project.location.display}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500">Agronomic Scope</div>
            <div className="text-xs font-bold text-emerald-900">{project.focus}</div>
            <div className="text-xs text-stone-500 mt-0.5">
              {project.area} {project.areaUnit} • {project.stage} Stage
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500">Assessment Status</div>
            <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${hasExistingAnswers ? 'bg-emerald-600' : 'bg-stone-400'}`} />
              {hasExistingAnswers ? 'Assessment Data Recorded' : 'Ready for Initial Assessment'}
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Estimated duration: ~8–10 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Themes Breakdown */}
      <div>
        <h2 className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-3">
          Themes Covered in this Assessment (5 Core Dimensions)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_THEMES.map(theme => (
            <div
              key={theme.id}
              className="bg-white rounded-xl p-4 border border-stone-200 shadow-soft space-y-2 hover:border-stone-300 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
                  {getThemeIcon(theme.icon)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">
                    Theme {theme.number}
                  </span>
                  <h3 className="text-xs font-bold text-stone-900">
                    {theme.name}
                  </h3>
                </div>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {theme.description}
              </p>
              <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                {theme.questionIds.length} Core Questions
              </div>
            </div>
          ))}

          {/* Methodology Card */}
          <div className="bg-forest-900 text-white rounded-xl p-4 border border-forest-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300">
                Rule Engine
              </span>
              <h3 className="text-xs font-bold text-white mt-1">
                Transparent & Unbiased
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                Each response maps to UN targets. Positive contributions and trade-offs are logged independently.
              </p>
            </div>
            <div className="text-[10px] text-emerald-300 pt-2 font-medium">
              SDG Champions Taxonomy
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Governance Note */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-stone-900">Assessment Governance & Verification</div>
          <p className="text-stone-600 leading-relaxed">
            This evaluation maps reported agricultural practices against international SDG indicator criteria. Ensure reported field metrics correspond with verifiable farm documentation. Positive signals and trade-offs are calculated according to the SDG Champions methodology framework.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBegin}
            className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-card hover:shadow-elevated transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{hasExistingAnswers ? 'Continue / Review Assessment' : 'Begin Assessment'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>

          {onLoadDemoAnswers && (
            <button
              type="button"
              onClick={onLoadDemoAnswers}
              className="px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold border border-stone-300 shadow-soft transition-all flex items-center gap-1.5 cursor-pointer"
              title="Pre-populate with field benchmark data"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Load Reference Baseline</span>
            </button>
          )}
        </div>

        <div className="text-xs text-stone-400">
          Estimated duration: ~8–10 minutes
        </div>
      </div>
    </div>
  );
};
