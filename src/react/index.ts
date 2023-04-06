import { REACT_FRAGMENT_TYPE } from '../shared/ReactSymbols'
import { Component } from './ReactBaseClasses'
import { ReactElement } from './ReactElement'

const createElement = (type, config, children) => {
  const props: any = {}

  if (config !== null) {
    for (let propName in config) {
      props[propName] = config[propName]
    }
  }

  props.children = children

  return ReactElement(type, props)
}

export { createElement, Component, REACT_FRAGMENT_TYPE as Fragment }

export default { createElement, Component, Fragment: REACT_FRAGMENT_TYPE }
