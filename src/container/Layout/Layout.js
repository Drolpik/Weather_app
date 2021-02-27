import React, {Component} from 'react';
import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';
import axios from 'axios';
import 'weather-icons/css/weather-icons.css';
import {URL, apiKey} from '../../api/config';
import classes from './Layout.module.scss';
import ScaleLoader from 'react-spinners/ScaleLoader';

class Layout extends Component {
    state = {
        city: null,
        temp_main: null,
        temp_max: null,
        temp_min: null,
        description: '',
        searchValue: '',
        showLoading: false,
    }

    weatherIcon = {
        Thunderstorm: 'wi-thunderstorm',
        Drizzle: 'wi-sleet',
        Rain: 'wi-storm-showers',
        Snow: 'wi-snow',
        Atmosphere: 'wi-fog',
        Clear: 'wi-day-sunny',
        Clouds: 'wi-day-fog'
    }

    componentDidMount() {
        this.getWeatherData('Kraków');
    }

    getWeatherIcon(icons, rangeID) {
        switch(true) {
            case rangeID >= 200 && rangeID <= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeID >= 300 && rangeID <= 321:
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            case rangeID >= 500 && rangeID <= 531:
                this.setState({icon: this.weatherIcon.Rain});
                break;
            case rangeID >= 600 && rangeID <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeID >= 701 && rangeID <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeID === 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;     
            case rangeID >= 801 && rangeID <= 804:
                this.setState({icon: this.weatherIcon.Clouds});
                break;
            default:
                this.setState({icon: this.weatherIcon.Clouds});
        }
    }

    getWeatherData = async (cityName) => {
        this.setState({showLoading: true});
        await axios.get(URL + `q=${cityName}&appid=${apiKey}`)
            .then((response) => {
                this.setState({
                    temp_main: response.data.main.temp,
                    temp_max: response.data.main.temp_max,
                    temp_min: response.data.main.temp_min,
                    city: response.data.name,
                    description: response.data.weather[0].description
                });
                this.getWeatherIcon(this.weatherIcon, response.data.weather[0].id);
                console.log(response.data);
                setTimeout(() => {
                    this.setState({showLoading: false});
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    setSearchValueHandler = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    }

    searchValueHandler = (event) => {
        if(event.key === 'Enter') {
            this.getWeatherData(this.state.searchValue);
            this.setState({ searchValue: '' });
        }
    }
    
    render() {
        let results = <Results 
            city={this.state.city} 
            temp_main={this.state.temp_main} 
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description} 
            weatherIcon={this.state.icon} >
        </Results>;

        if(this.state.showLoading) {
            results = <ScaleLoader color={'#3a431099'} />
        }

        return(
            <>
                <div className={classes.Background}></div>
                <div className={classes.Tab}>
                    <div className={classes.Header}>
                        <Logo />
                        <SearchBar
                            onChange={this.setSearchValueHandler} 
                            value={this.state.searchValue} 
                            onKeyDown={this.searchValueHandler} >
                        </SearchBar>
                    </div>
                    {results}
                </div>
            </>
        );
    }
}

export default Layout;