import {Game, GameUser} from "../types/Game";
import {User} from "../types/User";


export function isGameUser(arg: any): arg is GameUser {
    return arg.values !== undefined;
}

export function isGameUserArray(arg: any): arg is Array<GameUser> {
    return arg[0].values !== undefined;
}


export function isUser(arg: any): arg is User {
    return arg.userName !== undefined;
}

export function isGame(arg: any): arg is Game {
    return arg.name !== undefined;
}

