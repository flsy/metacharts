import React from 'react';
import { BarChart } from '../export';
import DemoContainer from '../DemoContainer';

const BarChartDemo: React.FC = () => {

    const data = [{ key: '8', value: 8 }, { key: '10', value: 10 }];

    return (
        <DemoContainer title="Bar chart" settings={{ withXLabel: true, withYLabel: true }}>
            {(settings) => (
                <BarChart
                    data={data}
                    height={300}
                    width={300}
                    colour="green"
                    yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                    xAxisLabel={settings.withXLabel ? "X label" : undefined}
                />)}
        </DemoContainer>
    );
};

export default BarChartDemo;
