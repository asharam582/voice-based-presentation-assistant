import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-layout">
      <div className="home-hero">
        <div className="home-badge">AI-Powered Voice Presentation</div>
        <h1 className="home-title">Present with your voice</h1>
        <p className="home-subtitle">
          Speak naturally — your AI co-presenter navigates slides, answers questions, and responds instantly.
        </p>
      </div>

      <div className="mode-cards mode-cards--single">
        <button className="mode-card" onClick={() => navigate('/create/generate')}>
          <div className="mode-icon">✦</div>
          <div className="mode-card-body">
            <h2>Generate from Topic</h2>
            <p>Type any topic and AI instantly creates a structured 6-slide presentation ready to present.</p>
          </div>
          <span className="mode-card-arrow">→</span>
        </button>
      </div>

      <p className="home-note">
        Requires Chrome or Edge · Microphone access needed
      </p>
    </div>
  )
}




