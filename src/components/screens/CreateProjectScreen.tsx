import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sprout,
  CheckCircle2,
  MapPin,
  Layers,
  FileText,
  Target
} from 'lucide-react';
import { Project, ProjectStage } from '../../types';

interface CreateProjectScreenProps {
  onProjectCreated: (newProject: Project) => void;
  onNavigate: (screen: string) => void;
}

export const CreateProjectScreen: React.FC<CreateProjectScreenProps> = ({
  onProjectCreated,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [farmingModel, setFarmingModel] = useState('');
  const [area, setArea] = useState<number>(20);
  const [areaUnit, setAreaUnit] = useState<'hectares' | 'acres'>('hectares');
  const [stage, setStage] = useState<ProjectStage>('Pilot');
  const [objectives, setObjectives] = useState('');
  const [practices, setPractices] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!name.trim()) newErrors.name = 'Project name is required';
      if (!country.trim()) newErrors.country = 'Country is required';
      if (!description.trim()) newErrors.description = 'Please provide a brief project summary';
    } else if (currentStep === 2) {
      if (!farmingModel.trim()) newErrors.farmingModel = 'Crop type or farming model is required';
      if (!area || area <= 0) newErrors.area = 'Please enter a positive area size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) setStep((step + 1) as 2 | 3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const parsedObjectives = objectives
      .split('\n')
      .map(o => o.trim())
      .filter(o => o.length > 0);

    const parsedPractices = practices
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      location: {
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
        display: [city, state, country].filter(Boolean).join(', '),
      },
      focus: farmingModel.trim(),
      description: description.trim(),
      area: Number(area),
      areaUnit: areaUnit,
      farmingModel: farmingModel.trim(),
      stage: stage,
      objectives: parsedObjectives.length > 0 ? parsedObjectives : ['Improve agricultural sustainability'],
      practices: parsedPractices.length > 0 ? parsedPractices : ['Resource-efficient agriculture'],
      status: 'not_started',
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      isDemo: false,
    };

    onProjectCreated(newProj);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Back button */}
      <button
        onClick={() => onNavigate('projects')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </button>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          New Assessment Setup
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          Register Agricultural Project
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">
          Define the project scope and baseline context before proceeding to the SDG impact questions.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mt-6">
          {[
            { num: 1, label: 'Context & Locality' },
            { num: 2, label: 'Agronomy & Scale' },
            { num: 3, label: 'Objectives & Practices' },
          ].map(s => (
            <div key={s.num} className="flex-1">
              <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                <span className={step >= s.num ? 'text-forest-900' : 'text-stone-400'}>
                  Step {s.num}: {s.label}
                </span>
              </div>
              <div
                className={`h-1.5 rounded-full transition-all ${
                  step >= s.num ? 'bg-forest-800' : 'bg-stone-200'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Section Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        {/* STEP 1: Context & Locality */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-forest-900 font-bold text-sm border-b border-stone-100 pb-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              General Project Identity
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Western Agroforestry & Drip Irrigation Pilot"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                  errors.name ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Country *</label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="e.g. India, France, Kenya"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">State / Region</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="e.g. Gujarat, Occitanie"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">City / Locality</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. Ahmedabad, Nîmes"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Project Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the initiative, key challenges addressed, and intended beneficiaries..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                  errors.description ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Agronomy & Scale */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-forest-900 font-bold text-sm border-b border-stone-100 pb-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              Agronomic Scope & Scale
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Agricultural Sector / Crop Type / Farming Model *
              </label>
              <input
                type="text"
                value={farmingModel}
                onChange={e => setFarmingModel(e.target.value)}
                placeholder="e.g. Mixed cereal & legume cropping, Organic horticulture, Agroforestry"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                  errors.farmingModel ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                }`}
              />
              {errors.farmingModel && (
                <p className="text-[11px] text-red-600 mt-1">{errors.farmingModel}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Project Area Size *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={area}
                    onChange={e => setArea(parseFloat(e.target.value) || 0)}
                    className="w-2/3 px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                  <select
                    value={areaUnit}
                    onChange={e => setAreaUnit(e.target.value as 'hectares' | 'acres')}
                    className="w-1/3 px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-stone-50"
                  >
                    <option value="hectares">Hectares</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>
                {errors.area && <p className="text-[11px] text-red-600 mt-1">{errors.area}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Project Stage *</label>
                <select
                  value={stage}
                  onChange={e => setStage(e.target.value as ProjectStage)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-stone-50"
                >
                  <option value="Idea">Idea (Concept formulation)</option>
                  <option value="Planning">Planning (Detailed budgeting & permits)</option>
                  <option value="Pilot">Pilot (Initial test plots)</option>
                  <option value="Operating">Operating (Active standard operations)</option>
                  <option value="Scaling">Scaling (Replicating across larger acreage)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Objectives & Practices */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-forest-900 font-bold text-sm border-b border-stone-100 pb-2">
              <Target className="w-4 h-4 text-emerald-700" />
              Objectives & Practices Under Evaluation
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Main Objectives (One per line)
              </label>
              <textarea
                rows={3}
                value={objectives}
                onChange={e => setObjectives(e.target.value)}
                placeholder="e.g.
Reduce water use by 30% through drip systems
Improve soil organic carbon through composting
Increase net smallholder farm income"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                These goals provide qualitative context for the assessment report summary.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Practices Currently Implemented or Planned (Separated by commas)
              </label>
              <textarea
                rows={2}
                value={practices}
                onChange={e => setPractices(e.target.value)}
                placeholder="e.g. Drip irrigation, Solar pumping, Crop rotation, Cover cropping, Farmer training"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-card transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Begin Assessment</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
