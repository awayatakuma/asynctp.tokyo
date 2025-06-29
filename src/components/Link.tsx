import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
export const Link: React.FC<LinkProps> = ({ href, ...props }) => {
  if (!href) throw new Error('Link component requires href prop')
  const linkStyes = {
    textDecoration: 'underline',
    w: 'fit-content',
    _hover: {
      color: 'primary',
    },
  }

  const path: string = href
  return (
    <NextLink href={path} passHref legacyBehavior>
      {/** biome-ignore lint/suspicious/noExplicitAny: verup**/}
      <ChakraLink {...(linkStyes as any)} {...props} />
    </NextLink>
  )
}
