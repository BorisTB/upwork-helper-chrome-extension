import Parser from 'rss-parser'
import { storage } from 'utils/storage'

const parser = new Parser()

const fetchFeed = async (feedUrl: string, cb: (feed: object) => void) => {
  try {
    const feed = await parser.parseURL(feedUrl)

    cb(feed)
  } catch (e) {
    console.log(e)
  }
}


const init = () => {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'feed') {
      port.onMessage.addListener(async (message) => {
        try {
          const feedUrls = await storage.feedUrls.get()

          feedUrls.forEach((feedUrl: string) => fetchFeed(feedUrl, (feed: object) => {
            port.postMessage({ feed })
          }))
        } catch (e) {
          console.error(e)
        }
      })
    }
  })
}

init()
