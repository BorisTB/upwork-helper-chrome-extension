import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const activeStyles = css`
  color: white;
  background: #37a000;
  
  span {
    &::after {
      color: #37a000;
      background: white;
    }
  }
`

interface JobListNavItemProps {
  children?: React.ReactNode
  badge: number | string
  selected?: boolean
  onClick?: () => void
}

const Item = styled.button<JobListNavItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 32px;
  padding: 0;
  color: #37a000;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    ${activeStyles};
  }
  
  ${({ selected }) => selected ? activeStyles : ''};
  
  &:focus {
    outline: 0;
  }
  
  span {
    position: relative;
    
    
    &::after {
      content: attr(data-badge);
      position: absolute;
      top: -5px;
      right: -18px;
      display: block;
      padding: 2px;
      color: white;
      font-size: 8px;
      background: #37a000;
      border-radius: 4px;
    }
  }
`

const JobListNavItem: React.FC<JobListNavItemProps> = ({ badge, children, ...props }) => (
  <Item badge={badge} {...props}>
    <span data-badge={badge}>{children}</span>
  </Item>
)

export { JobListNavItem }
