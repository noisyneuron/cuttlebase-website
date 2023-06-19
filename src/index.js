import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BreakpointProvider } from './util/BreakpointProvider'
import { config } from './data/config'


ReactDOM.render(
  <React.StrictMode>
    <BreakpointProvider breakpoints={config.breakpoints}>
      <HelmetProvider>
        <Router>
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                {
                  config.routes.map((route, index) => {
                    return (
                      <Route
                        path={route.path}
                        exact={route.exact}
                        component={lazy(() => import(`${route.component}`))}
                        key={`route-${route.link}`}
                      />
                    )
                  })
                }
              </Switch> 
            </Suspense>
        </Router>
      </HelmetProvider>
    </BreakpointProvider>
  </React.StrictMode>,
  document.getElementById('root')
)