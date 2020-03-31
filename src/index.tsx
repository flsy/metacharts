import React from 'react';
import ReactDOM from 'react-dom';
import DonutChartDemo from './DonutChart/DonutChartDemo';
import LineChartDemo from './LineChart/LineChartDemo';
import RowCharDemo from './RowChart/RowCharDemo';
import BarChartDemo from './BarChart/BarChartDemo';
import { NumberChart } from './export';

const App = () => (
    <div>
        <h3>Donut chart</h3>
        <DonutChartDemo />

        <LineChartDemo />

        <RowCharDemo />

        <BarChartDemo  />

        <h3>Number chart</h3>
        <NumberChart value={50} />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
