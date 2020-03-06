import React from 'react';
import { RowChart } from './export';

const data = [
    {
        key: "a",
        value: 50,
    },
    {
        key: "b",
        value: 20,
    },
    {
        key: "c",
        value: 40,
    },
    {
        key: "d",
        value: 10,
    }
];


const RowCharDemo = () => {
    return (
        <RowChart data={data} width={400} colour="green" />
    );
};

export default RowCharDemo;
