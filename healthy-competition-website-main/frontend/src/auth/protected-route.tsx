import React, { ComponentType } from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import {ProgressSpinner} from "primereact/progressspinner";

interface ProtectedRouteProps {
    component: ComponentType<any>,
    path: string,
}

const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps): JSX.Element => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () =><ProgressSpinner />
        })}
        {...args}
    />
);

export default ProtectedRoute;
