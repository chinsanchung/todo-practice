<template>
  <div class="todo-item">
    <ItemBlock :hide="hide" @mouseover="onHover" @mouseout="onHover" @dblclick="onShowInput">
      <form @submit="onSubmit">
        <change-input :showInput="showInput" @change="onChange" :value="value"></change-input>
      </form>
      <CheckBlock :done="isDone" @click="onToggle">
        <font-awesome-icon :icon="['fas', 'check-circle']" v-if="!showInput" />
        <!-- <font-awesome-icon :icon="['fas', 'circle']" v-else /> -->
      </CheckBlock>
      <TextBlock :done="isDone">{{ contents }}</TextBlock>
      <RemoveBlock :hovered="isHovered" :done="isDone" @click="onRemove">
        <font-awesome-icon :icon="['fas', 'times']" />
      </RemoveBlock>
    </ItemBlock>
  </div>
</template>

<script>
import {
  ItemBlock,
  ChangeInput,
  CheckBlock,
  TextBlock,
  RemoveBlock
} from "./styled-components/styleItem";

export default {
  name: "TodoList",
  components: {
    ItemBlock,
    ChangeInput,
    CheckBlock,
    TextBlock,
    RemoveBlock
  },
  props: {
    id: Number,
    contents: String,
    done: Boolean,
    hide: Boolean
  },
  data() {
    return {
      hovered: false,
      showInput: false,
      value: ""
    };
  },
  computed: {
    isHovered() {
      return this.hovered;
    },
    isDone() {
      return this.done;
    }
  },
  methods: {
    onShowInput() {
      this.hovered = !this.hovered;
      this.showInput = !this.showInput;
    },
    onChange(e) {
      this.value = e.target.value;
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.value);
      this.$store.dispatch("changeContents", {
        id: this.id,
        contents: this.value
      });
      this.value = "";
      this.showInput = !this.showInput;
      this.hovered = !this.hovered;
    },
    onHover() {
      this.hovered = !this.hovered;
    },
    onToggle() {
      this.$store.dispatch("toggleTodo", this.id);
    },
    onRemove() {
      this.$store.dispatch("removeTodo", this.id);
    }
  }
};
</script>
