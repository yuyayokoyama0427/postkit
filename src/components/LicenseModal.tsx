import { useState } from 'react'

const CHECKOUT_URL = 'https://yomiyasu.lemonsqueezy.com/checkout/buy/postkit-placeholder'

interface Props {
  onActivate: (key: string) => Promise<void>
  onClose: () => void
  loading: boolean
  error: string | null
}

export function LicenseModal({ onActivate, onClose, loading, error }: Props) {
  const [key, setKey] = useState('')
  const [view, setView] = useState<'upgrade' | 'activate'>('upgrade')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">×</button>

        {view === 'upgrade' ? (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Pro版にアップグレード</h2>
            <p className="text-sm text-gray-500 mb-5">買い切り1,000円で全機能が使えます。</p>
            <div className="bg-blue-50 rounded-xl p-4 mb-5 space-y-1.5">
              <p className="text-sm font-semibold text-blue-700 mb-2">Pro版でできること</p>
              <p className="text-sm text-blue-600">✓ Instagram・Threadsプレビュー</p>
              <p className="text-sm text-blue-600">✓ 投稿テンプレート保存（最大20件）</p>
              <p className="text-sm text-blue-600">✓ スレッド（連投）自動分割</p>
              <p className="text-xs text-blue-400 mt-2">買い切り 1,000円（税込）</p>
            </div>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl py-3 text-sm font-semibold mb-3">
              Pro版を購入する
            </a>
            <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
              onClick={() => setView('activate')}>
              すでに購入済みの方はこちら
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-1">ライセンスキーを入力</h2>
            <p className="text-sm text-gray-500 mb-4">購入後にメールで届いたキーを入力してください。</p>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value={key}
              onChange={e => setKey(e.target.value)}
            />
            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
                onClick={() => onActivate(key)}
                disabled={loading || !key.trim()}
              >
                {loading ? '確認中...' : '有効化する'}
              </button>
              <button className="px-4 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={onClose}>
                キャンセル
              </button>
            </div>
            <button className="w-full text-xs text-gray-400 hover:text-gray-600 mt-3"
              onClick={() => setView('upgrade')}>
              ← 戻る
            </button>
          </>
        )}
      </div>
    </div>
  )
}
