import React from 'react';
import io from 'socket.io-client'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message: []
    }

    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.socket = io("http://localhost:5000")
    this.socket.on('message', (message) => {
      this.setState({ message: [message, ...this.state.message] })
    })
  }

  sendMessage(event) {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      let message = {
        body,
        from: 'Me'
      }

      this.setState({ message: [message, ...this.state.message] })
      this.socket.emit('message', message)
    }
  }

  render() {
    return (
      <div className="App">
        <input id="message" type="text" placeholder="masukkan pesan" onKeyUp={this.sendMessage} />
        {this.state.message.map((message) => {
          return (<p>message: {message.body} from {message.from}</p>)
        })}
      </div>
    );
  }
}

export default App;
