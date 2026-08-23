import {
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { MDXComponents } from 'mdx/types'
import { AmazonCard } from './components/StaticLinkCard'
import { StaticLinkCardWrapper } from './components/StaticLinkCardWrapper'

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    AmazonCard,
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    p: ({ children }: any) => {
      return (
        <Box fontSize="md" lineHeight="150%" mb={{ base: 4 }}>
          {children}
        </Box>
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
    hr: () => {
      return <Divider my={6} />
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    code: ({ children }: any) => {
      if (typeof children === 'string') {
        return <Code color="#f7768e">{children}</Code>
      } else {
        return <code>{children}</code>
      }
    },
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    table: ({ children }: any) => (
      <TableContainer
        my={6}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Table variant="simple" size="sm">
          {children}
        </Table>
      </TableContainer>
    ),
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    thead: ({ children }: any) => <Thead bg="gray.50">{children}</Thead>,
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    tbody: ({ children }: any) => <Tbody>{children}</Tbody>,
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    tr: ({ children }: any) => <Tr>{children}</Tr>,
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    th: ({ children }: any) => (
      <Th color="header" fontWeight="bold" textTransform="none">
        {children}
      </Th>
    ),
    // biome-ignore lint/suspicious/noExplicitAny: MDX component props
    td: ({ children }: any) => <Td>{children}</Td>,

    ...components,
  }
}
