import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const SitemapPage = () => {
  const [sitemapData, setSitemapData] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    home: true,
    solutions: true,
    tools: false
  });

  // 模拟从 sitemap.xml 读取数据
  useEffect(() => {
    // 这里应该是实际从 sitemap.xml 读取数据的逻辑
    // 为了演示，我们直接使用模拟数据
    const data = [
      {
        loc: 'https://viralhook.wangdadi.xyz',
        lastmod: '2026-04-05',
        changefreq: 'daily',
        priority: '1.0',
        type: 'home'
      },
      {
        loc: 'https://viralhook.wangdadi.xyz/solutions',
        lastmod: '2026-04-05',
        changefreq: 'daily',
        priority: '0.8',
        type: 'solutions'
      }
    ];

    // 模拟添加 100 个工具页面
    for (let i = 1; i <= 100; i++) {
      data.push({
        loc: `https://viralhook.wangdadi.xyz/solutions/tool-${i}`,
        lastmod: '2026-04-05',
        changefreq: 'weekly',
        priority: '0.6',
        type: 'tool'
      });
    }

    setSitemapData(data);
  }, []);

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ViralHook</h1>
          <p className="text-slate-500">No-BS Marketing Tool</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto my-12 px-6">
        {/* Hero Section */}
        <div className="bg-white border border-slate-200 p-10 mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">
            Sitemap
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            This sitemap contains all 102 pages of the ViralHook website, including the homepage, solutions page, and 100 tool pages.
          </p>
        </div>

        {/* Sitemap Content */}
        <div className="bg-white border border-slate-200 p-8">
          {/* Home Page */}
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleExpand('home')}
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-indigo-500 font-black text-2xl">1</span>
                Home Page
              </h2>
              {expanded.home ? 
                <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                <ChevronDown className="h-5 w-5 text-slate-400" />
              }
            </div>
            
            {expanded.home && (
              <div className="mt-4 ml-8 p-4 bg-slate-50 border border-slate-200 rounded-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">URL:</span>
                    <a 
                      href="https://viralhook.wangdadi.xyz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      https://viralhook.wangdadi.xyz
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Last Modified:</span>
                    <span className="text-slate-600">2026-04-05</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Change Frequency:</span>
                    <span className="text-slate-600">daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Priority:</span>
                    <span className="text-slate-600">1.0</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Page */}
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleExpand('solutions')}
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-indigo-500 font-black text-2xl">2</span>
                Solutions Page
              </h2>
              {expanded.solutions ? 
                <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                <ChevronDown className="h-5 w-5 text-slate-400" />
              }
            </div>
            
            {expanded.solutions && (
              <div className="mt-4 ml-8 p-4 bg-slate-50 border border-slate-200 rounded-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">URL:</span>
                    <a 
                      href="https://viralhook.wangdadi.xyz/solutions" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      https://viralhook.wangdadi.xyz/solutions
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Last Modified:</span>
                    <span className="text-slate-600">2026-04-05</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Change Frequency:</span>
                    <span className="text-slate-600">daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">Priority:</span>
                    <span className="text-slate-600">0.8</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tool Pages */}
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleExpand('tools')}
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-indigo-500 font-black text-2xl">3</span>
                Tool Pages (100 pages)
              </h2>
              {expanded.tools ? 
                <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                <ChevronDown className="h-5 w-5 text-slate-400" />
              }
            </div>
            
            {expanded.tools && (
              <div className="mt-4 ml-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sitemapData
                    .filter(item => item.type === 'tool')
                    .slice(0, 10) // 只显示前 10 个作为示例
                    .map((item, index) => (
                      <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">URL:</span>
                            <a 
                              href={item.loc} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-indigo-600 hover:underline flex items-center gap-1 text-sm"
                            >
                              {item.loc}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">Last Modified:</span>
                            <span className="text-slate-600 text-sm">{item.lastmod}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">Change Frequency:</span>
                            <span className="text-slate-600 text-sm">{item.changefreq}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">Priority:</span>
                            <span className="text-slate-600 text-sm">{item.priority}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="mt-6 text-center">
                  <p className="text-slate-500">
                    Showing 10 of 100 tool pages. <br />
                    <a 
                      href="/sitemap.xml" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 hover:underline"
                    >
                      View complete sitemap.xml
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sitemap.xml Link */}
          <div className="mt-12 p-6 bg-indigo-50 border border-indigo-200 rounded-md">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Sitemap.xml</h2>
            <p className="text-indigo-800 mb-4">
              The complete sitemap.xml file is available at:
            </p>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              View sitemap.xml
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500">
            Last Updated: {new Date().toLocaleString('default', { month: 'long' })}, 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SitemapPage;