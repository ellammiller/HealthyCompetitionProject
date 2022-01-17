import {currentUserStore} from "../../stores";
import {httpRequest} from "./axios";
import {action} from "mobx";
import {User} from "../../../../backend/src/types/User";
import {Game} from "../../../../backend/src/types/Game";

export function findOrCreateUserWrapper({isAuthenticated, user}: {isAuthenticated: boolean, user: any}) {
    if (isAuthenticated) {
        currentUserStore._isLoading = true;

        const currentUser: User = {
            bio: "",
            email: user.email,
            friends: [],
            games: [],
            id: user.sub,
            picture: user.picture,
            userName: user.name
        };

        currentUserStore.user = currentUser;

        //we have to wrap our async request in a synchronous method call bc useEffect is synchronous
        void findOrCreateUser();
    }
}

export const findOrCreateUser =  action('findOrCreateUser', async () => {
    const response = await httpRequest({
        method: 'POST',
        endpoint: '/api/users/',
        data: {
            data: currentUserStore.user,
            type: 'find-one'
        }
    });

    if (response.data.length === 0) {
        await httpRequest({
            method: 'POST',
            endpoint: '/api/users/',
            data: {
                data: currentUserStore.user,
                type: 'insert-one'
            }
        });
    } else {
        currentUserStore.user = response.data[0]; //todo: think about passing the object not wrapped in an array
    }

    currentUserStore._isLoading = false;
    console.log(response.data);
});

export function getAllGamesWrapper(setGames: (value: Array<Game>) => void) {
    async function getData() {
        const result = await getAllGames();

        setGames(result);
    }
    void getData();
}

export const getAllGames = action('getAllGames', async () => {
    const response = await httpRequest({
        method: 'POST',
        endpoint: '/api/games/',
        data: {
            data: currentUserStore.user.games,
            type: 'find-many'
        }
    });

    if (response.data) {
        return response.data;
    } else {
        return [];
    }
});
