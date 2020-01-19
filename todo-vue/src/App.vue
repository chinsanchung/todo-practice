<template>
    <div id="app">
        <title-style className="title">todos</title-style>
        <section-todo-app-block>
            <header className="section">
                <todo-create />
            </header>
            <section className="section--list">
                <todo-list :todos="todos" />
            </section>
            <section className="section--filter">
                <todo-filter :todos="todos" />
            </section>
        </section-todo-app-block>
        <footer className="footer">
            <footer-text>
                <div>Double-click to edit a todo</div>
                <div>Created by petehunt</div>
                <div>Part of <a href="http://todomvc.com/">TodoMVC</a></div>
            </footer-text>
        </footer>
    </div>
</template>

<script>
import styled from "vue-styled-components";
import TodoCreate from "./components/TodoCreate.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";

const TitleStyle = styled.h1`
    color: rgba(175, 47, 47, 0.15);
    font-size: 90px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0;
`;
const SectionTodoAppBlock = styled.section`
    max-width: 550px;
    margin: 30px auto 0;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`;
const FooterText = styled.footer`
    margin-top: 70px;
    color: #bfbfbf;
    font-size: 10px;
    text-align: center;
    text-shadow: 1px 0px rgba(255, 255, 255, 0.2);
    line-height: 1.5;
    a {
        text-decoration: none;
        color: #bfbfbf;
    }
`;

export default {
    name: "app",
    components: {
        TitleStyle,
        SectionTodoAppBlock,
        FooterText,
        TodoCreate,
        TodoList,
        TodoFilter
    },
    computed: {
        loadTodos() {
            return "aa";
        },
        todos() {
            return this.$store.state.todos;
        }
    },
    beforeMount() {
        if (localStorage.todos) {
            const storageArray = JSON.parse(localStorage.todos);
            console.log("localStorage exists " + storageArray);
            this.$store.dispatch("loadTodos");
        } else {
            console.log("There is no localStorage.");
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
