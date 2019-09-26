import { useEffect, useState } from 'react'
import { storage } from 'utils/storage'

const useItemStorage = (itemStorageKey: keyof typeof storage, defaultValue: any = null) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(defaultValue)
  const itemStorage = storage[itemStorageKey]

  const loadItems = async () => {
    setLoading(true)

    try {
      const savedItems = await itemStorage.get()
      setItems(typeof savedItems === 'undefined' ? defaultValue : savedItems)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      throw new Error(e)
    }
  }

  const saveItems = async () => {
    setLoading(true)

    try {
      await itemStorage.set(items)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      throw new Error(e)
    }
  }

  useEffect(() => {
    loadItems().catch(e => console.error(e))
  }, [])

  return [loading, items, setItems, saveItems]
}

export { useItemStorage }
