import React from 'react'
import styled from '@emotion/styled'
import { MdHome, MdSettings } from 'react-icons/md'
import { RouterLink } from 'router/RouterLink'
import { useLayout } from '../Layout'

const Nav = styled.nav`
  display: flex;
  height: 42px;
  border-bottom: 2px solid #e0e0e0;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: none;
  border-bottom: none;
`

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 1.5rem;

  &:hover,
  &.active {
    color: white;
    background: #37a000;
  }
`

const Navigation: React.FC = () => {
  const { title } = useLayout()

  return (
    <Nav>
      <Link path='jobList'>
        <MdHome />
      </Link>
      <Title>{title}</Title>
      <Link path='settings'>
        <MdSettings />
      </Link>
    </Nav>
  )
}

export { Navigation }
