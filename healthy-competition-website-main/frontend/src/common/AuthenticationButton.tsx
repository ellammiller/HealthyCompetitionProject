import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserButton from "./UserButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated
        ? <React.Fragment>
            <UserButton />
            <LogoutButton />
        </React.Fragment>
        : <LoginButton />;
};

export default AuthenticationButton;
