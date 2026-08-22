import React from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Globe,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HERO BANNER */}
      <div className="bg-white rounded-3xl p-8 md:p-14 border border-[#EDE5D4] shadow-sm space-y-6 text-center max-w-4xl mx-auto">
        <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#2F6B45]" />}>
          Our Mission & Architecture
        </Badge>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#17221C] tracking-tight leading-tight">
          Democratizing precision agronomy for India's smallholder farmers.
        </h1>

        <p className="text-base md:text-lg text-[#66706A] leading-relaxed max-w-2xl mx-auto">
          Over 86% of Indian agricultural landholders operate plots smaller than 2 hectares. Farmitron bridges satellite remote sensing and AI computer vision directly to everyday local field decisions.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            href="/crop-intelligence"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16352B] text-[#F7F5EF] font-bold text-sm hover:bg-[#2F6B45] transition-colors shadow-sm"
          >
            <span>Explore Crop Intelligence</span>
            <ArrowRight className="w-4 h-4 text-[#D6A84A]" />
          </Link>
        </div>
      </div>

      {/* ARCHITECTURE PIPELINE BREAKDOWN */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="green">Technical Architecture</Badge>
          <h2 className="text-3xl font-extrabold text-[#17221C]">How Farmitron Processing Pipeline Works</h2>
          <p className="text-sm text-[#66706A]">From raw orbital imagery to actionable farmer advice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="card-premium p-6 rounded-3xl space-y-3">
            <span className="text-xs font-bold text-[#D6A84A] uppercase font-mono">Layer 01</span>
            <div className="p-2.5 rounded-xl bg-[#2F6B45]/10 text-[#2F6B45] w-max">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17221C] text-base">Multispectral Data Fusion</h3>
            <p className="text-xs text-[#66706A] leading-relaxed">
              Ingests Sentinel-2 10m satellite imagery, ISRO Bhuvan telemetry, and local Krishi Vigyan Kendra weather sensors.
            </p>
          </div>

          <div className="card-premium p-6 rounded-3xl space-y-3">
            <span className="text-xs font-bold text-[#6E9F5B] uppercase font-mono">Layer 02</span>
            <div className="p-2.5 rounded-xl bg-[#6E9F5B]/20 text-[#16352B] w-max">
              <Cpu className="w-5 h-5 text-[#2F6B45]" />
            </div>
            <h3 className="font-bold text-[#17221C] text-base">Edge Computer Vision</h3>
            <p className="text-xs text-[#66706A] leading-relaxed">
              Diagnostic vision models trained on 40,000+ Indian crop leaf disease samples (Early Blight, Yellow Rust, Leaf Blast).
            </p>
          </div>

          <div className="card-premium p-6 rounded-3xl space-y-3">
            <span className="text-xs font-bold text-[#2F6B45] uppercase font-mono">Layer 03</span>
            <div className="p-2.5 rounded-xl bg-[#D6A84A]/20 text-[#16352B] w-max">
              <ShieldCheck className="w-5 h-5 text-[#2F6B45]" />
            </div>
            <h3 className="font-bold text-[#17221C] text-base">ICAR Agronomic Engine</h3>
            <p className="text-xs text-[#66706A] leading-relaxed">
              Calibrates recommendations against Indian Council of Agricultural Research guidelines for 12 agro-climatic zones.
            </p>
          </div>

          <div className="card-premium p-6 rounded-3xl space-y-3">
            <span className="text-xs font-bold text-[#16352B] uppercase font-mono">Layer 04</span>
            <div className="p-2.5 rounded-xl bg-[#16352B]/10 text-[#16352B] w-max">
              <Radio className="w-5 h-5 text-[#2F6B45]" />
            </div>
            <h3 className="font-bold text-[#17221C] text-base">Vernacular Delivery</h3>
            <p className="text-xs text-[#66706A] leading-relaxed">
              Delivers voice readouts ("Suno") and simple prompt pills in Hindi, Punjabi, Marathi, Telugu, and English.
            </p>
          </div>

        </div>
      </div>

      {/* FARMER TESTIMONIALS & REGIONAL IMPACT */}
      <div className="bg-[#16352B] text-[#F7F5EF] rounded-3xl p-8 md:p-12 border border-[#2F6B45] space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE5D4]/15 pb-6">
          <div>
            <Badge variant="gold">Verified Field Impact</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
              Stories from Indian Farmers Using Farmitron
            </h2>
          </div>
          <span className="text-xs text-[#EDE5D4]/70 font-mono">Active in 28 Indian States</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#2F6B45]/40 p-6 rounded-2xl border border-[#EDE5D4]/15 space-y-3">
            <div className="flex items-center gap-1 text-[#D6A84A]">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-[#EDE5D4] leading-relaxed italic">
              "Farmitron told me to hold off spraying pesticide because rain was coming in 4 hours. Saved me ₹3,200 in chemical wash-off costs on my 2-acre wheat plot."
            </p>
            <div className="pt-2 border-t border-[#EDE5D4]/10">
              <span className="block font-bold text-white text-xs">Gurpreet Singh</span>
              <span className="text-[10px] text-[#EDE5D4]/70">Sangrur, Punjab · Wheat & Mustard</span>
            </div>
          </div>

          <div className="bg-[#2F6B45]/40 p-6 rounded-2xl border border-[#EDE5D4]/15 space-y-3">
            <div className="flex items-center gap-1 text-[#D6A84A]">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-[#EDE5D4] leading-relaxed italic">
              "The leaf photo diagnosis detected Early Blight on my tomatoes before I could see it with my eyes. The organic Trichoderma remedy stopped canopy spread."
            </p>
            <div className="pt-2 border-t border-[#EDE5D4]/10">
              <span className="block font-bold text-white text-xs">Sunita Patil</span>
              <span className="text-[10px] text-[#EDE5D4]/70">Nashik, Maharashtra · Tomato & Onion</span>
            </div>
          </div>

          <div className="bg-[#2F6B45]/40 p-6 rounded-2xl border border-[#EDE5D4]/15 space-y-3">
            <div className="flex items-center gap-1 text-[#D6A84A]">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-[#EDE5D4] leading-relaxed italic">
              "The Crop Suitability Wizard suggested switching to Kabuli Chana for my dryland plot. Net profit jumped by 24% with half the water consumption."
            </p>
            <div className="pt-2 border-t border-[#EDE5D4]/10">
              <span className="block font-bold text-white text-xs">Venkatesh Rao</span>
              <span className="text-[10px] text-[#EDE5D4]/70">Warangal, Telangana · Pulses & Cotton</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
