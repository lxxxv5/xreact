const { ReactElement } = require('./ReactElement')

const createElement = (type, config, children) => {
  const props = { children, config }

  return ReactElement(type, props)
}

exports.createElement = createElement
