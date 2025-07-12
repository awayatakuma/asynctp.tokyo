import { staticLinkMetadata } from '@/lib/data/linkMetadata'
import { Link } from './Link'
import { FallbackLinkCard, StaticLinkCard } from './StaticLinkCard'

interface StaticLinkCardWrapperProps {
  href: string
  children: React.ReactNode
}

export const StaticLinkCardWrapper: React.FC<StaticLinkCardWrapperProps> = ({
  href,
  children,
}) => {
  // URL かどうかの判定
  const isUrl =
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://'))

  // リンクテキストがURLそのものの場合はカードとして表示
  const isCardCandidate =
    isUrl && typeof children === 'string' && children === href

  // 静的メタデータから取得
  const metadata = isCardCandidate ? staticLinkMetadata[href] : null

  if (isCardCandidate) {
    if (metadata) {
      return <StaticLinkCard metadata={metadata} />
    } else {
      // メタデータが取得できない場合のフォールバック
      return <FallbackLinkCard url={href} fallbackText={children} />
    }
  }

  // 通常のリンクとして表示
  return (
    <Link textStyle="link" color="secondary" href={href}>
      {children}
    </Link>
  )
}
