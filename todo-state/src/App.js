import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import "./reset.css";
import "./css/filter-btn.css";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

const TitleStyle = styled.h1`
    color: rgba(175, 47, 47, 0.15);
    font-size: 90px;
    font-weight: 600;
    text-align: center;
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

function App() {
    const [empty, setEmpty] = useState(true);
    const [todos, setTodo] = useState([]);

    // Source: https://www.codebrainer.com/blog/random-numbers-in-javascript-for-beginners
    const getRandomUpTo = max =>
        Math.floor(Math.random() * Math.floor(max)) + 1;

    const onCreate = useCallback(value => {
        const todo = {
            id: getRandomUpTo(1000000),
            contents: value,
            done: false,
            hide: false
        };
        setTodo(todos => todos.concat(todo));
        setEmpty(false);

        // setItem to localStorage
        const storage = JSON.parse(localStorage.getItem("todos"));
        if (storage !== null) {
            localStorage.setItem("todos", JSON.stringify(storage.concat(todo)));
        } else {
            localStorage.setItem("todos", JSON.stringify([todo]));
        }
    }, []);
    const onRemove = useCallback(id => {
        setTodo(todos => todos.filter(todo => todo.id !== id));
        const prevStorage = JSON.parse(localStorage.getItem("todos"));
        // Remove localStorage's item
        const arrayIndex = prevStorage.findIndex(element => element.id === id);
        prevStorage.splice(arrayIndex, 1);
        console.log(prevStorage);
        localStorage.setItem("todos", JSON.stringify(prevStorage));
    }, []);
    const onToggle = useCallback(id => {
        setTodo(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    }, []);
    const onChangeContents = useCallback((id, input) => {
        setTodo(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, contents: input } : todo
            )
        );
        localStorage.setItem("todos", JSON.stringify(todos));
    }, []);
    const onAllToggle = useCallback(value => {
        setTodo(todos => todos.map(todo => ({ ...todo, done: value })));
    }, []);
    const onFilter = useCallback(action => {
        switch (action) {
            case "all":
                setTodo(todos => todos.map(todo => ({ ...todo, hide: false })));
                break;
            case "active":
                setTodo(todos =>
                    todos.map(todo =>
                        todo.done === true
                            ? { ...todo, hide: true }
                            : { ...todo, hide: false }
                    )
                );
                break;
            case "completed":
                setTodo(todos =>
                    todos.map(todo =>
                        todo.done === false
                            ? { ...todo, hide: true }
                            : { ...todo, hide: false }
                    )
                );
                break;
            default:
                throw Error("Error : Wrong action");
        }
    }, []);
    const onClearCompleted = useCallback(() => {
        setTodo(todos => todos.filter(todo => todo.done === false));
    }, []);

    useEffect(() => {
        if (localStorage.todos) {
            const storageArray = JSON.parse(localStorage.todos);
            console.log("localStorage exists " + storageArray);
            setTodo(todos => todos.concat(storageArray));
        } else {
            console.log("There is no localStorage.");
        }
    }, []);

    return (
        <div className="body__container">
            <TitleStyle className="title">todos</TitleStyle>
            <SectionTodoAppBlock>
                <header className="section">
                    <TodoCreate
                        todos={todos}
                        onAllToggle={onAllToggle}
                        onCreate={onCreate}
                        empty={empty}
                        setEmpty={setEmpty}
                    />
                </header>
                <TodoList
                    todos={todos}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    onChangeContents={onChangeContents}
                />
                {todos.length !== 0 ? (
                    <TodoFilter
                        onFilter={onFilter}
                        onClearCompleted={onClearCompleted}
                        todos={todos}
                    />
                ) : (
                    <></>
                )}
            </SectionTodoAppBlock>
            <footer className="footer">
                <FooterText>
                    <div>Double-click to edit a todo</div>
                    <div>Created by petehunt</div>
                    <div>
                        Part of <a href="http://todomvc.com/">TodoMVC</a>
                    </div>
                </FooterText>
            </footer>
        </div>
    );
}

export default React.memo(App);
