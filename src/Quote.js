import React from 'react';
import './Quote.css';
import render from 'react-dom'

class Q extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div classname="q" id="text">{this.props.quote}</div>
        <div classname="author" id="author">{this.props.author}</div>
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: "",
      data: {},
    };
    this.clickHandle = this.clickHandle.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
        });
      });    
  }
  clickHandle() {
    const index = Math.floor(Math.random()*102);
    this.setState({
      quote: this.state.data.quotes[index],
    })
  }
  render() {
    return (
      <div className="Quote">
        <p className="text">Push the button for a quote!</p>
        <Q className="q"
          quote={this.state.quote.quote}
          author={this.state.quote.author}
        />
        <button className="newQuote" onClick={this.clickHandle}>
          Get Quote
        </button>
      </div>
    );
  }
}

export default Quote;

// help from: https://www.freecodecamp.org/forum/t/building-random-quote-generator-in-react/212226/7