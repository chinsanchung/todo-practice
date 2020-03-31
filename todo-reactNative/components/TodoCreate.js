import React, { useState } from 'react';

export default function TodoCreate(props) {
    const { todos, onCreate } = props;
    const [value, setValue] = useState('');

    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        onCreate(value);
        setValue('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id="add-input"
                    value={value}
                    onChange={onChange}
                />
            </form>
        </div>
    )
}