const createElement = (type, config, children) => {
  const element = document.createElement(type)
  for (let key in config) {
    element[key] = config[key]
  }
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children)
    element.appendChild(textNode)
  }
  return element
}

exports.createElement = createElement
