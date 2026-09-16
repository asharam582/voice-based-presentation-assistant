const STATE_COLORS = {
  idle:       'var(--text-muted)',
  presenting: 'var(--accent)',
  listening:  'var(--success)',
  thinking:   'var(--warning)',
  speaking:   'var(--accent)',
}

export default function StatusBar({ message, state = 'idle' }) {
  return (
    <div className="status-bar">
      <span className="status-dot" style={{ background: STATE_COLORS[state] || 'var(--text-muted)' }} />
      <span className="status-message">{message}</span>
    </div>
  )

}