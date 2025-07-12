'use client'

import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: string
  quality?: number
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  quality = 85,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const isLargeFile = src.includes('.gif') && src.includes('asynct_vrm')

  return (
    <Box ref={imgRef} display="block" mx="auto" my={4}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL={placeholder}
          loading={isLargeFile ? 'lazy' : 'eager'}
          priority={!isLargeFile}
        />
      ) : (
        <Box
          width={width}
          height={height}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          color="gray.500"
        >
          Loading...
        </Box>
      )}
    </Box>
  )
}
