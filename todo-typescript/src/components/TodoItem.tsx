import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { MdClose } from "react-icons/md";
import { GiCircle } from "react-icons/gi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useTodoDispatch } from "../TodoContext";

const ItemBlock = styled.div<{ hide: boolean }>`
    display: flex;
    position: relative;
    width: auto;
    height: 70px;
    padding: 17px 17px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
const TextBlock = styled.div<{ done: boolean }>`
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
const CheckBlock = styled.div<{ done: boolean }>`
    width: 32px;
    height: 32px;
    margin-right: 31px;
    font-size: 38px;
    color: #e5e5e5;
    cursor: pointer;
    ${props =>
        props.done &&
        css`
            color: rgba(113, 234, 141, 0.91);
        `}
`;
const RemoveBlock = styled.div<{ hovered: boolean }>`
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
const ChangeInput = styled.input<{ showInput: boolean }>`
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

type TodoProps = { id: number; contents: string; done: boolean; hide: boolean };

function TodoItem({ id, contents, done, hide }: TodoProps) {
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
            dispatch({ type: "LOADTODOS", id, input: value });
            setValue("");
            setShowInput(showInput => !showInput);
            setHovered(hovered => !hovered);
        },
        [dispatch, setValue, setShowInput, id, value]
    );
    const onHover = useCallback(() => {
        setHovered(hovered => !hovered);
    }, [setHovered]);

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
                    placeholder={value}
                    autoFocus
                ></ChangeInput>
            </form>
            <CheckBlock done={done} onClick={onToggle}>
                {showInput ? <GiCircle /> : <IoIosCheckmarkCircleOutline />}
            </CheckBlock>
            <TextBlock done={done}>{contents}</TextBlock>
            <RemoveBlock hovered={hovered} onClick={onRemove}>
                <MdClose />
            </RemoveBlock>
        </ItemBlock>
    );
}

export default React.memo(TodoItem);
