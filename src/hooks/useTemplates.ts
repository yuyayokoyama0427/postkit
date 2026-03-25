import { useState } from 'react'

const STORAGE_KEY = 'postkit_templates'

export interface Template {
  id: string
  name: string
  text: string
  createdAt: string
}

function load(): Template[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(templates: Template[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>(load)

  function addTemplate(name: string, text: string) {
    const t: Template = { id: crypto.randomUUID(), name, text, createdAt: new Date().toISOString() }
    const next = [t, ...templates].slice(0, 20)
    save(next)
    setTemplates(next)
  }

  function removeTemplate(id: string) {
    const next = templates.filter(t => t.id !== id)
    save(next)
    setTemplates(next)
  }

  return { templates, addTemplate, removeTemplate }
}
