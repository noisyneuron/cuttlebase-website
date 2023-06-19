import { createContext, useReducer } from 'react'
import { cloneDeep, remove } from 'lodash'
import { hierarchy as brainHierarchy, regions as brainRegions } from '../data/brain.json'
import { hierarchy as bodyHierarchy, regions as bodyRegions } from '../data/body.json'
import { useContext } from 'react'


const initialBrainState = {
  menu: brainHierarchy,
  currentSelection: Object.keys(brainRegions),
  currentLoaded: 0
}

const initialBodyState = {
  menu: bodyHierarchy,
  currentSelection: Object.keys(bodyRegions),
  currentLoaded: 0
}

function updateSelection(node, selection) {
  if (node.abbreviation) {
    const elements = node.hasSides ? [`${node.abbreviation}l`, `${node.abbreviation}r`] : [`${node.abbreviation}`]
    elements.forEach(el => {
      if (node.checked === 1) {
        selection.push(el)
      } else {
        remove(selection, (x) => x === el)
      }
    })
  }
}

function checkNodes(nodes, indices, value, currentSelection) {
  if (indices.length === 0) {
    nodes.forEach(node => {
      node.checked = value
      updateSelection(node, currentSelection)
      checkNodes(node.children, indices, value, currentSelection)
    })
  }
  else {
    const node = nodes[indices[0]]
    if (node) {
      checkNodes(node.children, indices.slice(1), value, currentSelection)
      const childrenAreSame = node.children.every(el => el.checked === 1) || node.children.every(el => el.checked === -1)
      if (childrenAreSame) {
        node.checked = value
        updateSelection(node, currentSelection)
      } else {
        node.checked = 0
      }
    }
  }
}

function accordianNodes(nodes, indices, value) {
  if (indices.length === 1) {
    const node = nodes[indices[0]]
    if (node) {
      node.open = value
      if (node.children.length > 0) accordianNodes(node.children, indices, value)
    }
  } else {
    if (indices.length > 0) {
      accordianNodes(nodes[indices[0]].children, indices.slice(1), value)
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'check':
      {
        const newState = cloneDeep(state)
        checkNodes(newState.menu, action.indices, action.value, newState.currentSelection)
        return newState
      }
    case 'accordian':
      {
        const newState = cloneDeep(state)
        accordianNodes(newState.menu, action.indices, action.value)
        console.log(newState)
        return newState
      }
    case 'imageload':
      return { ...state, currentLoaded: state.currentLoaded + 1 }
    default:
      throw new Error()
  }
}

export const MenuStateContext = createContext()
export const MenuDispatchContext = createContext()

export function MenuProvider(props) {
  const [state, dispatch] = useReducer(reducer, props.page === 'brain' ? initialBrainState : initialBodyState)
  return (
    <MenuStateContext.Provider value={state} >
      <MenuDispatchContext.Provider value={dispatch}>
        {props.children}
      </MenuDispatchContext.Provider>
    </MenuStateContext.Provider >
  )
}

export function useMenuState() {
  return useContext(MenuStateContext)
}

export function useMenuDispatch() {
  return useContext(MenuDispatchContext)
}


