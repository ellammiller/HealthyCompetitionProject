import React from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link} from 'react-router-dom';
import AuthenticationButton from "../AuthenticationButton";
import Donation from '../Donation';

const left = () => (
    <React.Fragment>
        <Link to="/home">
            <Button label="Home" className="p-mr-2" />
        </Link>
        <Donation/>
    </React.Fragment>
);

const right = () => (
    <React.Fragment>
        <AuthenticationButton />
    </React.Fragment>
);

const MainToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} right={right} />
    </React.Fragment>
);


export default MainToolbar;
