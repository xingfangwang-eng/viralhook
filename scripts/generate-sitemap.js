import fs from 'fs';
import path from 'path';

// 读取关键词数据
const keywords = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'keywords.json'), 'utf8'));

// 生成 sitemap.xml
const generateSitemap = () => {
  const baseUrl = 'https://viralhook.wangdadi.xyz';
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 首页
  sitemap += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // 聚合页
  sitemap += `  <url>
    <loc>${baseUrl}/solutions</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // 100 个关键词页面
  keywords.forEach((keyword) => {
    sitemap += `  <url>
    <loc>${baseUrl}/solutions/${keyword.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // 写入文件
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

// 生成 robots.txt
const generateRobots = () => {
  const baseUrl = 'https://viralhook.wangdadi.xyz';
  const robots = `User-agent: *
Allow: /
Allow: /tools/*
Sitemap: ${baseUrl}/sitemap.xml`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);
  console.log('Robots.txt generated successfully!');
};

// 执行生成
try {
  generateSitemap();
  generateRobots();
  console.log('SEO files generated successfully!');
} catch (error) {
  console.error('Error generating SEO files:', error);
}