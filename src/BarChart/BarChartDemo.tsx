import React from 'react';
import { BarChart } from '../export';
import DemoContainer from '../DemoContainer';

const BarChartDemo: React.FC = () => {

    const data = [{ key: '8', value: 8 }, { key: '10', value: 10 }];

    return (
        <DemoContainer title="Bar chart" settings={{ withXLabel: true, withYLabel: true, xLabelRotate: false }} data={data}>
            {(settings, input) => (
                <BarChart
                    data={input}
                    height={300}
                    width={300}
                    colour="green"
                    yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                    xAxisLabel={settings.withXLabel ? "X label" : undefined}
                    xAxisTicksRotate={settings.xLabelRotate ? -45 : undefined}
                />)}
        </DemoContainer>
    );
};

export default BarChartDemo;
