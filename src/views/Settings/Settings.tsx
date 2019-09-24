import React from 'react'
import styled from '@emotion/styled'
import { TextField } from 'components'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
`

const Settings: React.FC = () => (
  <Layout>
    <TextField placeholder='RSS / Atom url' label='RSS/Atom url' />
  </Layout>
)

export { Settings }
