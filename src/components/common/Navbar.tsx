import React, { useState } from 'react';
import {
  Sprout,
  FolderKanban,
  BarChart3,
  FileSpreadsheet,
  Settings2,
  Info,
  Menu,
  X,
  RotateCcw,
  Compass,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../../types';

interface NavbarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  projects: Project[];
  activeProject: Project | null;
  onSelectProject: (projectId: string) => void;
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  projects,
  activeProject,
  onSelectProject,
  onResetDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'welcome', label: 'Overview', icon: Compass },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'results', label: 'Results Dashboard', icon: BarChart3 },
    { id: 'report', label: 'Assessment Report', icon: FileSpreadsheet },
    { id: 'config', label: 'Methodology Framework', icon: Settings2 },
    { id: 'about', label: 'About & Governance', icon: Info },
  ];

  const handleNav = (screenId: string) => {
    onNavigate(screenId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-soft">
      {/* Sleek Enterprise Top Bar */}
      <div className="bg-[#112217] text-stone-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-900/90 text-emerald-200 border border-emerald-700/60">
              SDG Champions Platform
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="text-stone-300 text-[11px] truncate">
              United Nations 2030 Agenda • Agricultural Impact Assessment
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDemo}
              title="Reset project data to standard reference state"
              className="inline-flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Workspace Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('welcome')}>
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-emerald-400 flex items-center justify-center shadow-sm flex-shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-lg text-forest-950 tracking-tight">
                  Agriculture<span className="text-emerald-700">4allSDGs</span>
                </span>
                <span className="hidden md:inline text-[10px] font-bold text-forest-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Impact Engine
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block leading-none mt-0.5">
                Agriculture Impact Assessment for Sustainable Development
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentScreen === link.id ||
                (link.id === 'results' && currentScreen === 'assessment-flow') ||
                (link.id === 'projects' && currentScreen === 'create-project');

              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-forest-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-forest-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-stone-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Active Project Dropdown & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {activeProject && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs text-stone-700 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <div className="text-left max-w-[170px]">
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Active Project</div>
                    <div className="font-semibold text-stone-900 truncate">{activeProject.name}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1" />
                </button>

                {projectDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-elevated border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setProjectDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Switch Project
                    </div>
                    {projects.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          onSelectProject(p.id);
                          setProjectDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-emerald-50/60 transition-colors flex items-start gap-2 ${
                          p.id === activeProject.id ? 'bg-emerald-50 text-forest-900 font-semibold' : 'text-stone-700'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${p.id === activeProject.id ? 'bg-forest-700' : 'bg-stone-300'}`} />
                        <div>
                          <div className="truncate font-medium">{p.name}</div>
                          <div className="text-[10px] text-stone-500">{p.location.display}</div>
                        </div>
                      </button>
                    ))}
                    <div className="border-t border-stone-100 mt-1 pt-1 px-2">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('create-project');
                          setProjectDropdownOpen(false);
                        }}
                        className="w-full text-center py-1.5 text-xs text-forest-700 hover:text-forest-900 font-medium hover:bg-forest-50 rounded"
                      >
                        + Create New Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => onNavigate('assessment-flow')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Assess Impact
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {activeProject && (
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 mb-3">
              <div className="text-[10px] uppercase font-bold text-stone-500">Active Project</div>
              <div className="font-semibold text-stone-900 text-sm">{activeProject.name}</div>
              <div className="text-xs text-stone-500">{activeProject.location.display}</div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold w-full text-left ${
                    isActive ? 'bg-forest-900 text-white' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => handleNav('assessment-flow')}
              className="w-full py-2.5 rounded-lg bg-emerald-700 text-white font-semibold text-sm text-center shadow-sm"
            >
              Start / Continue Assessment
            </button>
            <button
              onClick={() => {
                onResetDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg text-stone-600 hover:bg-stone-100 text-xs font-medium text-center flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Workspace Data
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
