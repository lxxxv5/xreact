import { Component } from './ReactBaseClasses'
import { ReactElement } from './ReactElement'

const createElement = (type, config, children) => {
  const props = { children, config }

  return ReactElement(type, props)
}

export { createElement, Component }

export default { createElement, Component }
