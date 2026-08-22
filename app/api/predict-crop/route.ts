import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { N = 90, P = 42, K = 43, temperature = 23.6, humidity = 82.0, ph = 6.5, rainfall = 202.9 } = body;

    // Call Python FastAPI ML Backend on http://127.0.0.1:8000/predict-crop
    const fastApiUrl = 'http://127.0.0.1:8000/predict-crop';
    
    const response = await fetch(fastApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { success: false, error: `FastAPI error: ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Python FastAPI ML backend at http://127.0.0.1:8000/predict-crop.' 
      },
      { status: 500 }
    );
  }
}
