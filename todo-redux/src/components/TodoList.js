import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
    const { todos, onToggle, onRemove, onChangeContents } = props;

    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    contents={todo.contents}
                    done={todo.done}
                    hide={todo.hide}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    onChangeContents={onChangeContents}
                />
            ))}
        </div>
    );
}

export default React.memo(TodoList);
