import { Project, AssessmentAnswer } from '../types';

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-paris-agroecology',
    name: 'Plaine de Versailles Agroecological Transition',
    location: {
      country: 'France',
      state: 'Île-de-France',
      city: 'Paris Region',
      display: 'Paris (Île-de-France), France',
    },
    focus: 'Organic grain & legume diversification, agroforestry corridors, and short-circuit Paris food supply',
    description: 'An exemplary French agroecological initiative in the greater Paris region, transitioning arable farming toward legume intercropping, reduced synthetic inputs, biodiversity hedgerows, and direct short-chain grain supply to Parisian public canteens.',
    area: 65,
    areaUnit: 'hectares',
    farmingModel: 'Agroecological arable farming (soft wheat, faba beans, lentils, sunflowers)',
    stage: 'Operating',
    objectives: [
      'Reduce synthetic nitrogen fertilizer usage by 65% through biological legume-cereal intercropping',
      'Supply organic flours, pulses, and grain directly to Parisian public schools and catering cooperatives',
      'Establish 3.5 km of multi-tier native agroforestry hedgerows for wild pollinator conservation',
      'Protect the Seine-Normandie watershed against nitrate leaching through continuous living soil cover'
    ],
    practices: [
      'Legume-cereal crop rotation (soft wheat, winter faba beans, green lentils)',
      'Biological nitrogen fixation & multi-species cover crops',
      'Perimeter agroforestry hedgerows (native oak, hazel, hornbeam)',
      'On-farm retention basin capturing winter precipitation',
      'Solar-powered grain drying and aeration silos (120 kWp)',
      'Direct short-supply contracts with Paris municipal catering'
    ],
    status: 'completed',
    lastUpdated: '2026-09-15',
    createdAt: '2026-07-20',
    isDemo: true,
  },
  {
    id: 'proj-green-valley',
    name: 'Green Valley Water-Smart Farming Initiative',
    location: {
      country: 'India',
      state: 'Gujarat',
      city: 'Ahmedabad',
      display: 'Ahmedabad, Gujarat, India',
    },
    focus: 'Drip irrigation, water efficiency, and solar-powered pumping',
    description: 'A field project exploring water-efficient irrigation and renewable-energy practices across a mixed-crop agricultural area in semi-arid western India.',
    area: 50,
    areaUnit: 'hectares',
    farmingModel: 'Mixed-crop agriculture (cotton, wheat, groundnut, pulses)',
    stage: 'Pilot',
    objectives: [
      'Reduce agricultural water extraction while maintaining crop productivity',
      'Replace diesel generator pumping sets with decentralized solar photovoltaics',
      'Train local smallholder farmers in precision micro-irrigation scheduling',
      'Monitor and document soil moisture retention over multi-season cycles'
    ],
    practices: [
      'Drip and micro-sprinkler irrigation',
      'Soil-moisture monitoring (tensiometers & soil probes)',
      'Solar-powered water pumping (5HP arrays)',
      'Farmer capacity-building workshops',
      'Crop rotation and legume inter-cropping',
      'Farm biomass composting'
    ],
    status: 'completed',
    lastUpdated: '2026-09-14',
    createdAt: '2026-08-10',
    isDemo: true,
  },
  {
    id: 'proj-regenerative-soil',
    name: 'Regenerative Soil & Farmer Livelihoods Pilot',
    location: {
      country: 'India',
      state: 'Gujarat',
      city: 'Anand',
      display: 'Anand, Gujarat, India',
    },
    focus: 'Soil health, reduced chemical dependency, and farmer livelihoods',
    description: 'A field project exploring soil-health practices, crop diversification, organic matter improvement, and farmer capacity building in the agricultural heartland of Anand.',
    area: 25,
    areaUnit: 'hectares',
    farmingModel: 'Diversified agriculture (dairy fodder, organic vegetables, legumes)',
    stage: 'Pilot',
    objectives: [
      'Improve soil microbial activity and organic carbon fraction',
      'Reduce synthetic fertilizer and pesticide expenditures for smallholders',
      'Establish a farmer-owned bio-input production center',
      'Improve net household income and nutritional diversity for participating farming families'
    ],
    practices: [
      'Multi-species crop rotation',
      'Compost and vermicompost application',
      'Reduced chemical input approach (bio-fertilizers & neem extract)',
      'Farmer participatory field schools',
      'Cover cropping during fallow seasons'
    ],
    status: 'completed',
    lastUpdated: '2026-09-12',
    createdAt: '2026-08-18',
    isDemo: true,
  }
];

export const DEMO_PROJECT_PARIS_ANSWERS: Record<string, AssessmentAnswer> = {
  W1: {
    questionId: 'W1',
    selectedOptionIds: ['w1-opt-1'],
    notes: 'Rainfed agronomy combined with continuous soil cover mulching minimizes irrigation withdrawals by 45% compared to regional baseline.',
    confidenceLevel: 'high'
  },
  W2: {
    questionId: 'W2',
    selectedOptionIds: ['w2-opt-2', 'w2-opt-4', 'w2-opt-5'],
    notes: 'On-farm rainwater retention basin captures 1,200 m3 of winter runoff; soil tensiometer telemetry prevents unnecessary supplemental watering.',
    confidenceLevel: 'high'
  },
  W3: {
    questionId: 'W3',
    selectedOptionIds: ['w3-opt-1'],
    notes: 'Operating in strict accordance with the Seine-Normandie Water Agency watershed guidelines with verified zero nitrate leaching.',
    confidenceLevel: 'high'
  },
  S1: {
    questionId: 'S1',
    selectedOptionIds: ['s1-opt-1', 's1-opt-2', 's1-opt-3', 's1-opt-4', 's1-opt-5'],
    notes: 'Multi-year trial monitored in partnership with INRAE. Soil organic carbon increased from 1.6% to 2.1% over 4 years under reduced tillage and legume green manures.',
    confidenceLevel: 'high'
  },
  S2: {
    questionId: 'S2',
    selectedOptionIds: ['s2-opt-1'],
    notes: 'Documented French agroecological management plan (Diagnostic Agroécologique) registered with local agricultural chamber.',
    confidenceLevel: 'high'
  },
  E1: {
    questionId: 'E1',
    selectedOptionIds: ['e1-opt-1', 'e1-opt-4'],
    notes: '120 kWp solar PV array on barn roofs powers all grain aeration, sorting, and on-farm milling; member of local farm biomethane cooperative.',
    confidenceLevel: 'high'
  },
  E2: {
    questionId: 'E2',
    selectedOptionIds: ['e2-opt-1'],
    notes: 'Accredited under the French Low Carbon Label (Label Bas-Carbone) with third-party verified carbon sequestration audits.',
    confidenceLevel: 'high'
  },
  B1: {
    questionId: 'B1',
    selectedOptionIds: ['b1-opt-1'],
    notes: '3.5 km of multi-tier native hedgerows (hazel, hornbeam, field maple) accredited under regional ecological corridor networks.',
    confidenceLevel: 'high'
  },
  B2: {
    questionId: 'B2',
    selectedOptionIds: ['b2-opt-1', 'b2-opt-2', 'b2-opt-4', 'b2-opt-5'],
    notes: '100% biological crop residues returned to soil; organic-certified inputs only; reusable bulk grain containers for Parisian bakeries.',
    confidenceLevel: 'high'
  },
  P1: {
    questionId: 'P1',
    selectedOptionIds: ['p1-opt-1', 'p1-opt-2', 'p1-opt-4', 'p1-opt-5', 'p1-opt-6'],
    notes: 'Active member of French GIEE agroecology network; certified Fair French Organic contracts guarantee living remunerative prices for farm operators; hosts field visits for Parisian agronomy students.',
    confidenceLevel: 'high'
  },
  P2: {
    questionId: 'P2',
    selectedOptionIds: ['p2-opt-1'],
    notes: 'Multi-year supply contracts with Paris municipal catering network and third-party organic certification dossiers (Ecocert).',
    confidenceLevel: 'high'
  }
};

export const DEMO_PROJECT_1_ANSWERS: Record<string, AssessmentAnswer> = {
  W1: {
    questionId: 'W1',
    selectedOptionIds: ['w1-opt-1'],
    notes: 'Volumetric flow meters recorded an estimated 38% reduction in water application per hectare compared to previous open furrow baseline.',
    confidenceLevel: 'high'
  },
  W2: {
    questionId: 'W2',
    selectedOptionIds: ['w2-opt-1', 'w2-opt-4', 'w2-opt-5'],
    notes: 'Installed drip lines across 42 hectares; 8 hectares under sprinkler. Routine soil probe readings taken twice weekly.',
    confidenceLevel: 'high'
  },
  W3: {
    questionId: 'W3',
    selectedOptionIds: ['w3-opt-3'],
    notes: 'Regional groundwater observation wells indicate regional water table drop of 0.8m over the last 3 dry seasons. Collective aquifer management is still informal.',
    confidenceLevel: 'medium'
  },
  S1: {
    questionId: 'S1',
    selectedOptionIds: ['s1-opt-1', 's1-opt-3', 's1-opt-5'],
    notes: 'Pigeon pea rotated with wheat. 4 tons/ha of farmyard manure blended with compost applied prior to sowing.',
    confidenceLevel: 'high'
  },
  S2: {
    questionId: 'S2',
    selectedOptionIds: ['s2-opt-1'],
    notes: 'Soil Health Card recommendations followed in partnership with the local Krishi Vigyan Kendra (KVK).',
    confidenceLevel: 'high'
  },
  E1: {
    questionId: 'E1',
    selectedOptionIds: ['e1-opt-1', 'e1-opt-3'],
    notes: 'Primary pumping runs on 12 solar PV pumps (5HP each). Diesel generator remains on site as emergency backup for high-load threshing.',
    confidenceLevel: 'high'
  },
  E2: {
    questionId: 'E2',
    selectedOptionIds: ['e2-opt-1'],
    notes: 'Written climate action target to phase out 85% of diesel consumption by end of 2026.',
    confidenceLevel: 'medium'
  },
  B1: {
    questionId: 'B1',
    selectedOptionIds: ['b1-opt-2'],
    notes: 'Field boundaries planted with native flowering shrubs and neem trees to serve as beneficial insect refuges.',
    confidenceLevel: 'medium'
  },
  B2: {
    questionId: 'B2',
    selectedOptionIds: ['b2-opt-1', 'b2-opt-2', 'b2-opt-4'],
    notes: 'All crop residue composted in pits; chemical containers triple-rinsed and returned to district collection depot.',
    confidenceLevel: 'high'
  },
  P1: {
    questionId: 'P1',
    selectedOptionIds: ['p1-opt-1', 'p1-opt-4', 'p1-opt-5'],
    notes: '45 smallholders and 20 agricultural laborers completed water management training and received protective equipment.',
    confidenceLevel: 'high'
  },
  P2: {
    questionId: 'P2',
    selectedOptionIds: ['p2-opt-1'],
    notes: 'Signed attendance logs, wage payment receipts, and baseline socio-economic survey available on file.',
    confidenceLevel: 'high'
  }
};

export const DEMO_PROJECT_2_ANSWERS: Record<string, AssessmentAnswer> = {
  W1: {
    questionId: 'W1',
    selectedOptionIds: ['w1-opt-2'],
    notes: 'Mulching and increased soil organic matter improved water retention, reducing irrigation frequency.',
    confidenceLevel: 'medium'
  },
  W2: {
    questionId: 'W2',
    selectedOptionIds: ['w2-opt-2', 'w2-opt-4'],
    notes: 'Constructed two 500m3 farm ponds for monsoon rainwater capture.',
    confidenceLevel: 'high'
  },
  W3: {
    questionId: 'W3',
    selectedOptionIds: ['w3-opt-1'],
    notes: 'Project operates predominantly on captured surface rainwater and seasonal recharge.',
    confidenceLevel: 'medium'
  },
  S1: {
    questionId: 'S1',
    selectedOptionIds: ['s1-opt-1', 's1-opt-2', 's1-opt-3', 's1-opt-4', 's1-opt-5'],
    notes: 'Comprehensive regenerative package: cover cropping, vermicomposting, zero-till seed drills.',
    confidenceLevel: 'high'
  },
  S2: {
    questionId: 'S2',
    selectedOptionIds: ['s2-opt-1'],
    notes: 'Written soil regeneration protocol with baseline soil organic carbon measured at 0.42%.',
    confidenceLevel: 'high'
  },
  E1: {
    questionId: 'E1',
    selectedOptionIds: ['e1-opt-1', 'e1-opt-4'],
    notes: 'Solar array plus a 15m3 family biogas digester utilizing cattle manure.',
    confidenceLevel: 'high'
  },
  E2: {
    questionId: 'E2',
    selectedOptionIds: ['e2-opt-1'],
    notes: 'Formal soil carbon sequestration monitoring pilot underway with state agricultural university.',
    confidenceLevel: 'medium'
  },
  B1: {
    questionId: 'B1',
    selectedOptionIds: ['b1-opt-1'],
    notes: 'Designated 2 hectares as an agroforestry and pollinator sanctuary zone with native flora.',
    confidenceLevel: 'high'
  },
  B2: {
    questionId: 'B2',
    selectedOptionIds: ['b2-opt-1', 'b2-opt-3', 'b2-opt-5'],
    notes: '100% biological waste converted to organic inputs or bio-slurry.',
    confidenceLevel: 'high'
  },
  P1: {
    questionId: 'P1',
    selectedOptionIds: ['p1-opt-1', 'p1-opt-3', 'p1-opt-5', 'p1-opt-6'],
    notes: 'Women-led bio-input preparation unit generates direct auxiliary income for 18 households.',
    confidenceLevel: 'high'
  },
  P2: {
    questionId: 'P2',
    selectedOptionIds: ['p2-opt-1'],
    notes: 'Cooperative bank account transactions and monthly income register verify distributed benefits.',
    confidenceLevel: 'high'
  }
};
