const BASE_URL = 'https://psw-server.onrender.com';
export const PUBLIC_ID = '30983';
export const PRIVATE_ID = 'nyvjl';

export function GetUsers() {
    return fetch(BASE_URL + "/users", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

export function GetHeroesFromUsers(userID) {
    return fetch(BASE_URL + '/users/' + userID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}


export function GetTopHeroesFromUsers(userID) {
    return fetch(BASE_URL + '/users/' + userID + '/top', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}


export function UpdateSuperhero(list) {
    return fetch(BASE_URL + "/users/" + PRIVATE_ID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}


export function UpdateTop(list) {
    return fetch(BASE_URL + "/users/" + PRIVATE_ID + '/top', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}
