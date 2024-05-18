import { Feed } from 'feed'
import {
  AUTHOR,
  DESCRIPTION,
  HERO_ICON,
  MAIL,
  SITE_NAME,
  SITE_ORIGIN,
} from '@/constants'
import { getAllPosts } from '@/utils'

// generate feed
export const generateFeed = async () => {
  const author = {
    name: AUTHOR,
    email: MAIL,
    link: SITE_ORIGIN,
  }
  const date = new Date()
  console.log(date)
  const feed = new Feed({
    title: SITE_NAME,
    description: DESCRIPTION,
    id: SITE_ORIGIN,
    link: SITE_ORIGIN,
    language: 'ja',
    image: `${SITE_ORIGIN}/${HERO_ICON}`,
    favicon: `${SITE_ORIGIN}/assets/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${SITE_ORIGIN}/rss/feed.xml`,
      json: `${SITE_ORIGIN}/rss/feed.json`,
      atom: `${SITE_ORIGIN}/rss/atom.xml`,
    },
    author: author,
  })
  const postMetadata = getAllPosts()
  postMetadata.forEach((metadatum) => {
    const url = `${SITE_ORIGIN}${metadatum.uri}`
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
