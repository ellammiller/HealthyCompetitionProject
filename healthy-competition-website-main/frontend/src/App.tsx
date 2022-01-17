import React, {useEffect, useState} from 'react';
import {Switch, Route} from "react-router-dom";
import MyToolbar from './common/MainToolbar';
import './assets/index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from './auth/protected-route';
import {observer} from "mobx-react";
import {ProgressSpinner} from "primereact/progressspinner";
import HomePage from './pages/HomePage/HomePage';
import Donation from "./common/Donation";
import SoloGamePage from "./pages/SoloGamePage/SoloGamePage";

const App: React.FunctionComponent = observer((): JSX.Element => {
    const { isLoading } = useAuth0();

    if(isLoading) {
        return <ProgressSpinner />;
    }

    return (
        <React.Fragment>
            <MyToolbar />
            <Switch>
                <Route exact path="/" >
                    <HomePage />
                </Route>
                <Route path="/home" >
                    <HomePage />
                </Route>
                <Route path="/donate" >
                    <Donation />
                </Route>
                <ProtectedRoute path={`/game/team-multi/:id`} component={() => <div>I exist</div>} />
                <ProtectedRoute path={`/game/solo-multi/:id`} component={() => <div>I exist</div>} />
                <ProtectedRoute path={`/game/solo/:id`} component={SoloGamePage} />
                <ProtectedRoute path={`/user/:id`} component={ProfilePage}/>
            </Switch>
        </React.Fragment>
    );
});

export default App;
