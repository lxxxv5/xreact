import { getPropertyInfo } from './ReactDOMProperty'

function createHTMLElement(type: string): HTMLElement {
  return document.createElement(type)
}

function setValueForStyles(node: HTMLElement, styles: any) {
  const style = node.style
  for (let styleName in styles) {
    const value = styles[styleName]
    if (typeof value === 'number' && value !== 0) {
      style[styleName] = value + 'px'
    }
  }
}

function setTextContent(domElement: HTMLElement, text: string): void {
  domElement.textContent = text
}

function setValueForProperty(node: HTMLElement, name: string, value: any) {
  const propertyInfo = getPropertyInfo(name)
  if (propertyInfo !== null) {
    const { attributeName } = propertyInfo
    // if (value === null) {
    //   node.removeAttribute(attributeName)
    //   return
    // }
    node.setAttribute(attributeName, value)
  }
}

function setProp(
  domElement: HTMLElement,
  tag: string,
  key: string,
  value: any,
  props: any
) {
  switch (key) {
    case 'style':
      setValueForStyles(domElement, value)
      break
    case 'children':
      setTextContent(domElement, value)
      break
    default:
      setValueForProperty(domElement, key, value)
  }
}

function setInitialProperties(
  domElement: HTMLElement,
  tag: string,
  props: Object
) {
  for (const propKey in props) {
    const propValue = props[propKey]
    if (propKey === null) {
      continue
    }
    setProp(domElement, tag, propKey, propValue, props)
  }
}

export { createHTMLElement, setInitialProperties }
