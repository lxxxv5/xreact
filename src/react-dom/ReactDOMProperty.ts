const properties = {
  className: {
    attributeName: 'class',
    propertyName: 'className',
  },
}

function getPropertyInfo(name: string) {
  return properties[name] || null
}

export { getPropertyInfo }
