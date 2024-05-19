'use client'

import { Global } from '@emotion/react'
import React from 'react'

export const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    `}
  />
)
