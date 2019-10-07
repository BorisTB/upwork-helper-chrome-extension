const RSS_MENU_SELECTOR_FIND_WORK = '#feed-title *[data-ng-controller="FindWorkHomeUI.rssAtom.RssAtomController as rssAtomController"] ul'

const isFindWork = (url: string) => url.includes('find-work')

const init = () => {
  const currentHref = window.location.href
  console.log({ currentHref })
  if (isFindWork(window.location.href)) {
    const feedMenuUl = document.querySelector(RSS_MENU_SELECTOR_FIND_WORK)

    if (feedMenuUl) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.setAttribute('href', '#')
      a.style.textAlign = 'center'
      a.onclick = (e: Event) => {
        e.preventDefault()

        const feedA = feedMenuUl.querySelector('a[href^="/ab/feed/topics/atom"]')

        if (feedA) {
          const feedHref = feedA.getAttribute('href')

          if (feedHref) {
            const url = new URL(feedHref, window.location.origin)
            const feedUrl = url.href
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
}

init()

export {
  init
}
