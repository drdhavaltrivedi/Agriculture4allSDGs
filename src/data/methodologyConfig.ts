import { Theme, Question } from '../types';

export const DEMO_THEMES: Theme[] = [
  {
    id: 'water-management',
    number: 1,
    name: 'Water Management',
    description: 'Irrigation efficiency, freshwater withdrawal stewardship, water recycling, and aquifer preservation.',
    icon: 'Droplets',
    questionIds: ['W1', 'W2', 'W3'],
  },
  {
    id: 'soil-health',
    number: 2,
    name: 'Soil Health & Land Stewardship',
    description: 'Soil organic carbon, erosion reduction, regenerative farming practices, and land degradation neutrality.',
    icon: 'Layers',
    questionIds: ['S1', 'S2'],
  },
  {
    id: 'energy-climate',
    number: 3,
    name: 'Energy & Climate',
    description: 'Clean energy adoption, farm machinery fuel transition, emissions reduction, and climate resilience.',
    icon: 'Sun',
    questionIds: ['E1', 'E2'],
  },
  {
    id: 'biodiversity-resource',
    number: 4,
    name: 'Biodiversity & Resource Use',
    description: 'Habitat preservation, circular agricultural byproduct reuse, safe chemical management, and biodiversity buffers.',
    icon: 'Sprout',
    questionIds: ['B1', 'B2'],
  },
  {
    id: 'people-livelihoods',
    number: 5,
    name: 'People & Farmer Livelihoods',
    description: 'Agricultural worker health, smallholder capacity building, fair livelihoods, and community partnerships.',
    icon: 'Users',
    questionIds: ['P1', 'P2'],
  },
];

export const DEMO_QUESTIONS: Question[] = [
  // --- THEME 1: WATER MANAGEMENT ---
  {
    id: 'W1',
    code: 'W1',
    themeId: 'water-management',
    title: 'Compared with the previous practice, how does this project approach water use?',
    description: 'Understanding water-use changes helps identify potential resource-efficiency and aquifer depletion impacts.',
    type: 'single',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'w1-opt-1',
        label: 'Significantly reduces water use',
        description: 'Demonstrable major volume reduction through high-efficiency techniques or structural redesign.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 3,
            impactArea: 'Water-Use Efficiency',
            explanation: 'The practice creates a strong positive signal for water-use efficiency and sustainable freshwater withdrawal.'
          },
          {
            sdgNumber: 12,
            targetCode: '12.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Sustainable Natural Resource Management',
            explanation: 'Substantial water reduction promotes circular and sustainable consumption of vital natural resources.'
          }
        ]
      },
      {
        id: 'w1-opt-2',
        label: 'May reduce water use',
        description: 'Moderate or incremental water conservation expected but with minor variation across seasons.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 1,
            impactArea: 'Water-Use Efficiency',
            explanation: 'Indicative positive trend toward water-use efficiency, subject to empirical validation.'
          }
        ]
      },
      {
        id: 'w1-opt-3',
        label: 'No meaningful change',
        description: 'Water consumption remains aligned with standard regional baseline practices.',
        effects: []
      },
      {
        id: 'w1-opt-4',
        label: 'May increase water use',
        description: 'Project introduces higher water-demand crops or intensified irrigation cycles.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'negative',
            score: -2,
            impactArea: 'Freshwater Resource Pressure',
            explanation: 'Potential trade-off: increased agricultural water withdrawal risks intensifying local basin stress.',
            attentionRequired: true,
            suggestedAction: 'Evaluate local water table trends and consider offsetting through rainwater catchment or deficit irrigation.'
          }
        ]
      },
      {
        id: 'w1-opt-5',
        label: 'Not applicable',
        description: 'Strictly rainfed farming with zero artificial or supplemented water extraction.',
        isNotApplicable: true,
        effects: []
      }
    ]
  },
  {
    id: 'W2',
    code: 'W2',
    themeId: 'water-management',
    title: 'Which water-management practices are part of the project?',
    description: 'Select all technical and management interventions actively implemented or budgeted for the project.',
    type: 'multiple',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'w2-opt-1',
        label: 'Drip or precision irrigation',
        description: 'Micro-irrigation delivering measured moisture directly to root zones.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 3,
            impactArea: 'Precision Irrigation & Evaporation Control',
            explanation: 'Direct root-zone delivery minimizes percolation and evaporation losses, elevating Target 6.4 performance.'
          }
        ]
      },
      {
        id: 'w2-opt-2',
        label: 'Rainwater harvesting',
        description: 'On-farm ponds, check dams, or rooftop catchment capturing runoff.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Freshwater Recharge & Harvesting',
            explanation: 'Rainwater storage relieves pressure on subterranean aquifers during peak dry-season periods.'
          }
        ]
      },
      {
        id: 'w2-opt-3',
        label: 'Water reuse or greywater recycling',
        description: 'Treated operational runoff or post-processing water channeled back into field systems.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Water Circularity',
            explanation: 'Reusing treated farm effluent lowers raw water demands and supports closed-loop water stewardship.'
          },
          {
            sdgNumber: 12,
            targetCode: '12.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Resource Circularity',
            explanation: 'Circular effluent recovery reduces virgin freshwater inputs.'
          }
        ]
      },
      {
        id: 'w2-opt-4',
        label: 'Irrigation scheduling',
        description: 'Timetables calibrated to weather forecasts and evapotranspiration data.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Operational Efficiency',
            explanation: 'Data-guided scheduling prevents over-watering during humid or overcast periods.'
          }
        ]
      },
      {
        id: 'w2-opt-5',
        label: 'Soil-moisture monitoring',
        description: 'Tensiometers, sensors, or manual probes checking soil moisture prior to irrigation.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Moisture Data Stewardship',
            explanation: 'Direct feedback loops prevent saturation and leaching of soil nutrients.'
          }
        ]
      },
      {
        id: 'w2-opt-6',
        label: 'None of these',
        description: 'Traditional flooding or furrow irrigation with unmonitored timing.',
        effects: []
      },
      {
        id: 'w2-opt-7',
        label: 'Other',
        description: 'Other bespoke water stewardship practice.',
        effects: []
      }
    ]
  },
  {
    id: 'W3',
    code: 'W3',
    themeId: 'water-management',
    title: 'Is there a risk that the project could increase pressure on shared water resources?',
    description: 'Considers shared catchment areas, regional aquifers, seasonal water rationing, and downstream community access.',
    type: 'single',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'w3-opt-1',
        label: 'No known risk',
        description: 'Surplus regional water availability or autonomous closed-loop catchment.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'positive',
            score: 1,
            impactArea: 'Catchment Neutrality',
            explanation: 'No upstream or downstream community water security tensions identified.'
          }
        ]
      },
      {
        id: 'w3-opt-2',
        label: 'Low risk',
        description: 'Minor seasonal sensitivity that is actively managed with neighbors.',
        effects: []
      },
      {
        id: 'w3-opt-3',
        label: 'Moderate risk',
        description: 'Shared aquifer shows declining water table in dry months; monitoring is imperfect.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'negative',
            score: -2,
            impactArea: 'Aquifer Pressure / Watershed Conflict',
            explanation: 'Trade-off: Agricultural extraction may compete with municipal or downstream agricultural users.',
            attentionRequired: true,
            suggestedAction: 'Participate in basin-level water user associations and agree on seasonal extraction caps.'
          }
        ]
      },
      {
        id: 'w3-opt-4',
        label: 'High risk',
        description: 'Operating in a critically over-exploited watershed with documented community conflicts.',
        effects: [
          {
            sdgNumber: 6,
            targetCode: '6.4',
            direction: 'negative',
            score: -3,
            impactArea: 'Severe Watershed Stress',
            explanation: 'Critical trade-off: High risk of exacerbating groundwater overdraft and water insecurity.',
            attentionRequired: true,
            suggestedAction: 'Require independent hydrogeological audit and shift to ultra-low water-demand crop profiles.'
          }
        ]
      },
      {
        id: 'w3-opt-5',
        label: 'Not enough information',
        description: 'Regional aquifer data or basin hydrological surveys are not yet available to the project.',
        isNotEnoughInfo: true,
        effects: []
      }
    ]
  },

  // --- THEME 2: SOIL HEALTH & LAND STEWARDSHIP ---
  {
    id: 'S1',
    code: 'S1',
    themeId: 'soil-health',
    title: 'Which soil-health practices are used or planned?',
    description: 'Soil management practices directly influence organic carbon, microbiological vitality, and resilience to drought.',
    type: 'multiple',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 's1-opt-1',
        label: 'Crop rotation',
        description: 'Alternating crop families to break pest cycles and balance nutrient depletion.',
        effects: [
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Resilient Farming Practices',
            explanation: 'Crop rotation bolsters soil microbial diversity, natural fertility, and long-term yield stability.'
          },
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 2,
            impactArea: 'Land Degradation Neutrality',
            explanation: 'Breaks monoculture degradation cycles and enhances soil structure.'
          }
        ]
      },
      {
        id: 's1-opt-2',
        label: 'Cover crops',
        description: 'Growing secondary vegetative cover to protect against wind and water erosion.',
        effects: [
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Erosion Prevention & Soil Carbon',
            explanation: 'Living roots in soil off-season build topsoil organic carbon and retain moisture.'
          },
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 2,
            impactArea: 'Land Restoration',
            explanation: 'Mitigates topsoil loss from erosion during post-harvest fallow windows.'
          }
        ]
      },
      {
        id: 's1-opt-3',
        label: 'Compost / organic matter application',
        description: 'Recycling biomass, vermicompost, or well-rotted manure back into the soil.',
        effects: [
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Organic Soil Enrichment',
            explanation: 'Restores biological fertility and reduces dependency on synthetic chemical inputs.'
          },
          {
            sdgNumber: 12,
            targetCode: '12.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Circular Biomass Utilization',
            explanation: 'Converts agricultural residues into high-value soil conditioner.'
          }
        ]
      },
      {
        id: 's1-opt-4',
        label: 'Reduced tillage or no-till',
        description: 'Minimizing mechanical soil inversion to preserve mycorrhizal networks and pore channels.',
        effects: [
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Soil Structure Preservation',
            explanation: 'Maintains fungal networks and prevents tractor compaction and surface crusting.'
          },
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 2,
            impactArea: 'Erosion & Carbon Loss Mitigation',
            explanation: 'Reduces oxidation of soil organic matter and runoff erosion.'
          }
        ]
      },
      {
        id: 's1-opt-5',
        label: 'Soil testing',
        description: 'Regular laboratory or sensor analysis of macronutrients, pH, and electrical conductivity.',
        effects: [
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 1,
            impactArea: 'Targeted Nutrient Stewardship',
            explanation: 'Prevents over-fertilization and guides precision micro-dosing.'
          }
        ]
      },
      {
        id: 's1-opt-6',
        label: 'None of these',
        description: 'Standard intensive chemical-dependent cultivation without soil-restoring methods.',
        effects: []
      },
      {
        id: 's1-opt-7',
        label: 'Other',
        description: 'Alternative regenerative soil methodology.',
        effects: []
      }
    ]
  },
  {
    id: 'S2',
    code: 'S2',
    themeId: 'soil-health',
    title: 'How does the project address soil degradation risks?',
    description: 'Examines formalized stewardship frameworks, erosion barriers, and salinity management plans.',
    type: 'single',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 's2-opt-1',
        label: 'A documented soil-management plan exists',
        description: 'Formal agronomic protocol with baseline metrics, periodic tests, and remedial actions.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 3,
            impactArea: 'Formal Land Stewardship',
            explanation: 'A written plan provides verification governance for achieving land degradation neutrality.'
          },
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Agronomic Resilience',
            explanation: 'Structured management builds systemic farm resilience against extreme weather.'
          }
        ]
      },
      {
        id: 's2-opt-2',
        label: 'Some practices are in place',
        description: 'Informal or ad-hoc soil stewardship measures applied without formal documentation.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 1,
            impactArea: 'Informal Soil Conservation',
            explanation: 'Emerging positive signal, though formalization is recommended for auditability.'
          },
          {
            sdgNumber: 2,
            targetCode: '2.4',
            direction: 'positive',
            score: 1,
            impactArea: 'Adaptive Farm Practices',
            explanation: 'Partial contribution to sustainable food production systems.'
          }
        ]
      },
      {
        id: 's2-opt-3',
        label: 'No specific plan yet',
        description: 'Cultivation proceeds without systematic monitoring of erosion, salinity, or acidification.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'negative',
            score: -1,
            impactArea: 'Unmanaged Soil Degradation Risk',
            explanation: 'Absence of soil protection protocols risks chronic topsoil loss and fertility decline.',
            attentionRequired: true,
            suggestedAction: 'Formulate an initial soil conservation protocol focusing on organic matter replenishment.'
          }
        ]
      },
      {
        id: 's2-opt-4',
        label: 'Soil degradation is not relevant to this project',
        description: 'Project utilizes controlled indoor vertical setups, sterile hydroponics, or non-soil media.',
        isNotApplicable: true,
        effects: []
      },
      {
        id: 's2-opt-5',
        label: 'Not enough information',
        description: 'Field soil history and degradation susceptibility have not been determined.',
        isNotEnoughInfo: true,
        effects: []
      }
    ]
  },

  // --- THEME 3: ENERGY & CLIMATE ---
  {
    id: 'E1',
    code: 'E1',
    themeId: 'energy-climate',
    title: 'Which energy sources are used for agricultural operations?',
    description: 'Considers power used for irrigation pumps, cold storage, tractive power, and processing facilities.',
    type: 'multiple',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'e1-opt-1',
        label: 'Solar energy',
        description: 'Photovoltaic water pumps, solar rooftop arrays, or solar crop dryers.',
        effects: [
          {
            sdgNumber: 7,
            targetCode: '7.2',
            direction: 'positive',
            score: 3,
            impactArea: 'Renewable Agricultural Energy',
            explanation: 'Decarbonizes operational power and expands decentralized clean energy in rural zones.'
          },
          {
            sdgNumber: 13,
            targetCode: '13.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Operational Carbon Abatement',
            explanation: 'Displaces fossil diesel combustion emissions from irrigation and machinery.'
          }
        ]
      },
      {
        id: 'e1-opt-2',
        label: 'Grid electricity',
        description: 'Standard grid connection without dedicated on-site renewable generation.',
        effects: []
      },
      {
        id: 'e1-opt-3',
        label: 'Diesel / fossil fuels',
        description: 'Diesel generator pump sets, petrol sprayers, or conventional diesel tractors.',
        effects: [
          {
            sdgNumber: 13,
            targetCode: '13.2',
            direction: 'negative',
            score: -2,
            impactArea: 'Fossil Fuel Dependency',
            explanation: 'Trade-off: Ongoing combustion of diesel produces greenhouse gas emissions and particulate pollution.',
            attentionRequired: true,
            suggestedAction: 'Explore solar pump transition schemes or hybrid micro-inverter conversions.'
          }
        ]
      },
      {
        id: 'e1-opt-4',
        label: 'Other renewable energy',
        description: 'Biogas biodigesters, agricultural biomass gasifiers, or wind pumps.',
        effects: [
          {
            sdgNumber: 7,
            targetCode: '7.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Bioenergy & Clean Energy Mix',
            explanation: 'Captures methane or agricultural waste streams for clean thermal or electrical power.'
          }
        ]
      },
      {
        id: 'e1-opt-5',
        label: 'Other',
        description: 'Other energy source.',
        effects: []
      },
      {
        id: 'e1-opt-6',
        label: 'Not applicable',
        description: 'Zero mechanical or powered operations.',
        isNotApplicable: true,
        effects: []
      }
    ]
  },
  {
    id: 'E2',
    code: 'E2',
    themeId: 'energy-climate',
    title: 'Does the project include actions intended to reduce greenhouse-gas emissions or improve climate resilience?',
    description: 'Covers mitigation (methane control, nitrogen optimization) and adaptation (heat/drought-tolerant varieties).',
    type: 'single',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'e2-opt-1',
        label: 'Yes, with a documented plan',
        description: 'Explicit climate mitigation or adaptation strategies integrated into operational management.',
        effects: [
          {
            sdgNumber: 13,
            targetCode: '13.2',
            direction: 'positive',
            score: 3,
            impactArea: 'Strategic Climate Action',
            explanation: 'Formally aligns agricultural routines with climate adaptation strategies and emissions mitigation.'
          }
        ]
      },
      {
        id: 'e2-opt-2',
        label: 'Yes, informal or early-stage actions',
        description: 'Practicing seasonal adaptation or fuel saving without formalized carbon metrics.',
        effects: [
          {
            sdgNumber: 13,
            targetCode: '13.2',
            direction: 'positive',
            score: 1,
            impactArea: 'Early-Stage Climate Adaptation',
            explanation: 'Emerging resilience steps, recommended for quantitative milestone tracking.'
          }
        ]
      },
      {
        id: 'e2-opt-3',
        label: 'No',
        description: 'Climate risk assessments and emissions considerations are not factored into farm plans.',
        effects: [
          {
            sdgNumber: 13,
            targetCode: '13.2',
            direction: 'negative',
            score: -1,
            impactArea: 'Climate Vulnerability Gap',
            explanation: 'Farm remains vulnerable to climate shocks and extreme weather events.',
            attentionRequired: true,
            suggestedAction: 'Conduct a basic climate vulnerability screening for extreme heat, drought, and flood risks.'
          }
        ]
      },
      {
        id: 'e2-opt-4',
        label: 'Not enough information',
        description: 'Emissions profile and regional climate scenario projections are unknown.',
        isNotEnoughInfo: true,
        effects: []
      }
    ]
  },

  // --- THEME 4: BIODIVERSITY & RESOURCE USE ---
  {
    id: 'B1',
    code: 'B1',
    themeId: 'biodiversity-resource',
    title: 'How does the project consider biodiversity and surrounding ecosystems?',
    description: 'Addresses hedgerows, pollinator strips, wildlife corridors, pesticide buffer zones, and native species protection.',
    type: 'single',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'b1-opt-1',
        label: 'Biodiversity protection is part of the project plan',
        description: 'Dedicated zones for native vegetation, pollinator forage, or ecological hedgerows.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.1',
            direction: 'positive',
            score: 3,
            impactArea: 'Ecosystem Conservation & Habitat Corridors',
            explanation: 'Active protection of native flora and fauna supports terrestrial ecological integrity.'
          },
          {
            sdgNumber: 15,
            targetCode: '15.3',
            direction: 'positive',
            score: 2,
            impactArea: 'Landscape Ecological Balance',
            explanation: 'Vegetated buffers stabilize microclimates and protect neighboring soils.'
          }
        ]
      },
      {
        id: 'b1-opt-2',
        label: 'Some protective practices are used',
        description: 'Selective preservation of perimeter trees or informal avoidance of sensitive natural spots.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.1',
            direction: 'positive',
            score: 1,
            impactArea: 'Incidental Biodiversity Support',
            explanation: 'Provides baseline support for local pollinators and wild flora.'
          }
        ]
      },
      {
        id: 'b1-opt-3',
        label: 'No specific measures yet',
        description: 'Cultivation focuses purely on production acreage with no designated ecological areas.',
        effects: []
      },
      {
        id: 'b1-opt-4',
        label: 'Potential ecosystem risks have been identified',
        description: 'Proximity to wetlands, protected forests, or risk of agricultural pesticide runoff.',
        effects: [
          {
            sdgNumber: 15,
            targetCode: '15.1',
            direction: 'negative',
            score: -2,
            impactArea: 'Ecosystem & Habitat Disturbance Risk',
            explanation: 'Critical attention: Potential edge-effect encroachment or runoff into sensitive biomes.',
            attentionRequired: true,
            suggestedAction: 'Establish a minimum 10-meter riparian/ecological buffer and adopt strict drift-reducing nozzles.'
          }
        ]
      },
      {
        id: 'b1-opt-5',
        label: 'Not enough information',
        description: 'Local biodiversity surveys or species presence data have not been gathered.',
        isNotEnoughInfo: true,
        effects: []
      }
    ]
  },
  {
    id: 'B2',
    code: 'B2',
    themeId: 'biodiversity-resource',
    title: 'Which resource-efficiency or waste practices are used?',
    description: 'Focuses on chemical input minimization, circular byproduct utilization, and safe packaging disposal.',
    type: 'multiple',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'b2-opt-1',
        label: 'Organic waste composting',
        description: 'Converting crop stover, harvest residues, or orchard prunings into humus.',
        effects: [
          {
            sdgNumber: 12,
            targetCode: '12.5',
            direction: 'positive',
            score: 2,
            impactArea: 'Waste Prevention & Organic Composting',
            explanation: 'Diverts agricultural waste from burning or landfills, fostering biological circularity.'
          }
        ]
      },
      {
        id: 'b2-opt-2',
        label: 'Input optimization',
        description: 'Precision variable-rate application of fertilizer and targeted spot-spraying.',
        effects: [
          {
            sdgNumber: 12,
            targetCode: '12.2',
            direction: 'positive',
            score: 2,
            impactArea: 'Resource Optimization',
            explanation: 'Calibrated dosing reduces chemical waste and saves natural resources.'
          }
        ]
      },
      {
        id: 'b2-opt-3',
        label: 'Packaging / material reduction',
        description: 'Bulk delivery, reusable crates, or recyclable mulch films.',
        effects: [
          {
            sdgNumber: 12,
            targetCode: '12.5',
            direction: 'positive',
            score: 1,
            impactArea: 'Packaging Waste Reduction',
            explanation: 'Reduces plastic and single-use packaging throughout the agricultural supply chain.'
          }
        ]
      },
      {
        id: 'b2-opt-4',
        label: 'Safe disposal of agricultural waste',
        description: 'Triple-rinsing chemical containers and utilizing accredited hazardous waste collection.',
        effects: [
          {
            sdgNumber: 12,
            targetCode: '12.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Safe Chemical & Hazardous Waste Management',
            explanation: 'Prevents toxic chemical leaching into waterways and rural soils.'
          }
        ]
      },
      {
        id: 'b2-opt-5',
        label: 'Reuse of resources',
        description: 'Reconditioning drip tapes, grain sacks, or nursery seedling trays.',
        effects: [
          {
            sdgNumber: 12,
            targetCode: '12.5',
            direction: 'positive',
            score: 2,
            impactArea: 'Circular Reuse Loops',
            explanation: 'Extends material lifecycles and decreases upstream embodied resource footprints.'
          }
        ]
      },
      {
        id: 'b2-opt-6',
        label: 'None of these',
        description: 'Standard disposal, including open burning of crop residue or unmanaged plastic waste.',
        effects: []
      },
      {
        id: 'b2-opt-7',
        label: 'Other',
        description: 'Other resource recovery method.',
        effects: []
      }
    ]
  },

  // --- THEME 5: PEOPLE & FARMER LIVELIHOODS ---
  {
    id: 'P1',
    code: 'P1',
    themeId: 'people-livelihoods',
    title: 'How does the project support the people working in or affected by the agricultural initiative?',
    description: 'Examines human rights, occupational health, fair wage benchmarks, technical skills training, and community cohesion.',
    type: 'multiple',
    required: true,
    confidenceApplicable: true,
    options: [
      {
        id: 'p1-opt-1',
        label: 'Farmer training',
        description: 'Workshops on agronomic techniques, precision water management, and business literacy.',
        effects: [
          {
            sdgNumber: 4,
            targetCode: '4.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Agricultural Vocational Skills',
            explanation: 'Practical capacity building equips farmers with valuable agronomic and technical abilities.'
          },
          {
            sdgNumber: 8,
            targetCode: '8.3',
            direction: 'positive',
            score: 2,
            impactArea: 'Micro-Enterprise Support & Productivity',
            explanation: 'Training supports farm entrepreneurship and smallholder business productivity.'
          }
        ]
      },
      {
        id: 'p1-opt-2',
        label: 'Skills development',
        description: 'Specialized certifications (e.g. drone operation, soil chemistry, accounting).',
        effects: [
          {
            sdgNumber: 4,
            targetCode: '4.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Advanced Technical Skill Acquisition',
            explanation: 'Fosters high-value rural technical competencies.'
          },
          {
            sdgNumber: 8,
            targetCode: '8.3',
            direction: 'positive',
            score: 1,
            impactArea: 'Labor Quality & Employment Value',
            explanation: 'Upskilling prepares workers for modernized agri-food roles.'
          }
        ]
      },
      {
        id: 'p1-opt-3',
        label: 'Improved access to resources',
        description: 'Facilitating collective buying, credit access, seed banks, or land tenure security.',
        effects: [
          {
            sdgNumber: 1,
            targetCode: '1.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Equal Access to Productive Assets',
            explanation: 'Secures smallholder access to critical agricultural inputs, credit, and knowledge.'
          }
        ]
      },
      {
        id: 'p1-opt-4',
        label: 'Worker health and safety measures',
        description: 'Provision of PPE for pesticide handling, clean drinking water, shade stations, and first aid.',
        effects: [
          {
            sdgNumber: 3,
            targetCode: '3.9',
            direction: 'positive',
            score: 2,
            impactArea: 'Worker Chemical Safety & Health',
            explanation: 'Protective equipment and safe handling minimize acute and chronic chemical intoxication.'
          },
          {
            sdgNumber: 8,
            targetCode: '8.8',
            direction: 'positive',
            score: 2,
            impactArea: 'Safe Agricultural Working Environments',
            explanation: 'Directly reinforces labour rights and hygienic, hazard-managed rural worksites.'
          }
        ]
      },
      {
        id: 'p1-opt-5',
        label: 'Fair or improved livelihood opportunities',
        description: 'Living wage compliance, fair trade premiums, or direct contract-farming off-take agreements.',
        effects: [
          {
            sdgNumber: 8,
            targetCode: '8.5',
            direction: 'positive',
            score: 3,
            impactArea: 'Decent Work & Equitable Remuneration',
            explanation: 'Ensures equitable wages, stable incomes, and dignified rural employment.'
          },
          {
            sdgNumber: 1,
            targetCode: '1.4',
            direction: 'positive',
            score: 2,
            impactArea: 'Rural Poverty Reduction',
            explanation: 'Stable agricultural income prevents vulnerability to cyclical poverty.'
          }
        ]
      },
      {
        id: 'p1-opt-6',
        label: 'Community engagement',
        description: 'Participatory consultations with village councils, women cooperatives, and indigenous groups.',
        effects: [
          {
            sdgNumber: 16,
            targetCode: '16.7',
            direction: 'positive',
            score: 1,
            impactArea: 'Participatory Rural Governance',
            explanation: 'Engaging community stakeholders fosters inclusive decision-making.'
          },
          {
            sdgNumber: 17,
            targetCode: '17.17',
            direction: 'positive',
            score: 1,
            impactArea: 'Multi-Stakeholder Partnerships',
            explanation: 'Builds cross-sector collaboration between farmers, civil society, and local bodies.'
          }
        ]
      },
      {
        id: 'p1-opt-7',
        label: 'None of these',
        description: 'No specific social, labour, or community measures are maintained.',
        effects: []
      },
      {
        id: 'p1-opt-8',
        label: 'Other',
        description: 'Other social or human welfare program.',
        effects: []
      }
    ]
  },
  {
    id: 'P2',
    code: 'P2',
    themeId: 'people-livelihoods',
    title: 'How confident are you that the project benefits are reaching the intended people?',
    description: 'Assesses the quality of monitoring, participant registers, disaggregated feedback, and ground-truth verification.',
    type: 'single',
    required: true,
    confidenceApplicable: false,
    options: [
      {
        id: 'p2-opt-1',
        label: 'High confidence, supported by evidence',
        description: 'Documented beneficiary registries, wage slips, attendance rosters, or third-party audits.',
        effects: []
      },
      {
        id: 'p2-opt-2',
        label: 'Moderate confidence',
        description: 'Regular field observations and informal feedback, but without formal audit trails.',
        effects: []
      },
      {
        id: 'p2-opt-3',
        label: 'Early-stage / limited evidence',
        description: 'Initiative is newly deployed; initial beneficiary response is encouraging but preliminary.',
        effects: []
      },
      {
        id: 'p2-opt-4',
        label: 'Low confidence',
        description: 'Intermediary supply chains make tracing actual smallholder and worker impact difficult.',
        effects: []
      },
      {
        id: 'p2-opt-5',
        label: 'Not enough information',
        description: 'Beneficiary reach assessment has not been conducted.',
        isNotEnoughInfo: true,
        effects: []
      }
    ]
  }
];

export function getThemeById(themeId: string): Theme | undefined {
  return DEMO_THEMES.find(t => t.id === themeId);
}

export function getQuestionsByTheme(themeId: string): Question[] {
  return DEMO_QUESTIONS.filter(q => q.themeId === themeId);
}

export function getQuestionByCode(code: string): Question | undefined {
  return DEMO_QUESTIONS.find(q => q.code === code);
}
