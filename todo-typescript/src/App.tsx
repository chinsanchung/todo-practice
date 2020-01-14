import React from "react";
import styled from "styled-components";
import "./css/reset.css";
import "./css/filter-btn.css";
import { TodoProvider } from "./TodoContext";
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

const App: React.FC = () => {
    return (
        <TodoProvider>
            <TitleStyle className="title">todos</TitleStyle>
            <SectionTodoAppBlock>
                <header className="section">
                    <TodoCreate />
                </header>
                <section className="section--list">
                    <TodoList />
                </section>
                <section className="section--filter">
                    <TodoFilter />
                </section>
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
        </TodoProvider>
    );
};

export default App;
