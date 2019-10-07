import { storage } from 'utils/storage'

const RSS_MENU_SELECTOR_FIND_WORK = '#feed-title *[data-ng-controller="FindWorkHomeUI.rssAtom.RssAtomController as rssAtomController"] ul'
const RSS_MENU_SELECTOR_JOB_SEARCH = '[data-rss-atom-v3] ul'
const EXTENSION_LINK_ID = 'upwork-helper-extension-link'

const isFindWork = (url: string) => url.includes('find-work')
const isJobSearch = (url: string) => url.includes('/jobs/search/')

const attachLinkToFeedMenu = (feedMenuUl: Element) => {
  if (feedMenuUl) {
    const li = document.createElement('li')

    const oldLink = document.getElementById(EXTENSION_LINK_ID)

    if (oldLink) {
      return
    }

    const a = document.createElement('a')
    a.setAttribute('id', EXTENSION_LINK_ID)
    a.setAttribute('href', '#')
    a.style.textAlign = 'center'
    a.onclick = (e: Event) => {
      e.preventDefault()

      const feedA = feedMenuUl.querySelector('a[href^="/ab/feed/"]')

      if (feedA) {
        const feedHref = feedA.getAttribute('href')

        if (feedHref) {
          const url = new URL(feedHref, window.location.origin)
          const feedUrl = url.href

          storage.feedUrls.add(feedUrl)
        }
      }
    }
    const img = new Image(16, 16)
    img.setAttribute('src', chrome.runtime.getURL('img/icon-48.png'))

    a.appendChild(img)
    li.appendChild(a)

    feedMenuUl.appendChild(li)
  }
}

const processCurrentRoute = () => {
  const currentHref = window.location.href

  if (isFindWork(currentHref)) {
    const feedMenuUl = document.querySelector(RSS_MENU_SELECTOR_FIND_WORK)

    if (feedMenuUl) {
      attachLinkToFeedMenu(feedMenuUl)
    }
  } else if (isJobSearch(currentHref)) {
    let feedMenuUl
    let attempts = 0

    const interval = setInterval(() => {
      feedMenuUl = document.querySelector(RSS_MENU_SELECTOR_JOB_SEARCH)

      if (feedMenuUl) {
        attachLinkToFeedMenu(feedMenuUl)
      }

      if (feedMenuUl || attempts > 50) {
        clearInterval(interval)
      }

      attempts += 1
    }, 300)
  }
}

const init = () => {
  processCurrentRoute()

  window.addEventListener('hashchange popstate DOMContentLoaded', function(e) {
    processCurrentRoute()
  })
}

init()

export {
  init
}
