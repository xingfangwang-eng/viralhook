import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeatureGridProps {
  keyFeatures: string[];
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  keyFeatures,
  backgroundColor = 'bg-white',
  borderColor = 'border-slate-200',
  borderRadius = 'rounded-lg'
}) => {
  // 功能描述映射
  const featureDescriptions: { [key: string]: string } = {
    '1-click generation': 'Create stunning visual hooks in just one click.',
    'No login required': 'No registration needed to use all features.',
    'High-resolution export': 'Export high-quality images for all platforms.',
    'Multiple style options': 'Choose from Minimal, Note, and Contrast styles.',
    'Fast processing': 'Generate cards instantly, usually in less than 1 second.',
    'Mobile-friendly': 'Works great on both desktop and mobile devices.',
    'Watermark-free': 'No watermarks on your generated cards.',
    'Customizable colors': 'Adjust colors to match your brand identity.',
    'Batch processing': 'Generate multiple cards at once for efficiency.',
    'Responsive design': 'Cards look great on any device or platform.',
    'Alternative to Canva': 'A simpler, faster alternative to complex design tools.',
    'Minimalist design': 'Clean, minimalist aesthetic that stands out.',
    'Lightning-fast generation': 'Create cards in milliseconds, not seconds.',
    'Social media optimized': 'Perfectly sized for all social platforms.',
    'Quote formatting': 'Special formatting for quotes and text-based content.',
    'Before/after comparison': 'Perfect for showcasing transformations and comparisons.'
  };

  return (
    <div className={`${backgroundColor} border ${borderColor} ${borderRadius} p-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyFeatures.map((feature, index) => (
          <div key={index} className="border border-slate-100 rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{feature}</h3>
            <p className="text-slate-600 text-sm">
              {featureDescriptions[feature] || 'A powerful feature that helps you create better visual content.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;