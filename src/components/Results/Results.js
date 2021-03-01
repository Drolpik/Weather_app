import React from 'react';
import classes from './Results.module.scss';

const celsiusConverter = (temp) => {
    return `${Math.round(temp-273.15)}°C`;
}

const results = (props) => (
    <div className={classes.Container}>
        <h1 className={classes.CityName}>{props.city}</h1>
        <i className={[`wi ${props.weatherIcon}`, classes.Icon].join(' ')}></i>

        <h1 className={classes.TempMain}>{celsiusConverter(props.temp_main)}</h1>
        <h3 className={classes.MinMax}>
            <span>{celsiusConverter(props.temp_min)}</span>
            <span>{celsiusConverter(props.temp_max)}</span>
        </h3>
        <h4 className={classes.Description}>{props.description}</h4>
    </div>
);

export default results;