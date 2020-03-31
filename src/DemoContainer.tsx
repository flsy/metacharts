import React from 'react';

interface IProps<T> {
    title: string;
    settings: T;
    children: (settings: T) => any;

}

const DemoContainer = <T extends object>({ children, title, settings }: IProps<T>) => {
    const [changes, onChange] = React.useState<T>(settings);

    return (
        <div>
            <h2>{title}</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ minWidth: '300px' }}>
                    {Object.keys(changes).map(key => {
                        const id = `${title}=${key}`;
                        return (
                            <div key={`${id}-key`}>
                                <input type="checkbox" id={id} checked={changes[key]}
                                       onChange={({ target }) => onChange({ ...changes, [key]: target.checked })} />
                                <label htmlFor={id}>{key}</label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {children(changes)}
                </div>
            </div>
        </div>
    )
};

export default DemoContainer;
