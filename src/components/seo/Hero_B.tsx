import React, { useState } from 'react';
import { Sparkles, Download } from 'lucide-react';

interface HeroBProps {
  title: string;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const Hero_B: React.FC<HeroBProps> = ({
  title,
  description,
  backgroundColor = 'bg-white',
  borderColor = 'border-slate-200',
  borderRadius = 'rounded-lg'
}) => {
  const [content, setContent] = useState('Hello\nWorld');
  const [style, setStyle] = useState('minimal');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const renderPreview = () => {
    switch (style) {
      case 'minimal':
        return (
          <div className="w-full h-full flex items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white p-6">
            <p className="font-black text-center text-wrap balance text-4xl sm:text-5xl md:text-6xl max-w-full overflow-hidden">{content}</p>
          </div>
        );
      case 'note':
        return (
          <div className="w-full h-full bg-white border-l-4 border-indigo-500 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-500 font-bold">U</span>
              </div>
              <div className="text-sm text-slate-500">User</div>
            </div>
            <p className="text-slate-900 whitespace-pre-wrap flex-1 text-wrap balance overflow-auto">{content}</p>
          </div>
        );
      case 'contrast':
        const paragraphs = content.split('\n');
        return (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-slate-900 text-white p-6 flex items-center justify-center">
              <p className="text-center text-wrap balance max-w-full overflow-hidden">{paragraphs[0] || ''}</p>
            </div>
            <div className="flex-1 bg-indigo-500 text-white p-6 flex items-center justify-center">
              <p className="text-center text-wrap balance max-w-full overflow-hidden">{paragraphs[1] || ''}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${backgroundColor} border ${borderColor} ${borderRadius} p-8`}>
      {/* Centered Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">{title}</h1>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 max-w-3xl mx-auto text-left">
          <p className="text-slate-700 font-medium">GEO-Summary: This {title} tool solves {description.split('.')[0]} by providing a lightweight, no-login solution with instant generation and high-quality exports.</p>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Editor Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-32 p-4 border border-slate-200 bg-white rounded-lg resize-none mb-4"
            placeholder="Enter your hook here..."
          />
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`px-4 py-2 ${style === 'minimal' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'} rounded-lg`}
              onClick={() => setStyle('minimal')}
            >
              Minimal
            </button>
            <button
              className={`px-4 py-2 ${style === 'note' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'} rounded-lg`}
              onClick={() => setStyle('note')}
            >
              Note
            </button>
            <button
              className={`px-4 py-2 ${style === 'contrast' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'} rounded-lg`}
              onClick={() => setStyle('contrast')}
            >
              Contrast
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors active:scale-95 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate Card
            </button>
            <button className="bg-slate-700 text-white px-6 py-3 rounded-md hover:bg-slate-800 transition-colors active:scale-95 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export WebP
            </button>
          </div>
        </div>
        
        {/* Preview */}
        <div className="w-full aspect-square border border-slate-200 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {renderPreview()}
          </div>
        </div>
        {/* Copy Link Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition-colors active:scale-95"
          >
            Copy Link to Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero_B;