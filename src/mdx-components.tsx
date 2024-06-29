/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Heading, Image, Text, Code } from '@chakra-ui/react'
import type { MDXComponents } from 'mdx/types'
import { Link } from './components'

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    p: ({ children }: any) => (
      <Text
        fontSize="md"
        lineHeight="150%"
        mb={{ base: 2 }}
        // display="inline"
      >
        {children}
      </Text>
    ),
    a: ({ children, href }: any) => (
      <Link textStyle="link" color="secondary" href={href}>
        {children}
      </Link>
    ),
    h2: ({ children, id }: any) => (
      <Heading
        py={4}
        as="h2"
        id={id}
        textStyle="h2"
        fontSize="2xl"
        color="header"
        fontWeight="black"
        fontFamily="heading"
        _before={{
          content: '"# "',
          fontWeight: 'black',
          pr: '0.1rem',
        }}
      >
        {children}
      </Heading>
    ),
    h3: ({ children, id }: any) => (
      <Heading
        py={2}
        as="h3"
        id={id}
        textStyle="h3"
        fontSize="1xl"
        color="header"
        fontWeight="bold"
        fontFamily="heading"
        _before={{ content: '"## "', fontWeight: 'black' }}
      >
        {children}
      </Heading>
    ),
    h4: ({ children, id }: any) => (
      <Heading
        as="h4"
        id={id}
        textStyle="h4"
        fontSize="1xl"
        color="text"
        fontWeight="bold"
        fontFamily="heading"
        mt={{ base: 8, md: 12 }}
        mb={{ base: 4, md: 6 }}
        _before={{ content: '"### "', fontWeight: 'bold' }}
      >
        {children}
      </Heading>
    ),
    h5: ({ children }: any) => (
      <Heading
        as="h5"
        textStyle="h5-mono"
        fontSize="2xl"
        color="text"
        fontWeight="bold"
        fontFamily="heading"
        _before={{ content: '"#### "', fontWeight: 'bold' }}
      >
        {children}
      </Heading>
    ),
    h6: ({ children }: any) => (
      <Heading
        as="h6"
        textStyle="h6-mono"
        fontSize="xl"
        color="text"
        fontWeight="bold"
        fontFamily="heading"
        _before={{ content: '"##### "', fontWeight: 'bold' }}
      >
        {children}
      </Heading>
    ),
    img: (img: any) => {
      return <Image display="block" mx="auto" src={img.src} alt={img.alt} />
    },
    hr: ({ children }: any) => {
      return <Divider my={6}>{children}</Divider>
    },
    code: ({ children }: any) => {
      if (typeof children === 'string') {
        return <Code color="#f7768e">{children}</Code>
      } else {
        return <code>{children}</code>
      }
    },

    ...components,
  }
}
