<template>
    <div class="todo-filter">
        <div v-if="todoCount > 0">
            <section-filter-block>
                <filter-left-text>{{ doneCount }} item left</filter-left-text>
                <btn-list-block>
                    <filter-button
                        class="filter-on"
                        @click="onFilterEvent($event, 'all')"
                        >All
                    </filter-button>
                    <filter-button @click="onFilterEvent($event, 'active')">
                        Active
                    </filter-button>
                    <filter-button @click="onFilterEvent($event, 'completed')">
                        Completed
                    </filter-button>
                </btn-list-block>
                <filter-right-text @click="onClearCompleted">
                    Clear completed
                </filter-right-text>
            </section-filter-block>
        </div>
        <div v-else></div>
    </div>
</template>

<script>
import {
    SectionFilterBlock,
    BtnListBlock,
    FilterLeftText,
    FilterButton,
    FilterRightText
} from "./styled-components/styleFilter";

export default {
    name: "TodoFilter",
    components: {
        SectionFilterBlock,
        BtnListBlock,
        FilterLeftText,
        FilterButton,
        FilterRightText
    },
    props: {
        todos: Array
    },
    computed: {
        todoCount() {
            const count = this.$store.state.todos.length;
            return count;
        },
        doneCount() {
            const doneTodos = this.$store.state.todos.filter(
                todo => !todo.done
            );
            return doneTodos.length;
        }
    },
    methods: {
        btnStyling(event) {
            const parentEl = event.target.parentElement;
            for (let item of parentEl.children) {
                if (item.className.includes("filter-on")) {
                    item.classList.toggle("filter-on");
                }
            }
            event.target.classList.toggle("filter-on");
        },
        changeFilter(action) {
            switch (action) {
                case "all":
                    this.$store.dispatch("checkFilterAll");
                    break;
                case "active":
                    this.$store.dispatch("checkFilterActive");
                    break;
                case "completed":
                    this.$store.dispatch("checkFilterCompleted");
                    break;
                default:
                    return;
            }
        },
        onFilterEvent(event, action) {
            this.btnStyling(event);
            this.changeFilter(action);
        },
        onClearCompleted() {
            const completedTodos = this.$store.state.todos.filter(
                todo => todo.done
            );
            completedTodos.forEach(todo => {
                const id = todo.id;
                this.$store.dispatch("removeTodo", id);
            });
        }
    }
};
</script>
