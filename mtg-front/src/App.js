import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  state = {
    search: "",
    cards: []
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        cards: data
      })
    })
  }

  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
         <input name="search" value={this.state.search} onChange={this.handleChange}/>
         <input type="submit"/>
        </form>
        <div className="cards">
          {this.state.cards.map(card => {
            return (
              <div>
                <h3>{card.name}</h3>
                <p>{card.text}</p>
                <img src={card.image_url} alt={card.name}/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
  
}

export default App;
