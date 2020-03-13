import React from 'react';
import { LineChart } from '../export';

const data = [
    {
        key: 1,
        value: 50,
    },
    {
        key: 2,
        value: 20,
    },
    {
        key: 3,
        value: 40,
    },
    {
        key: 5,
        value: 10,
    }
];

const LineChartDemo = () => {

    return (
        <LineChart
            data={data}
            height={300}
            width={500}
            colour="green"
        />
    )
};

export default LineChartDemo;
