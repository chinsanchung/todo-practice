import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

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
    ${props =>
        props.checked &&
        css`
            color: rgba(0, 0, 0, 0.75);
        `}
    ${props =>
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

function TodoCreate(props) {
    const { todos, onAllToggle, onCreate } = props;

    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("");
    const [empty, setEmpty] = useState(false);

    const checkAll = useCallback(() => {
        setChecked(!checked);
        onAllToggle(!checked);
        console.log(checked);
    }, [checked, setChecked, onAllToggle]);
    const onChange = useCallback(e => setValue(e.target.value), []);

    // Source: https://www.codebrainer.com/blog/random-numbers-in-javascript-for-beginners
    const getRandomUpTo = max =>
        Math.floor(Math.random() * Math.floor(max)) + 1;

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            onCreate({
                id: getRandomUpTo(1000000),
                contents: value,
                done: false,
                hide: false
            });
            setValue("");
        },
        [value, onCreate]
    );

    useEffect(() => {
        const completedLength = todos.filter(todo => todo.done).length;
        if (todos.length === 0) setEmpty(true);
        else if (todos.length !== completedLength) {
            setChecked(false);
            setEmpty(false);
        } else {
            setEmpty(false);
            setChecked(true);
        }
    }, [todos]);

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
