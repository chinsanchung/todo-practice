import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function TodoItem({ todo, onRemove }) {
    return (
        <div className="todo-item">
            <p>{todo.contents}</p>
            <TouchableOpacity
                onPress={() => onRemove(todo.id)}
            >
                <p>REMOVE</p>
            </TouchableOpacity>
        </div>
    )
}