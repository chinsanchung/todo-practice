import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { MdCheck, MdClose } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

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
            z-index: 0;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
        `}
    &:focus {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
    }
`;

function TodoItem(props) {
    const { id, contents, done, hide } = props;
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: "TOGGLE", id });
    const onRemove = () => dispatch({ type: "REMOVE", id });
    const [showInput, setShowInput] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [value, setValue] = useState("");

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
            dispatch({ type: "CHANGECONTENTS", id, input: value });
            setValue("");
            setShowInput(showInput => !showInput);
            setHovered(hovered => !hovered);
        },
        [dispatch, setValue, setShowInput, id, value]
    );
    const onHover = useCallback(() => {
        setHovered(hovered => !hovered);
    }, [setHovered]);

    useEffect(() => {
        setValue(contents);
    }, [setValue, contents]);

    return (
        <ItemBlock
            onMouseOver={onHover}
            onMouseOut={onHover}
            onDoubleClick={onShowInput}
            hide={hide}
        >
            <form onSubmit={onSubmit}>
                <ChangeInput
                    onChange={onChange}
                    showInput={showInput}
                    value={value}
                    autoFocus
                ></ChangeInput>
            </form>
            <CheckBlock done={done} onClick={onToggle}>
                <MdCheck />
            </CheckBlock>
            <TextBlock done={done}>{contents}</TextBlock>
            <RemoveBlock hovered={hovered} onClick={onRemove}>
                <MdClose />
            </RemoveBlock>
        </ItemBlock>
    );
}

export default React.memo(TodoItem);
