import styled, { css } from "vue-styled-components";

export const ItemBlock = styled("div", { hide: Boolean })`
    display: flex;
    position: relative;
    width: auto;
    height: 70px;
    padding: 17px 17px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    background: #fff;
    font-size: 40px;
    align-content: center;
    ${props =>
        props.hide &&
        css`
            display: none;
        `}
`;

export const TextBlock = styled("div", { done: Boolean })`
    display: block;
    width: auto;
    height: 50px;
    font-size: 30px;
    color: rgba(0, 0, 0, 0.7);
    ${props =>
        props.done &&
        css`
            transition: 0.8s;
            color: #cacaca;
            text-decoration-line: line-through;
        `}
`;

export const CheckBlock = styled("div", { done: Boolean })`
    width: 32px;
    height: 32px;
    margin-right: 31px;
    font-size: 34px;
    color: #e5e5e5;
    cursor: pointer;
    ${props =>
        props.done &&
        css`
            color: rgba(113, 234, 141, 0.91);
        `};
`;

export const RemoveBlock = styled("div", { hovered: Boolean })`
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    font-size: 28px;
    color: #ea7171;
    cursor: pointer;
    ${props =>
        props.hovered &&
        css`
            display: block;
        `}
`;

export const ChangeInput = styled("input", { showInput: Boolean })`
    display: none;
    position: absolute;
    padding: 15px 0 15px 3px;
    box-sizing: border-box;
    top: 0;
    right: 0;
    width: 87%;
    height: 68px;
    border: none;
    outline: none;
    font-size: 30px;

    ${props =>
        props.showInput &&
        css`
            display: block;
            z-index: 0;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
        `}
    &:focus {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
    }
`;
