import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file uploaded in request.' },
        { status: 400 }
      );
    }

    // Forward file upload to Python FastAPI backend at http://127.0.0.1:8000/predict-disease
    const fastApiUrl = 'http://127.0.0.1:8000/predict-disease';
    const outgoingFormData = new FormData();
    outgoingFormData.append('file', file, file.name || 'leaf_sample.jpg');

    const response = await fetch(fastApiUrl, {
      method: 'POST',
      body: outgoingFormData,
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
        error: 'Failed to connect to Python FastAPI ML backend at http://127.0.0.1:8000/predict-disease.' 
      },
      { status: 500 }
    );
  }
}
