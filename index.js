const getByAriaLabel = (ariaLabel) =>
  document.querySelector('div[class^="PlayerBar"')?.querySelector(`[aria-label^="${ariaLabel}"]`)
const getAriaLabel = (ariaLabel) => getByAriaLabel(ariaLabel)?.getAttribute('aria-label')

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
      break
    }
    case 'previous': {
      getByAriaLabel('Previous song')?.click()
      break
    }
    default:
  }
})

setInterval(() => {
  const track = getAriaLabel('Track')?.replace(/^Track /, '')
  const artist = getAriaLabel('Artist')?.replace(/^Artist /, '')

  if (!track || !artist) {
    return
  }

  chrome.runtime.sendMessage(`${track}\nby ${artist}`)
}, 5000)
