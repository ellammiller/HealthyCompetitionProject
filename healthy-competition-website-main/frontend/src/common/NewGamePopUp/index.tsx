import React, {useState} from 'react';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {GameUser, Game} from "../../../../backend/src/types/Game";
import {currentUserStore} from "../../stores";
import {observer} from "mobx-react";
import {v4 as uuidv4} from 'uuid';
import {httpRequest} from "../../common/utils/axios";
import {useHistory} from "react-router-dom";
import {longEnUSFormatter} from "../../common/utils/helpers";

interface NewGamePopUpProps {
    handleClose: ()=> void,
    show: boolean,
    allUsers: Array<GameUser>
}

export const NewGamePopUp = observer((props: NewGamePopUpProps): JSX.Element => {
    const {
        handleClose,
        show,
        allUsers
    } = props;

    const gameTypes = [
        {
            displayName: 'Solo',
            name: 'solo'
        },
        {
            displayName: 'Solo-Multi',
            name: 'solo-multi'
        },
        {
            displayName: 'Team-Multi',
            name: 'team-multi'
        }
    ];

    const metricOptions = [
        'Weight'
    ];

    const history = useHistory();
    const [gameName, setGameName] = useState<string>();
    const [gameType, setGameType] = useState<string>();
    const [metric, setMetric] = useState<string>();
    const [goal, setGoal] = useState<number>();
    const [users, setUsers] = useState<Array<GameUser>>([{
        id: currentUserStore.user.id,
        userName: currentUserStore.user.userName,
        values: []
    }]);

    async function createNewGame() {
        if (gameName && gameType && metric && goal && (gameType === 'solo' || gameType === 'solo-multi' || gameType === 'team-multi')) {
            //get values from all the text boxes
            //create a new game object
            const newGame: Game = {
                completed: false,
                dateStarted: longEnUSFormatter.format(new Date()),
                goal: goal,
                id: uuidv4(),
                metric: metric,
                name: gameName,
                timePeriod: '1 week',
                type: gameType,
                users: users
            };

            try {
                //insert it into the backend
                const response = await httpRequest({
                    method: "POST",
                    endpoint: "/api/games",
                    data: {
                        data: newGame,
                        type: 'insert-one'
                    }
                });

                const value = response.data;

                //add the game id to all the users in the game
                const response2 = await httpRequest({
                    method: "POST",
                    endpoint: "/api/users",
                    data: {
                        data: newGame.users,
                        game: newGame.id,
                        type: 'update-many'
                    }
                });

                const value2 = response2.data;

                document.getElementById('newGameResponse').innerText = 'Game successfully created. Please wait to be redirected to the game page in 5s';

                setTimeout(() => history.push(`/game/${gameType}/${newGame.id}`), 5000);

            } catch (e) {
                document.getElementById('newGameResponse').innerText = 'Failed to Create Game';
            }

        } else {
            alert("Enter values for all: Game Name, Game Type, Metric and Goal");
        }

    }

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className="modal-title p-d-flex p-jc-between p-ai-center">
                    Enter Data
                    <Button icon="pi pi-times" className="p-mr-2 " onClick={handleClose}/>
                </div>
                <div className={"p-p-4"}>
                    <div style={{fontSize: "24pt", fontWeight: "bolder", paddingBottom: "10px"}}>New Game</div>
                    <div className="p-m-2">
                        <label htmlFor="gameName">Game Name: </label>
                        <InputText
                            id="gameName"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}/>
                    </div><br/>
                    <div className="p-m-2">
                        <label htmlFor="gameType">Type: </label>
                        <Dropdown
                            id="gameType"
                            value={gameType}
                            options={gameTypes}
                            optionValue={'name'}
                            optionLabel={'displayName'}
                            onChange={(e) => setGameType(e.value)}
                        />
                    </div><br/>
                    <div className="p-m-2">
                        <label htmlFor="metric">Metric: </label>
                        <Dropdown
                            id="metric"
                            value={metric}
                            options={metricOptions}
                            onChange={e => setMetric(e.value)}
                            placeholder={"Select a Metric"}
                        />
                    </div><br/>
                    <div className="p-m-2">
                        <label htmlFor="goal">Goal: </label>
                        <InputNumber
                            id="goal"
                            value={goal}
                            onValueChange={(e) => setGoal(e.value)}
                            mode={"decimal"}
                            suffix=" lbs"
                        />
                    </div><br/>
                    <div className="p-m-2">
                        <label htmlFor={"users"}>Select Users: </label>
                        <MultiSelect
                            id="users"
                            display='chip'
                            value={users}
                            options={allUsers}
                            optionLabel={'userName'}
                            onChange={(e) => setUsers(e.value)}
                            placeholder={"Select Users"}
                            filter
                            showClear
                            disabled={gameType === 'solo'}
                        />
                    </div><br/>
                    <Button className="p-mr-2" label="Create New Game" onClick={createNewGame}/><br/>
                    <p id="newGameResponse"></p>
                </div>
            </div>
        </div>
    );
});
