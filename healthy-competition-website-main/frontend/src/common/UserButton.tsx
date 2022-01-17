import React from "react";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {observer} from "mobx-react";
import {currentUserStore} from "../stores";

const UserButton = observer((): JSX.Element => {
    const {user} = currentUserStore;

    return (
        <Link to={`/user/${encodeURIComponent(user.userName)}`}>
            <Button
                className="p-mr-2"
                icon="pi pi-user"
                label="User"
            />
        </Link>
    );
    
});

export default UserButton;
