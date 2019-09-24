import React from 'react'
import { JobList, Settings } from 'views'

const routes = {
  jobList: <JobList />,
  settings: <Settings />
}

export type RouteName = keyof typeof routes

export { routes }
