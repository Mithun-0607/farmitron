import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district') || 'Sangrur';
  const state = searchParams.get('state') || 'Punjab';

  const forecast = [
    { day: 'Today (Sat)', tempMax: 28, tempMin: 17, rainProb: 10, windSpeed: 7, humidity: 62, icon: '🌤️', spraySafety: 'OPTIMAL (2PM - 6PM)' },
    { day: 'Sun (Tomorrow)', tempMax: 27, tempMin: 16, rainProb: 15, windSpeed: 8, humidity: 65, icon: '⛅', spraySafety: 'GOOD (Morning)' },
    { day: 'Monday', tempMax: 25, tempMin: 14, rainProb: 75, windSpeed: 16, humidity: 82, icon: '🌧️', spraySafety: 'UNSAFE - Rain Washoff' },
    { day: 'Tuesday', tempMax: 22, tempMin: 11, rainProb: 30, windSpeed: 12, humidity: 70, icon: '🌦️', spraySafety: 'CAUTION' },
    { day: 'Wednesday', tempMax: 20, tempMin: 4, rainProb: 5, windSpeed: 5, humidity: 55, icon: '❄️', spraySafety: 'OPTIMAL (Frost Alert)' },
    { day: 'Thursday', tempMax: 24, tempMin: 10, rainProb: 0, windSpeed: 6, humidity: 50, icon: '☀️', spraySafety: 'OPTIMAL' },
    { day: 'Friday', tempMax: 26, tempMin: 13, rainProb: 0, windSpeed: 7, humidity: 52, icon: '☀️', spraySafety: 'OPTIMAL' },
  ];

  return NextResponse.json({
    success: true,
    location: { district, state },
    currentStation: `${district} Agro Station #402`,
    sprayingViability: {
      status: 'Optimal Window Open',
      bestWindow: '2:00 PM – 6:00 PM Today',
      windDriftRisk: 'Very Low (7 km/h NW)',
      rainWashoffRisk: 'Minimal (<10% rain in 18h)',
    },
    irrigationAdvisor: {
      soilMoistureDeficitMm: 18,
      evapotranspirationMmPerDay: 3.8,
      recommendation: 'Delay irrigation until Monday light shower to save 35% borewell energy.',
    },
    severeAlerts: [
      {
        type: 'FROST_WARNING',
        severity: 'HIGH',
        targetDay: 'Wednesday',
        expectedMinTemp: 4,
        advisory: 'Apply light evening irrigation on Tuesday night to increase soil heat capacity for Mustard & Wheat.',
      },
    ],
    forecast7Days: forecast,
  });
}
