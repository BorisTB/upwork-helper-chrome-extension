import React, { createContext, useContext, useState } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { Navigation } from './Navigation'

const Base = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 420px;
  min-height: 320px;
  height: 100%;
`

const Content = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

interface LayoutContextValue {
  title: string | null
  setTitle: (title: string | null) => void
}

const LayoutContext = createContext<LayoutContextValue>({
  title: null,
  setTitle: (title) => {
    console.warn('setTitle not replaced with real function')
  }
})

const Layout: React.FC = ({ children }) => {
  const [title, setTitle] = useState<string | null>(null)

  return (
    <LayoutContext.Provider value={{ title, setTitle }}>
      <Base>
        <Global
          styles={{
            '*': {
              boxSizing: 'border-box'
            },
            'html, body': {
              height: '100%'
            },
            '#root': {
              height: '100%'
            }
          }}
        />

        <Navigation />
        <Content>
          {children}
        </Content>
      </Base>
    </LayoutContext.Provider>
  )
}

const useLayout = () => useContext(LayoutContext)

export { Layout, LayoutContext, useLayout }
