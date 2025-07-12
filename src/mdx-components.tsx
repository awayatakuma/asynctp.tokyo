import { Box, Code, Divider, Heading, Image, Text } from '@chakra-ui/react'
import type { MDXComponents } from 'mdx/types'
import React from 'react'
import { StaticLinkCardWrapper } from './components'

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    p: ({ children }: any) => {
      // 子要素を配列に変換して検査
      const childrenArray = React.Children.toArray(children)

      // 単一のURL文字列のみの段落かチェック
      const isSingleUrl =
        childrenArray.length === 1 &&
        typeof childrenArray[0] === 'string' &&
        (childrenArray[0].startsWith('http://') ||
          childrenArray[0].startsWith('https://'))

      // リンクカードが含まれているかチェック（より確実な方法）
      const hasLinkCard = childrenArray.some(
        // biome-ignore lint/suspicious/noExplicitAny: MDX child type checking
        (child: any) => {
          // StaticLinkCardWrapperの検出
          return (
            child?.props?.href &&
            typeof child?.props?.children === 'string' &&
            child?.props?.children === child?.props?.href &&
            (child?.props?.href?.startsWith('http://') ||
              child?.props?.href?.startsWith('https://'))
          )
        }
      )

      // URLのみの段落またはリンクカードを含む段落は、div要素として処理
      if (isSingleUrl || hasLinkCard) {
        return <Box mb={2}>{children}</Box>
      }

      return (
        <Text fontSize="md" lineHeight="150%" mb={{ base: 2 }}>
          {children}
        </Text>
      )
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    a: ({ children, href }: any) => {
      return (
        <StaticLinkCardWrapper href={href}>{children}</StaticLinkCardWrapper>
      )
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    h2: ({ children, id }: any) => (
      <Heading
        py={4}
        as="h2"
        id={id}
        textStyle="h2"
        fontSize="2xl"
        color="header"
        fontWeight="bold"
        fontFamily="heading"
        _before={{
          content: '"# "',
          fontWeight: 'bold',
          pr: '0.1rem',
        }}
      >
        {children}
      </Heading>
    ),
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
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
        _before={{ content: '"## "', fontWeight: 'bold' }}
      >
        {children}
      </Heading>
    ),
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    h4: ({ children, id }: any) => (
      <Heading
        py={2}
        as="h4"
        id={id}
        textStyle="h4"
        fontSize="1xl"
        color="header"
        fontWeight="bold"
        fontFamily="heading"
        _before={{ content: '"### "', fontWeight: 'bold' }}
      >
        {children}
      </Heading>
    ),
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    h5: ({ children }: any) => (
      <Heading
        py={1}
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
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    h6: ({ children }: any) => (
      <Heading
        py={1}
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
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    img: (img: any) => {
      return <Image display="block" mx="auto" src={img.src} alt={img.alt} />
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    hr: ({ children }: any) => {
      return <Divider my={6}>{children}</Divider>
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
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
