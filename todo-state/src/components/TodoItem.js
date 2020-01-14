import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { MdCheck, MdClose } from "react-icons/md";

const ItemBlock = styled.div`
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
const TextBlock = styled.div`
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
const CheckBlock = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    margin-right: 31px;
    font-size: 30px;
    color: #e5e5e5;
    cursor: pointer;
    ${props =>
        props.done &&
        css`
            color: rgba(113, 234, 141, 0.91);
            border-color: rgba(113, 234, 141, 0.91);
        `}
`;
const RemoveBlock = styled.div`
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

const ChangeInput = styled.input`
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
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
            z-index: 0;
        `}
`;

function TodoItem(props) {
    const { todo, onToggle, onRemove, onChangeContents } = props;
    const [hovered, setHovered] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState("");
    const onHover = useCallback(() => {
        setHovered(hovered => !hovered);
    }, []);
    const onShowInput = useCallback(() => {
        setHovered(hovered => !hovered);
        setShowInput(showInput => !showInput);
    }, [setHovered, setShowInput]);
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);
    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            onChangeContents(todo.id, value);
            setValue("");
            setShowInput(showInput => !showInput);
            setHovered(hovered => !hovered);
        },
        [todo.id, value, onChangeContents, setValue, setShowInput]
    );
    useEffect(() => {
        setValue(todo.contents);
    }, [setValue, todo.contents]);
    return (
        <ItemBlock
            onMouseOver={onHover}
            onMouseOut={onHover}
            onDoubleClick={onShowInput}
            hide={todo.hide}
        >
            <form onSubmit={onSubmit}>
                <ChangeInput
                    onChange={onChange}
                    value={value}
                    showInput={showInput}
                    autoFocus
                ></ChangeInput>
            </form>
            <CheckBlock done={todo.done} onClick={() => onToggle(todo.id)}>
                <MdCheck />
            </CheckBlock>
            <TextBlock done={todo.done}>{todo.contents}</TextBlock>
            <RemoveBlock hovered={hovered} onClick={() => onRemove(todo.id)}>
                <MdClose />
            </RemoveBlock>
        </ItemBlock>
    );
}

export default React.memo(TodoItem);
