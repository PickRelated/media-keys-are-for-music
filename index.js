chrome.runtime.onMessage.addListener((command) => {
  console.info(`Command "${command}" recieved`)
  const playBarDiv = document.querySelector('div[class^="PlayerBar"') || document

  switch (command) {
    case 'play': {
      ;(
        playBarDiv.querySelector('button[aria-label="Playback"]') ||
        playBarDiv.querySelector('button[aria-label="Pause"]')
      )?.click()
      break
    }
    case 'next': {
      playBarDiv.querySelector('button[aria-label="Next song"]')?.click()
      break
    }
    case 'previous': {
      playBarDiv.querySelector('button[aria-label="Previous song"]')?.click()
      break
    }
  }
})

setInterval(() => {
  const track = document
    .querySelector('a[aria-label^="Track"]')
    ?.getAttribute('aria-label')
    ?.replace(/^Track /, '')
  const artist = document
    .querySelector('a[aria-label^="Artist"]')
    ?.getAttribute('aria-label')
    ?.replace(/^Artist /, '')

  if (!track || !artist) {
    return
  }

  chrome.runtime.sendMessage(`${track}\nby ${artist}`)
}, 5000)
