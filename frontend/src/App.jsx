import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SlidesProvider } from './context/SlidesContext'
import Home from './pages/Home'
import GenerateSlides from './pages/GenerateSlides'
import ManualSlides from './pages/ManualSlides'
import Present from './pages/Present'

export default function App() {
  return (
    <SlidesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create/generate" element={<GenerateSlides />} />
          <Route path="/create/manual" element={<ManualSlides />} />
          <Route path="/present" element={<Present />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SlidesProvider>
  )
}

