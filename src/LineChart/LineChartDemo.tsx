import React from 'react';
import { LineChart } from '../export';
import DemoContainer from '../DemoContainer';

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
        value: 30,
    },
    {
        key: 6,
        value: 10,
    }
];

const LineChartDemo = () => {
    const [filter, setFilter] = React.useState<any>({ from: 3, to: 5 });

    return (
        <div>
            <DemoContainer title="Line chart" settings={{ withXLabel: true, withYLabel: true, useKeyFormat: false, useFilters: true, xLabelRotate: false, xAxisTicksTooltip: false }} data={data}>
                {(settings, input) => {
                    return (
                        <div>
                            <LineChart
                                data={input}
                                height={300}
                                width={500}
                                yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                                xAxisLabel={settings.withXLabel ? "X label" : undefined}
                                colour="green"
                                onFilter={settings.useFilters ? ({ from, to }) => setFilter({ from, to }) : undefined}
                                filterFrom={settings.useFilters ? filter.from : undefined}
                                filterTo={settings.useFilters ? filter.to : undefined}
                                keyFormat={settings.useKeyFormat ? (value) => `${value},-` : undefined}
                                xAxisTicksRotate={settings.xLabelRotate ? -45 : undefined}
                                xAxisTicksTooltip={settings.xAxisTicksTooltip}
                            />
                            {settings.useFilters && <pre>{JSON.stringify(filter)}</pre>}
                        </div>
                    )
                }}
            </DemoContainer>
        </div>
    )
};

export default LineChartDemo;
