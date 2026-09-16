import React from 'react';
import { Sprout, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm no-print mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-emerald-400 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                Agriculture<span className="text-emerald-400">4allSDGs</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Enterprise Edition
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-lg">
              Understand the impact of agriculture. Act for a more sustainable future.
              A comprehensive SDG impact-assessment platform mapping farm-level practices to United Nations Sustainable Development Goals and targets.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-stone-400 bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700/60">
                Developed in collaboration with <strong className="text-stone-200">SDG Champions, France</strong>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('welcome')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Platform Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Agricultural Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment-flow')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Impact Assessment Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Results Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('report')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Official Assessment Report
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Methodology & Governance */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">
              Methodology & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('config')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Methodology Framework <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Governance & Roadmap <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
              <li className="pt-2 text-stone-400 text-[11px] leading-relaxed">
                Structured rule taxonomy designed for seamless alignment with international ESG and UN 2030 criteria.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="flex items-start gap-2 max-w-3xl">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-300">Methodology Standards:</strong> The Agriculture4allSDGs framework translates agricultural field practices into UN SDG indicators. Impact signals reflect operational disclosures, target criteria, and rule-based scoring models.
            </p>
          </div>
          <div className="text-stone-500 whitespace-nowrap">
            Agriculture4allSDGs Platform © 2026
          </div>
        </div>
      </div>
    </footer>
  );
};
