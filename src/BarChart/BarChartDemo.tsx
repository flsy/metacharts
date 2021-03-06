import React from 'react';
import { BarChart } from '../export';
import DemoContainer from '../DemoContainer';

const BarChartDemo: React.FC = () => {

    const data = [
            { key: 'way toooo long name to show', value: 8 },
            { key: '26.12.2020 15:40', value: 9 },
            { key: 'another too long name', value: 10 },
        ];

    return (
        <DemoContainer title="Bar chart" settings={{ withXLabel: true, withYLabel: true, xLabelRotate: true, xAxisTicksTooltip: true }} data={data}>
            {(settings, input) => (
                <BarChart
                    data={input}
                    height={300}
                    width={300}
                    colour="green"
                    colours={['green', 'grey']}
                    yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                    xAxisLabel={settings.withXLabel ? "X label" : undefined}
                    xAxisTicksRotate={settings.xLabelRotate ? -90 : undefined}
                    xAxisTicksTooltip={settings.xAxisTicksTooltip}
                    keyFormat={(val) => val.length > 16 ? `${val.substring(0, 13)}...` : val}
                    xAxisTicksTooltipFormat={(key) => `${key} ?`}
                />)}
        </DemoContainer>
    );
};

export default BarChartDemo;
