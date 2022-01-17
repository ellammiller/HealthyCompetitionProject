import {observable} from 'mobx';
import {Game} from "../../../backend/src/types/Game";
import {User} from "../../../backend/src/types/User";

interface gameStoreType {
    _isLoading: boolean,
    game: Game
}

interface currentUserStoreType {
    _isLoading: boolean,
    user: User
}


const gameStoreTemp: gameStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    game: {}
};

const currentUserStoreTemp: currentUserStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: {}
};

export const gameStore = observable(gameStoreTemp);

export const currentUserStore = observable(currentUserStoreTemp);


