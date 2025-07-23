chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ url: 'https://music.yandex.com/*' });
  chrome.tabs.sendMessage(tab.id, command);
  console.info(`Command "${command}" sent`)
});
