import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { key } = req.body as { key?: string }
  if (!key) return res.status(400).json({ valid: false })

  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ license_key: key, instance_name: 'postkit' }),
    })

    const data = await response.json() as { valid: boolean; store_id?: number }

    if (data.valid && storeId && String(data.store_id) === storeId) {
      return res.json({ valid: true })
    }
    return res.json({ valid: false })
  } catch {
    return res.status(500).json({ valid: false })
  }
}
