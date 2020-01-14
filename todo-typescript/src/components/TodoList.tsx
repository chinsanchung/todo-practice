import React from "react";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

function TodoList() {
    const todos = useTodoState();
    type TodoType = { id: number; contents: string; done: boolean; hide: boolean }

    return (
        <div>
            {todos.map((todo: TodoType) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    contents={todo.contents}
                    done={todo.done}
                    hide={todo.hide}
                />
            ))}
        </div>
    );
}

export default React.memo(TodoList);
