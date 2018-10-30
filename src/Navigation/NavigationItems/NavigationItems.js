import React, { Component} from 'react';
import { connect } from 'react-redux';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';



class navigationItems extends Component {
    
    render() {
    let loginLink = (<NavigationItem link="/login">Login</NavigationItem>);
    if (this.props.isAuthenticated) {
        loginLink = (<NavigationItem link="/logout">Logout</NavigationItem>);
    }
    return (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Rooms</NavigationItem>
        {loginLink}
        
    </ul>);
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect( mapStateToProps)( navigationItems );
