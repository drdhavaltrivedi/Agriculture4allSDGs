import React from 'react';
import {
  Sprout,
  ArrowRight,
  FolderKanban,
  FileSpreadsheet,
  Scale,
  Compass,
  Lightbulb,
  Droplets,
  CheckCircle2,
  BarChart3,
  Target,
  ShieldCheck,
  MapPin,
  Layers
} from 'lucide-react';
import { SDGBadge } from '../common/SDGBadge';
import { Project } from '../../types';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
  onSelectProject: (projectId: string) => void;
  projects: Project[];
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  onSelectProject,
  projects,
}) => {
  const parisProject = projects.find(p => p.id === 'proj-paris-agroecology') || projects[0];

  const handleStartPrimaryDemo = () => {
    if (parisProject) {
      onSelectProject(parisProject.id);
    }
    onNavigate('assessment-flow');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-stone-50/50 to-[#fbfbfa] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-forest-900 border border-emerald-300/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>SDG Champions Framework • Agricultural Sustainability</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.12]">
                Make agricultural <br />
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
                  impact visible.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
                Measure, evaluate, and report how agricultural practices contribute to sustainable development through a structured,
                transparent, and rule-based SDG impact-assessment experience.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleStartPrimaryDemo}
                  className="px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm shadow-card hover:shadow-elevated transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <Sprout className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
                  <span>Start an assessment</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 shadow-soft hover:border-stone-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FolderKanban className="w-4 h-4 text-stone-500" />
                  <span>Explore projects</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (parisProject) onSelectProject(parisProject.id);
                    onNavigate('results');
                  }}
                  className="px-4 py-3.5 rounded-xl text-stone-600 hover:text-forest-900 font-semibold text-sm transition-colors cursor-pointer"
                >
                  View Paris Project Results &rarr;
                </button>
              </div>

              {/* Credibility Framework Note */}
              <div className="p-3.5 rounded-xl bg-stone-100/90 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5 max-w-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="leading-normal">
                  <strong className="text-stone-900">Standardized Methodology:</strong> Aligned with UN 2030 Sustainable Development Goal indicators, integrating water stewardship, soil carbon, clean energy, and farmer livelihood resilience across European and international biomes.
                </p>
              </div>
            </div>

            {/* Right Col: Hero Visual / Interactive Snapshot */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-elevated border border-stone-200/80 relative">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      SDG Impact Profile Overview
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Paris, France
                  </span>
                </div>

                {/* SDG Mini Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[2, 6, 7, 8, 12, 13, 15, 17].map(num => (
                    <div key={num} className="p-2 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center text-center">
                      <SDGBadge sdgNumber={num} size="sm" />
                      <span className="text-[10px] font-bold text-stone-700 mt-1">SDG {num}</span>
                      <span className="text-[9px] text-emerald-700 font-medium">Mapped</span>
                    </div>
                  ))}
                </div>

                {/* Impact Highlight Preview Card */}
                <div className="space-y-2.5 text-left text-xs bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/70">
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span className="font-bold text-stone-700">Plaine de Versailles Project</span>
                    <span className="text-emerald-800 font-semibold">Île-de-France, France</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <Droplets className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900">SDG 2.4 & 15.3: Agroecological Soil Carbon</span>
                      <p className="text-stone-600 text-[11px] mt-0.5">
                        Legume-cereal rotation + green manures increased soil organic carbon to 2.1% under INRAE audit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-stone-200/50">
                    <BarChart3 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900">SDG 12.2: Short-Supply Paris Food Basin</span>
                      <p className="text-stone-600 text-[11px] mt-0.5">
                        Direct contracts supplying organic flour and pulses to Parisian public schools and cooperatives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Audit-Ready • European & Global</span>
                  <button
                    onClick={() => {
                      if (parisProject) onSelectProject(parisProject.id);
                      onNavigate('results');
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Open Live Dashboard &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Journey Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-2">
            Standardized Assessment Workflow
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-forest-950">
            How Agriculture4allSDGs Evaluates Impact
          </p>
          <p className="text-stone-600 text-sm mt-2">
            A structured three-step process translating complex agricultural practices into measurable SDG targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft hover:shadow-card transition-all text-left relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 font-extrabold text-base flex items-center justify-center mb-4 border border-forest-200">
              1
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Profile your project
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Capture operational context: crop mix, farm scale (hectares/acres), lifecycle stage, geographic locality, and specific farming practices.
            </p>
            <div className="text-[11px] font-semibold text-forest-800 bg-forest-50 px-2.5 py-1 rounded inline-block">
              Context-Aware Profiling
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft hover:shadow-card transition-all text-left relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-base flex items-center justify-center mb-4 border border-emerald-200">
              2
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Assess impact dimensions
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Answer structured questions across 5 core agriculture themes (Water, Soil, Energy, Biodiversity, Farmer Livelihoods) with qualitative evidence notes.
            </p>
            <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
              5 Thematic Pillars
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft hover:shadow-card transition-all text-left relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 font-extrabold text-base flex items-center justify-center mb-4 border border-amber-200">
              3
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Analyze SDG contribution
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Review explainable SDG mapping signals, investigate potential trade-offs, inspect evidence requirements, and download a professional assessment report.
            </p>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded inline-block">
              Positive & Trade-Off Signals
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevated relative overflow-hidden text-left">
          <div className="max-w-3xl space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
              <Compass className="w-3.5 h-3.5" />
              Impact Assessment Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Core Platform Capabilities
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Designed to adapt the proven 4allSDGs methodology to agricultural realities,
              balancing positive contributions with real-world trade-offs and verifiable audit evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Agriculture-Specific Framework</h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                Themes tailored to farming: irrigation, soil health, energy transition, rural biodiversity, and farm worker livelihoods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Explainable SDG Mappings</h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                Every score links directly to specific UN SDG Targets (e.g. 6.4, 2.4, 12.2, 13.2) with transparent rationale cards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Visible Trade-Offs</h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                Negative impacts and evidence gaps are never hidden or netted out against positive gains, preventing greenwashing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Executive Reporting</h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                Generates a clean, client-ready printable PDF report with executive summary, metadata, and target breakdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xs uppercase font-bold text-stone-500 tracking-wider">
              Field Portfolio
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-stone-900">
              Featured Agricultural Initiatives
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            View All {projects.length} Projects &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft hover:shadow-card hover:border-stone-300 transition-all text-left flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {project.location.country === 'France' ? 'French Flagship' : 'Active Field Project'}
                  </span>
                  <span className="text-[11px] text-stone-500">{project.area} {project.areaUnit}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-forest-950 line-clamp-2">{project.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{project.location.display}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.practices.slice(0, 3).map((pr, idx) => (
                    <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                      {pr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectProject(project.id);
                    onNavigate('assessment-flow');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs cursor-pointer"
                >
                  Start Assessment
                </button>
                <button
                  onClick={() => {
                    onSelectProject(project.id);
                    onNavigate('results');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50 font-semibold text-xs cursor-pointer"
                >
                  View Results &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
