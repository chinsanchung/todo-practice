# todo-practice

## 개요

[React • TodoMVC](http://todomvc.com/examples/react/#/)를 React를 사용해 만들었습니다. CSS 디자인, 그리고 앱의 기능을 재현하는 것이 목표입니다.

## 사용 기술

1. Language: HTML, CSS, JavaScript(ES6), TypeScript
1. Tool: create-react-app, styled-components, react-icons, vue-cli, vue-styled-components, vuex, fontawesome

## 설치

프로젝트가 들어있는 폴더 안에서 명령 프롬프트를 열고, `npm install`으로 필요한 도구를 설치합니다. 그리고 `npm start`를 입력해 개발자 모드를 열어 동작을 확인할 수 있습니다.

## 구성

### todo-state

React 의 상태를 관리해주는 `useState`를 사용했습니다. 부모 App 컴포넌트에서부터 각 하위 컴포넌트로 상태, 함수를 전달해 연결했습니다. 또한 `useCallback`, `useMemo`를 사용해 재사용을 줄이는 한편, `useEffect`로 항목을 추가할 때마다 CSS 디자인이 바뀌도록 설정했습니다.

### todo-context

Context 를 통해 TodoContext.js 파일에 상태를 관리하는 리듀서, 디스패치, 그리고 Context Hook 을 만들어 저장하고, 각 컴포넌트에 불러 기능을 구현했습니다.

### todo-typescript

기존의 자바스크립트로 작성했던 todo-context 프로젝트를 타입스크립트로 변환하는 작업을 수행했습니다. 함수, 객체, 배열 등 다양한 값들에 타입을 지정해 편의성을 높이고, 타입스크립트로 수정한 Context 파일을 각 컴포넌트에 연결했습니다.

### todo-redux

module, container, components 폴더로 구분, 컴포넌트를 세분화하고 `redux`, `react-redux`를 사용해 상태와 기능을 작성, 연결했습니다.

### todo-vue

Vue CLI 로 프로젝트를 생성하고, Vuex 로 상태와 액션을 컴포넌트와 연결했습니다. 그리고 vue-styled-components 로 스타일을 선언했고, fontawesome 으로 아이콘을 불러왔습니다.

## 업데이트

1. 01/15

-   localStorage 를 적용했습니다. 새로운 항목을 만들 때마다 localStorage 에 저장하며, localhost:3000 으로 프로그램을 실행하면 저장소에 있는 문자열을 `JSON.parse`로 변환한 후 화면에 출력하도록 만들었습니다.

-   Todoitem 의 항목들의 key 를 임의의 숫자를 만드는 방식으로 변경했습니다. 필요한 함수 `getRandomUpTo`는 [링크](https://www.codebrainer.com/blog/random-numbers-in-javascript-for-beginners)의 글을 참조했습니다.

-   TodoItem 의 아이콘 `MdCheck`를 `GiCircle`, `IoIosCheckmarkCircleOutline`으로 변경했습니다. 이제 더블클릭으로 항목을 변경할 때 `IoIosCheckmarkCircleOutline` 아이콘으로 바뀝니다.

1. 01/16

-   todo-redux 프로젝트를 작성했습니다.

1. 01/19

-   todo-vue 프로젝트를 작성했습니다.
