import { highlightText } from '../lib/formatter'

interface Props {
  text: string
}

export function ThreadsPreview({ text }: Props) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white max-w-sm mx-auto font-sans">
      {/* User row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shrink-0 flex items-center justify-center text-white font-bold text-sm">P</div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">postkit_user</p>
          {/* Thread text */}
          <div
            className="text-gray-900 text-sm leading-relaxed mt-1 whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: text ? highlightText(text) : '<span class="text-gray-400">投稿内容がここに表示されます</span>' }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 text-gray-400 ml-12">
        <button className="flex items-center gap-1 hover:text-pink-500 transition-colors text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          0
        </button>
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          返信
        </button>
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          0
        </button>
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors text-xs ml-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </button>
      </div>

      {/* char count */}
      <p className="text-gray-400 text-xs mt-3 ml-12">文字数：{[...text].length} / 500</p>
    </div>
  )
}
