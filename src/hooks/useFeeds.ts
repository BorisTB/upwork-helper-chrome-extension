import { useEffect, useState } from 'react'
import { FeedSourceSerialized } from 'store/FeedStore'

const useFeeds = () => {
  const [items, setItems] = useState<FeedSourceSerialized[]>([])

  useEffect(() => {
    chrome.runtime.sendMessage('allFeeds', (allFeeds) => {
      setItems(allFeeds)
    })
  }, [])

  return [items]
}

export { useFeeds }
