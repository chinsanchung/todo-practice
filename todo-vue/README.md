# todo-vue

## 폴더 구조

1. components

    1. styled-components

        1. [styleCreator.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/styled-components/styleCreator.js): TodoCreator.vue 의 vue-styled-components 선언을 분리해서 저장했습니다.

        1. [styleFilter.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/styled-components/styleFilter.js): TodoFilter.vue 의 vue-styled-components 선언을 분리해서 저장했습니다.

        1. [styleItem.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/styled-components/styleItem.js): TodoItem.vue 의 vue-styled-components 선언을 분리해서 저장했습니다.

    1. [TodoCreate.vue](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/TodoCreate.vue): todo 앱의 상단으로, 항목을 작성하거나 화살표 버튼으로 모든 항목을 체크할 수 있습니다. `computed`의 `isEmpty`를 통해 todo 항목이 0이 되는 것을 감지해 화살표 버튼을 지웁니다.

    1. [TodoList.vue](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/TodoList.vue): 하위 컴포넌트인 TodoItem 를 `v-for`로 나열합니다.

    1. [TodoItem.vue](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/TodoItemvue): TodoCreate 컴포넌트에서 작성한 항목을 보여줍니다. 더블 클릭해 내용을 수정할 수 있고, 왼쪽 버튼을 클릭해 체크를, 오른쪽 버튼을 클릭해 항목을 삭제할 수 있습니다.

    1. [TodoFilter.vue](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/components/TodoFilter.vue): 체크하지 않은 항목을 보여주는 숫자 "00 item left", 그리고 체크 여부에 따라 항목을 숨기거나 보여주는 필터 버튼 3개가 있습니다. 또한 모든 항목을 체크하면 Clear completed 버튼이 나와 항목들을 삭제할 수 있습니다.

1. css

    1. [filter-btn.css](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/css/filter-btn.css): TodoFilter 컴포넌트의 필터 버튼을 디자인하는 css 파일입니다.

1. store

    1. [store.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/store/store.js): Vuex 를 불러 상태, mutation, action 을 정의하고 `export`로 호출하도록 만들었습니다. Vuex 의 상태를 추가, 수정, 삭제하는 작업을 localStorage 와 연동해 브라우저를 새로고침해도 항목이 남아있도록 설정했습니다.

1. [App.vue](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/App.vue): todo 앱의 틀을 정의합니다. `beforeMount`로 localStorage 를 검색해 todo 항목이 있으면 불러옵니다.

1. [main.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/main.js): store 를 선언하고, fontwawesome 아이콘들을 불러옵니다.

1. [reset.css](https://github.com/chinsanchung/todo-practice/blob/master/todo-vue/src/reset.css): https://meyerweb.com/eric/tools/css/reset/ 에서 가져왔습니다.
