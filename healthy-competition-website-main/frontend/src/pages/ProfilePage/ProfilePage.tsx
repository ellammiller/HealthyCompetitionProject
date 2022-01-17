import React, {useEffect, useState} from 'react';
import {UserInfo} from './UserInfo';
import {observer} from "mobx-react";
import {currentUserStore, gameStore} from "../../stores";
import {ProgressSpinner} from "primereact/progressspinner";
import {findOrCreateUserWrapper, getAllGamesWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import {PopUp} from "../../common/DataEntryPopUp/Popup";
import { Button } from 'primereact/button';
import {Game, GameUser} from "../../../../backend/src/types/Game";
import {GamesList} from "./GamesList";
import {NewGamePopUp} from "../../common/NewGamePopUp";
import {httpRequest} from "../../common/utils/axios";

const ProfilePage = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    const [showNewGamePopUp, setShowNewGamePopUp] = useState<boolean>(false);
    const [showAddMetricPopUp, setShowAddMetricPopUp] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<Array<GameUser>>([]);
    const [games, setGames] = useState<Array<Game>>([]);

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateUserWrapper({isAuthenticated, user});
        async function getAllUsers() {
            const response = await httpRequest({
                method: "POST",
                endpoint: "/api/users",
                data: {
                    type: 'find-many'
                }
            });

            setAllUsers(response.data.map((user) => {
                return {
                    id: user.id,
                    userName: user.userName,
                    values: []
                };
            }));

        }
        void getAllUsers();
    }, []);

    useEffect(() => {
        getAllGamesWrapper(setGames);
    }, [currentUserStore.user.games]);

    if (currentUserStore._isLoading || !games) {
        return <ProgressSpinner />;
    }

    return (
        <>
            <div className={'p-d-flex'}>
                <div className="p-mr-5">
                    <div style={{
                        margin: "18px 0px"
                    }}>
                        <div>
                            <UserInfo user={currentUserStore.user}/>
                        </div>
                    </div>
                    <Button className="p-mr-2" label="Create Game" onClick={() => setShowNewGamePopUp(true)}/>
                </div>
                <GamesList games={games} handleAddMetric={setShowAddMetricPopUp}/>
            </div>
            {/*<PopUp show={showAddMetricPopUp} handleClose={() => setShowAddMetricPopUp(false)} metric={"Weight"}/>*/}
            <NewGamePopUp handleClose={() => setShowNewGamePopUp(false)} show={showNewGamePopUp} allUsers={allUsers} />
        </>
    );
});

export default ProfilePage;
