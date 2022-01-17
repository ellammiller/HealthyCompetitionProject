import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {findOrCreateUserWrapper} from "../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";

const Donation = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateUserWrapper({isAuthenticated, user});
    }, []);

    return (
        <Link to="/donate">
            <Button 
                label="Donate"
                className="p-mr-2"
            />
        </Link>
    );
};


export default Donation;
