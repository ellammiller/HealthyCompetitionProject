import React from 'react';
import {User} from "../../../../backend/src/types/User";
import {observer} from "mobx-react";

interface userInfoProps {
    user: User
}

const UserInfo = observer(({user}: userInfoProps) => {

    return(
        <div>
            <img style ={{width:"160px", height: "160px", borderRadius: "80px"}} src={user.picture}/>
            <h4>{user.userName}</h4>
            <p>Bio: {user.bio}</p>
        </div>
    );
});

export {UserInfo};