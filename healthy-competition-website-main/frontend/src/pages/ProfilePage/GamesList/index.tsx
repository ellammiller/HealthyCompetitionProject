import { Button } from 'primereact/button';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {Game} from "../../../../../backend/src/types/Game";

interface GamesListProps {
    games: Array<Game>,
    handleAddMetric: (value: boolean) => void
}

export const GamesList = (props: GamesListProps): JSX.Element => {
    const history = useHistory();
    const {
        games,
        handleAddMetric
    } = props;

    return (
        <div className={'p-mr-2 p-flex-column'}>
            {games && games.map(game => {
                return (
                    <div className='p-mr-2 p-p-5 p-d-flex' key={`game-${game.id}`}>
                        <Button onClick={() => history.push(`/game/${game.type}/${game.id}`)}>
                            <div style={{width: '500px'}}>
                                <p className={'p-mr-2'}>name: {game.name}</p>
                                <p className={'p-mr-2'}>type: {game.type}</p>
                                <p className={'p-mr-2'}>{game.completed ? "Completed" : ""}</p>
                            </div>
                        </Button>
                        {/*<div style={{width: "20px"}}/>*/}
                        {/*<Button onClick={() => handleAddMetric(true)}>*/}
                        {/*    <div className={"p-mr-2 p-d-flex"}>*/}
                        {/*        <i className={"pi pi-plus"}/>*/}
                        {/*        {`Add ${game.metric}`}*/}
                        {/*    </div>*/}
                        {/*</Button>*/}
                    </div>
                );
            })}
        </div>
    );
};







