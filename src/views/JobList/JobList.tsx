import React from 'react'
import styled from '@emotion/styled'
import { useFeeds } from 'hooks/useFeeds'
import { JobListNavItem } from './JobListNavItem'

const JobListNav = styled.div`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: auto;
`

const JobListContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
`

const JobList: React.FC = () => {
  const [feeds] = useFeeds()
  console.log({ feeds })

  return (
    <>
      <JobListNav>
        {
          feeds.map(feed => (
            <JobListNavItem key={feed.id} badge={feed.unread}>
              {feed.title}
            </JobListNavItem>
          ))
        }
      </JobListNav>

      <JobListContent>
        {
          feeds[0] && feeds[0].items.map(item => (
            <div key={item.id}>
              <div>{item.data.title}</div>
              <div>{item.data.contentSnippet}</div>
            </div>
          ))
        }
      </JobListContent>
    </>
  )
}

export { JobList }
