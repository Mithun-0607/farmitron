import { NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

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

    const outgoingFormData = new FormData();
    outgoingFormData.append('file', file, file.name || 'leaf_sample.jpg');

    const response = await fetch(`${API_BASE_URL}/predict-disease`, {
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
        error: `Failed to connect to FARMiTRON AI backend at ${API_BASE_URL}/predict-disease.`,
      },
      { status: 500 }
    );
  }
}
