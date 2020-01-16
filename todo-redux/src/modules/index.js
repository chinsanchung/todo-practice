import { combineReducers } from "redux";

// * Action type
const FIRST_RENDERING = "FIRST_RENDERING";
const CREATE = "CREATE";
const ALL_TOGGLE = "ALL_TOGGLE";
const TOGGLE = "TOGGLE";
const CHANGE_CONTENTS = "CHANGE_CONTENTS";
const FILTER_ALL = "FILTER_ALL";
const FILTER_ACTIVE = "FILTER_ACTIVE";
const FILTER_COMPLETED = "FILTER_COMPLETED";
const REMOVE = "REMOVE";

// * Action Creator
export const firstRendering = () => ({ type: FIRST_RENDERING });
export const create = todo => ({
    type: CREATE,
    todo
});
export const all_toggle = done => ({
    type: ALL_TOGGLE,
    done
});
export const toggle = id => ({
    type: TOGGLE,
    id
});
export const change_contents = (id, contents) => ({
    type: CHANGE_CONTENTS,
    id,
    contents
});
export const filter_all = () => ({
    type: FILTER_ALL
});
export const filter_active = () => ({
    type: FILTER_ACTIVE
});
export const filter_completed = () => ({
    type: FILTER_COMPLETED
});
export const remove = id => ({
    type: REMOVE,
    id
});
const initialState = [];

// * reducer
function todos(state = initialState, action) {
    switch (action.type) {
        case FIRST_RENDERING:
            return state.concat(JSON.parse(localStorage.getItem("todos")));
        case CREATE:
            const storage = JSON.parse(localStorage.getItem("todos"));
            if (storage !== null) {
                localStorage.setItem(
                    "todos",
                    JSON.stringify(storage.concat(action.todo))
                );
            } else {
                localStorage.setItem("todos", JSON.stringify([action.todo]));
            }
            return state.concat(action.todo);
        case ALL_TOGGLE:
            return state.map(todo => ({
                ...todo,
                done: action.done
            }));
        case TOGGLE:
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case CHANGE_CONTENTS:
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, contents: action.contents }
                    : todo
            );
        case FILTER_ALL:
            return state.map(todo => ({ ...todo, hide: false }));
        case FILTER_ACTIVE:
            return state.map(todo =>
                todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
        case FILTER_COMPLETED:
            return state.map(todo =>
                !todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
        case REMOVE:
            const prevStorage = JSON.parse(localStorage.getItem("todos"));
            const arrayIndex = prevStorage.findIndex(
                element => element.id === action.id
            );
            prevStorage.splice(arrayIndex, 1);
            console.log(prevStorage);
            localStorage.setItem("todos", JSON.stringify(prevStorage));
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

export default combineReducers({ todos });
