export default function SlideNav({ total, current, onSelect }) {
  return (
    <nav className="slide-nav" aria-label="Slide navigation">
      <div className="slide-nav-dots">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === current ? 'nav-dot--active' : ''}`}
            onClick={() => onSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="slide-nav-arrows">
        <button
          className="nav-arrow"
          onClick={() => onSelect(Math.max(0, current - 1))}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          ←
        </button>
        <span className="nav-label">{current + 1} of {total}</span>
        <button
          className="nav-arrow"
          onClick={() => onSelect(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </nav>
  )
}