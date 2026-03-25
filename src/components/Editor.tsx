import { useState } from 'react'
import { calcXLength } from '../lib/formatter'

interface Props {
  text: string
  platform: 'x' | 'instagram' | 'threads'
  onChange: (text: string) => void
}

const LIMITS: Record<Props['platform'], number> = {
  x: 140,
  instagram: 2200,
  threads: 500,
}

const LABELS: Record<Props['platform'], string> = {
  x: 'X（文字数はURL換算あり）',
  instagram: 'Instagram',
  threads: 'Threads',
}

export function Editor({ text, platform, onChange }: Props) {
  const [copied, setCopied] = useState(false)
  const limit = LIMITS[platform]
  const count = platform === 'x' ? calcXLength(text) : [...text].length
  const remaining = limit - count
  const isOver = remaining < 0

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-gray-500">{LABELS[platform]}</label>
        {text && (
          <button
            onClick={handleCopy}
            className="text-xs text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-green-500">コピー済み</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                コピー
              </>
            )}
          </button>
        )}
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
        placeholder="投稿内容を入力..."
        value={text}
        onChange={e => onChange(e.target.value)}
      />
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400">{count.toLocaleString()} / {limit.toLocaleString()}</span>
        <span className={`text-xs font-medium ${isOver ? 'text-red-500' : remaining <= 20 ? 'text-yellow-500' : 'text-gray-400'}`}>
          {isOver ? `${Math.abs(remaining)}文字オーバー` : `残り${remaining}文字`}
        </span>
      </div>
    </div>
  )
}
