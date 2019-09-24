import Parser from 'rss-parser'

const parser = new Parser()

const fetchFeed = async () =>
  parser.parseURL(
    'https://www.upwork.com/ab/feed/topics/atom?securityToken=a564b2a3897bccbea15aa9c9000a0d2f05b128819fb622608765e27819e459122aa6cad0ed0c79713de9d5ef0537eefbbdf7f299d32693c7415a3d67038cc537&userUid=585384849758691328&orgUid=585384849758691330&topic=4411892'
  )

const init = async () => {
  try {
    const feed = await fetchFeed()

    if (feed) {
      console.log({ feed })
    }
  } catch (e) {
    console.error(e)
  }
}

init().catch((e) => console.log(e))
