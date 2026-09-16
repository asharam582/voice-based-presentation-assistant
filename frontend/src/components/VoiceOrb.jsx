export default function VoiceOrb({ state = 'idle' }) {
  return (
    <div className={`voice-orb voice-orb--${state}`} aria-label={`AI is ${state}`}>
      <div className="orb-bg-glow" />
      <div className="orb-ring orb-ring--3" />
      <div className="orb-ring orb-ring--2" />
      <div className="orb-ring orb-ring--1" />
      <div className="orb-sphere">
        <div className="orb-glare" />
      </div>
    </div>
  )

}