import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

// function LiItem({ toolName }) {
//   return <li>{toolName}</li>
// }

// function ToolList({ list }) {
//   return (
//     <ul className="title" style={{ fontSize: 18 }}>
//       {list.map(item => (
//         <LiItem toolName={item} />
//       ))}
//     </ul>
//   )
// }

class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     tools: [
  //       ['react', 'vue', 'angular'],
  //       ['webpack', 'vite', 'rollup'],
  //     ],
  //   }
  // }
  handleClick() {
    console.log('hello xreact!')
  }
  render() {
    // const { tools } = this.state
    return (
      <div className="title" onClick={this.handleClick}>
        xreact
      </div>
    )
    // return (
    //   <>
    //     {tools.map(item => (
    //       <ToolList list={item} />
    //     ))}
    //   </>
    // )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
