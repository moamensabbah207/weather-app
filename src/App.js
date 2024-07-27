import React, { Component } from 'react';
import Form from './component/Form';
import Weather from './component/Weather';



// https://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44

const API_KEY = "f5f0321cf1eb368e031fe2bf62067add";


class App extends Component {

  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }

  getWeather = async (e) => {
    e.preventDefault()
    
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`)
    const data = await api.json();
    console.log(data)
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        tempreature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please Enter Data'
      })
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className='weather-app'>
            <Form getWeather={this.getWeather}/>
            <Weather 
              tempreature= {this.state.tempreature}
              city= {this.state.city}
              country= {this.state.country}
              humidity= {this.state.humidity}
              description= {this.state.description}
              error= {this.state.error}
            />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
