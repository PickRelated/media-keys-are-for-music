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
