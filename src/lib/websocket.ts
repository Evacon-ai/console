import { ref } from 'vue'

class WebSocketService {
  private socket: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 1000 // Start with 1 second
  private subscribed = false
  private url: string
  private userStore: any = null

  constructor() {
    // Use secure WebSocket if the page is served over HTTPS
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = import.meta.env.VITE_API_HOST || window.location.host
    this.url = `${protocol}//${host}/ws`
  }

  connect(userStore?: any) {
    if (this.socket?.readyState === WebSocket.OPEN) return
    
    // Store the userStore reference if provided
    if (userStore) {
      this.userStore = userStore
    }
    
    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
      this.reconnectTimeout = 1000
      this.subscribe()
    }

    this.socket.onclose = () => {
      console.log('WebSocket disconnected')
      this.subscribed = false
      this.reconnect()
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return this.socket
  }

  subscribe() {
    if (!this.socket || this.subscribed || !this.userStore) return

    const user = this.userStore.currentUser

    if (!user) return

    // Subscribe based on user level
    if (user.level === 'evacon') {
      this.socket.send(JSON.stringify({
        type: 'subscribe',
        isAdmin: true
      }))
    } else if (user.level === 'customer' && user.organization_id) {
      this.socket.send(JSON.stringify({
        type: 'subscribe',
        organizationId: user.organization_id
      }))
    }

    this.subscribed = true
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached')
      return
    }

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`)
      this.reconnectAttempts++
      this.reconnectTimeout *= 2 // Exponential backoff
      this.connect()
    }, this.reconnectTimeout)
  }

  onMessage(callback: (data: any) => void) {
    if (!this.socket) {
      console.warn('WebSocket not connected, cannot set message handler')
      return
    }

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        callback(data)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.subscribed = false
      this.socket = null
    }
  }
}

export const webSocketService = new WebSocketService()