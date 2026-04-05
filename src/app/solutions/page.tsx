import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Grid, List, Filter, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import extendedKeywords from '../../services/keyword_service';

// 自动分类逻辑
const categorizeKeywords = (keywords) => {
  const categories = {
    'Social Media Tools': [],
    'Content Creation': [],
    'Design Alternatives': [],
    'Marketing Utilities': [],
    'Productivity Tools': []
  };

  keywords.forEach(item => {
    const { keyword, title } = item;
    const text = `${keyword} ${title}`.toLowerCase();

    if (text.includes('social') || text.includes('instagram') || text.includes('twitter') || text.includes('linkedin') || text.includes('threads')) {
      categories['Social Media Tools'].push(item);
    } else if (text.includes('content') || text.includes('quote') || text.includes('text') || text.includes('card')) {
      categories['Content Creation'].push(item);
    } else if (text.includes('canva') || text.includes('alternative') || text.includes('slow') || text.includes('lag')) {
      categories['Design Alternatives'].push(item);
    } else if (text.includes('marketing') || text.includes('hook') || text.includes('brand') || text.includes('ads')) {
      categories['Marketing Utilities'].push(item);
    } else {
      categories['Productivity Tools'].push(item);
    }
  });

  return categories;
};

const SolutionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // 初始化分类
  useEffect(() => {
    const categorized = categorizeKeywords(extendedKeywords);
    setCategories(categorized);
    setFilteredKeywords(extendedKeywords);
  }, []);

  // 处理搜索
  useEffect(() => {
    if (searchTerm === '' && selectedCategory === 'All') {
      setFilteredKeywords(extendedKeywords);
    } else {
      let filtered = extendedKeywords;
      
      // 按分类筛选
      if (selectedCategory !== 'All') {
        filtered = categories[selectedCategory] || [];
      }
      
      // 按搜索词筛选
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(item => 
          item.keyword.toLowerCase().includes(term) || 
          item.title.toLowerCase().includes(term) ||
          item.problem_description.toLowerCase().includes(term)
        );
      }
      
      setFilteredKeywords(filtered);
    }
  }, [searchTerm, selectedCategory, categories]);

  // 重置页码当搜索词或分类变化时
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // 获取所有分类
  const allCategories = ['All', ...Object.keys(categories)];

  // 分页逻辑
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKeywords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKeywords.length / itemsPerPage);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'ViralHook Solutions',
            'description': 'A collection of 100 marketing tools and solutions for content creators and solopreneurs.',
            'itemListElement': extendedKeywords.map((item, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': item.title,
              'url': `https://viralhook.com/solutions/${item.slug}`
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto my-12 px-6">
        {/* Hero Section */}
        <div className="bg-white border border-slate-200 p-10 mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
            100+ Marketing Solutions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Discover the ultimate collection of marketing tools and solutions designed for solopreneurs, content creators, and small businesses. From social media graphics to productivity boosters, find everything you need to grow your brand.
          </p>
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky top-0 z-10 bg-white border border-slate-200 p-4 mb-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Grid className="h-5 w-5 text-slate-400" />
                Grid
              </button>
              <button className="px-4 py-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors flex items-center gap-2">
                <List className="h-5 w-5 text-slate-400" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="mb-12 overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 border ${selectedCategory === category ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-700'} rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap`}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <article key={item.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-indigo-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 mb-6 line-clamp-3">
                {item.problem_description}
              </p>
              <a
                href={`/solutions/${item.slug}`}
                className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors font-medium"
              >
                Learn how to solve {item.keyword.toLowerCase()}
                <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-4 py-2 border rounded-md ${currentPage === pageNumber ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'} transition-colors`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        )}

        {/* Category Sections */}
        {Object.entries(categories).map(([category, items]) => (
          <section key={category} className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-500"></div>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-indigo-300 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {item.problem_description}
                  </p>
                  <a
                    href={`/solutions/${item.slug}`}
                    className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors font-medium"
                  >
                    View Solution
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600">© 2026 ViralHook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SolutionsPage;