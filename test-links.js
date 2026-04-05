import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// 要测试的 URL 列表
const urls = [
  'https://schema.org',
  'https://picsum.photos/seed/john/200/200',
  'https://picsum.photos/seed/jane/200/200',
  'https://picsum.photos/seed/robert/200/200'
];

// 测试单个 URL 的函数
function testUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      resolve({ url, statusCode: res.statusCode, statusMessage: res.statusMessage });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

// 测试所有 URL
async function testAllUrls() {
  console.log('Testing external links...');
  console.log('====================================');
  
  const results = await Promise.all(urls.map(testUrl));
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.url} - Error: ${result.error}`);
    } else if (result.statusCode === 200) {
      console.log(`✅ ${result.url} - Status: ${result.statusCode} ${result.statusMessage}`);
    } else {
      console.log(`⚠️  ${result.url} - Status: ${result.statusCode} ${result.statusMessage}`);
    }
  });
  
  console.log('====================================');
  console.log('Link test completed.');
}

testAllUrls();