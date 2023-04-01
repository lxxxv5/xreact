import { createFiberRoot } from './ReactFiberRoot'
import { performSyncWorkOnRoot } from './ReactFiberWorkLoop'

const LegacyRoot = 0

// function createHTMLElement(type) {
//   return document.createElement(type)
// }

// function renderHostComponent(element) {
//   const { type, props } = element
//   const { children, config = {} } = props
//   const dom = createHTMLElement(type)
//   for (let key in config) {
//     dom[key] = config[key]
//   }
//   if (typeof children === 'string') {
//     const textNode = document.createTextNode(children)
//     dom.appendChild(textNode)
//   }
//   return dom
// }

// function renderFunctionComponent(element) {
//   const result = element.type()
//   return renderHostComponent(result)
// }

// function renderElement(element) {
//   if (typeof element.type === 'string') {
//     return renderHostComponent(element)
//   }
//   if (typeof element.type === 'function') {
//     return renderFunctionComponent(element)
//   }
//   return null
// }

function createContainer(container, tag) {
  return createFiberRoot(container, tag)
}

function createRootFromDOMContainer(container, children) {
  const root = createContainer(container, LegacyRoot)
  performSyncWorkOnRoot(root)
  return root
}

function render(element, container) {
  const root = createRootFromDOMContainer(container, element)
  return root
}

export { render }
export default { render }
