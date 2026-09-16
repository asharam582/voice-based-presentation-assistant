import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSlides } from '../context/SlidesContext'

const emptySlide = (id) => ({
  id,
  title: '',
  bullets: ['', ''],
  speaker_notes: '',
  keywords: [],
  visual_hint: '',
})

export default function ManualSlides() {
  const [slides, setSlides] = useState([emptySlide(1), emptySlide(2), emptySlide(3)])
  const [topic, setTopic] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useSlides()

  const addSlide = () =>
    setSlides((s) => [...s, emptySlide(s.length + 1)])

  const removeSlide = (i) =>
    setSlides((s) => s.filter((_, idx) => idx !== i).map((sl, idx) => ({ ...sl, id: idx + 1 })))

  const updateTitle = (i, val) =>
    setSlides((s) => s.map((sl, idx) => idx === i ? { ...sl, title: val } : sl))

  const updateBullet = (si, bi, val) =>
    setSlides((s) =>
      s.map((sl, idx) =>
        idx !== si ? sl : { ...sl, bullets: sl.bullets.map((b, j) => j === bi ? val : b) }
      )
    )

  const addBullet = (i) =>
    setSlides((s) => s.map((sl, idx) => idx === i ? { ...sl, bullets: [...sl.bullets, ''] } : sl))

  const removeBullet = (si, bi) =>
    setSlides((s) =>
      s.map((sl, idx) =>
        idx !== si ? sl : { ...sl, bullets: sl.bullets.filter((_, j) => j !== bi) }
      )
    )

  const updateNotes = (i, val) =>
    setSlides((s) => s.map((sl, idx) => idx === i ? { ...sl, speaker_notes: val } : sl))

  const handleStart = () => {
    const clean = slides
      .map((s, i) => ({
        ...s,
        id: i + 1,
        bullets: s.bullets.filter((b) => b.trim()),
      }))
      .filter((s) => s.title.trim())

    dispatch({ type: 'SET_SLIDES', payload: { slides: clean, topic: topic.trim() || 'Presentation' } })
    navigate('/present')
  }

  const canStart = slides.some((s) => s.title.trim())

  return (
    <div className="create-layout create-layout--manual">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <h1 className="create-title">Build Your Slides</h1>

      <input
        className="topic-input"
        placeholder="Presentation title (optional)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ marginBottom: '2rem' }}
      />

      <div className="slide-editors">
        {slides.map((slide, i) => (
          <div className="slide-editor-card" key={i}>
            <div className="slide-editor-header">
              <span className="slide-number">Slide {i + 1}</span>
              {slides.length > 1 && (
                <button className="btn-ghost small" onClick={() => removeSlide(i)}>Remove</button>
              )}
            </div>

            <input
              className="slide-title-input"
              placeholder="Slide title"
              value={slide.title}
              onChange={(e) => updateTitle(i, e.target.value)}
            />

            <div className="bullets-list">
              {slide.bullets.map((b, j) => (
                <div className="bullet-row" key={j}>
                  <span className="bullet-dot">•</span>
                  <input
                    className="bullet-input"
                    placeholder={`Point ${j + 1}`}
                    value={b}
                    onChange={(e) => updateBullet(i, j, e.target.value)}
                  />
                  {slide.bullets.length > 1 && (
                    <button className="bullet-remove" onClick={() => removeBullet(i, j)}>×</button>
                  )}
                </div>
              ))}
              <button className="btn-ghost small" onClick={() => addBullet(i)}>+ Add point</button>
            </div>

            <textarea
              className="notes-input"
              placeholder="Speaker notes (optional — what the AI should say about this slide)"
              value={slide.speaker_notes}
              onChange={(e) => updateNotes(i, e.target.value)}
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="editor-actions">
        {slides.length < 8 && (
          <button className="btn-secondary" onClick={addSlide}>+ Add Slide</button>
        )}
        <button className="btn-primary" onClick={handleStart} disabled={!canStart}>
          Start Presentation →
        </button>
      </div>
    </div>
  )
}