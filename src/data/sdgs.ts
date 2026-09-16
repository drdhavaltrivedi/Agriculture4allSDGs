import { SDGMetadata, SDGTarget } from '../types';

export const UN_SDGS: SDGMetadata[] = [
  {
    number: 1,
    id: 'sdg-1',
    code: 'SDG 1',
    title: 'No Poverty',
    shortTitle: 'No Poverty',
    color: '#E5243B',
    description: 'End poverty in all its forms everywhere by ensuring equitable access to productive resources.',
    targets: [
      {
        id: '1.4',
        code: '1.4',
        sdgNumber: 1,
        title: 'Equal Rights to Economic Resources',
        description: 'Ensure equal rights to economic resources, access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, and financial services.'
      }
    ]
  },
  {
    number: 2,
    id: 'sdg-2',
    code: 'SDG 2',
    title: 'Zero Hunger',
    shortTitle: 'Zero Hunger',
    color: '#DDA63A',
    description: 'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.',
    targets: [
      {
        id: '2.4',
        code: '2.4',
        sdgNumber: 2,
        title: 'Sustainable Food Production & Resilient Agriculture',
        description: 'Ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, help maintain ecosystems, strengthen capacity for adaptation to climate change, and progressively improve land and soil quality.'
      }
    ]
  },
  {
    number: 3,
    id: 'sdg-3',
    code: 'SDG 3',
    title: 'Good Health and Well-being',
    shortTitle: 'Good Health',
    color: '#4C9F38',
    description: 'Ensure healthy lives and promote well-being for all at all ages through safer agricultural working environments.',
    targets: [
      {
        id: '3.9',
        code: '3.9',
        sdgNumber: 3,
        title: 'Reduce Illnesses from Hazardous Chemicals & Pollution',
        description: 'Substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water, and soil pollution and contamination.'
      }
    ]
  },
  {
    number: 4,
    id: 'sdg-4',
    code: 'SDG 4',
    title: 'Quality Education',
    shortTitle: 'Quality Education',
    color: '#C5192D',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
    targets: [
      {
        id: '4.4',
        code: '4.4',
        sdgNumber: 4,
        title: 'Relevant Skills for Decent Work & Farming Capacity',
        description: 'Substantially increase the number of youth and adults who have relevant technical and vocational skills for employment, decent jobs, and entrepreneurship.'
      }
    ]
  },
  {
    number: 5,
    id: 'sdg-5',
    code: 'SDG 5',
    title: 'Gender Equality',
    shortTitle: 'Gender Equality',
    color: '#FF3A21',
    description: 'Achieve gender equality and empower all women and girls in agricultural communities and value chains.',
    targets: [
      {
        id: '5.a',
        code: '5.a',
        sdgNumber: 5,
        title: 'Equal Rights to Economic Resources & Land',
        description: 'Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property.'
      }
    ]
  },
  {
    number: 6,
    id: 'sdg-6',
    code: 'SDG 6',
    title: 'Clean Water and Sanitation',
    shortTitle: 'Clean Water',
    color: '#26BDE2',
    description: 'Ensure availability and sustainable management of water and sanitation for all.',
    targets: [
      {
        id: '6.4',
        code: '6.4',
        sdgNumber: 6,
        title: 'Water-Use Efficiency & Sustainable Withdrawals',
        description: 'Substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity.'
      }
    ]
  },
  {
    number: 7,
    id: 'sdg-7',
    code: 'SDG 7',
    title: 'Affordable and Clean Energy',
    shortTitle: 'Clean Energy',
    color: '#FCC30B',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy for agricultural operations.',
    targets: [
      {
        id: '7.2',
        code: '7.2',
        sdgNumber: 7,
        title: 'Increase Share of Renewable Energy',
        description: 'Increase substantially the share of renewable energy in the global energy mix, including rural and agricultural microgrids and solar pumping.'
      }
    ]
  },
  {
    number: 8,
    id: 'sdg-8',
    code: 'SDG 8',
    title: 'Decent Work and Economic Growth',
    shortTitle: 'Decent Work',
    color: '#A21942',
    description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.',
    targets: [
      {
        id: '8.3',
        code: '8.3',
        sdgNumber: 8,
        title: 'Support Productive Activities & Microenterprises',
        description: 'Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, and innovation.'
      },
      {
        id: '8.5',
        code: '8.5',
        sdgNumber: 8,
        title: 'Full Employment & Decent Work with Equal Pay',
        description: 'Achieve full and productive employment and decent work for all women and men, and equal pay for work of equal value.'
      },
      {
        id: '8.8',
        code: '8.8',
        sdgNumber: 8,
        title: 'Protect Labour Rights & Safe Working Environments',
        description: 'Protect labour rights and promote safe and secure working environments for all workers, including migrant workers and agricultural labourers.'
      }
    ]
  },
  {
    number: 9,
    id: 'sdg-9',
    code: 'SDG 9',
    title: 'Industry, Innovation and Infrastructure',
    shortTitle: 'Innovation',
    color: '#FD6925',
    description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation in agriculture.',
    targets: [
      {
        id: '9.4',
        code: '9.4',
        sdgNumber: 9,
        title: 'Upgrade Infrastructure with Greater Resource-Use Efficiency',
        description: 'Upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean technologies.'
      }
    ]
  },
  {
    number: 10,
    id: 'sdg-10',
    code: 'SDG 10',
    title: 'Reduced Inequalities',
    shortTitle: 'Reduced Inequalities',
    color: '#DD1367',
    description: 'Reduce inequality within and among rural communities and marginalized smallholders.',
    targets: [
      {
        id: '10.2',
        code: '10.2',
        sdgNumber: 10,
        title: 'Empower & Promote Social, Economic and Political Inclusion',
        description: 'Empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, or economic status.'
      }
    ]
  },
  {
    number: 11,
    id: 'sdg-11',
    code: 'SDG 11',
    title: 'Sustainable Cities and Communities',
    shortTitle: 'Sustainable Communities',
    color: '#FD9D24',
    description: 'Make cities and human settlements inclusive, safe, resilient, and support positive rural-urban economic linkages.',
    targets: [
      {
        id: '11.a',
        code: '11.a',
        sdgNumber: 11,
        title: 'Strengthen National & Regional Development Planning',
        description: 'Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening development planning.'
      }
    ]
  },
  {
    number: 12,
    id: 'sdg-12',
    code: 'SDG 12',
    title: 'Responsible Consumption and Production',
    shortTitle: 'Responsible Consumption',
    color: '#BF8B2E',
    description: 'Ensure sustainable consumption and production patterns through resource efficiency and circular waste cycles.',
    targets: [
      {
        id: '12.2',
        code: '12.2',
        sdgNumber: 12,
        title: 'Sustainable Management & Efficient Use of Natural Resources',
        description: 'Achieve the sustainable management and efficient use of natural resources in agricultural supply chains.'
      },
      {
        id: '12.4',
        code: '12.4',
        sdgNumber: 12,
        title: 'Environmentally Sound Management of Chemicals & Wastes',
        description: 'Achieve the environmentally sound management of chemicals and all wastes throughout their life cycle to minimize adverse impacts.'
      },
      {
        id: '12.5',
        code: '12.5',
        sdgNumber: 12,
        title: 'Substantially Reduce Waste Generation Through Prevention & Reuse',
        description: 'Substantially reduce waste generation through prevention, reduction, recycling, composting, and reuse of biomass.'
      }
    ]
  },
  {
    number: 13,
    id: 'sdg-13',
    code: 'SDG 13',
    title: 'Climate Action',
    shortTitle: 'Climate Action',
    color: '#3F7E44',
    description: 'Take urgent action to combat climate change and its impacts through agricultural mitigation and adaptation.',
    targets: [
      {
        id: '13.2',
        code: '13.2',
        sdgNumber: 13,
        title: 'Integrate Climate Change Measures into Strategies',
        description: 'Integrate climate change measures into agricultural policies, farm management strategies, and community resilience planning.'
      }
    ]
  },
  {
    number: 14,
    id: 'sdg-14',
    code: 'SDG 14',
    title: 'Life Below Water',
    shortTitle: 'Life Below Water',
    color: '#0A97D9',
    description: 'Conserve and sustainably use the oceans, seas and marine resources, reducing agricultural runoff and eutrophication.',
    targets: [
      {
        id: '14.1',
        code: '14.1',
        sdgNumber: 14,
        title: 'Reduce Marine Pollution & Nutrient Runoff',
        description: 'Prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including nutrient loading and pesticides.'
      }
    ]
  },
  {
    number: 15,
    id: 'sdg-15',
    code: 'SDG 15',
    title: 'Life on Land',
    shortTitle: 'Life on Land',
    color: '#56C02B',
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, halt and reverse land degradation, and halt biodiversity loss.',
    targets: [
      {
        id: '15.1',
        code: '15.1',
        sdgNumber: 15,
        title: 'Conservation & Restoration of Terrestrial Ecosystems',
        description: 'Ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their ecological services.'
      },
      {
        id: '15.3',
        code: '15.3',
        sdgNumber: 15,
        title: 'Combat Desertification & Restore Degraded Land & Soil',
        description: 'Combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world.'
      }
    ]
  },
  {
    number: 16,
    id: 'sdg-16',
    code: 'SDG 16',
    title: 'Peace, Justice and Strong Institutions',
    shortTitle: 'Strong Institutions',
    color: '#00689D',
    description: 'Promote peaceful and inclusive societies for sustainable development and build effective, accountable and inclusive institutions.',
    targets: [
      {
        id: '16.7',
        code: '16.7',
        sdgNumber: 16,
        title: 'Ensure Responsive, Inclusive & Participatory Decision-Making',
        description: 'Ensure responsive, inclusive, participatory and representative decision-making at all levels of agricultural governance and community resource groups.'
      }
    ]
  },
  {
    number: 17,
    id: 'sdg-17',
    code: 'SDG 17',
    title: 'Partnerships for the Goals',
    shortTitle: 'Partnerships',
    color: '#19486A',
    description: 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.',
    targets: [
      {
        id: '17.17',
        code: '17.17',
        sdgNumber: 17,
        title: 'Encourage Effective Public, Public-Private & Civil Society Partnerships',
        description: 'Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships.'
      }
    ]
  }
];

export const SDG_MAP = new Map<number, SDGMetadata>(
  UN_SDGS.map(sdg => [sdg.number, sdg])
);

export function getSdgByNumber(num: number): SDGMetadata | undefined {
  return SDG_MAP.get(num);
}

export function getSdgTarget(sdgNum: number, targetCode: string): SDGTarget | undefined {
  const sdg = SDG_MAP.get(sdgNum);
  return sdg?.targets.find(t => t.code === targetCode);
}
