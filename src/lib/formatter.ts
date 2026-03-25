const URL_REGEX = /https?:\/\/\S+/g
const URL_LENGTH = 23 // Xのt.co換算

export function calcXLength(text: string): number {
  const replaced = text.replace(URL_REGEX, '_'.repeat(URL_LENGTH))
  return [...replaced].length // Unicode対応
}

export function trimText(text: string): string {
  return text
    .replace(/\n{3,}/g, '\n\n') // 連続改行を最大2行に
    .trim()
}

export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\w\u3040-\u9FFF\uFF00-\uFFEF]+/g) ?? []
  return [...new Set(matches)]
}

export function highlightText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(https?:\/\/\S+)/g, '<span class="text-sky-500">$1</span>')
    .replace(/(#[\w\u3040-\u9FFF\uFF00-\uFFEF]+)/g, '<span class="text-sky-500">$1</span>')
    .replace(/(@\w+)/g, '<span class="text-sky-500">$1</span>')
    .replace(/\n/g, '<br>')
}

export function splitIntoThread(text: string, limit = 140): string[] {
  const parts: string[] = []
  const lines = text.split('\n')
  let current = ''
  for (const line of lines) {
    const candidate = current ? current + '\n' + line : line
    if ([...candidate].length > limit) {
      if (current) parts.push(current)
      current = line
    } else {
      current = candidate
    }
  }
  if (current) parts.push(current)
  return parts
}
