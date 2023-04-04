import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

class App extends React.Component {
  render() {
    return <div className="title">888</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
