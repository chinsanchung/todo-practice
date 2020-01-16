import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as todo_redux from "../modules";
import TodoBody from "../components/TodoBody";

function TodoContainer() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const onFirstRendering = useCallback(
        () => dispatch(todo_redux.firstRendering()),
        [dispatch]
    );
    const onCreate = useCallback(todo => dispatch(todo_redux.create(todo)), [
        dispatch
    ]);
    const onAllToggle = useCallback(
        done => dispatch(todo_redux.all_toggle(done)),
        [dispatch]
    );
    const onToggle = useCallback(id => dispatch(todo_redux.toggle(id)), [
        dispatch
    ]);
    const onChangeContents = useCallback(
        (id, contents) => dispatch(todo_redux.change_contents(id, contents)),
        [dispatch]
    );
    const onFilterAll = useCallback(() => dispatch(todo_redux.filter_all()), [
        dispatch
    ]);
    const onFilterActive = useCallback(
        () => dispatch(todo_redux.filter_active()),
        [dispatch]
    );
    const onFilterCompleted = useCallback(
        () => dispatch(todo_redux.filter_completed()),
        [dispatch]
    );
    const onRemove = useCallback(id => dispatch(todo_redux.remove(id)), [
        dispatch
    ]);

    return (
        <TodoBody
            todos={todos}
            onFirstRendering={onFirstRendering}
            onCreate={onCreate}
            onAllToggle={onAllToggle}
            onToggle={onToggle}
            onChangeContents={onChangeContents}
            onFilterAll={onFilterAll}
            onFilterActive={onFilterActive}
            onFilterCompleted={onFilterCompleted}
            onRemove={onRemove}
        />
    );
}

export default TodoContainer;
