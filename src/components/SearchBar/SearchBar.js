import React from 'react';
import classes from './SearchBar.module.scss';

const searchBar = (props) => (
    <input 
        className={classes.SearchBar}
        type="text" 
        placeholder="Enter your city name" 
        onChange={props.onChange} 
        value={props.value} 
        onKeyDown={props.onKeyDown} >
    </input>
);

export default searchBar;