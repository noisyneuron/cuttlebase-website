import { useContext } from 'react'
import { createContext, useState, useEffect } from 'react'

/*
useBreakpointContext returns 
{
  isMobile: true/false,
  // ... for each key in config.breakpoints (../data/config)

  mqClass: '' // concatenated class names for all matched
}
*/

const BreakpointContext = createContext()

export function BreakpointProvider({ breakpoints, children}) {
  const [matches, setMatches] = useState({})

  useEffect(() => {
    const breakpointKeys = Object.keys(breakpoints)
    const mqList = {}

    const updateMatches = () => {
      const matchedClasses = []
      const updateMatches = breakpointKeys.reduce((result, breakpointKey) => {
        result[breakpointKey] = mqList[breakpointKey].matches
        if (mqList[breakpointKey].matches) {
          matchedClasses.push(breakpoints[breakpointKey].class)
        }
        return result
      }, {})
      updateMatches.mqClass = matchedClasses.join(' ')
      setMatches(updateMatches)
    }

    if (window && window.matchMedia) {
      breakpointKeys.forEach(breakpointKey => {
        mqList[breakpointKey] = window.matchMedia(breakpoints[breakpointKey].query)
        mqList[breakpointKey].addListener(updateMatches)
      })
      updateMatches()
    }

    return () => {
      breakpointKeys.forEach(breakpointKey => {
        mqList[breakpointKey].removeListener(updateMatches)
      })
    }

  }, [breakpoints])

  return (
    <BreakpointContext.Provider value={matches}>
      {children}
    </BreakpointContext.Provider>
  )
}

export function useBreakpointContext() {
  return useContext(BreakpointContext)
}