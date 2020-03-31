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
    return (
        <DemoContainer title="Row chart" settings={{ withXLabel: true, withYLabel: true }}>
            {(settings) => (

                <RowChart
                    data={data}
                    width={400}
                    yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                    xAxisLabel={settings.withXLabel ? "X label" : undefined}
                    colour="green"
                />
            )}
        </DemoContainer>
    );
};

export default RowCharDemo;
