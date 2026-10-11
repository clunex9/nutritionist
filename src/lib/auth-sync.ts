// Sirf client-side par channel banayein
const getChannel = () => {
  if (typeof window !== 'undefined') {
    return new BroadcastChannel('auth')
  }
  return null
}

export const notifyAuthChange = () => {
  const channel = getChannel()
  if (channel) {
    channel.postMessage('auth-changed')
    channel.close() // ✅ Memory clean rakhne ke liye message bhejte hi close kar dein
  }
}

export const listenAuthChange = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}

  const channel = new BroadcastChannel('auth')

  const handler = (event: MessageEvent) => {
    if (event.data === 'auth-changed') {
      callback()
    }
  }

  channel.addEventListener('message', handler)

  // 🛠️ Yeh hai unsubscriber function
  return () => {
    channel.removeEventListener('message', handler)
    channel.close() // ✅ Component unmount hone par listener aur channel dono band
  }
}
