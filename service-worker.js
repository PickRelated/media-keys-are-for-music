import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js'

const SOCKET_URL = 'http://websockets.pickrelated.com'

const defaultOptions = {
  isControlledRemotely: true,
  mediaKeysControl: 'local',
}

let options = {}

const syncSettings = () => {
  chrome.storage.local.get(defaultOptions, (values) => {
    options = values
  })
}

chrome.storage.onChanged.addListener(syncSettings)

syncSettings()

const sendCommand = async (command) => {
  const [tab] = await chrome.tabs.query({ url: 'https://music.yandex.com/*' })
  if (!tab) {
    console.info('No music tab found')
    return
  }
  chrome.tabs.sendMessage(tab.id, command)
}

chrome.identity.getProfileUserInfo((userInfo) => {
  const { email } = userInfo
  const socket = io(SOCKET_URL, { query: { id: email }, transports: ['http', 'websocket'] })
  socket.connect()
  socket.on('connect', () => console.info('Connected to socket'))
  socket.on('connect_error', (err) => console.error(err))
  socket.onAny((event, data) => {
    if (event === 'message') {
      if (options.isControlledRemotely) {
        sendCommand(data)
        console.info(`Command "${data}" recieved from server`)
      } else {
        console.info('Remote control disabled')
      }
    }
  })

  chrome.runtime.onMessage.addListener((payload) => {
    socket.emit('song', payload)
    console.info(`Recieved song info:\n${payload}"`)
  })

  chrome.commands.onCommand.addListener(async (command) => {
    if (options.mediaKeysControl === 'local') {
      sendCommand(command)
      console.info(`Command "${command}" sent locally`)
    } else {
      socket.emit('message', command)
      console.info(`Command "${command}" sent to server`)
    }
  })
})
