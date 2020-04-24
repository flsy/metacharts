import React from 'react';
import { BarChart } from '../export';
import DemoContainer from '../DemoContainer';

const BarChartDemo: React.FC = () => {

    const data = [
            { key: 'way toooo long name to show', value: 8 },
            { key: 'another too long name', value: 10 },
        ];

    return (
        <DemoContainer title="Bar chart" settings={{ withXLabel: true, withYLabel: true, xLabelRotate: false, xAxisTicksTooltip: true }} data={data}>
            {(settings, input) => (
                <BarChart
                    data={input}
                    height={300}
                    width={300}
                    colour="green"
                    yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                    xAxisLabel={settings.withXLabel ? "X label" : undefined}
                    xAxisTicksRotate={settings.xLabelRotate ? -45 : undefined}
                    xAxisTicksTooltip={settings.xAxisTicksTooltip}
                />)}
        </DemoContainer>
    );
};

export default BarChartDemo;
