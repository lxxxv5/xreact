const render = (element, container, callback) => {
  container.parentNode.replaceChild(element, container)
}

exports.render = render
