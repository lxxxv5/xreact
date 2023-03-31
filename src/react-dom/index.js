const createDom = element => {
  const { type, props } = element
  const { children, config = {} } = props
  const dom = document.createElement(type)
  for (let key in config) {
    dom[key] = config[key]
  }
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children)
    dom.appendChild(textNode)
  }
  return dom
}

const render = (element, container, callback) => {
  container.parentNode.replaceChild(createDom(element), container)
}

exports.render = render
