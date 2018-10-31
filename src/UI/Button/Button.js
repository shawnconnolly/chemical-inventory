import React from 'react';
import { Button } from 'reactstrap';

import classes from './Button.module.css';

const button = (props) => (
    <Button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;