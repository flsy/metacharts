import React from 'react';
import ReactDOM from 'react-dom';
import DonutChartDemo from './DonutChart/DonutChartDemo';
import LineChartDemo from './LineChart/LineChartDemo';
import RowCharDemo from './RowChart/RowCharDemo';
import BarChartDemo from './BarChart/BarChartDemo';
import NumberChartDemo from './NumberChart/NumberChartDemo';

const App = () => (
    <div>
        <div style={{ padding: '10px'}}>

            <h3>Donut chart</h3>
            <DonutChartDemo />

            <LineChartDemo />

            <RowCharDemo />

            <BarChartDemo />

            <NumberChartDemo />
        </div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
