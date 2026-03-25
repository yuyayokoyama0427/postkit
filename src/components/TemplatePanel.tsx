import { useState } from 'react'
import type { Template } from '../hooks/useTemplates'

interface Props {
  templates: Template[]
  onLoad: (text: string) => void
  onSave: (name: string, text: string) => void
  onDelete: (id: string) => void
  currentText: string
}

export function TemplatePanel({ templates, onLoad, onSave, onDelete, currentText }: Props) {
  const [name, setName] = useState('')

  function handleSave() {
    const n = name.trim() || `テンプレート${templates.length + 1}`
    onSave(n, currentText)
    setName('')
  }

  return (
    <div className="space-y-3">
      {/* Save current */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="テンプレート名（省略可）"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg px-3 py-1.5 disabled:opacity-40"
          onClick={handleSave}
          disabled={!currentText.trim()}
        >
          保存
        </button>
      </div>

      {/* List */}
      {templates.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">テンプレートがありません</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {templates.map(t => (
            <li key={t.id} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <button
                className="flex-1 text-left text-sm text-gray-800 truncate hover:text-blue-600"
                onClick={() => onLoad(t.text)}
              >
                {t.name}
              </button>
              <button
                className="text-gray-300 hover:text-red-400 shrink-0"
                onClick={() => onDelete(t.id)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-400 text-right">{templates.length} / 20件</p>
    </div>
  )
}
