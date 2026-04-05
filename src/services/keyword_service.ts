import keywords from '../../data/keywords.json';

// 扩展关键词数据
const extendedKeywords = keywords.map(keyword => {
  // 生成 key_features
  const keyFeatures = generateKeyFeatures(keyword.keyword, keyword.problem_description);
  
  // 生成 faq
  const faq = generateFAQ(keyword.problem_description, keyword.how_to_solve);
  
  // 生成 variant_type (1-4)
  const variantType = Math.floor(Math.random() * 4) + 1;
  
  // 生成 semantic_tags
  const semanticTags = generateSemanticTags(keyword.keyword, keyword.title);
  
  // 生成 SEO Meta Description
  const seoMetaDescription = generateSEOMetaDescription(keyword.title, keyword.how_to_solve);
  
  return {
    ...keyword,
    key_features: keyFeatures,
    faq: faq,
    variant_type: variantType,
    semantic_tags: semanticTags,
    seo_meta_description: seoMetaDescription
  };
});

// 生成 key_features
function generateKeyFeatures(keyword: string, problemDescription: string): string[] {
  const commonFeatures = [
    '1-click generation',
    'No login required',
    'High-resolution export',
    'Multiple style options',
    'Fast processing',
    'Mobile-friendly',
    'Watermark-free',
    'Customizable colors',
    'Batch processing',
    'Responsive design'
  ];
  
  // 根据关键词和问题描述选择相关功能
  let relevantFeatures: string[] = [];
  
  if (keyword.includes('canva')) {
    relevantFeatures.push('Alternative to Canva');
  }
  
  if (keyword.includes('minimal') || keyword.includes('simple')) {
    relevantFeatures.push('Minimalist design');
  }
  
  if (keyword.includes('fast') || keyword.includes('quick')) {
    relevantFeatures.push('Lightning-fast generation');
  }
  
  if (keyword.includes('social') || keyword.includes('instagram') || keyword.includes('twitter') || keyword.includes('linkedin')) {
    relevantFeatures.push('Social media optimized');
  }
  
  if (keyword.includes('quote')) {
    relevantFeatures.push('Quote formatting');
  }
  
  if (keyword.includes('contrast') || keyword.includes('comparison')) {
    relevantFeatures.push('Before/after comparison');
  }
  
  // 随机选择补充功能
  while (relevantFeatures.length < 3) {
    const randomFeature = commonFeatures[Math.floor(Math.random() * commonFeatures.length)];
    if (!relevantFeatures.includes(randomFeature)) {
      relevantFeatures.push(randomFeature);
    }
  }
  
  return relevantFeatures;
}

// 生成 faq
function generateFAQ(problemDescription: string, howToSolve: string): { question: string; answer: string }[] {
  const faqTemplates = [
    {
      question: 'Is this tool free to use?',
      answer: 'Yes, ViralHook is completely free to use with no hidden costs or watermarks.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, ViralHook requires no registration or login to use its core features.'
    },
    {
      question: 'What file formats can I export?',
      answer: 'You can export your cards as high-quality WebP images, perfect for social media.'
    },
    {
      question: 'Is this tool mobile-friendly?',
      answer: 'Yes, ViralHook is fully responsive and works great on both desktop and mobile devices.'
    },
    {
      question: 'How long does it take to generate a card?',
      answer: 'Cards are generated instantly, usually in less than 1 second.'
    },
    {
      question: 'Can I use these cards for commercial purposes?',
      answer: 'Yes, you have full rights to use the generated cards for both personal and commercial projects.'
    }
  ];
  
  // 选择最相关的 FAQ
  let relevantFAQ: { question: string; answer: string }[] = [];
  
  // 确保至少有两个 FAQ
  while (relevantFAQ.length < 2) {
    const randomFAQ = faqTemplates[Math.floor(Math.random() * faqTemplates.length)];
    if (!relevantFAQ.some(faq => faq.question === randomFAQ.question)) {
      relevantFAQ.push(randomFAQ);
    }
  }
  
  return relevantFAQ;
}

// 生成 semantic_tags
function generateSemanticTags(keyword: string, title: string): string[] {
  const commonTags = [
    'social media',
    'content creation',
    'marketing',
    'design',
    'productivity',
    'solopreneur',
    'creator economy',
    'branding',
    'visual content',
    'digital marketing',
    'social media marketing',
    'content strategy',
    'online business',
    'entrepreneurship',
    'small business'
  ];
  
  // 根据关键词和标题提取相关标签
  let relevantTags: string[] = [];
  
  if (keyword.includes('canva')) {
    relevantTags.push('canva alternative');
  }
  
  if (keyword.includes('quote')) {
    relevantTags.push('quote generator');
  }
  
  if (keyword.includes('instagram')) {
    relevantTags.push('instagram marketing');
  }
  
  if (keyword.includes('twitter') || keyword.includes('x.com')) {
    relevantTags.push('twitter marketing');
  }
  
  if (keyword.includes('linkedin')) {
    relevantTags.push('linkedin marketing');
  }
  
  if (keyword.includes('minimal')) {
    relevantTags.push('minimalist design');
  }
  
  if (keyword.includes('contrast') || keyword.includes('comparison')) {
    relevantTags.push('comparison graphics');
  }
  
  if (keyword.includes('fast') || keyword.includes('quick')) {
    relevantTags.push('fast content creation');
  }
  
  if (keyword.includes('free')) {
    relevantTags.push('free tools');
  }
  
  // 随机选择补充标签
  while (relevantTags.length < 5) {
    const randomTag = commonTags[Math.floor(Math.random() * commonTags.length)];
    if (!relevantTags.includes(randomTag)) {
      relevantTags.push(randomTag);
    }
  }
  
  return relevantTags;
}

// 生成 SEO Meta Description
function generateSEOMetaDescription(title: string, howToSolve: string): string {
  const description = `${title} - ${howToSolve}. Create high-quality visual hooks in seconds with ViralHook, the no-BS marketing tool for solopreneurs and content creators.`;
  // 确保描述长度在 150-160 字符之间
  return description.substring(0, 160);
}

export default extendedKeywords;