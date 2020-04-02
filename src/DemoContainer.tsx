import React from 'react';

interface IProps<T, D> {
    title: string;
    settings: T;
    children: (settings: T, input: D) => any;
    data: D;
}

const DemoContainer = <T extends object, D extends object | number>({ children, title, settings, data }: IProps<T, D>) => {
    const [changes, onChange] = React.useState<T>(settings);
    const [input, setInput] = React.useState<D>(data);
    const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

    return (
        <div style={{ margin: '20px 0'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>{title}</h2>
                    {Object.keys(changes).map(key => {
                        const id = `${title}=${key}`;
                        if (typeof changes[key] === 'number') {
                            return (
                                <div key={`${id}-key`}>

                                    <input type="checkbox" id={id} checked={!!changes[key]} onChange={({ target }) => onChange({ ...changes, [key]: target.checked ? settings[key]: 0 })} />


                                    <label htmlFor={id}>{key}: </label>
                                    {changes[key] !== 0 && <input type="number" id={id} value={changes[key]} onChange={({ target }) => onChange({ ...changes, [key]: parseInt(target.value, 10) })} />}
                                </div>
                            )
                        }


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
                    {children(changes, input)}
                </div>
                <div>
                    <textarea
                        style={{ height: '100%' }}
                        rows={10}
                        cols={50}
                        onChange={(event) => {
                            try {
                                const parsed = JSON.parse(event.target.value);
                                setInput(parsed);
                                setIsInvalid(false);
                            } catch (error) {
                                setIsInvalid(true);
                            }
                        }}
                        defaultValue={JSON.stringify(data, null, 2)}
                    />
                    <div>{isInvalid && <span>invalid JSON</span>}</div>
                </div>
            </div>
        </div>
    )
};

export default DemoContainer;
