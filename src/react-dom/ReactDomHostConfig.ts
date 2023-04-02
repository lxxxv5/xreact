import { createHTMLElement, setInitialProperties } from './ReactDOMComponent'

export type Instance = HTMLElement
export type Props = {
  children?: any
}

function createInstance(type: string) {
  const domElement = createHTMLElement(type)
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
