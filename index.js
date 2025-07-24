const getByAriaLabel = (ariaLabel, fuzzy) =>
  document.querySelector('div[class^="PlayerBar"')?.querySelector(`[aria-label${fuzzy ? '^' : ''}="${ariaLabel}"]`)
const getAriaLabel = (ariaLabel, fuzzy = false) => getByAriaLabel(ariaLabel, fuzzy)?.getAttribute('aria-label')

const sendSong = () => {
  const track = getAriaLabel('Track', true)?.replace(/^Track /, '')
  const artist = getAriaLabel('Artist', true)?.replace(/^Artist /, '')

  if (!track || !artist) {
    return
  }

  chrome.runtime.sendMessage(`${track}\nby ${artist}`)
}

chrome.runtime.onMessage.addListener((command) => {
  console.info(`Command "${command}" recieved`)
  switch (command) {
    case 'play': {
      const playPause = getByAriaLabel('Playback') || getByAriaLabel('Pause')
      playPause?.click()
      break
    }
    case 'next': {
      getByAriaLabel('Next song')?.click()
      setTimeout(() => sendSong, 500)
      break
    }
    case 'previous': {
      getByAriaLabel('Previous song')?.click()
      setTimeout(() => sendSong, 500)
      break
    }
    default:
  }
})

setInterval(sendSong, 5000)
