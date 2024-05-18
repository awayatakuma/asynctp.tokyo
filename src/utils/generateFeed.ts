import { Feed } from 'feed'
import {
  AUTHOR,
  DESCRIPTION,
  HERO_ICON,
  MAIL,
  SITE_NAME,
  SITE_URL,
} from '@/constants'
import { getAllPosts } from '@/utils'

// generate feed
export const generateFeed = async () => {
  const author = {
    name: AUTHOR,
    email: MAIL,
    link: SITE_URL,
  }
  const date = new Date()
  console.log(date)
  const feed = new Feed({
    title: SITE_NAME,
    description: DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'ja',
    image: `${SITE_URL}/${HERO_ICON}`,
    favicon: `${SITE_URL}/assets/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${SITE_URL}/rss/feed.xml`,
      json: `${SITE_URL}/rss/feed.json`,
      atom: `${SITE_URL}/rss/atom.xml`,
    },
    author: author,
  })
  const postMetadata = getAllPosts()
  postMetadata.forEach((metadatum) => {
    const url = `${SITE_URL}/${metadatum.uri}`
    feed.addItem({
      title: `${metadatum.title}`,
      description: `${metadatum.description}`,
      id: url,
      link: url,
      guid: url,
      date: new Date(metadatum.date),
      category: metadatum.tags.map((tag) => ({ name: tag })),
    })
  })
  return feed.rss2()
}
