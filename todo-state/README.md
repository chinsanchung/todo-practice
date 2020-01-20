# todo-state

## 폴더 구조

1. components

    1. [TodoCreate.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-context/src/components/TodoCreate.js): todo 앱의 상단으로, 항목을 작성하거나 화살표 버튼으로 모든 항목을 체크할 수 있습니다. `useEffect`를 사용해 항목을 삭제해 화살표가 숨겨질 때 원래 디자인으로 돌아가도록 설계했습니다.

    1. [TodoList.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/components/TodoList.js): todo 항목을 리스트로 묶은 컴포넌트입니다. `map`을 이용해 TodoItem 컴포넌트를 출력합니다.

    1. [TodoItem.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/components/TodoItem.js): TodoCreate 컴포넌트에서 작성한 항목을 보여줍니다. 더블 클릭해 내용을 수정할 수 있고, 왼쪽 버튼을 클릭해 체크를, 오른쪽 버튼을 클릭해 항목을 삭제할 수 있습니다.

    1. [TodoFilter.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/components/TodoFilter.js): 체크하지 않은 항목을 보여주는 숫자 "00 item left", 그리고 체크 여부에 따라 항목을 숨기거나 보여주는 필터 버튼 3개가 있습니다. 또한 모든 항목을 체크하면 Clear completed 버튼이 나와 항목들을 삭제할 수 있습니다.

1. css

    1. [filter-btn.css](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/css/filter-btn.css): TodoFilter 컴포넌트의 필터 버튼을 디자인하는 css 파일입니다.

1. [App.js](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/App.js): 추가, 삭제, 체크 등의 모든 함수를 이 컴포넌트에 담았습니다. 또한, todos 상태를 선언, 각 컴포넌트로 전달했습니다.

1. [reset.css](https://github.com/chinsanchung/todo-practice/blob/master/todo-state/src/reset.css): https://meyerweb.com/eric/tools/css/reset/ 에서 가져왔습니다.
