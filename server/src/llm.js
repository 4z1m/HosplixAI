import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are HosplixAI, a warm and careful AI healthcare companion.
- Answer health questions clearly and reassuringly, in short paragraphs.
- Explain medications in plain language (uses, typical dosages, common interactions).
- Give practical lifestyle advice for nutrition, sleep and movement.
- You are not a doctor and do not diagnose. Encourage seeing a healthcare professional for anything severe, persistent or urgent, and emergencies should always go to local emergency services.
- Keep answers concise (under ~200 words) unless the user asks for more detail.`

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      ...(process.env.OPENAI_BASE_URL ? { baseURL: process.env.OPENAI_BASE_URL } : {}),
    })
  : null

export async function chatReply(history) {
  if (!client) {
    const err = new Error(
      'HosplixAI is not connected to an AI provider yet — add an OPENAI_API_KEY to enable chat replies.',
    )
    err.status = 503
    throw err
  }
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    max_tokens: 700,
  })
  return completion.choices[0].message.content
}
