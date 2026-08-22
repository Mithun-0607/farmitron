import { NextResponse } from 'next/server';
import { CROP_AGRONOMIC_DATABASE } from '@/lib/icarDatasets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      state = 'Punjab',
      district = 'Sangrur',
      season = 'Rabi',
      soilType = 'alluvial',
      ph = 6.8,
      acres = 3.5,
      waterSource = 'Borewell + Drip',
      budgetPerAcre = 15000,
      priorityGoal = 'profit',
    } = body;

    // Agronomic Suitability Engine Scoring Algorithm
    const scoredCrops = CROP_AGRONOMIC_DATABASE.map((crop) => {
      let score = 75; // base score

      // Soil type match
      if (crop.suitedSoils.includes(soilType.toLowerCase())) {
        score += 12;
      }

      // Season match
      if (crop.suitedSeasons.includes(season)) {
        score += 10;
      }

      // pH match
      if (ph >= crop.optimalPhMin && ph <= crop.optimalPhMax) {
        score += 8;
      } else {
        const phDiff = Math.min(Math.abs(ph - crop.optimalPhMin), Math.abs(ph - crop.optimalPhMax));
        score -= Math.round(phDiff * 5);
      }

      // Priority goal adjustments
      if (priorityGoal === 'profit' && crop.mandiDemand === 'Very High') {
        score += 5;
      }
      if (priorityGoal === 'water' && crop.waterRequirement === 'Low') {
        score += 8;
      }
      if (priorityGoal === 'resilience') {
        score += Math.round((crop.resilienceRating - 80) / 2);
      }

      // Bound score between 60% and 98.5%
      const finalScore = Math.min(98.5, Math.max(60.0, score));

      // Calculate economic forecast for given acreage
      const totalCost = crop.estCostPerAcre * acres;
      const totalRevenue = crop.estRevenuePerAcre * acres;
      const netProfit = totalRevenue - totalCost;

      return {
        ...crop,
        matchScore: parseFloat(finalScore.toFixed(1)),
        totalCost,
        totalRevenue,
        netProfit,
        netProfitPerAcre: crop.estRevenuePerAcre - crop.estCostPerAcre,
      };
    });

    // Sort by match score descending
    scoredCrops.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      location: { state, district, season },
      inputParameters: { soilType, ph, acres, waterSource, budgetPerAcre, priorityGoal },
      recommendations: scoredCrops,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process crop intelligence parameters.' },
      { status: 500 }
    );
  }
}
