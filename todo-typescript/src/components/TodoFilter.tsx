import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import { useTodoState, useTodoDispatch } from "../TodoContext";

const SectionFilterBlock = styled.div`
    display: flex;
    position: relative;
    width: auto;
    height: 38px;
    padding: 0 20px 0;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    background: #fff;
    font-size: 14px;
    align-items: center;
`;
const BtnListBlock = styled.div`
    display: flex;
`;
const FilterLeftText = styled.div`
    margin-right: 100px;
`;
const FilterButton = styled.div`
    padding: 5px;
    margin-right: 15px;
    border: 2px solid transparent;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        border-color: rgba(175, 47, 47, 0.3);
    }
`;
const FilterRightText = styled.div`
    position: absolute;
    right: 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

type TodoType = { id: number; contents: string; done: boolean; hide: boolean };

function TodoFilter() {
    const todos = useTodoState();
    const todoCount = todos.length;
    const dispatch = useTodoDispatch();

    const count = useMemo(
        () => todos.filter((todo: TodoType) => todo.done === false).length,
        [todos]
    );
    const done = useMemo(
        () => todos.filter((todo: TodoType) => todo.done === true).length,
        [todos]
    );

    const btnStyling = useCallback(e => {
        const parentEl = e.target.parentElement;
        for (let item of parentEl.children) {
            if (item.className.includes("filter-on")) {
                item.classList.toggle("filter-on");
            }
        }
        e.target.classList.toggle("filter-on");
    }, []);
    const onFilter = useCallback(
        (action: string) => {
            switch (action) {
                case "all":
                    dispatch({ type: "FILTERALL" });
                    break;
                case "active":
                    dispatch({ type: "FILTERACTIVE" });
                    break;
                case "completed":
                    dispatch({ type: "FILTERCOMPLETED" });
                    break;
                default:
                    return;
            }
        },
        [dispatch]
    );
    const changeFilter = useCallback(
        (e, action: string) => {
            btnStyling(e);
            onFilter(action);
        },
        [btnStyling, onFilter]
    );
    const onClearCompleted = () => {
        const completedTodos = todos.filter((todo: TodoType) => todo.done);
        completedTodos.forEach((todo: TodoType) => {
            const id = todo.id;
            return dispatch({ type: "REMOVE", id });
        });
    };
    return (
        <>
            {todoCount > 0 ? (
                <SectionFilterBlock>
                    <FilterLeftText>{`${count} item left`}</FilterLeftText>
                    <BtnListBlock>
                        <FilterButton
                            className="filter-on"
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                changeFilter(e, "all")
                            }
                        >
                            All
                        </FilterButton>
                        <FilterButton
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                changeFilter(e, "active")
                            }
                        >
                            Active
                        </FilterButton>
                        <FilterButton
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                changeFilter(e, "completed")
                            }
                        >
                            Completed
                        </FilterButton>
                    </BtnListBlock>
                    {done > 0 ? (
                        <FilterRightText onClick={onClearCompleted}>
                            Clear completed
                        </FilterRightText>
                    ) : (
                        <></>
                    )}
                </SectionFilterBlock>
            ) : (
                <></>
            )}
        </>
    );
}

export default React.memo(TodoFilter);
