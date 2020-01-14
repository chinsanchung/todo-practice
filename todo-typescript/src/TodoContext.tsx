import React, {
    createContext,
    Dispatch,
    useReducer,
    useContext,
    useRef
} from "react";

type Todo = {
    id: number;
    contents: string;
    done: boolean;
    hide: boolean;
};
type Action =
    | { type: "CREATE"; todo: Todo }
    | { type: "TOGGLE"; id: number }
    | { type: "CHANGECONTENTS"; id: number; input: string }
    | { type: "ALLTOGGLE"; done: boolean }
    | { type: "FILTERALL" }
    | { type: "FILTERACTIVE" }
    | { type: "FILTERCOMPLETED" }
    | { type: "REMOVE"; id: number };

const initialTodos: Todo[] = [];

function reducer(state = initialTodos, action: Action) {
    switch (action.type) {
        case "CREATE":
            return state.concat(action.todo);
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
        case "ALLTOGGLE":
            return state.map(todo => ({
                ...todo,
                done: action.done
            }));
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
            throw new Error(`Error from Action.type ${action}`);
    }
}

const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);
const TodoNextIdContext = createContext<any | null>(null);

type ProviderProps = { children: React.ReactNode };
export function TodoProvider({ children }: ProviderProps) {
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
