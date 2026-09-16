import { createContext, useContext, useReducer } from 'react'

const initialState = {
  slides: [],
  topic: '',
  currentSlide: 0,
  speechState: 'idle',   // idle | presenting | listening | thinking | speaking
  transcript: '',
  statusMessage: 'Ready',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SLIDES':
      return { ...state, slides: action.payload.slides, topic: action.payload.topic, currentSlide: 0 }
    case 'SET_CURRENT_SLIDE':
      return { ...state, currentSlide: action.payload }
    case 'SET_SPEECH_STATE':
      return { ...state, speechState: action.payload }
    case 'SET_TRANSCRIPT':
      return { ...state, transcript: action.payload }
    case 'SET_STATUS':
      return { ...state, statusMessage: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const SlidesContext = createContext(null)

export function SlidesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <SlidesContext.Provider value={{ state, dispatch }}>
      {children}
    </SlidesContext.Provider>
  )
}

export function useSlides() {
  const ctx = useContext(SlidesContext)
  if (!ctx) throw new Error('useSlides must be used within SlidesProvider')
  return ctx
}

