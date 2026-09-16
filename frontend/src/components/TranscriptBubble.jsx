export default function TranscriptBubble({ text }) {
  if (!text) return null
  return (
    <div className="transcript-bubble">
      <span className="transcript-label">You said</span>
      <p className="transcript-text">"{text}"</p>
    </div>
  )
}