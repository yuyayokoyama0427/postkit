import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Editor } from './components/Editor'
import { TwitterPreview } from './components/TwitterPreview'
import { InstagramPreview } from './components/InstagramPreview'
import { ThreadsPreview } from './components/ThreadsPreview'
import { TemplatePanel } from './components/TemplatePanel'
import { LicenseModal } from './components/LicenseModal'
import { usePro } from './hooks/usePro'
import { useTemplates } from './hooks/useTemplates'

type Platform = 'x' | 'instagram' | 'threads'

const PLATFORM_LABELS: Record<Platform, string> = {
  x: 'X',
  instagram: 'Instagram',
  threads: 'Threads',
}

const PRO_PLATFORMS: Platform[] = ['instagram', 'threads']

export default function App() {
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState<Platform>('x')
  const [showTemplates, setShowTemplates] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { isPro, activate, deactivate, loading, error } = usePro()
  const { templates, addTemplate, removeTemplate } = useTemplates()

  function handlePlatformChange(p: Platform) {
    if (PRO_PLATFORMS.includes(p) && !isPro) {
      setShowModal(true)
      return
    }
    setPlatform(p)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Analytics />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">PostKit</span>
          <span className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">SNS投稿プレビュー</span>
        </div>
        <div className="flex items-center gap-2">
          {isPro ? (
            <button onClick={deactivate} className="text-xs text-gray-400 hover:text-gray-600">Pro解除</button>
          ) : (
            <button onClick={() => setShowModal(true)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 py-1">Pro版</button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Editor */}
        <div className="space-y-4">
          {/* Platform tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(Object.keys(PLATFORM_LABELS) as Platform[]).map(p => (
              <button
                key={p}
                onClick={() => handlePlatformChange(p)}
                className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition-colors ${platform === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {PLATFORM_LABELS[p]}
                {PRO_PLATFORMS.includes(p) && !isPro && (
                  <span className="ml-1 text-xs text-blue-500">Pro</span>
                )}
              </button>
            ))}
          </div>

          {/* Text editor */}
          <Editor text={text} platform={platform} onChange={setText} />

          {/* Clear button */}
          {text && (
            <button onClick={() => setText('')} className="text-xs text-gray-400 hover:text-gray-600">
              クリア
            </button>
          )}

          {/* Templates */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => {
                if (!isPro) { setShowModal(true); return }
                setShowTemplates(v => !v)
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>テンプレート {!isPro && <span className="text-xs text-blue-500 ml-1">Pro</span>}</span>
              <svg className={`w-4 h-4 transition-transform ${showTemplates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showTemplates && isPro && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="pt-3">
                  <TemplatePanel
                    templates={templates}
                    onLoad={t => { setText(t); setShowTemplates(false) }}
                    onSave={addTemplate}
                    onDelete={removeTemplate}
                    currentText={text}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div>
          <p className="text-xs text-gray-400 mb-3 text-center">プレビュー（参考表示）</p>
          {platform === 'x' && <TwitterPreview text={text} />}
          {platform === 'instagram' && <InstagramPreview text={text} />}
          {platform === 'threads' && <ThreadsPreview text={text} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-8">
        © 2026 PostKit · <a href="https://yomiyasu.lemonsqueezy.com" className="hover:underline">購入はこちら</a>
      </footer>

      {/* License modal */}
      {showModal && (
        <LicenseModal
          onActivate={activate}
          onClose={() => setShowModal(false)}
          loading={loading}
          error={error}
        />
      )}
    </div>
  )
}
