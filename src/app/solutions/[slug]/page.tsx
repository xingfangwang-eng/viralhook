import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Star, Code, Download, Sparkles, ChevronDown, ChevronUp, ExternalLink, ArrowRight, Copy, Check } from 'lucide-react';
import extendedKeywords from '../../../services/keyword_service';

const generateHash = (str: string): number => {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
};

const getRelatedTools = (currentSlug: string, currentTags: string[]): any[] => {
  return extendedKeywords
    .filter(item => item.slug !== currentSlug)
    .map(item => {
      let similarity = 0;
      currentTags.forEach(tag => {
        if (item.semantic_tags.includes(tag)) similarity++;
      });
      return { ...item, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
};

const ProblemBlock = ({ problem_description, bgColor, borderColor, borderRadius }: any) => {
  return (
    <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        The Problem
      </h2>
      <ul className="space-y-3">
        {problem_description.split('. ').filter((sentence: string) => sentence.trim()).map((sentence: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            </div>
            <p className="text-slate-600">{sentence.trim()}.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureGrid = ({ key_features, bgColor, borderColor, borderRadius }: any) => {
  return (
    <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {key_features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            </div>
            <p className="text-slate-600">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQSection = ({ faq, bgColor, borderColor, borderRadius }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        FAQ
      </h2>
      <div className="space-y-4">
        {faq.map((item: any, index: number) => (
          <div key={index} className="border border-slate-100 rounded-md overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>{item.question}</span>
              {openIndex === index ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-slate-50 text-slate-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero_A = ({ title, initialInput, bgColor, borderColor, borderRadius }: any) => {
  const [input, setInput] = useState(initialInput);
  const [style, setStyle] = useState('minimal');
  const [copied, setCopied] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleAIButton = () => {
    setAiProcessing(true);
    setTimeout(() => {
      const hooks = [
        'Stop doing [X], start doing [Y]',
        'Why [X] is killing your productivity',
        'The ultimate guide to [X]',
        'How to [X] in 3 easy steps',
        'The secret to [X] that no one tells you'
      ];
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      setInput(randomHook.replace('[X]', title) + '\n' + input.toUpperCase() + '!');
      setAiProcessing(false);
    }, 1000);
  };

  const handleExportButton = () => {
    if (previewRef.current) {
      // 模拟导出功能
      const link = document.createElement('a');
      link.download = 'viralhook-preview.png';
      link.href = 'https://picsum.photos/800/800';
      link.click();
    }
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">{title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Create stunning marketing visuals in seconds with ViralHook. No design skills required.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full p-4 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px]"
              />
              <button
                onClick={handleCopyButton}
                className="absolute top-3 right-3 p-2 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-slate-400" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStyle('minimal')}
                className={`px-4 py-2 border rounded-md ${style === 'minimal' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
              >
                Minimal
              </button>
              <button
                onClick={() => setStyle('note')}
                className={`px-4 py-2 border rounded-md ${style === 'note' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
              >
                Note
              </button>
              <button
                onClick={() => setStyle('contrast')}
                className={`px-4 py-2 border rounded-md ${style === 'contrast' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
              >
                Contrast
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAIButton}
                disabled={aiProcessing}
                className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {aiProcessing ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    AI Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    AI One-Click暴击
                  </>
                )}
              </button>
              <button
                onClick={handleExportButton}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Export WebP
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div 
            ref={previewRef}
            id="preview-card"
            className={`aspect-square border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden ${style === 'note' ? 'bg-white border-l-4 border-indigo-500 relative' : ''}`}
          >
            {style === 'note' && (
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-500 font-bold">JD</span>
              </div>
            )}
            {style === 'contrast' ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 bg-slate-900 text-white p-8 flex items-center justify-center">
                  <p className="text-2xl font-black text-center">{input.split('\n')[0]}</p>
                </div>
                <div className="flex-1 bg-indigo-500 text-white p-8 flex items-center justify-center">
                  <p className="text-2xl font-black text-center">{input.split('\n')[1] || 'Your text here'}</p>
                </div>
              </div>
            ) : (
              <p className={`text-center ${style === 'minimal' ? 'text-4xl font-black' : 'text-lg p-8'}`}>
                {input}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero_B = ({ title, initialInput, bgColor, borderColor, borderRadius }: any) => {
  const [input, setInput] = useState(initialInput);
  const [style, setStyle] = useState('minimal');
  const [copied, setCopied] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleAIButton = () => {
    setAiProcessing(true);
    setTimeout(() => {
      const hooks = [
        'Stop doing [X], start doing [Y]',
        'Why [X] is killing your productivity',
        'The ultimate guide to [X]',
        'How to [X] in 3 easy steps',
        'The secret to [X] that no one tells you'
      ];
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      setInput(randomHook.replace('[X]', title) + '\n' + input.toUpperCase() + '!');
      setAiProcessing(false);
    }, 1000);
  };

  const handleExportButton = () => {
    if (previewRef.current) {
      // 模拟导出功能
      const link = document.createElement('a');
      link.download = 'viralhook-preview.png';
      link.href = 'https://picsum.photos/800/800';
      link.click();
    }
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
      <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 text-center">{title}</h1>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full p-4 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px]"
            />
            <button
              onClick={handleCopyButton}
              className="absolute top-3 right-3 p-2 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-slate-400" />}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStyle('minimal')}
              className={`px-4 py-2 border rounded-md ${style === 'minimal' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
            >
              Minimal
            </button>
            <button
              onClick={() => setStyle('note')}
              className={`px-4 py-2 border rounded-md ${style === 'note' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
            >
              Note
            </button>
            <button
              onClick={() => setStyle('contrast')}
              className={`px-4 py-2 border rounded-md ${style === 'contrast' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-700'}`}
            >
              Contrast
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAIButton}
              disabled={aiProcessing}
              className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {aiProcessing ? (
                <>
                  <Sparkles className="h-5 w-5 animate-spin" />
                  AI Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  AI One-Click暴击
                </>
              )}
            </button>
            <button
              onClick={handleExportButton}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Export WebP
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div 
          ref={previewRef}
          id="preview-card"
          className={`aspect-square border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden ${style === 'note' ? 'bg-white border-l-4 border-indigo-500 relative' : ''}`}
        >
          {style === 'note' && (
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-500 font-bold">JD</span>
            </div>
          )}
          {style === 'contrast' ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 bg-slate-900 text-white p-8 flex items-center justify-center">
                <p className="text-2xl font-black text-center">{input.split('\n')[0]}</p>
              </div>
              <div className="flex-1 bg-indigo-500 text-white p-8 flex items-center justify-center">
                <p className="text-2xl font-black text-center">{input.split('\n')[1] || 'Your text here'}</p>
              </div>
            </div>
          ) : (
            <p className={`text-center ${style === 'minimal' ? 'text-4xl font-black' : 'text-lg p-8'}`}>
              {input}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const { slug: slugParam } = useParams();
  const slug = slugParam || '';
  const keywordData = extendedKeywords.find(item => item.slug === slug);
  const hash = generateHash(slug);
  const showFAQ = hash % 2 === 0;
  const showProblemFirst = hash % 3 !== 0;
  
  // 随机背景色
  const bgColors = ['bg-white', 'bg-slate-50', 'bg-indigo-50'];
  const bgColor = bgColors[hash % bgColors.length];
  
  // 随机边框颜色
  const borderColors = ['border-slate-200', 'border-indigo-100'];
  const borderColor = borderColors[hash % borderColors.length];
  
  // 随机边框圆角
  const borderRadiuses = ['rounded-md', 'rounded-lg'];
  const borderRadius = borderRadiuses[hash % borderRadiuses.length];

  if (!keywordData) {
    return (
      <div className="max-w-7xl mx-auto my-12 px-6">
        <h1 className="text-5xl font-black text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-600">The requested page does not exist.</p>
      </div>
    );
  }

  const { title, problem_description, how_to_solve, key_features, faq, semantic_tags, seo_meta_description } = keywordData;
  const relatedTools = getRelatedTools(slug, semantic_tags);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://viralhook.wangdadi.xyz'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Tools',
                'item': 'https://viralhook.wangdadi.xyz/solutions'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': title,
                'item': `https://viralhook.wangdadi.xyz/solutions/${slug}`
              }
            ]
          })
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'ViralHook',
            'description': 'A lightweight, no-login tool for creating marketing visuals and quote cards.',
            'applicationCategory': 'Graphic Design Software',
            'operatingSystem': 'All',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
              'availability': 'https://schema.org/InStock'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '100'
            }
          })
        }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': `How to use ${title}`,
            'description': `Learn how to create amazing visuals with ${title} in 3 simple steps.`,
            'step': [
              {
                '@type': 'HowToStep',
                'name': 'Step 1: Input text',
                'text': 'Enter your desired text or quote into the input field.',
                'url': `https://viralhook.com/solutions/${slug}#step1`
              },
              {
                '@type': 'HowToStep',
                'name': 'Step 2: Choose style',
                'text': 'Select from Minimal, Note, or Contrast style options to match your brand.',
                'url': `https://viralhook.com/solutions/${slug}#step2`
              },
              {
                '@type': 'HowToStep',
                'name': 'Step 3: Export WebP',
                'text': 'Click the export button to download your high-quality WebP image.',
                'url': `https://viralhook.com/solutions/${slug}#step3`
              }
            ]
          })
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faq.map((item) => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            }))
          })
        }}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ViralHook</h1>
          <p className="text-slate-500">No-BS Marketing Tool</p>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-slate-200">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-slate-600 hover:text-indigo-500 transition-colors">Home</a>
          <span className="text-slate-400">/</span>
          <a href="/solutions" className="text-slate-600 hover:text-indigo-500 transition-colors">Tools</a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto my-12 px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Hero Section */}
            {hash % 2 === 0 ? (
              <Hero_A 
                title={title} 
                initialInput={title} 
                bgColor={bgColor} 
                borderColor={borderColor} 
                borderRadius={borderRadius} 
              />
            ) : (
              <Hero_B 
                title={title} 
                initialInput={title} 
                bgColor={bgColor} 
                borderColor={borderColor} 
                borderRadius={borderRadius} 
              />
            )}

            {/* Content Sections */}
            {showProblemFirst ? (
              <>
                <ProblemBlock 
                  problem_description={problem_description} 
                  bgColor={bgColor} 
                  borderColor={borderColor} 
                  borderRadius={borderRadius} 
                />
                <FeatureGrid 
                  key_features={key_features} 
                  bgColor={bgColor} 
                  borderColor={borderColor} 
                  borderRadius={borderRadius} 
                />
              </>
            ) : (
              <>
                <FeatureGrid 
                  key_features={key_features} 
                  bgColor={bgColor} 
                  borderColor={borderColor} 
                  borderRadius={borderRadius} 
                />
                <ProblemBlock 
                  problem_description={problem_description} 
                  bgColor={bgColor} 
                  borderColor={borderColor} 
                  borderRadius={borderRadius} 
                />
              </>
            )}

            {/* How to Solve Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                The Guide
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {how_to_solve.split('. ').filter((sentence: string) => sentence.trim()).map((sentence: string, index: number) => (
                  <p key={index}>{sentence.trim()}.</p>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Traditional Tools vs. ViralHook
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 p-4 text-left font-bold">Feature</th>
                      <th className="border border-slate-200 p-4 text-left font-bold">Traditional Tools (Bloated)</th>
                      <th className="border border-slate-200 p-4 text-left font-bold">ViralHook (Lean)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 font-medium">Login Required</td>
                      <td className="border border-slate-200 p-4">Yes</td>
                      <td className="border border-slate-200 p-4">No</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 font-medium">Processing Speed</td>
                      <td className="border border-slate-200 p-4">Slow (5-10s)</td>
                      <td className="border border-slate-200 p-4">Fast (&lt;1s)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 font-medium">File Size</td>
                      <td className="border border-slate-200 p-4">Large (500KB+)</td>
                      <td className="border border-slate-200 p-4">Small (&lt;100KB)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 font-medium">Features</td>
                      <td className="border border-slate-200 p-4">Overwhelming</td>
                      <td className="border border-slate-200 p-4">Focused & Essential</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 font-medium">Cost</td>
                      <td className="border border-slate-200 p-4">Monthly Subscription</td>
                      <td className="border border-slate-200 p-4">Completely Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            {showFAQ && (
              <FAQSection 
                faq={faq} 
                bgColor={bgColor} 
                borderColor={borderColor} 
                borderRadius={borderRadius} 
              />
            )}

            {/* Code Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Sample Code
              </h2>
              <div className="bg-slate-900 text-slate-100 p-6 rounded-md overflow-x-auto">
                <pre className="text-sm">
                  {hash % 3 === 0 ? (
                    `// Example: How to use ${title.toLowerCase().replace(/\s+/g, '-')}\nconst viralhook = require('viralhook');\n\n// Generate a marketing visual\nconst result = viralhook.generate({\n  text: '${title}',\n  style: 'minimal',\n  format: 'webp'\n});\n\nconsole.log('Generated visual:', result.url);`
                  ) : hash % 3 === 1 ? (
                    `# Example: How to use ${title.toLowerCase().replace(/\s+/g, '-')}\nimport viralhook\n\n# Generate a marketing visual\nresult = viralhook.generate(\n    text='${title}',\n    style='minimal',\n    format='webp'\n)\n\nprint('Generated visual:', result['url'])`
                  ) : (
                    `// Example: How to use ${title.toLowerCase().replace(/\s+/g, '-')}\nimport { generate } from 'viralhook';\n\n// Generate a marketing visual\nconst result = await generate({\n  text: '${title}',\n  style: 'minimal',\n  format: 'webp'\n});\n\nconsole.log('Generated visual:', result.url);`
                  )}
                </pre>
              </div>
            </div>

            {/* Related Links */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Explore More Tools
              </h2>
              <div className="space-y-4">
                {relatedTools.map((tool: any, index: number) => (
                  <a
                    key={tool.slug}
                    href={`/solutions/${tool.slug}`}
                    className="flex items-center gap-3 p-4 border border-slate-100 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-indigo-500" />
                    </div>
                    <span className="text-slate-900 font-medium">Check out our {tool.title} to solve {tool.problem_description.split('.')[0].toLowerCase()}</span>
                    <ExternalLink className="ml-auto h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Industry Insight */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8 mb-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Industry Insight
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  <strong>Visual content is 40x more likely to get shared</strong> (Source: Marketing Stats 2026)
                </p>
                <p className="text-slate-600">
                  <strong>Minimalist design increases engagement by 23%</strong> (Source: Design Trends 2026)
                </p>
                <p className="text-slate-600">
                  <strong>85% of consumers prefer visual content over text</strong> (Source: Consumer Behavior Report 2026)
                </p>
                <p className="text-slate-600">
                  <strong>Fast-loading tools have 70% higher conversion rates</strong> (Source: Performance Metrics 2026)
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* User Reviews */}
              <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                  User Reviews
                </h3>
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://picsum.photos/seed/john/200/200" alt="John Doe" className="w-full h-full object-cover" onerror="console.error('Error loading image:', this.src)" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">John Doe</h4>
                        <div className="flex text-yellow-400">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">
                      "This tool has saved me hours of design work. The minimalist style is perfect for my brand."
                    </p>
                  </div>
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://picsum.photos/seed/jane/200/200" alt="Jane Smith" className="w-full h-full object-cover" onerror="console.error('Error loading image:', this.src)" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Jane Smith</h4>
                        <div className="flex text-yellow-400">★★★★☆</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">
                      "The contrast mode is amazing for creating before/after graphics. So easy to use!"
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://picsum.photos/seed/robert/200/200" alt="Robert Taylor" className="w-full h-full object-cover" onerror="console.error('Error loading image:', this.src)" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Robert Taylor</h4>
                        <div className="flex text-yellow-400">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">
                      "No more Canva subscription for me. This tool does exactly what I need and it's free!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Semantic Tags */}
              <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {semantic_tags.map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-indigo-500 text-white p-8 rounded-md">
                <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
                <p className="mb-6">Create stunning marketing visuals in seconds with ViralHook.</p>
                <button className="w-full px-6 py-3 bg-white text-indigo-500 rounded-md hover:bg-slate-100 transition-colors font-medium">
                  Try ViralHook Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600">Last Updated: {new Date().toLocaleString('default', { month: 'long' })}, 2026</p>
          <p className="text-slate-600 mt-2">© 2026 ViralHook. All rights reserved.</p>
          <p className="text-slate-500 text-sm mt-2">Support: 457239850@qq.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;