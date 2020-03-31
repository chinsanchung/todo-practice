import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';

export default function App() {
	const [todos, setTodo] = useState([]);

	const getRandomUpTo = max => Math.floor(Math.random() * Math.floor(max)) + 1;
	const onCreate = value => {
		const todo = {
			id: getRandomUpTo(1000000),
			contents: value,
			done: false,
			hide: false,
		};
		setTodo(todos => todos.concat(todo));
	}
	const onRemove = id => {
		setTodo(todos => todos.filter(todo => todo.id !== id));
	}

	return (
		<View style={styles.container}>
			<TodoCreate
				todos={todos}
				onCreate={onCreate}
			/>
			<TodoList
				todos={todos}
				onRemove={onRemove}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
});
