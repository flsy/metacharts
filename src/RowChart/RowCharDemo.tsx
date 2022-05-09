import React from 'react';
import { RowChart } from '../export';
import DemoContainer from '../DemoContainer';

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


const RowCharDemo: React.FC = () => {
    const [filters, setFilter] = React.useState<string[]>([]);
    return (
        <DemoContainer
            title="Row chart"
            data={data}
            settings={{
                withXLabel: true,
                withYLabel: true,
                filterable: true,
                yLabelCustomWidth: 15,
                xLabelCustomWidth: 100,
                customValueFormat: false,
                customToolTipFormat: false,
                isAnimated: true
            }}>
            {(settings, input) => (
                <div>
                    <RowChart
                        isAnimated={settings.isAnimated}
                        data={input}
                        width={400}
                        yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                        xAxisLabel={settings.withXLabel ? "X label" : undefined}
                        colour="green"
                        onFilter={settings.filterable ? (filter) => setFilter([...filters, filter]) : undefined}
                        filters={settings.filterable ? filters : undefined}
                        labelWidth={settings.yLabelCustomWidth || undefined}
                        valueLabelWidth={settings.xLabelCustomWidth || undefined}
                        valueFormat={settings.customValueFormat ? (val) => `${val},-` : undefined}
                        tooltipValueFormat={settings.customToolTipFormat ? (val) => `${val} custom tooltip` : undefined}
                    />
                    {settings.filterable && <pre>{JSON.stringify(filters)}</pre>}
                </div>
            )}
        </DemoContainer>
    );
};

export default RowCharDemo;
