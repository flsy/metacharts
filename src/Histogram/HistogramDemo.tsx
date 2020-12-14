import React from 'react';
import Histogram from './Histogram';
import DemoContainer from '../DemoContainer';

const data = [
    [
        1607371175,
        1607371206,
        3
    ],
    [
        1607371206,
        1607371237,
        0
    ],
    [
        1607371237,
        1607371268,
        0
    ],
    [
        1607371268,
        1607371299,
        0
    ],
    [
        1607371299,
        1607371330,
        0
    ],
    [
        1607371330,
        1607371361,
        0
    ],
    [
        1607371361,
        1607371392,
        0
    ],
    [
        1607371392,
        1607371423,
        0
    ],
    [
        1607371423,
        1607371454,
        0
    ],
    [
        1607371454,
        1607371485,
        0
    ],
    [
        1607371485,
        1607371516,
        0
    ],
    [
        1607371516,
        1607371547,
        0
    ],
    [
        1607371547,
        1607371578,
        0
    ],
    [
        1607371578,
        1607371609,
        0
    ],
    [
        1607371609,
        1607371640,
        0
    ],
    [
        1607371640,
        1607371671,
        0
    ],
    [
        1607371671,
        1607371702,
        2
    ],
    [
        1607371702,
        1607371733,
        0
    ],
    [
        1607371733,
        1607371764,
        0
    ],
    [
        1607371764,
        1607371795,
        7
    ]
];

const format = (timestamp: number) => new Date(timestamp).toLocaleString()

const HistogramDemo = () => {

    return (
        <DemoContainer title="Histogram" settings={{ withXLabel: true, xAxisTicksTooltip: true }} data={data}>
            {({ xAxisTicksTooltip, withXLabel }) => {
                return (
                    <Histogram
                        width={400}
                        height={300}
                        colour="lightblue"
                        timeFormat={format}
                        xAxisTicksRotate={-90}
                        xAxisTicksTooltip={xAxisTicksTooltip}
                        data={data.map(item => ({
                            from: item[0] * 1000,
                            to: item[1] * 1000,
                            value: item[2]
                        }))}
                        keyFormat={(val) => val.length > 16 ? `${val.substring(0, 13)}...` : val}
                        xAxisLabel={withXLabel ? 'start - end' : undefined}
                        yAxisLabel={'value'}
                    />
                )
            }}
        </DemoContainer>)
};


export default HistogramDemo;
