import React, { useReducer, createContext, useContext, useEffect } from "react";

const initialTodos = [];

function reducer(state = initialTodos, action) {
    switch (action.type) {
        case "FIRSTRENDERING":
            return state.concat(JSON.parse(localStorage.getItem("todos")));
        case "CREATE":
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
        case "ALLTOGGLE":
            return state.map(todo => ({
                ...todo,
                done: action.value
            }));
        case "TOGGLE":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case "CHANGECONTENTS":
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, contents: action.input }
                    : todo
            );
        case "FILTERALL":
            return state.map(todo => ({ ...todo, hide: false }));
        case "FILTERACTIVE":
            return state.map(todo =>
                todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
        case "FILTERCOMPLETED":
            return state.map(todo =>
                !todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
        case "REMOVE":
            const prevStorage = JSON.parse(localStorage.getItem("todos"));
            const arrayIndex = prevStorage.findIndex(
                element => element.id === action.id
            );
            prevStorage.splice(arrayIndex, 1);
            console.log(prevStorage);
            localStorage.setItem("todos", JSON.stringify(prevStorage));
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Error from Action.type ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialTodos);

    useEffect(() => {
        if (localStorage.todos) {
            const storageArray = JSON.parse(localStorage.todos);
            console.log("localStorage exists " + storageArray);
            dispatch({ type: "FIRSTRENDERING" });
        } else {
            console.log("There is no localStorage.");
        }
    }, []);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error("Cannot find useTodoState");
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error("Cannot find useTodoDispatch");
    }
    return context;
}
