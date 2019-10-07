import { Item } from 'rss-parser'

export interface FeedItemSerialized {
  id: string
  title: string
  preview: string
  read: boolean
  data: Item
}

export class FeedItem {
  public id: string
  public read: boolean = false
  public data?: Item

  constructor (id: string) {
    this.id = id
  }

  public getId () {
    return this.id
  }

  public getData () {
    return this.data || {}
  }

  public setData (data: Item) {
    this.data = { ...data }
  }

  public getTitle () {
    return this.getData().title || ''
  }

  public getPreview () {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = this.getData().content || ''
    return (tempDiv.textContent || tempDiv.innerText || '').replace(/&quot;/g, '\\"').substring(0, 300) + '...'
  }

  public isUnread () {
    return !this.read
  }

  public markAsRead () {
    this.read = true
  }

  public serialize (): FeedItemSerialized {
    return {
      id: this.getId(),
      title: this.getTitle(),
      preview: this.getPreview(),
      read: !this.isUnread(),
      data: this.getData()
    }
  }
}

export interface FeedSourceSerialized {
  id: string
  title: string
  unread: number
  items: FeedItemSerialized[]
}

export class FeedSource {
  public id: string
  public title = ''
  public items = new Map()

  constructor (url: string) {
    this.id = url

    const feedUrl = new URL(url)
    const title = feedUrl.searchParams.get('q') || ''

    this.title = title
  }

  public getId () {
    return this.id
  }

  public getTitle () {
    return this.title
  }

  public setLinkedItem (item: FeedItem) {
    this.items.set(item.getId(), item)
  }

  public serialize (): FeedSourceSerialized {
    const items = Array.from(this.items.values()).map((item) => item.serialize())

    return {
      id: this.getId(),
      title: this.getTitle(),
      items,
      unread: items.reduce((acc, item) => item.read ? acc : acc + 1, 0)
    }
  }
}

export class FeedStore {
  public feedItems = new Map<string, FeedItem>()
  public feedSources = new Map<string, FeedSource>()
  public readIds = new Set<string>()

  public clear () {
    this.feedItems.clear()
    this.feedSources.clear()
  }

  public getSerializedFeeds (): FeedSourceSerialized[] {
    const feedSources = Array.from(this.feedSources.values())
    const serialized = feedSources.map((feedSource) => feedSource.serialize())
    return serialized
  }

  public getUnreadCount () {
    let unread = 0

    for (const feedItem of this.feedItems.values()) {
      if (feedItem.isUnread()) {
        unread += 1
      }
    }

    return unread
  }

  public getFeedSource (feedUrl: string): FeedSource | null {
    return this.feedSources.get(feedUrl) || null
  }

  public createFeedSource (feedUrl: string): FeedSource {
    const feedSource = new FeedSource(feedUrl)
    this.feedSources.set(feedUrl, feedSource)

    return feedSource
  }

  public getOrCreateFeedSource (feedUrl: string): FeedSource {
    return this.getFeedSource(feedUrl) || this.createFeedSource(feedUrl)
  }

  public getFeedItem (id: string): FeedItem | null {
    return this.feedItems.get(id) || null
  }

  public createFeedItem (id: string): FeedItem {
    const feedItem = new FeedItem(id)

    if (this.readIds.has(id)) {
      feedItem.markAsRead()
    }

    this.feedItems.set(id, feedItem)

    return feedItem
  }

  public getOrCreateFeedItem (id: string): FeedItem {
    return this.getFeedItem(id) || this.createFeedItem(id)
  }

  public setReadIds (newValue: object) {
    this.readIds.clear()
    const ids = Object.keys(newValue)

    for (let i = 0; i < ids.length; i++) {
      this.readIds.add(ids[i])
    }

    this.syncReadIds()
  }

  public syncReadIds () {
    for (const readId of this.readIds) {
      const feedItem = this.getFeedItem(readId)

      if (feedItem) {
        feedItem.markAsRead()
      }
    }
  }
}

const feedStore = new FeedStore()

export {
  feedStore
}
