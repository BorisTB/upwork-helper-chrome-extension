import React from 'react'
import styled from '@emotion/styled'
import { TextField } from 'components'
import { useItemStorage } from 'hooks'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
`

const Field = styled.div`
  & + & {
    margin-top: 8px;
  }
`

const Settings: React.FC = () => {
  const [loading, feedUrls, setFeedUrls, saveFeedUrls] = useItemStorage('feedUrls', [])
  const setUrlByIndex = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setFeedUrls((prevState: string[]) => {
      const newState = [...prevState]
      newState[index] = value
      return newState.filter(val => !!val)
    })
  }

  return (
    <Layout>
      {
        [...feedUrls, ''].map((value: string, index: number) =>
          <Field key={index}>
            <TextField
              fullWidth
              placeholder='RSS / Atom url'
              disabled={loading}
              value={value}
              onChange={setUrlByIndex(index)}
              onBlur={() => saveFeedUrls()}
            />
          </Field>
        )
      }
    </Layout>
  )
}

export { Settings }
