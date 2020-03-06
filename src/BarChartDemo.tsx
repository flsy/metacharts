import React from 'react';
import { BarChart } from './export';

const BarChartDemo: React.FC = () => {

    const data = [{ key: '8', value: 8 }, { key: '10', value: 10 }];

    return (
        <BarChart data={data} height={300} width={300} colour="green" />);
};

export default BarChartDemo;
