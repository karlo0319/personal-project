const initialState = {
    user: {
        username: '',
        email: '',
        password: '',
        userid: 0
    }
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER,
        payload: {}
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_USER:
            return { ...state, user: payload };
        case CLEAR_USER:
            return { ...state, user: payload };
        default:
            return state;
    }
}