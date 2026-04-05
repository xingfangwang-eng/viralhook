import { useState, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Menu, Search, Bell, User, Sparkles, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import * as htmlToImage from 'html-to-image'
import SolutionsPage from './app/solutions/page'
import KeywordPage from './app/solutions/[slug]/page'
import SitemapPage from './app/sitemap/page'
import Layout from './components/Layout'
import './App.css'

function Home() {
  const [content, setContent] = useState('Hello\nWorld')
  const [style, setStyle] = useState('minimal')
  const previewCardRef = useRef(null)

  // 处理内容变化
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  // AI 重写功能
  const handleAIrewrite = () => {
    const hooks = [
      'Stop doing [X], start doing [Y]',
      'Why [X] is killing your productivity',
      'The secret to [X] that nobody tells you',
      'How to [X] in 5 simple steps'
    ]
    
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)]
    const rewrittenContent = randomHook + '\n' + content.toUpperCase() + '!'
    setContent(rewrittenContent)
  }

  // 导出功能
  const handleExport = async () => {
    if (previewCardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewCardRef.current)
        const link = document.createElement('a')
        link.download = 'viralhook-preview.webp'
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error('Error exporting image:', error)
      }
    }
  }

  // 分割内容为段落
  const paragraphs = content.split('\n')

  // 渲染预览
  const renderPreview = () => {
    switch (style) {
      case 'minimal':
        return (
          <div className="w-full h-full flex items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white p-6">
            <p className="font-black text-center text-wrap balance text-4xl sm:text-5xl md:text-6xl max-w-full overflow-hidden">{content}</p>
          </div>
        )
      case 'note':
        return (
          <div className="w-full h-full bg-white border-l-4 border-indigo-500 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="text-sm text-slate-500">User</div>
            </div>
            <p className="text-slate-900 whitespace-pre-wrap flex-1 text-wrap balance overflow-auto">{content}</p>
          </div>
        )
      case 'contrast':
        return (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-slate-900 text-white p-6 flex items-center justify-center">
              <p className="text-center text-wrap balance max-w-full overflow-hidden">{paragraphs[0] || ''}</p>
            </div>
            <div className="flex-1 bg-indigo-500 text-white p-6 flex items-center justify-center">
              <p className="text-center text-wrap balance max-w-full overflow-hidden">{paragraphs[1] || ''}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ViralHook</h1>
          <p className="text-slate-500">No-BS Marketing Tool</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - 5/12 */}
          <div className="w-full md:w-5/12 space-y-6">
            {/* Text Editor */}
            <div className="card p-6 bg-white">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Editor</h2>
              <textarea
                value={content}
                onChange={handleContentChange}
                className="input w-full h-64 p-4 border border-slate-200 bg-slate-50 resize-none"
                placeholder="Enter your content here..."
              />
              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <button
                    className={`btn px-4 py-2 transition-transform active:scale-95 ${style === 'minimal' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}
                    onClick={() => setStyle('minimal')}
                  >
                    Minimal
                  </button>
                  <button
                    className={`btn px-4 py-2 transition-transform active:scale-95 ${style === 'note' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}
                    onClick={() => setStyle('note')}
                  >
                    Note
                  </button>
                  <button
                    className={`btn px-4 py-2 transition-transform active:scale-95 ${style === 'contrast' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}
                    onClick={() => setStyle('contrast')}
                  >
                    Contrast
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn flex-1 px-4 py-2 bg-purple-500 text-white flex items-center justify-center gap-2 transition-transform active:scale-95"
                    onClick={handleAIrewrite}
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Rewrite
                  </button>
                  <button
                    className="btn flex-1 px-4 py-2 bg-slate-700 text-white flex items-center justify-center gap-2 transition-transform active:scale-95"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4" />
                    Export WebP
                  </button>
                </div>
                <div className="mt-4">
                  <a 
                    href="/solutions" 
                    className="btn w-full px-4 py-2 bg-indigo-500 text-white flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Browse All Alternatives
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 7/12 */}
          <div className="w-full md:w-7/12">
            {/* Preview Card */}
            <div className="card p-6 bg-white">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Preview</h2>
              <div 
                id="preview-card" 
                ref={previewCardRef}
                className="w-full aspect-square border border-slate-200 rounded-lg overflow-hidden relative"
              >
                <motion.div 
                  key={style}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {renderPreview()}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Quick Access */}
      <section className="bg-white border-t border-b border-slate-200 py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Simple Canva Alternative',
              'Minimalist Twitter Cards',
              'LinkedIn Hook Generator',
              'Black and White Quote Cards',
              'Text to Viral Hooks',
              'Notion Style Quote Cards',
              'Before vs After Text Cards',
              'Hootsuite Alternative',
              'Instagram Hook Generator',
              'Premium Typography',
              'Visual Hook Maker',
              'Contrast Card Generator',
              'Social Media Fonts',
              'Blog to Instagram Cards',
              'Anti-Design Trend Posts'
            ].map((item, index) => (
              <a 
                key={index} 
                href={`/solutions/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-slate-600 mb-2">© 2026 ViralHook. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Support: 457239850@qq.com</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:slug" element={<KeywordPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
      </Routes>
    </Layout>
  )
}

export default App
