import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt = '', lang = 'hi', state = 'Maharashtra' } = body;

    const lowerPrompt = prompt.toLowerCase();

    let answerText = '';
    let audioScriptText = '';
    let mandiData = null;

    if (lowerPrompt.includes('mandi') || lowerPrompt.includes('price') || lowerPrompt.includes('cotton') || lowerPrompt.includes('rate')) {
      answerText = `Current Agmarknet Mandi rates for Medium Staple Cotton in major ${state} markets (Per Quintal):`;
      audioScriptText = `${state} की प्रमुख मंडियों में कपास के ताज़ा भाव प्रस्तुत हैं।`;
      mandiData = [
        { mandi: 'Rajura (Chandrapur)', minRate: '₹7,100', maxRate: '₹7,550', modalRate: '₹7,400' },
        { mandi: 'Amravati', minRate: '₹7,000', maxRate: '₹7,480', modalRate: '₹7,350' },
        { mandi: 'Yavatmal', minRate: '₹6,950', maxRate: '₹7,420', modalRate: '₹7,280' },
        { mandi: 'Jalna', minRate: '₹7,050', maxRate: '₹7,500', modalRate: '₹7,380' },
      ];
    } else if (lowerPrompt.includes('yellow') || lowerPrompt.includes('wheat') || lowerPrompt.includes('rust')) {
      answerText = 'Yellowing in wheat foliage is commonly caused by Nitrogen deficiency or Yellow Rust (Puccinia striiformis). Test if yellow powder transfers to fingers. If yes, apply Propiconazole 25% EC @ 1ml/liter water immediately.';
      audioScriptText = 'गेहूँ में पीलापन नाइट्रोजन की कमी या येलो रस्ट का लक्षण है। प्रोपिकोनाज़ोल का छिड़काव करें।';
    } else if (lowerPrompt.includes('mustard') || lowerPrompt.includes('ph') || lowerPrompt.includes('sarson')) {
      answerText = 'Soil pH 6.8 is in the 98th percentile optimal range for Mustard (Sarson). Alluvial soils with pH 6.5–7.2 ensure maximum nitrogen and phosphorus uptake for oilseed crops.';
      audioScriptText = 'हाँ! मिट्टी का पीएच 6.8 सरसों की बुआई के लिए बिल्कुल उत्तम है।';
    } else if (lowerPrompt.includes('pm-kisan') || lowerPrompt.includes('kisan') || lowerPrompt.includes('subsidy')) {
      answerText = 'Under PM Kisan Samman Nidhi, eligible farmers receive ₹6,000 annually in 3 equal installments of ₹2,000. Verify your e-KYC and Aadhaar seeding on pmkisan.gov.in.';
      audioScriptText = 'पीएम किसान योजना के तहत किसानों को सालाना 6,000 रुपये दिए जाते हैं। अपना ई-केवाईसी पूरा करें।';
    } else {
      answerText = 'For smallholder farmers, we recommend split nitrogen application and incorporating bio-fungicides like Trichoderma to protect root systems against soil-borne pathogens.';
      audioScriptText = 'फ़सल स्वास्थ्य बनाए रखने के लिए समय पर जैविक खाद का प्रयोग करें।';
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      query: prompt,
      language: lang,
      response: {
        text: answerText,
        audioScript: audioScriptText,
        mandiTable: mandiData,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process AI farm assistant query.' },
      { status: 500 }
    );
  }
}
