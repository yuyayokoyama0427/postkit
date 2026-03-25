import { highlightText } from '../lib/formatter'

interface Props {
  text: string
}

export function TwitterPreview({ text }: Props) {
  const now = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white max-w-sm mx-auto font-sans">
      {/* User row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shrink-0 flex items-center justify-center text-white font-bold text-sm">P</div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">PostKit User</p>
          <p className="text-gray-500 text-xs">@postkit_user</p>
        </div>
      </div>

      {/* Tweet text */}
      <div
        className="text-gray-900 text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: text ? highlightText(text) : '<span class="text-gray-400">投稿内容がここに表示されます</span>' }}
      />

      {/* Time */}
      <p className="text-gray-400 text-xs mb-3">{now} · PostKit</p>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-2">
        <div className="flex items-center gap-6 text-gray-400">
          <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            0
          </button>
          <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            0
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
