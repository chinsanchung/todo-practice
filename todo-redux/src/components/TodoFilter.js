import React, { useMemo, useCallback } from "react";
import styled from "styled-components";

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
    @media (max-width: 420px) {
        padding: 0;
        height: 78px;
        align-items: auto;
    }
`;
const BtnListBlock = styled.ul`
    display: flex;
    position: absolute;
    top: 5px;
    right: 0;
    left: 30%;
    @media (max-width: 420px) {
        top: 40px;
    }
`;
const FilterLeftText = styled.div`
    text-align: left;
    @media (max-width: 420px) {
        position: absolute;
        padding: 10px 0 0 10px;
        top: 5px;
    }
`;
const FilterButton = styled.li`
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

function TodoFilter(props) {
    const {
        todos,
        onFilterAll,
        onFilterActive,
        onFilterCompleted,
        onRemove
    } = props;
    const todoCount = todos.length;

    const count = useMemo(
        () => todos.filter(todo => todo.done === false).length,
        [todos]
    );
    const done = useMemo(
        () => todos.filter(todo => todo.done === true).length,
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
        action => {
            switch (action) {
                case "all":
                    onFilterAll();
                    break;
                case "active":
                    onFilterActive();
                    break;
                case "completed":
                    onFilterCompleted();
                    break;
                default:
                    return;
            }
        },
        [onFilterAll, onFilterActive, onFilterCompleted]
    );
    const changeFilter = useCallback(
        (e, action) => {
            btnStyling(e);
            onFilter(action);
        },
        [btnStyling, onFilter]
    );
    const onClearCompleted = () => {
        const completedTodos = todos.filter(todo => todo.done);
        completedTodos.forEach(todo => {
            onRemove(todo.id);
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
                            onClick={e => changeFilter(e, "all")}
                        >
                            All
                        </FilterButton>
                        <FilterButton onClick={e => changeFilter(e, "active")}>
                            Active
                        </FilterButton>
                        <FilterButton
                            onClick={e => changeFilter(e, "completed")}
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
