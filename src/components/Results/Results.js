import React from 'react';
import classes from './Results.module.scss';

const results = (props) => (
    <div>
        <h1>{props.city}</h1>
        <i className={[`wi ${props.weatherIcon}`, classes.Icon].join(' ')}></i>
        <h1>{`${Math.round(props.temp_main-273.15)}°C`}</h1>
        <h4>{props.description}</h4>
        
    </div>
);

export default results;