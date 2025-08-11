const getPlayerBar = () => document.querySelector('div[class^="PlayerBar"')
const getImage = () => getPlayerBar()?.querySelector('img')
const getByAriaLabel = (ariaLabel, fuzzy) =>
  getPlayerBar()?.querySelector(`[aria-label${fuzzy ? '^' : ''}="${ariaLabel}"]`)
const getAriaLabel = (ariaLabel, fuzzy = false) => getByAriaLabel(ariaLabel, fuzzy)?.getAttribute('aria-label')

const updateStatus = () => {
  const track = getAriaLabel('Track', true)
    ?.replace(/^Track /, '')
    ?.trim()
  const artist = getAriaLabel('Artist', true)
    ?.replace(/^Artist /, '')
    ?.trim()

  const cover = getImage()?.src

  const like = getByAriaLabel('Like')
  const isLiked = like ? like.ariaPressed : 'unknown'

  const play = getAriaLabel('Playback')
  const pause = getAriaLabel('Pause')
  const playbackStatus = (play && 'paused') || (pause && 'playing') || 'unknown'

  if (track && artist) {
    chrome.runtime.sendMessage({ event: 'song', payload: { artist, cover, isLiked, playbackStatus, track } })
  }
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
      setTimeout(() => updateStatus, 1000)
      break
    }
    case 'previous': {
      getByAriaLabel('Previous song')?.click()
      setTimeout(() => updateStatus, 1000)
      break
    }
    default:
  }
})

setInterval(updateStatus, 5000)

updateStatus()
