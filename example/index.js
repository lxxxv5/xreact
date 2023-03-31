import React from 'react'
import ReactDom from 'react-dom'

function App() {
  return <div id="#app">888</div>
}

ReactDom.render(<App />, document.querySelector('#app'))
