<template>
    <div class="todo-create">
        <section-create-block>
            <btn-check-all
                :empty="isEmpty"
                :checked="isChecked"
                @click="checkAll"
            >
                <font-awesome-icon :icon="['fas', 'chevron-down']" />
            </btn-check-all>
            <form @submit="onSubmit">
                <Input
                    :value="value"
                    @change="onChange"
                    placeholder="What needs to be done?"
                />
            </form>
        </section-create-block>
    </div>
</template>

<script>
import {
    SectionCreateBlock,
    BtnCheckAll,
    Input
} from "./styled-components/styleCreator.js";

export default {
    name: "HelloWorld",
    components: {
        SectionCreateBlock,
        BtnCheckAll,
        Input
    },
    data() {
        return {
            checked: false,
            empty: true,
            value: ""
        };
    },
    computed: {
        isEmpty() {
            const todos = this.$store.state.todos;
            if (todos.length > 0) {
                return !this.empty;
            } else {
                return this.empty;
            }
        },
        isChecked() {
            return this.checked;
        }
    },
    methods: {
        checkAll() {
            this.checked = !this.checked;
            this.$store.dispatch("allToggle");
        },
        onChange(e) {
            this.value = e.target.value;
        },
        getRandomUpTo(max) {
            // Source: https://www.codebrainer.com/blog/random-numbers-in-javascript-for-beginners
            return Math.floor(Math.random() * Math.floor(max)) + 1;
        },
        onSubmit(e) {
            e.preventDefault();
            // 넣기
            this.$store.dispatch("createTodo", {
                id: this.getRandomUpTo(1000000),
                contents: this.value,
                done: false,
                hide: false
            });
            this.value = "";
            this.empty = false;
        }
    }
};
</script>
