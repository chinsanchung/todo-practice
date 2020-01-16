import React, { useEffect } from "react";
import styled from "styled-components";
import "../reset.css";
import "../css/filter-btn.css";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

const TitleStyle = styled.h1`
    color: rgba(175, 47, 47, 0.15);
    font-size: 90px;
    font-weight: 600;
    text-align: center;
`;
const SectionTodoAppBlock = styled.section`
    max-width: 550px;
    margin: 50px auto 0;
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
function TodoBody(props) {
    const {
        todos,
        onFirstRendering,
        onCreate,
        onAllToggle,
        onToggle,
        onChangeContents,
        onFilterAll,
        onFilterActive,
        onFilterCompleted,
        onRemove
    } = props;

    useEffect(() => {
        if (localStorage.todos) {
            const storageArray = JSON.parse(localStorage.todos);
            console.log("localStorage exists " + storageArray);
            onFirstRendering();
        } else {
            console.log("There is no localStorage.");
        }
    }, []);

    return (
        <>
            <TitleStyle className="title">todos</TitleStyle>
            <SectionTodoAppBlock>
                <header className="section">
                    <TodoCreate
                        todos={todos}
                        onAllToggle={onAllToggle}
                        onCreate={onCreate}
                    />
                </header>
                <section className="section--list">
                    <TodoList
                        todos={todos}
                        onToggle={onToggle}
                        onRemove={onRemove}
                        onChangeContents={onChangeContents}
                    />
                </section>
                <section className="section--filter">
                    <TodoFilter
                        todos={todos}
                        onFilterAll={onFilterAll}
                        onFilterActive={onFilterActive}
                        onFilterCompleted={onFilterCompleted}
                        onRemove={onRemove}
                    />
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
        </>
    );
}

export default React.memo(TodoBody);
