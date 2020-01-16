# todo-redux

## 폴더 구조

1. components

    1. [TodoBody.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoBody.js) : TodoCreate, TodoList, TodoFilter 컴포넌트와 footer 를 묶은 컴포넌트입니다. 액션 크리에이터를 각 컴포넌트에 props 로 전달했습니다.

    1. [TodoCreate.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoCreate.js): todo 앱의 상단으로 항목을 작성하고, 화살표 버튼으로 모든 항목을 체크할 수 있습니다. `useEffect`를 사용해 항목을 삭제해 화살표가 숨겨질 때 원래 디자인으로 돌아가도록 설계했습니다.

    1. [TodoList.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoList.js): todo 항목을 리스트로 묶은 컴포넌트입니다. `map`을 이용해 TodoItem 컴포넌트를 출력합니다.

    1. [TodoItem.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoItem.js): TodoCreate 컴포넌트에서 작성한 항목을 보여줍니다. 더블 클릭해 내용을 수정할 수 있고, 왼쪽 버튼을 클릭해 체크를, 오른쪽 버튼을 클릭해 항목을 삭제할 수 있습니다.

    1. [TodoFilter.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoFilter.js): 체크하지 않은 항목을 보여주는 숫자, 그리고 체크 여부에 따라 항목을 숨기거나 보여주는 필터 버튼 3개가 있습니다. 또한 모든 항목을 체크하면 Clear completed 버튼이 나와 항목들을 삭제할 수 있습니다.

1. containers

    1. [TodoContainer.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/containers/TodoContainer.js): `useSelector`로 상태를 불러오고, 액션 크리에이터를 변수에 저장, [TodoBody.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoBody.js) 컴포넌트로 전달합니다.

1. css

    1. filter-btn.css: [TodoFilter.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/components/TodoFilter.js)컴포넌트의 필터 버튼을 디자인하는 css 파일입니다.

1. modules

    1. [index.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/modules/index.js): 액션 타입, 액션 크리에이터, 그리고 리듀서를 하나의 파일로 저장했습니다.

1. [App.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/App.js)

1. [index.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-redux/src/index.js)
