import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSlides } from '../context/SlidesContext'

const EXAMPLES = [
  'The Voice AI Revolution',
  'Future of Remote Work',
  'Building Sustainable Cities',
  'Quantum Computing Explained',
]

export default function GenerateSlides() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useSlides()

  const handleGenerate = async () => {
    const trimmed = topic.trim()
    if (!trimmed) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmed }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      dispatch({ type: 'SET_SLIDES', payload: { slides: data.slides, topic: data.topic } })
      navigate('/present')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-layout">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <h1 className="create-title">Generate Slides</h1>
      <p className="create-subtitle">Enter a topic and AI will create a 6-slide presentation.</p>

      <div className="topic-form">
        <input
          className="topic-input"
          placeholder="e.g. The Voice AI Revolution"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
          disabled={loading}
          autoFocus
        />
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner" /> Generating slides…
            </span>
          ) : (
            'Generate & Present →'
          )}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      <div className="example-chips">
        <span className="chips-label">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="chip"
            onClick={() => setTopic(ex)}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}



