import React from 'react'
import { Router } from 'router'
import { feedPort } from 'utils/port'

feedPort.init()

const App: React.FC = () => <Router />

export default App
