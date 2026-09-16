import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Scale,
  FileCheck2,
  Compass,
  ArrowRight,
  Target
} from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-forest-950 border border-emerald-300">
          <Target className="w-3.5 h-3.5 text-emerald-700" />
          <span>SDG Champions Strategic Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          About Agriculture4allSDGs
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          An advanced agricultural impact assessment platform developed in collaboration with <strong>SDG Champions, France</strong>, adapting the proven 4allSDGs methodology to the realities of sustainable agriculture.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center border border-forest-200">
            <Sprout className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Agriculture-Specific Context</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Generic ESG checklists miss farming realities. Agriculture4allSDGs organizes impact around 5 agronomic pillars: water efficiency, soil carbon, rural clean energy, ecological buffers, and farmer livelihood resilience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-800 flex items-center justify-center border border-cyan-200">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Transparent Trade-Off Tracking</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Farming practices often carry unintended consequences—such as high water extraction or diesel pump reliance. Positive and negative signals are tracked side-by-side without netting them out, avoiding greenwashing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Evidence-Backed Confidence</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Impact magnitude is separate from data confidence. Unverified estimates are explicitly flagged as &ldquo;Evidence Required&rdquo; to preserve scientific integrity.
          </p>
        </div>
      </div>

      {/* The Methodology Journey */}
      <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-10 shadow-elevated space-y-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            How The Assessment Engine Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            From Practice to UN SDG Target
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Every question in the assessment maps directly to verified United Nations SDG targets through configurable impact situations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-forest-900/60 rounded-xl border border-forest-800 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm">1. Agronomic Action</div>
            <p className="text-xs text-stone-300">
              User selects implemented practice (e.g., drip irrigation, solar water pumping, vermicomposting).
            </p>
          </div>
          <div className="p-4 bg-forest-900/60 rounded-xl border border-forest-800 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm">2. Target Mapping</div>
            <p className="text-xs text-stone-300">
              Rule engine activates relevant UN targets (e.g., Target 6.4 for water efficiency, 7.2 for solar, 2.4 for soil).
            </p>
          </div>
          <div className="p-4 bg-forest-900/60 rounded-xl border border-forest-800 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm">3. Transparent Rationale</div>
            <p className="text-xs text-stone-300">
              Generates an explainable narrative card showing why the score was assigned, accompanied by remedial action recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap: Platform Evolution */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Platform Roadmap
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-0.5">
            Future Capabilities & Governance
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Planned enhancements for enterprise and institutional deployment with SDG Champions:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
            <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Regional Agronomic Taxonomy Expansion
            </h4>
            <p className="text-xs text-stone-600">
              Tailor scoring weights and thresholds to European, Mediterranean, and tropical agro-climatic zones.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
            <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Multilingual Localization (FR / EN / ES)
            </h4>
            <p className="text-xs text-stone-600">
              Support French and English seamlessly for European and international agricultural initiatives.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
            <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Organization Accounts & Farm Portfolios
            </h4>
            <p className="text-xs text-stone-600">
              Enable agricultural cooperatives, NGOs, and impact funds to track multiple farm projects in a consolidated dashboard.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
            <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Field Evidence & Document Verification
            </h4>
            <p className="text-xs text-stone-600">
              Support soil laboratory reports, water meter telemetry, and photographic ground-truthing to elevate audit confidence.
            </p>
          </div>
        </div>

        {/* Action CTA */}
        <div className="pt-4 flex items-center justify-between border-t border-stone-100">
          <div className="text-xs text-stone-500">
            Ready to explore agricultural impact profiles?
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
