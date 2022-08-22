import React from 'react';
import { DonutChart } from '../export';
import DemoContainer from '../DemoContainer';
import './DonutChart.css';
import DonutChartV2 from './DonutChartV2'

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
    },
    {
        label: "unknown1",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown2",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown3",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown4",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown5",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown6",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown7",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown8",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknow9",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown15",
        value: 10,
        colour: "#AA8888"
    },
    {
        label: "unknown16",
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
                    <DonutChartV2
                      height={300}
                      data={input}
                      isAnimationActive={false}
                      maxLegendItems={{
                          count: 3,
                          aggregatedLabel: 'rest',
                          aggregatedColor: '#000'
                      }}
                      valueFormat={settings.customValueFormat ? (x) => `${Math.floor(x)}%` : undefined}
                    />
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
