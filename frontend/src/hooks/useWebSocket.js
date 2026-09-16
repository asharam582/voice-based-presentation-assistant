import { useRef, useCallback, useEffect } from 'react'

export function useWebSocket({ onMessage, onOpen, onClose } = {}) {
  const wsRef = useRef(null)
  const reconnectTimer = useRef(null)
  const onMessageRef = useRef(onMessage)
  const onOpenRef = useRef(onOpen)
  const onCloseRef = useRef(onClose)

  useEffect(() => { onMessageRef.current = onMessage }, [onMessage])
  useEffect(() => { onOpenRef.current = onOpen }, [onOpen])
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`)
    wsRef.current = ws

    ws.onopen = () => onOpenRef.current?.()
    ws.onmessage = (e) => {
      try {
        onMessageRef.current?.(JSON.parse(e.data))
      } catch (err) {
        console.error('WS parse error', err)
      }
    }
    ws.onclose = () => {
      onCloseRef.current?.()
      reconnectTimer.current = setTimeout(connect, 3000)
    }
    ws.onerror = (err) => console.error('WebSocket error', err)
  }, [])

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      clearTimeout(reconnectTimer.current)
      wsRef.current?.close()
    }
  }, [connect])

  return { send }

}