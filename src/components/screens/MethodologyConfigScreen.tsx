import React, { useState } from 'react';
import {
  Settings2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Code2,
  ArrowRight,
  Droplets,
  Layers,
  Sun,
  Sprout,
  Users,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { DEMO_THEMES, DEMO_QUESTIONS } from '../../data/methodologyConfig';
import { SDGBadge } from '../common/SDGBadge';

export const MethodologyConfigScreen: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(
    new Set(['W1', 'S1'])
  );
  const [showJsonRaw, setShowJsonRaw] = useState(false);

  const toggleExpand = (code: string) => {
    setExpandedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const filteredQuestions = DEMO_QUESTIONS.filter(q => {
    const matchesTheme = selectedThemeId === 'all' || q.themeId === selectedThemeId;
    const matchesQuery =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTheme && matchesQuery;
  });

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Rule Engine Architecture
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Methodology Configuration
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setShowJsonRaw(!showJsonRaw)}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Code2 className="w-4 h-4 text-stone-600" />
            <span>{showJsonRaw ? 'View UI Explorer' : 'View Raw JSON Schema'}</span>
          </button>
        </div>

        <p className="text-stone-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          The Agriculture4allSDGs assessment engine is driven by transparent, structured configuration data.
          Themes, questions, answer options, target mappings, scoring weights, and explanatory notes can be modified or substituted by SDG Champions without rewriting code.
        </p>

        {/* Governance Callout */}
        <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5 max-w-2xl mt-3">
          <ShieldAlert className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Rule Governance & Indicator Taxonomy:</strong> Configuration parameters are managed through the SDG Champions indicator taxonomy. Scoring thresholds can be tailored according to national agronomic benchmarks and regional biomes.
          </div>
        </div>
      </div>

      {showJsonRaw ? (
        /* JSON View */
        <div className="bg-stone-900 text-stone-200 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-card max-h-[700px]">
          <pre>{JSON.stringify({ themes: DEMO_THEMES, questions: DEMO_QUESTIONS }, null, 2)}</pre>
        </div>
      ) : (
        /* Interactive Config Explorer */
        <div className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-soft">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rule definitions, codes, or effects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedThemeId('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  selectedThemeId === 'all'
                    ? 'bg-forest-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                All Themes ({DEMO_QUESTIONS.length})
              </button>
              {DEMO_THEMES.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                    selectedThemeId === theme.id
                      ? 'bg-forest-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  T{theme.number}: {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Configured Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map(question => {
              const isExpanded = expandedQuestionIds.has(question.code);
              const theme = DEMO_THEMES.find(t => t.id === question.themeId);

              return (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-soft overflow-hidden transition-all"
                >
                  {/* Collapsible Row Header */}
                  <div
                    onClick={() => toggleExpand(question.code)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-xs flex items-center justify-center flex-shrink-0 border border-emerald-200">
                        {question.code}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                            Theme {theme?.number}: {theme?.name}
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                            Type: {question.type}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-stone-900">
                          {question.title}
                        </h3>
                        <p className="text-xs text-stone-500 line-clamp-1">
                          {question.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-stone-400 font-medium">
                        {question.options.length} Configured Options
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-stone-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="border-t border-stone-100 p-6 bg-stone-50/50 space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Configured Options & SDG Mapping Effects
                      </div>

                      <div className="space-y-3">
                        {question.options.map(option => (
                          <div
                            key={option.id}
                            className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-bold text-stone-900 text-xs flex items-center gap-2">
                                <span className="text-[10px] font-mono text-stone-400">[{option.id}]</span>
                                <span>{option.label}</span>
                              </div>

                              {option.isNotEnoughInfo && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                                  Flags Evidence Gap
                                </span>
                              )}

                              {option.isNotApplicable && (
                                <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                                  Not Applicable
                                </span>
                              )}
                            </div>

                            {option.description && (
                              <p className="text-xs text-stone-600">
                                {option.description}
                              </p>
                            )}

                            {/* Effects Table/List */}
                            {option.effects.length > 0 ? (
                              <div className="pt-2 border-t border-stone-100 space-y-2">
                                <div className="text-[10px] uppercase font-bold text-stone-400">
                                  Triggered SDG Effects:
                                </div>
                                <div className="space-y-1.5">
                                  {option.effects.map((eff, effIdx) => (
                                    <div
                                      key={effIdx}
                                      className={`p-2.5 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                                        eff.direction === 'positive'
                                          ? 'bg-emerald-50/60 border border-emerald-200'
                                          : 'bg-amber-50/60 border border-amber-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <SDGBadge sdgNumber={eff.sdgNumber} size="sm" />
                                        <span className="font-bold text-stone-900">
                                          SDG {eff.sdgNumber} (Target {eff.targetCode}):
                                        </span>
                                        <span className="text-stone-700">{eff.impactArea}</span>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        <span
                                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                            eff.direction === 'positive'
                                              ? 'bg-emerald-200 text-emerald-950'
                                              : 'bg-rose-200 text-rose-950'
                                          }`}
                                        >
                                          {eff.direction === 'positive' ? `+${eff.score} Pos` : `${eff.score} Trade-off`}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-[11px] text-stone-400 italic pt-1">
                                No direct SDG scoring effect assigned to this option.
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
