import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {httpRequest} from "../../common/utils/axios";
import {currentUserStore} from "../../stores";
import { useAuth0 } from "@auth0/auth0-react";
import {User} from "../../../../backend/src/types/User";
import {findOrCreateUserWrapper} from "../../common/utils/requests";
import "./HomePage.scss";

const auth0GoogleUserExampleStructure = {
    given_name:"Christopher",
    family_name:"Pastor",
    nickname:"cpasto1",
    name:"Christopher Pastor",
    picture:"https://lh6.googleusercontent.com/-1HWoXLgPBX0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucncVwuOVGdTLnXsXfX2Y9Dok5YsCQ/s96-c/photo.jpg",
    locale:"en",
    updated_at:"2020-11-25T17:39:26.732Z",
    email:"cpasto1@students.towson.edu",
    email_verified:true,
    sub:"google-oauth2|113149545124399807859"
};

const  auth0EmailUserExampleStructure = {
    "nickname":"legoguy2013",
    "name":"legoguy2013@comcast.net",
    "picture":"https://s.gravatar.com/avatar/f83abefe17da7a48e41216a56654ee9c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fle.png",
    "updated_at":"2020-11-25T17:58:47.853Z",
    "email":"legoguy2013@comcast.net",
    "email_verified":false,
    "sub":"auth0|5fbe9b57a2d7f3006e6e34ff"
};


const HomePage = observer(() => {
    const {isAuthenticated, user} = useAuth0();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateUserWrapper({isAuthenticated, user});
    }, []);

    return (
        <div className={"p-m-4 p-flex-column center-text"}>
            <div className="heading-color">
            <h1>GET FIT TOGETHER</h1>
            </div>
            <div className="center-text">
                Welcome to our website used to track health <br/> measures in a fun, competitive way!
            </div>
            <div>
                <img height="400px" width="1000px" className="center" src={"https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1457&q=80"}/>
            </div>
            <div className={"p-d-flex"}>
                <div className="text-block">
                    <h3>Solo Game</h3>
                    <div>Set personal fitness goals using Solo Play! Track your own progress by logging your health metrics over time.</div>
                </div>
                <div className="text-block">
                    <h3>Solo Multiplayer</h3>
                    <div>COMING SOON. Play against other users online by setting a group fitness goal. Users with the most progress will be displayed on the leaderboard. Make friends and get fit together!</div>
                </div>
                <div className="text-block">
                    <h3>Team Multiplayer</h3>
                    <div>COMING SOON. Create teams of friends and compete against one another to reach a team fitness goal. Team members with the most progress will be shown on the team leaderboard. Track your progress as compared to other team members on the team graph, and be the first to reach your group goal!</div>
                </div>
            </div>
        </div>
    );
});

export default HomePage;
