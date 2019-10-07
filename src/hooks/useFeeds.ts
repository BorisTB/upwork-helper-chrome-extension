import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FeedSourceSerialized } from 'store/FeedStore'

const useFeeds = (): [FeedSourceSerialized[], FeedSourceSerialized | null, Dispatch<SetStateAction<FeedSourceSerialized | null>>] => {
  const [items, setItems] = useState<FeedSourceSerialized[]>([])
  const [selectedFeed, setSelectedFeed] = useState<FeedSourceSerialized | null>(null)

  useEffect(() => {
    chrome.runtime.sendMessage('allFeeds', (allFeeds) => {
      setItems(allFeeds || [])

      if (!selectedFeed) {
        setSelectedFeed(allFeeds[0])
      }
    })
  }, [])

  return [items, selectedFeed, setSelectedFeed]
}

export { useFeeds }
