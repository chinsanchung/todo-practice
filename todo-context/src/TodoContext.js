import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [];

function reducer(state = initialTodos, action) {
    switch (action.type) {
        case "CREATE":
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
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Error from Action.type ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialTodos);
    const nextId = useRef(1);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
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

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error("Cannot find useTodoNextId");
    }
    return context;
}
