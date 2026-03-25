import { highlightText } from '../lib/formatter'

interface Props {
  text: string
}

export function InstagramPreview({ text }: Props) {
  const hashtags = text.match(/#[\w\u3040-\u9FFF\uFF00-\uFFEF]+/g) ?? []

  return (
    <div className="border border-gray-200 rounded-2xl bg-white max-w-sm mx-auto font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0" />
        <p className="font-semibold text-gray-900 text-sm">postkit_user</p>
        <span className="ml-auto text-gray-400 text-lg">···</span>
      </div>

      {/* Image placeholder */}
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 aspect-square flex items-center justify-center">
        <span className="text-gray-400 text-sm">画像エリア</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex items-center gap-4 text-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        <svg className="w-6 h-6 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-900 leading-relaxed">
          <span className="font-semibold mr-1">postkit_user</span>
          <span dangerouslySetInnerHTML={{ __html: text ? highlightText(text) : '<span class="text-gray-400">投稿内容がここに表示されます</span>' }} />
        </p>
        {hashtags.length > 0 && (
          <p className="text-sky-500 text-xs mt-1">{hashtags.join(' ')}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">文字数：{[...text].length} / 2,200</p>
      </div>
    </div>
  )
}
