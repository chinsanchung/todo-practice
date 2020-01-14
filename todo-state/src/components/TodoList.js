import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
    const { todos, onToggle, onRemove, onChangeContents } = props;
    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    onChangeContents={onChangeContents}
                />
            ))}
        </div>
    );
}

export default React.memo(TodoList);
