import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from '../Router'
import { RouteName } from '../routes'

interface RouterLinkProps {
  className?: string
  path: RouteName
}

const Link = styled.a`
  display: inline-flex;
  color: #37a000;
  text-decoration: none;
  transition: all 150ms ease;

  &:not(:disabled) {
    cursor: pointer;
  }
`

const RouterLink: React.FC<RouterLinkProps> = ({
  path,
  className,
  ...props
}) => {
  const router = useRouter()
  const active = router.route === path
  const mergedClassName = `${className || ''}${active ? ' active' : ''}`

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.go(path)
  }

  return (
    <Link onClick={handleOnClick} className={mergedClassName} {...props} />
  )
}

export { RouterLink }
