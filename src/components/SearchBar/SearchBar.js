import React from 'react';
import classes from './SearchBar.module.scss';

const searchBar = (props) => (
    <div className={classes.SearchBar}>
        <input 
            type="text" 
            placeholder="Enter your city name" 
            onChange={props.onChange} 
            value={props.value} 
            onKeyDown={props.onKeyDown} >
        </input>
    </div>
);

export default searchBar;