import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
/*    {
        id: 1,
        contents: "test",
        done: true,
        hide: false
    }*/

export const store = new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        loadTodos(state) {
            const nextArray = JSON.parse(localStorage.getItem("todos"));
            state.todos = nextArray;
        },
        createTodo(state, todo) {
            return state.todos.push(todo);
        },
        toggleAll(state, done) {
            const nextArray = state.todos.map(todo => ({
                ...todo,
                done: done
            }));
            state.todos = nextArray;
        },
        toggleTodo(state, id) {
            const nextArray = state.todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            );
            state.todos = nextArray;
        },
        changeContents(state, { id, contents }) {
            const nextArray = state.todos.map(todo =>
                todo.id === id ? { ...todo, contents: contents } : todo
            );
            console.log(nextArray);
            localStorage.setItem("todos", JSON.stringify(nextArray));
            state.todos = nextArray;
        },
        checkFilterAll(state) {
            const nextArray = state.todos.map(todo => ({
                ...todo,
                hide: false
            }));
            state.todos = nextArray;
        },
        checkFilterActive(state) {
            const nextArray = state.todos.map(todo =>
                todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
            state.todos = nextArray;
        },
        checkFilterCompleted(state) {
            const nextArray = state.todos.map(todo =>
                !todo.done ? { ...todo, hide: true } : { ...todo, hide: false }
            );
            state.todos = nextArray;
        },
        removeTodo(state, id) {
            const nextArray = state.todos.filter(todo => todo.id !== id);
            state.todos = nextArray;
        }
    },
    actions: {
        loadTodos(context) {
            context.commit("loadTodos");
        },
        createTodo(context, todo) {
            const storage = JSON.parse(localStorage.getItem("todos"));
            if (storage !== null) {
                localStorage.setItem(
                    "todos",
                    JSON.stringify(storage.concat(todo))
                );
            } else {
                localStorage.setItem("todos", JSON.stringify([todo]));
            }
            context.commit("createTodo", todo);
        },
        allToggle({ state, commit }) {
            state.todos.map(todo => commit("toggleTodo", todo.id));
        },
        toggleTodo(context, id) {
            context.commit("toggleTodo", id);
        },
        changeContents(context, id, contents) {
            context.commit("changeContents", id, contents);
        },
        checkFilterAll(context) {
            context.commit("checkFilterAll");
        },
        checkFilterActive(context) {
            context.commit("checkFilterActive");
        },
        checkFilterCompleted(context) {
            context.commit("checkFilterCompleted");
        },
        removeTodo(context, id) {
            const prevStorage = JSON.parse(localStorage.getItem("todos"));
            const arrayIndex = prevStorage.findIndex(
                element => element.id === id
            );
            prevStorage.splice(arrayIndex, 1);
            console.log(prevStorage);
            localStorage.setItem("todos", JSON.stringify(prevStorage));
            context.commit("removeTodo", id);
        }
    }
});
