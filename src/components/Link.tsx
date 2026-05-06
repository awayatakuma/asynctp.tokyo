import { Link as ChakraNextLink } from '@chakra-ui/next-js'
import type { LinkProps } from '@chakra-ui/react'

export const Link: React.FC<LinkProps> = ({ href, ...props }) => {
  if (!href) throw new Error('Link component requires href prop')
  
  const linkStyes = {
    textDecoration: 'underline',
    w: 'fit-content',
    _hover: {
      color: 'primary',
    },
  }

  return (
    <ChakraNextLink 
      href={href} 
      {...linkStyes} 
      {...props} 
    />
  )
}
