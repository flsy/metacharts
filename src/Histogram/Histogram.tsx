import React from 'react';
import BarChartV2 from '../BarChart/BarChartV2';

interface IData {
    from: number;
    to: number;
    value: number;
}

interface IProps {
    height: number;
    colour: string;
    timeFormat: (timestamp: number) => string;
    data: IData[];
    xAxisTicksRotate?: boolean;
    xAxisTicksTooltip?: boolean;
    xAxisTicksTooltipFormat?: (from: string, to: string, index: number) => string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    keyFormat?: (value: string, index: number) => string;


}

const Histogram = ({height, data, colour, timeFormat, xAxisTicksRotate, xAxisTicksTooltip, xAxisTicksTooltipFormat, xAxisLabel, yAxisLabel, keyFormat}: IProps) => {
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
        <BarChartV2
            height={height}
            data={chartData}
            colour={colour}
            xAxisTicksRotate={!!xAxisTicksRotate}
            xAxisTicksTooltip={xAxisTicksTooltip}
            xAxisTicksTooltipFormat={defaultXAxisTicksTooltipFormat}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            keyFormat={keyFormat}
        />
    )
};


export default Histogram;
