import React from 'react'
import styled from '@emotion/styled'
import { FeedItemSerialized } from 'store/FeedStore'

interface JobListItemPreviewProps {
  item: FeedItemSerialized
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  
  & + & {
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
`

const Title = styled.div`
  color: #37A000;
  font-size: 1rem;
  font-weight: bold;
`

const Description = styled.div`
`

const JobListItemPreview: React.FC<JobListItemPreviewProps> = ({ item }) => (
  <Wrapper>
    <Title>{item.title}</Title>
    <Description>{item.preview}</Description>
  </Wrapper>
)

export { JobListItemPreview }
