import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Sprout,
  ArrowRight,
  Filter,
  RotateCcw,
  Layers
} from 'lucide-react';
import { Project, ProjectStatus } from '../../types';

interface ProjectsScreenProps {
  projects: Project[];
  activeProject: Project | null;
  onSelectProject: (projectId: string) => void;
  onNavigate: (screen: string) => void;
  onResetDemo: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onNavigate,
  onResetDemo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.display.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.focus.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed Assessment
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        );
      case 'not_started':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-200 pb-6 text-left">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Project Portfolio
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 font-medium">{projects.length} Initiatives Enrolled</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Agricultural Projects
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Select an agricultural initiative to view its verified SDG impact profile, update assessment responses, or create a new evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onResetDemo}
            className="px-3 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Restore benchmark projects"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Data</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('create-project')}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-soft">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, location, or focus..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-stone-400 mr-1 hidden sm:block" />
          {(['all', 'completed', 'in_progress', 'not_started'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-forest-900 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {status === 'all'
                ? 'All Statuses'
                : status === 'completed'
                ? 'Completed'
                : status === 'in_progress'
                ? 'In Progress'
                : 'Not Started'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {filteredProjects.map(project => {
          const isActive = activeProject?.id === project.id;

          return (
            <div
              key={project.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-forest-700 ring-2 ring-forest-700/10 shadow-card'
                  : 'border-stone-200 shadow-soft hover:shadow-card hover:border-stone-300'
              }`}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(project.status)}
                      <span className="text-[10px] uppercase font-bold text-forest-900 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Field Initiative
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 pt-1">
                      {project.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-forest-800 flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-5 h-5" />
                  </div>
                </div>

                {/* Location & Metadata */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{project.location.display}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    <span>{project.area} {project.areaUnit}</span>
                  </div>
                  <div>
                    Stage: <span className="font-semibold text-stone-700">{project.stage}</span>
                  </div>
                </div>

                {/* Focus & Description */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-emerald-800">
                    {project.focus}
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Practices Tags */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Practices Under Evaluation
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.practices.slice(0, 4).map((practice, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                      >
                        {practice}
                      </span>
                    ))}
                    {project.practices.length > 4 && (
                      <span className="text-[11px] text-stone-500 py-0.5">
                        +{project.practices.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer / Actions */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-stone-400">
                  Updated {project.lastUpdated}
                </div>

                <div className="flex items-center gap-2">
                  {project.status === 'completed' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProject(project.id);
                          onNavigate('results');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        View Results
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProject(project.id);
                          onNavigate('assessment-flow');
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                        title="Review or edit answers"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProject(project.id);
                        onNavigate('assessment-flow');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Start Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
          <FolderKanban className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800">No matching agricultural projects found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or filter settings, or add a new project to evaluate.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
