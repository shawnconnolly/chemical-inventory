import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Rooms</NavigationItem>
        <NavigationItem link="/chemicals">Chemicals</NavigationItem>
    </ul>
);

export default navigationItems;