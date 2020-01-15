import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTodoState, useTodoDispatch } from "../TodoContext";

type StyledProps = { checked: Boolean; empty: Boolean };

const SectionCreateBlock = styled.div`
    display: flex;
    max-width: auto;
    padding: 15px 10px;
    margin-top: 20px;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    background: #fff;
    align-items: center;
`;
const BtnCheckAll = styled.div`
    width: 50px;
    height: 45px;
    border: none;
    outline: none;
    margin-right: 20px;
    background: #fff;
    font-size: 45px;
    color: #cacaca;
    ${(props: StyledProps) =>
        props.checked &&
        css`
            color: rgba(0, 0, 0, 0.75);
        `}
    ${(props: StyledProps) =>
        props.empty &&
        css`
            color: #cacaca;
            opacity: 0;
        `}
`;
const Input = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 30px;
    &::-webkit-input-placeholder {
        color: #cacaca;
        font-style: italic;
    }
    &::-ms-input-placeholder {
        color: #cacaca;
        font-style: italic;
    }
    &::-moz-input-placeholder {
        color: #cacaca;
        font-style: italic;
    }
`;

function TodoCreate() {
    const todos = useTodoState();
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("");
    const [empty, setEmpty] = useState(false);

    const dispatch = useTodoDispatch();

    const checkAll = useCallback(() => {
        setChecked(!checked);
        dispatch({
            type: "ALLTOGGLE",
            done: !checked
        });
    }, [checked, setChecked, dispatch]);

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        []
    );

    // Source: https://www.codebrainer.com/blog/random-numbers-in-javascript-for-beginners
    const getRandomUpTo = (max: number) =>
        Math.floor(Math.random() * Math.floor(max)) + 1;

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch({
                type: "CREATE",
                todo: {
                    id: getRandomUpTo(1000000),
                    contents: value,
                    done: false,
                    hide: false
                }
            });
            setValue("");
        },
        [dispatch, value]
    );

    useEffect(() => {
        type todoType = {
            id: number;
            contents: string;
            done: boolean;
            hide: boolean;
        };
        const completedLength = todos.filter((todo: todoType) => todo.done)
            .length;
        if (todos.length === 0) setEmpty(true);
        else if (todos.length !== completedLength) {
            setChecked(false);
            setEmpty(false);
        } else {
            setEmpty(false);
            setChecked(true);
        }
    }, [todos, setEmpty]);

    return (
        <SectionCreateBlock>
            <BtnCheckAll empty={empty} checked={checked} onClick={checkAll}>
                <MdKeyboardArrowDown />
            </BtnCheckAll>
            <form onSubmit={onSubmit}>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder="What needs to be done?"
                />
            </form>
        </SectionCreateBlock>
    );
}

export default React.memo(TodoCreate);
