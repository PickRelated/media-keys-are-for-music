import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js'

const socket = io('http://websockets.pickrelated.com', { transports: ['http', 'websocket'] })
socket.connect()
socket.on('connect', () => console.info(`Connected to socket with id ${socket.id}`))
socket.on('connect_error', (err) => console.error(err))

const EVENT = 'message'

const isLocal = false

const sendCommand = async (command) => {
  const [tab] = await chrome.tabs.query({ url: 'https://music.yandex.com/*' })
  if (!tab) {
    console.info('No music tab found')
    return
  }
  chrome.tabs.sendMessage(tab.id, command)
}

socket.onAny((event, data) => {
  if (event === EVENT) {
    sendCommand(data)
    console.info(`Command "${data}" recieved from server`)
  }
})

chrome.commands.onCommand.addListener(async (command) => {
  if (isLocal) {
    sendCommand(command)
    console.info(`Command "${command}" sent locally`)
  } else {
    socket.emit(EVENT, command)
    console.info(`Command "${command}" sent to server`)
  }
})
