export interface CropAgronomicData {
  id: string;
  name: string;
  vernacularName: string;
  category: 'Oilseed' | 'Pulse' | 'Cereal' | 'Cash Crop' | 'Horticulture';
  optimalPhMin: number;
  optimalPhMax: number;
  suitedSoils: string[];
  suitedSeasons: string[];
  waterRequirement: 'Low' | 'Medium' | 'High';
  irrigationsNeeded: number;
  estCostPerAcre: number;
  estRevenuePerAcre: number;
  mandiDemand: 'High' | 'Moderate' | 'Very High';
  resilienceRating: number; // 0-100
  phases: {
    phase: string;
    dayRange: string;
    title: string;
    action: string;
  }[];
}

export const CROP_AGRONOMIC_DATABASE: CropAgronomicData[] = [
  {
    id: 'mustard',
    name: 'Mustard (Pusa Bold / Sarson)',
    vernacularName: 'सरसों / ਰਾਇਆ',
    category: 'Oilseed',
    optimalPhMin: 6.2,
    optimalPhMax: 7.8,
    suitedSoils: ['alluvial', 'sandy', 'loamy', 'red'],
    suitedSeasons: ['Rabi', 'Zaid'],
    waterRequirement: 'Low',
    irrigationsNeeded: 2,
    estCostPerAcre: 11500,
    estRevenuePerAcre: 54000,
    mandiDemand: 'Very High',
    resilienceRating: 92,
    phases: [
      { phase: 'Phase 1', dayRange: 'Days 1-10', title: 'Sowing & Seed Treatment', action: 'Treat seeds with Trichoderma @ 5g/kg. Sow at 2.5kg/acre with 30cm row spacing.' },
      { phase: 'Phase 2', dayRange: 'Days 25-30', title: 'First Irrigation & Thinning', action: 'Apply 1st light irrigation. Top-dress 20kg Urea per acre during thinning.' },
      { phase: 'Phase 3', dayRange: 'Days 50-60', title: 'Flowering & Aphid Guard', action: 'Inspect leaves for mustard aphids. Spray Neem Oil 1500ppm if pest count exceeds 5/plant.' },
      { phase: 'Phase 4', dayRange: 'Days 100-110', title: 'Pod Maturity & Harvesting', action: 'Harvest when 75% pods turn golden yellow to avoid shattering loss in field.' },
    ],
  },
  {
    id: 'chickpea',
    name: 'Chickpea / Kabuli Chana',
    vernacularName: 'चना / ਛੋਲੇ',
    category: 'Pulse',
    optimalPhMin: 6.0,
    optimalPhMax: 7.5,
    suitedSoils: ['black', 'alluvial', 'loamy', 'sandy'],
    suitedSeasons: ['Rabi'],
    waterRequirement: 'Low',
    irrigationsNeeded: 1,
    estCostPerAcre: 9800,
    estRevenuePerAcre: 47800,
    mandiDemand: 'High',
    resilienceRating: 88,
    phases: [
      { phase: 'Phase 1', dayRange: 'Days 1-7', title: 'Rhizobium Inoculation & Sowing', action: 'Inoculate seeds with Rhizobium culture to enhance root nitrogen fixation.' },
      { phase: 'Phase 2', dayRange: 'Days 30-35', title: 'Branching & Light Hoeing', action: 'Perform light weeding between rows. No heavy nitrogen application needed.' },
      { phase: 'Phase 3', dayRange: 'Days 60-70', title: 'Pod Borer Scouting', action: 'Install pheromone traps for Helicoverpa borer. Spray HaNPV if larvae detected.' },
      { phase: 'Phase 4', dayRange: 'Days 95-105', title: 'Desiccation & Harvest', action: 'Harvest when plants dry out naturally and pods rattle when shaken.' },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat (HD-2967 / DBW-187)',
    vernacularName: 'गेहूँ / ਕਣਕ',
    category: 'Cereal',
    optimalPhMin: 6.5,
    optimalPhMax: 7.5,
    suitedSoils: ['alluvial', 'loamy', 'black'],
    suitedSeasons: ['Rabi'],
    waterRequirement: 'High',
    irrigationsNeeded: 4,
    estCostPerAcre: 16500,
    estRevenuePerAcre: 51700,
    mandiDemand: 'High',
    resilienceRating: 81,
    phases: [
      { phase: 'Phase 1', dayRange: 'Days 1-12', title: 'Sowing & Pre-emergence', action: 'Sow at 40kg/acre with seed drill. Apply basal dose of NPK 12:32:16.' },
      { phase: 'Phase 2', dayRange: 'Days 21-25', title: 'Crown Root Initiation (CRI)', action: 'Critical 1st irrigation window. Top-dress 35kg Urea per acre.' },
      { phase: 'Phase 3', dayRange: 'Days 65-70', title: 'Booting & Yellow Rust Guard', action: 'Inspect for yellow powder on foliage. Spray Propiconazole 25% EC if needed.' },
      { phase: 'Phase 4', dayRange: 'Days 120-130', title: 'Grain Filling & Combined Harvest', action: 'Stop irrigation 10 days prior to harvest when grains turn hard.' },
    ],
  },
  {
    id: 'cotton',
    name: 'Bt Cotton (Hybrid)',
    vernacularName: 'कपास / कापूस',
    category: 'Cash Crop',
    optimalPhMin: 6.5,
    optimalPhMax: 8.2,
    suitedSoils: ['black', 'alluvial', 'loamy'],
    suitedSeasons: ['Kharif'],
    waterRequirement: 'Medium',
    irrigationsNeeded: 3,
    estCostPerAcre: 22000,
    estRevenuePerAcre: 72000,
    mandiDemand: 'Very High',
    resilienceRating: 85,
    phases: [
      { phase: 'Phase 1', dayRange: 'Days 1-15', title: 'Germination & Dibbling', action: 'Dibble seeds at 90cm x 60cm spacing. Ensure good soil tilth.' },
      { phase: 'Phase 2', dayRange: 'Days 40-50', title: 'Square Formation & Fertigation', action: 'Apply split dose of Potash and Nitrogen to support fruiting branches.' },
      { phase: 'Phase 3', dayRange: 'Days 80-90', title: 'Boll Development & Pink Bollworm', action: 'Deploy Profenofos spray if Pink Bollworm threshold exceeds 5% of bolls.' },
      { phase: 'Phase 4', dayRange: 'Days 140-160', title: 'Boll Bursting & Picking', action: 'Pick clean dry cotton bolls in morning hours.' },
    ],
  },
  {
    id: 'maize',
    name: 'Maize (Hybrid Corn)',
    vernacularName: 'मक्का / ਮੱਕੀ',
    category: 'Cereal',
    optimalPhMin: 5.8,
    optimalPhMax: 7.2,
    suitedSoils: ['loamy', 'alluvial', 'red'],
    suitedSeasons: ['Kharif', 'Rabi', 'Zaid'],
    waterRequirement: 'Medium',
    irrigationsNeeded: 3,
    estCostPerAcre: 13500,
    estRevenuePerAcre: 48000,
    mandiDemand: 'High',
    resilienceRating: 90,
    phases: [
      { phase: 'Phase 1', dayRange: 'Days 1-10', title: 'Sowing & Fall Armyworm Check', action: 'Treat seeds with Cyantraniliprole for early Fall Armyworm protection.' },
      { phase: 'Phase 2', dayRange: 'Days 30-35', title: 'Knee-High Stage & Top Dressing', action: 'Top-dress Urea @ 25kg/acre and earth up plants to prevent lodging.' },
      { phase: 'Phase 3', dayRange: 'Days 55-65', title: 'Tasseling & Silking Stage', action: 'Maintain adequate moisture; stress during silking causes grain drop.' },
      { phase: 'Phase 4', dayRange: 'Days 95-105', title: 'Cob Maturity & Harvesting', action: 'Harvest when black layer forms at the base of kernel.' },
    ],
  },
];
