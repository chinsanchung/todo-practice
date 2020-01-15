import React, {
    createContext,
    Dispatch,
    useReducer,
    useContext,
    useEffect
} from "react";

type Todo = {
    id: number;
    contents: string;
    done: boolean;
    hide: boolean;
};
type Action =
    | { type: "FIRSTRENDERING" }
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
        case "FIRSTRENDERING":
            return state.concat(JSON.parse(localStorage.todos));
        case "CREATE":
            const storage = JSON.parse(localStorage.todos);
            if (storage !== null) {
                localStorage.setItem(
                    "todos",
                    JSON.stringify(storage.concat(action.todo))
                );
            } else {
                localStorage.setItem("todos", JSON.stringify([action.todo]));
            }
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
            const prevStorage: Todo[] = JSON.parse(localStorage.todos);
            const arrayIndex = prevStorage.findIndex(
                element => element.id === action.id
            );
            prevStorage.splice(arrayIndex, 1);
            console.log(prevStorage);
            localStorage.setItem("todos", JSON.stringify(prevStorage));
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Error from Action.type ${action}`);
    }
}

const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);

type ProviderProps = { children: React.ReactNode };
export function TodoProvider({ children }: ProviderProps) {
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
