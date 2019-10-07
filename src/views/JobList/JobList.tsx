import React from 'react'
import styled from '@emotion/styled'
import { useFeeds } from 'hooks/useFeeds'
import { JobListNavItem } from './JobListNavItem'
import { JobListItemPreview } from './JobListItemPreview'

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
  const [feeds, selectedFeed, setSelectedFeed] = useFeeds()

  return feeds ? (
    <>
      <JobListNav>
        {
          feeds.map(feed => (
            <JobListNavItem key={feed.id} badge={feed.unread} selected={!!(selectedFeed && selectedFeed.id === feed.id)} onClick={() => { setSelectedFeed(feed) }}>
              {feed.title}
            </JobListNavItem>
          ))
        }
      </JobListNav>

      { selectedFeed && (
        <JobListContent>
          {
            selectedFeed.items.map(item => <JobListItemPreview key={item.id} item={item} />)
          }
        </JobListContent>
      )}
    </>
  ) : null
}

export { JobList }
