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
    isAnimationActive?: boolean;
    width?: string | number;
}

const Histogram = ({height, data, colour, timeFormat, xAxisTicksRotate, xAxisTicksTooltip, xAxisTicksTooltipFormat, xAxisLabel, yAxisLabel, keyFormat, isAnimationActive, width }: IProps) => {
    const chartData = data.map(item => {
        return ({
            key: timeFormat(item.from),
            value: item.value,
            uniqueKey: timeFormat(item.from)
        })
    })

    const byIndex = <T extends object>(index: number, data: T[]): T | undefined => data.find((_, i) => i === index)
    const defaultXAxisTicksTooltipFormat = (value: string, index: number): string => {
        const key = byIndex(index, chartData)?.key;
        const to = byIndex(index, data)?.to;
        const val = byIndex(index, data)?.value;
        if (xAxisTicksTooltipFormat) {
            return key && to && xAxisTicksTooltipFormat(key, timeFormat(to), index) || '';
        }

        return `${key} - ${to && timeFormat(to)} : ${val}`;
    }

    return (
        <BarChartV2
            isAnimationActive={isAnimationActive}
            width={width}
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
