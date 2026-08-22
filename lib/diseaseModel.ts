export interface DiseaseDiagnosticResult {
  id: string;
  crop: string;
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: 'Low Risk' | 'Medium Severity' | 'High Severity' | 'Healthy Canopy';
  boundingBox: [number, number, number, number]; // [ymin, xmin, ymax, xmax] percentage
  image: string;
  symptoms: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventive: string;
  waterPerAcreLiters: number;
  chemicalPerAcreGrams: number;
}

export const DISEASE_DATABASE: Record<string, DiseaseDiagnosticResult> = {
  'tomato-early-blight': {
    id: 'tomato-early-blight',
    crop: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 96.4,
    severity: 'Medium Severity',
    boundingBox: [25, 20, 65, 60],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
    symptoms: 'Concentric dark brown rings ("target spots") visible on lower foliage, leading to premature leaf drop.',
    organicRemedy: 'Spray Neem Oil (1500 ppm) or Trichoderma viride bio-fungicide @ 5g/liter twice at 7-day intervals.',
    chemicalRemedy: 'Spray Mancozeb 75% WP @ 2g/liter of water or Chlorothalonil 75% WP @ 2g/liter.',
    preventive: 'Maintain wider row spacing, avoid overhead sprinkler irrigation, and clear crop residue post-harvest.',
    waterPerAcreLiters: 200,
    chemicalPerAcreGrams: 400,
  },
  'rice-blast': {
    id: 'rice-blast',
    crop: 'Rice / Paddy (Oryza sativa)',
    diseaseName: 'Leaf Blast',
    scientificName: 'Magnaporthe oryzae',
    confidence: 94.8,
    severity: 'High Severity',
    boundingBox: [30, 25, 70, 75],
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    symptoms: 'Spindle-shaped elliptical lesions with ash-grey centers on rice leaf blades.',
    organicRemedy: 'Apply Pseudomonas fluorescens @ 10g/liter of water as foliar spray in early morning.',
    chemicalRemedy: 'Spray Tricyclazole 75% WP @ 0.6g/liter of water upon initial lesion sighting.',
    preventive: 'Avoid excessive Nitrogen fertilizer application; split nitrogen into 3 top-dressings.',
    waterPerAcreLiters: 250,
    chemicalPerAcreGrams: 150,
  },
  'maize-healthy': {
    id: 'maize-healthy',
    crop: 'Maize / Corn (Zea mays)',
    diseaseName: 'Healthy Crop (No Pathogen)',
    scientificName: 'Zea mays',
    confidence: 98.9,
    severity: 'Healthy Canopy',
    boundingBox: [0, 0, 100, 100],
    image: 'https://images.unsplash.com/photo-1535242208474-9a279b23b514?w=800&auto=format&fit=crop&q=80',
    symptoms: 'Vibrant green chlorophyll pigment with uniform cell structure. Zero fungal or bacterial leaf spots detected.',
    organicRemedy: 'Maintain regular irrigation and balanced NPK top-dressing.',
    chemicalRemedy: 'No chemical pesticide application required at this stage.',
    preventive: 'Monitor field weekly during high humidity periods.',
    waterPerAcreLiters: 0,
    chemicalPerAcreGrams: 0,
  },
  'cotton-leaf-curl': {
    id: 'cotton-leaf-curl',
    crop: 'Cotton (Gossypium)',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    scientificName: 'Begomovirus',
    confidence: 92.1,
    severity: 'High Severity',
    boundingBox: [20, 15, 60, 55],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
    symptoms: 'Upward curling of leaves, thickening of veins, and enations (outgrowths) on leaf undersides.',
    organicRemedy: 'Control whitefly vector using Yellow Sticky Traps (10/acre) and Neem oil 1500ppm @ 5ml/liter.',
    chemicalRemedy: 'Spray Diafenthiuron 50% WP @ 1.25g/liter or Flonicamid 50% WG @ 0.3g/liter for whitefly vector.',
    preventive: 'Use virus-resistant hybrid seed varieties and destroy weed hosts around field borders.',
    waterPerAcreLiters: 200,
    chemicalPerAcreGrams: 250,
  },
};
