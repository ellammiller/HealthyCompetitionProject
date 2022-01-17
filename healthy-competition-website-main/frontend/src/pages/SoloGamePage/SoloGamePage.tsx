import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {currentUserStore, gameStore} from "../../stores";
import {ProgressSpinner} from "primereact/progressspinner";
import {findOrCreateUserWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import {PopUp} from "../../common/DataEntryPopUp/Popup";
import {Button} from 'primereact/button';
import {ProgressGraph} from "../../common/Graph";
import UserStats from "../../common/UserStats";
import { useParams } from 'react-router-dom';
import {httpRequest} from "../../common/utils/axios";


interface SoloPageRouteParams {
    id: string
}

const SoloGamePage = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams<SoloPageRouteParams>();

    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const showModal = () => {
        setShowPopUp(true);
    };
    
    const hideModal = () => {
        setShowPopUp(false);
    };

    useEffect(() => {
        findOrCreateUserWrapper({isAuthenticated, user});
        async function getGame() {
            gameStore._isLoading = true;
            const response = await httpRequest({
                method: "POST",
                endpoint: '/api/games/',
                data: {
                    data: {
                        id: id
                    },
                    type: 'find-one'
                }
            });
            console.log(response.data)
            gameStore.game = response.data[0];

            gameStore._isLoading = false;
        }
        void getGame();
    }, []);

    if (currentUserStore._isLoading || gameStore._isLoading) {
        return <ProgressSpinner />;
    }

    function getCurrentUserData() {
        return gameStore.game.users && gameStore.game.users.find(user => {
            return user.id === currentUserStore.user.id;
        })?.values;
    }

    function getStartingValue() {
        const data = getCurrentUserData();
        return data && data[0] && data[0].value;
    }

    function getCurrentValue() {
        const data = getCurrentUserData();
        return data && data[0] && data[data.length - 1].value;
    }

    return (
        <>
            <div className={'p-m-6 p-flex-column p-ai-center p-jc-center'} style={{textAlign: "center"}}>
                <div>
                    <h1>Solo Play</h1>
                </div>
                <UserStats
                    goal={gameStore.game.goal}
                    starting={getStartingValue()}
                    current={getCurrentValue()}
                />
                <div style={{height:"100%", width: "60%", margin: "0 auto"}}>
                    <div style ={{textAlign: "right"}}>
                        <Button className="p-mr-2" label={`Add ${gameStore.game.metric}`} onClick={showModal} style={{}}/>
                    </div>
                    <ProgressGraph rawData={gameStore.game}/>
                </div>
            </div>
            <PopUp show={showPopUp} handleClose={hideModal} metric={gameStore.game.metric} startDate={gameStore.game.dateStarted}/>
        </>
    );
});

export default SoloGamePage;
