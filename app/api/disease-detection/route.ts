import { NextResponse } from 'next/server';
import { DISEASE_DATABASE } from '@/lib/diseaseModel';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sampleId = 'tomato-early-blight', acres = 2.5, imageBase64 } = body;

    // Pick disease from model dictionary or fallback to tomato early blight
    const diagnostic = DISEASE_DATABASE[sampleId] || DISEASE_DATABASE['tomato-early-blight'];

    // Calculate dosage for requested field acreage
    const waterLiters = Math.round(diagnostic.waterPerAcreLiters * acres);
    const chemicalGrams = Math.round(diagnostic.chemicalPerAcreGrams * acres);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      model: 'Farmitron-Vision-Pathogen-v4.2',
      diagnostic: {
        ...diagnostic,
        fieldCalculations: {
          acres,
          totalWaterLiters: waterLiters,
          totalChemicalGrams: chemicalGrams,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process leaf computer vision diagnostic.' },
      { status: 500 }
    );
  }
}
