import React from 'react';
import './Quote.css';
import render from 'react-dom'

/*
Good job with passing information from a parent component to a child.
In practice, you would not need to split these items into separate 
components because they are so closely related in functionality. 

Also -- Q is not a good class name because it doesn't reveal
any meaning. An engineer who comes along to edit your code
doesn't know what Q is on first glance. 
*/
class Q extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //const {quote, author} = this.props; is another way to access props variables
    //and then you can simply write {quote} or {author} in your return.
    //Intent with this change is to improve readability.
    return (
      <div>
        <div classname="q" id="text">{this.props.quote}</div>
        <div classname="author" id="author">{this.props.author}</div>
      </div>
    );
  }
}

/*
I see how you moved this component into index.js instead of App.js.
totally fine -- for future reference, app.js is where we expect
to contain the ultimate source of truth for a codebase. It's the
first file I immediately know where to look to see ok what child
components are coming out of App.js. 

In this repo, given you aren't using App.js, delete App.js and other
extraneous files you aren't using like the test files or App.css.
*/
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
  
  /*
  Write functions as arrow functions. Then you can delete the bind this syntax above.
  This is a syntax comment -- arrow functions are another way of writing a function
  provided by React that auto takes care of binding. 
  
  Write click handle as
  clickHandle = () => {return (); }
  
  */
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
