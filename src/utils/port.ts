const feedPort = {
  init: () => {
    let port = chrome.runtime.connect({name: 'feed'  })

    port.postMessage({ init: true })

    port.onMessage.addListener((message) => {
      console.log({ message })
    })
  }
}

export {
  feedPort
}
