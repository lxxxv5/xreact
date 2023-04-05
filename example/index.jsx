import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

function LiItem({ toolName }) {
  return <li>{toolName}</li>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tools: ['webpack', 'vite', 'rollup'] }
  }
  render() {
    const { tools } = this.state
    return (
      <ul className="title" style={{ fontSize: 18 }}>
        {tools.map(item => (
          <LiItem toolName={item} />
        ))}
      </ul>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
