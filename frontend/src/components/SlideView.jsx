export default function SlideView({ slide, index, total }) {
  if (!slide) return null
  return (
    <div className="slide-view" key={index}>
      <div className="slide-meta">
        <span className="slide-counter">{index + 1} / {total}</span>
        {slide.visual_hint && (
          <span className="slide-visual-hint">{slide.visual_hint}</span>
        )}
      </div>
      <h2 className="slide-title">{slide.title}</h2>
      <ul className="slide-bullets">
        {slide.bullets?.map((b, i) => (
          <li
            key={i}
            className="slide-bullet"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {b}
          </li>
        ))}
      </ul>
      {slide.keywords?.length > 0 && (
        <div className="slide-keywords">
          {slide.keywords.map((kw) => (
            <span key={kw} className="keyword-tag">{kw}</span>
          ))}
        </div>
      )}
    </div>
  )
}