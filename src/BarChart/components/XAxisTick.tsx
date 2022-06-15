import React from 'react'
import { ITooltip } from '../interfaces';

const isNumber = (value: unknown): value is number => typeof value === 'number';
const toString = (value: number): string => `${value}`;
const isAbbreviated = (value: string): boolean => value.length > 15;
const stringify = (value?: string | number): string => {
  if (!value) {
    return ''
  }
  return isNumber(value) ? toString(value) : value;
}

interface IProps {
  x?: number;
  y?: number;
  payload?: {
    value: string | number;
    index: number;
  };
  xAxisTicksRotate: boolean;
  onMouseEnter: (tooltip:ITooltip) => void
  onMouseLeave: (tooltip:ITooltip) => void
}

const XAxisTick = ( { x, y, payload, xAxisTicksRotate, onMouseEnter, onMouseLeave }: IProps) => {
  const value = stringify(payload?.value)
  const tooltip: ITooltip = {
    label: value,
    index: payload?.index || 0
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-12}
        dy={16}
        fontSize={10}
        textAnchor={xAxisTicksRotate ? "end" : "middle"}
        fill="#666"
        transform={xAxisTicksRotate ? "rotate(-90)" : ''}
        onMouseEnter={() => onMouseEnter(tooltip)}
        onMouseLeave={() => onMouseLeave(tooltip)}
      >
        {`${value.substr(0, 15)}${isAbbreviated(value) ? '...' : ''}`}
      </text>
    </g>
  );
}

export default XAxisTick;
