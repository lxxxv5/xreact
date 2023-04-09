import { createHTMLElement, setInitialProperties } from './ReactDOMComponent'
import { precacheFiberNode, updateFiberProps } from './ReactDOMComponentTree'
import { Fiber } from './ReactInternalType'

export type Instance = HTMLElement
export type Props = {
  children?: any
}

function createInstance(
  type: string,
  props: any,
  internalInstanceHandle: Fiber
) {
  const domElement = createHTMLElement(type)

  precacheFiberNode(internalInstanceHandle, domElement)
  updateFiberProps(domElement, props)

  return domElement
}

function finalizeInitialChildren(
  domElement: Instance,
  type: string,
  props: Props
) {
  setInitialProperties(domElement, type, props)
}

export { createInstance, finalizeInitialChildren }
