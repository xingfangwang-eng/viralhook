import { useParams } from 'react-router-dom'
import { Sparkles, Download, Code, MessageSquare, Clock, ArrowRight, CheckCircle, Info, Tag } from 'lucide-react'
import extendedKeywords from '../../services/keyword_service'
import Hero_A from '../../components/seo/Hero_A'
import Hero_B from '../../components/seo/Hero_B'
import ProblemBlock from '../../components/seo/ProblemBlock'
import FeatureGrid from '../../components/seo/FeatureGrid'
import FAQSection from '../../components/seo/FAQSection'

// 生成哈希值的函数
const generateHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
};

// 获取相关工具页面
const getRelatedTools = (currentSlug: string, currentTags: string[]): any[] => {
  return extendedKeywords
    .filter(item => item.slug !== currentSlug) // 排除当前页面
    .map(item => {
      // 计算标签相似度
      let similarity = 0;
      currentTags.forEach(tag => {
        if (item.semantic_tags.includes(tag)) {
          similarity++;
        }
      });
      return { ...item, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity) // 按相似度排序
    .slice(0, 5); // 取前5个最相似的
};

// 生成代码示例
const generateCodeExample = () => {
  const codeExamples = [
    `// Example: Using ViralHook API
const generateCard = async (text, style) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ text, style }),
  });
  const data = await response.json();
  return data.imageUrl;
};

// Usage
generateCard('Hello World', 'minimal')
  .then(url => console.log('Card generated:', url));`,
    `// Example: Batch generation
const batchGenerate = async (texts) => {
  const promises = texts.map(text => 
    fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ text, style: 'note' }),
    })
  );
  
  const responses = await Promise.all(promises);
  return Promise.all(responses.map(r => r.json()));
};

// Usage
batchGenerate(['Hook 1', 'Hook 2', 'Hook 3'])
  .then(results => console.log('Batch generated:', results));`,
    `// Example: Custom styling
const generateCustomCard = async (text) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      text,
      style: 'contrast',
      customColors: {
        top: '#1e293b',
        bottom: '#6366f1'
      }
    }),
  });
  const data = await response.json();
  return data.imageUrl;
};`
  ];
  
  return codeExamples[Math.floor(Math.random() * codeExamples.length)];
};

// 渲染页面
const Page = () => {
  const { slug } = useParams();
  const keywordData = extendedKeywords.find(item => item.slug === slug);
  
  if (!keywordData || !slug) {
    return (
      <div className="max-w-7xl mx-auto my-12 px-6">
        <h1 className="text-5xl font-black text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-600">The requested page does not exist.</p>
      </div>
    );
  }
  
  // 生成哈希值
  const hash = generateHash(slug);
  
  // 决定使用哪个 Hero 组件
  const useHeroA = hash % 2 === 0;
  
  // 决定 ProblemBlock 和 FeatureGrid 的顺序
  const problemFirst = (hash % 4) < 2;
  
  // 决定是否展示 FAQSection (50% 概率)
  const showFAQ = (hash % 2) === 0;
  
  // 决定背景色
  const bgColorIndex = hash % 3;
  const bgColors = ['bg-white', 'bg-slate-50', 'bg-indigo-50'];
  const bgColor = bgColors[bgColorIndex];
  
  // 决定边框颜色
  const borderColors = ['border-slate-200', 'border-slate-200', 'border-indigo-200'];
  const borderColor = borderColors[bgColorIndex];
  
  // 决定边框圆角
  const borderRadius = 'rounded-lg';
  
  const { title, problem_description, how_to_solve, key_features, faq, semantic_tags, seo_meta_description } = keywordData;
  const codeExample = generateCodeExample();
  
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'ViralHook',
            'description': seo_meta_description,
            'applicationCategory': 'Productivity',
            'operatingSystem': 'All',
            'url': `https://viralhook.com/${slug}`,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
              'availability': 'https://schema.org/InStock'
            },
            'review': [
              {
                '@type': 'Review',
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': '5',
                  'bestRating': '5'
                },
                'author': {
                  '@type': 'Person',
                  'name': 'John Doe'
                },
                'reviewBody': 'This tool has saved me hours of design work. The minimalist style is perfect for my brand.'
              },
              {
                '@type': 'Review',
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': '4',
                  'bestRating': '5'
                },
                'author': {
                  '@type': 'Person',
                  'name': 'Jane Smith'
                },
                'reviewBody': 'The contrast mode is amazing for creating before/after graphics. So easy to use!'
              }
            ]
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
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Column - 65% */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hero Section */}
            {useHeroA ? (
              <Hero_A 
                title={title} 
                description={seo_meta_description} 
                backgroundColor={bgColor}
                borderColor={borderColor}
                borderRadius={borderRadius}
              />
            ) : (
              <Hero_B 
                title={title} 
                description={seo_meta_description} 
                backgroundColor={bgColor}
                borderColor={borderColor}
                borderRadius={borderRadius}
              />
            )}
            
            {/* Problem and Feature Sections */}
            {problemFirst ? (
              <>
                {/* Problem Section */}
                <ProblemBlock 
                  problemDescription={problem_description}
                  backgroundColor={bgColor}
                  borderColor={borderColor}
                  borderRadius={borderRadius}
                />
                
                {/* Key Features Section */}
                <FeatureGrid 
                  keyFeatures={key_features}
                  backgroundColor={bgColor}
                  borderColor={borderColor}
                  borderRadius={borderRadius}
                />
              </>
            ) : (
              <>
                {/* Key Features Section */}
                <FeatureGrid 
                  keyFeatures={key_features}
                  backgroundColor={bgColor}
                  borderColor={borderColor}
                  borderRadius={borderRadius}
                />
                
                {/* Problem Section */}
                <ProblemBlock 
                  problemDescription={problem_description}
                  backgroundColor={bgColor}
                  borderColor={borderColor}
                  borderRadius={borderRadius}
                />
              </>
            )}
            
            {/* The Tool Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                The Tool
              </h2>
              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <textarea 
                  className="w-full h-32 p-4 border border-slate-200 bg-white rounded-lg resize-none mb-4"
                  defaultValue={title}
                  placeholder="Enter your hook here..."
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">Minimal</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg">Note</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg">Contrast</button>
                </div>
                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors active:scale-95 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate Card
                </button>
              </div>
            </div>
            
            {/* The Guide Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                The Guide
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {how_to_solve} Here's how to make the most of this approach:
              </p>
              <ol className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Start with a Clear Hook</h3>
                    <p className="text-slate-600">Your hook should be concise and attention-grabbing, ideally 1-2 sentences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Choose the Right Style</h3>
                    <p className="text-slate-600">Select the style that best matches your brand and the platform you're targeting.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Export and Share</h3>
                    <p className="text-slate-600">Download your high-resolution card and share it across your social channels.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            {/* Code Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Implementation Example
              </h2>
              <div className="bg-slate-900 text-white p-6 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
            
            {/* FAQ Section (conditional) */}
            {showFAQ && (
              <FAQSection 
                faq={faq}
                backgroundColor={bgColor}
                borderColor={borderColor}
                borderRadius={borderRadius}
              />
            )}
            
            {/* Semantic Tags Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Related Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {semantic_tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Explore More Tools Section */}
            <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-500"></div>
                Explore More Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {getRelatedTools(slug, semantic_tags).map((tool, index) => (
                  <a key={index} href={`/${tool.slug}`} className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <p className="text-indigo-500 hover:text-indigo-700 transition-colors">
                      How to solve {tool.title.toLowerCase()}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - 35% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Sticky Sidebar */}
            <div className="sticky top-8 space-y-8">
              {/* User Comments */}
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
              
              {/* Related Links */}
              <div className={`${bgColor} border ${borderColor} ${borderRadius} p-8`}>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      <span>How to Write Better Hooks</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      <span>Social Media Image Sizes Guide</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      <span>10 Proven Hook Templates</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      <span>Content Repurposing Strategy</span>
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Call to Action */}
              <div className="bg-indigo-50 border border-indigo-200 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
                <p className="text-slate-600 mb-6">
                  Create your first viral hook in seconds. No login required.
                </p>
                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors active:scale-95 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
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
          <p className="text-slate-600">© 2026 ViralHook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;