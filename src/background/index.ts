import Parser from 'rss-parser'
import { storage } from 'utils/storage'
import { feedStore } from 'store/FeedStore'

const parser = new Parser()

let fetchIntervalId: NodeJS.Timer

const refreshUnread = () => {
  const unread = feedStore.getUnreadCount()
  chrome.browserAction.setBadgeText({ text: unread ? String(unread) : '' })
}

const processFetchedFeeds = async (feeds: Parser.Output[], feedUrls: string[]) => {
  feedStore.clear()

  const readIds = await storage.readIds.get() || Object.create(null)
  feedStore.setReadIds(readIds)

  for (let feedIndex = 0; feedIndex < feeds.length; feedIndex++) {
    const feed = feeds[feedIndex]
    const feedItems = feed.items
    const feedUrl = feedUrls[feedIndex]

    if (feedItems) {
      const feedSource = feedStore.getOrCreateFeedSource(feedUrl)

      for (let feedItemIndex = 0; feedItemIndex < feedItems.length; feedItemIndex++) {
        const feedItemData = feedItems[feedItemIndex]
        const feedItemId = feedItemData.id

        const feedItem = feedStore.getOrCreateFeedItem(feedItemId)
        feedItem.setData(feedItemData)

        feedSource.setLinkedItem(feedItem)
      }
    }
  }

  refreshUnread()
}

const fetchFeed = (feedUrl: string) => parser.parseURL(feedUrl)

const fetchUrls = async () => {
  try {
    const feedUrls = await storage.feedUrls.get()

    if (Array.isArray(feedUrls)) {
      const fetchedFeeds = await Promise.all(feedUrls.map(fetchFeed))

      processFetchedFeeds(fetchedFeeds, feedUrls)
    }
  } catch (e) {
    console.error(e)
  }
}

const resetFetchInterval = () => {
  if (fetchIntervalId) {
    clearInterval(fetchIntervalId)
  }

  fetchIntervalId = setInterval(() => {
    fetchUrls()
  }, 5 * 60 * 1000)
}

const init = () => {
  fetchUrls()
  resetFetchInterval()

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes[storage.feedUrls.key]) {
      fetchUrls()
      resetFetchInterval()
    }

    if (changes[storage.readIds.key]) {
      const { newValue } = changes[storage.readIds.key]
      feedStore.setReadIds(newValue)
      refreshUnread()
    }
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === 'allFeeds') {
      const feedSources = feedStore.getSerializedFeeds()

      sendResponse(feedSources)
    }
  })
}

init()
