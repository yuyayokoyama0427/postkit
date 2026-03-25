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
  const limit = LIMITS[platform]
  const count = platform === 'x' ? calcXLength(text) : [...text].length
  const remaining = limit - count
  const isOver = remaining < 0

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{LABELS[platform]}</label>
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
