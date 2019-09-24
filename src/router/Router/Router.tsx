import React, { createContext, useContext, useState } from 'react'
import { routes, RouteName } from '../routes'
import { Layout } from 'layout'

const DEFAULT_ROUTE: RouteName = 'jobList'

interface RouterContextValue {
  route: RouteName
  go: (routeName: RouteName) => void
}

const RouterContext = createContext<RouterContextValue>({
  route: DEFAULT_ROUTE,
  go: (routeName) => {}
})

const Router: React.FC = () => {
  const [route, setRoute] = useState<RouteName>(DEFAULT_ROUTE)

  return (
    <RouterContext.Provider value={{ route, go: setRoute }}>
      <Layout>{routes[route]}</Layout>
    </RouterContext.Provider>
  )
}

const useRouter = () => useContext(RouterContext)

export { Router, RouterContext, useRouter }
