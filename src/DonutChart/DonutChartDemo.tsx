import React from 'react';
import { DonutChart } from '../export';
import DemoContainer from '../DemoContainer';
import './DonutChart.css';

const data = [
    {
        label: "male",
        value: 30,
        colour: "#88BB88"
    },
    {
        label: "female",
        value: 60,
        colour: "#8888CC"
    },
    {
        label: "unknown",
        value: 10,
        colour: "#AA8888"
    }
];

const DonutChartDemo: React.FC = () => {
    const [filters, setFilters] = React.useState<string[]>([]);

    const filter = (label: string) => {
        if (filters.find(r => r === label)) {
            setFilters(filters.filter(d => d !== label));
        } else {
            setFilters([...filters, label]);
        }
    };

    return (
        <DemoContainer title="Donut chart" settings={{ customValueFormat: true, filterable: true, maxTableRows: false }} data={data}>
            {(settings, input) => (
                <>
                    <DonutChart
                        width={300}
                        height={300}
                        data={input}
                        isAnimationActive={false}
                        filters={settings.filterable ? filters :  undefined}
                        onFilter={settings.filterable ? (label) => filter(label) : undefined}
                        valueFormat={settings.customValueFormat ? (x) => `${Math.floor(x)}%` : undefined}
                        maxTableRows={settings.maxTableRows ? 2 : undefined}

                        // onMouseOver={(label) => this.setState({ focusedLabel: label })}
                        // onMouseOut={(label) => this.setState({ focusedLabel: undefined })}
                        // focusedLabel={this.state.focusedLabel}
                    />
                    <div>{settings.filterable && <pre>{JSON.stringify(filters)}</pre>}</div>
                </>
            )}
        </DemoContainer>
    )
}

export default DonutChartDemo;
