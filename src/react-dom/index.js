function createHTMLElement(type) {
  return document.createElement(type)
}

function renderHostComponent(element) {
  const { type, props } = element
  const { children, config = {} } = props
  const dom = createHTMLElement(type)
  for (let key in config) {
    dom[key] = config[key]
  }
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children)
    dom.appendChild(textNode)
  }
  return dom
}

function renderFunctionComponent(element) {
  const result = element.type()
  return renderHostComponent(result)
}

function renderElement(element) {
  if (typeof element.type === 'string') {
    return renderHostComponent(element)
  }
  if (typeof element.type === 'function') {
    return renderFunctionComponent(element)
  }
  return null
}

const render = (element, container, callback) => {
  container.parentNode.replaceChild(renderElement(element), container)
}

exports.render = render
