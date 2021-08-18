import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {routes} from './routes.js'


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter.jsx'
import { socketService } from './services/socketService.js'


export function App() {
  return (
    <div className="app">
      <Router>
      <AppHeader/>
        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </Router>
    </div>
  )
}

