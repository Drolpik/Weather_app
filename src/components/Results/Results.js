import React from 'react';
import classes from './Results.module.scss';

const celsiusConverter = (temp) => {
    return `${Math.round(temp-273.15)}°C`;
}

const results = (props) => (
    <div className={classes.Container}>
        <h1>{props.city}</h1>
        <i className={[`wi ${props.weatherIcon}`, classes.Icon].join(' ')}></i>

        <div className={classes.TempContent}>
            <h1>{celsiusConverter(props.temp_main)}</h1>
            <h3 className={classes.MinMax}>
                <span>{celsiusConverter(props.temp_min)}</span>
                <span>{celsiusConverter(props.temp_max)}</span>
            </h3>
        </div>
        
        <h4>{props.description}</h4>
        
    </div>
);

export default results;