import React from 'react';
import BarChart from '../BarChart/BarChart';

interface IData {
    from: number;
    to: number;
    value: number;
}

interface IProps {
    width: number;
    height: number;
    colour: string;
    timeFormat: (timestamp: number) => string;
    data: IData[];
    xAxisTicksRotate?: number;
    xAxisTicksTooltip?: boolean;
    xAxisTicksTooltipFormat?: (from: string, to: string, index: number) => string;
    xAxisLabel?: string;
    yAxisLabel?: string;

    keyFormat?: (value: string, index: number) => string;


}

const Histogram = ({height, width, data, colour, timeFormat, xAxisTicksRotate, xAxisTicksTooltip, xAxisTicksTooltipFormat, xAxisLabel, yAxisLabel, keyFormat}: IProps) => {

    const chartData = data.map(item => {
        return ({
            key: timeFormat(item.from),
            value: item.value,
            uniqueKey: timeFormat(item.from)
        })
    })

    const defaultXAxisTicksTooltipFormat = (value: string, index: number) => {
        if (xAxisTicksTooltipFormat) {
            return xAxisTicksTooltipFormat(chartData[index].key, timeFormat(data[index].to), index);
        }
        return `${chartData[index].key} - ${timeFormat(data[index].to)} : ${chartData[index].value}`;
    }

    return (
        <BarChart height={height} width={width} data={chartData}
        colour={colour}
        xAxisTicksRotate={xAxisTicksRotate}
        xAxisTicksTooltip={xAxisTicksTooltip}
        xAxisTicksTooltipFormat={defaultXAxisTicksTooltipFormat}
        xAxisLabel={xAxisLabel}

        yAxisLabel={yAxisLabel}
        keyFormat={keyFormat}
        />
    )
};


export default Histogram;
