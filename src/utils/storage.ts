type StorageAreaKey = 'local' | 'sync'

interface ItemStorage<TKey extends string> {
  key: string
  add: <U extends any>(value: U) => Promise<{ key: TKey, value: U }>
  get: () => Promise<any>
  set: <U extends any>(value: U) => Promise<{ key: TKey, value: U }>
}

const createPromiseStorage = <TKey extends string>(storageAreaKey: StorageAreaKey, key: TKey, defaultValue: any[] | object): ItemStorage<TKey> => ({
  key,
  add: (value) => new Promise((resolve) => {
    chrome.storage[storageAreaKey].get([key], (result) => {
      const prevValue = result[key] || defaultValue
      const mergedValue = Array.isArray(prevValue) ? [...prevValue, value] : { ...prevValue, ...value }

      chrome.storage[storageAreaKey].set({ [key]: mergedValue }, () => {
        resolve(mergedValue)
      })
    })
  }),
  get: () => new Promise((resolve) => {
    chrome.storage[storageAreaKey].get([key], (result) => {
      resolve(result[key])
    })
  }),
  set: (value) => new Promise((resolve) => {
    chrome.storage[storageAreaKey].set({ [key]: value }, () => {
      resolve({ key, value })
    })
  })
})

// const chromeStorageLocal: ChromeStorage = createPromiseStorage('local')
// const chromeStorageSync: ChromeStorage = createPromiseStorage('sync')

interface Storage {
  feedUrls: ItemStorage<string>
  items: ItemStorage<string>
  readIds: ItemStorage<string>
}

const storage: Storage = {
  feedUrls: createPromiseStorage('sync', 'feedUrls', []),
  items: createPromiseStorage('local', 'items', Object.create(null)),
  readIds: createPromiseStorage('sync', 'readIds', Object.create(null))
}

export {
  storage
}
