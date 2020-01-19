<template>
    <div class="todo-list">
        <TodoItem
            v-for="todo in todoLists"
            :key="todo.key"
            :id="todo.id"
            :contents="todo.contents"
            :done="todo.done"
            :hide="todo.hide"
        />
    </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
    name: "TodoList",
    props: {
        todos: Array
    },
    computed: {
        todoLists() {
            return this.todos;
        }
    },
    components: {
        TodoItem
    }
};
</script>
