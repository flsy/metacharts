export interface ILineChartData {
  key: number;
  value: number;
}

export interface ILineChart {
  data: ILineChartData[];
  width: number;
  height: number;
  colour: string;
  onFilter?: (filter: { from?: number; to?: number }) => void;
  filterFrom?: number;
  filterTo?: number;
  valueFormat?: (value: number) => string;
  keyFormat?: (value: string, index: number) => string;

  xAxisTicksRotate?: number;
  xAxisTicksTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

interface IBarChartData {
  uniqueKey?: string;
  key: string;
  value: number;
}

export interface IBarChart {
  data: IBarChartData[];
  width: number;
  height: number;
  colour: string;
  colours?: string[];

  valueFormat?: (value: number) => string;
  keyFormat?: (value: string, index: number) => string;

  xAxisTicksRotate?: number;
  xAxisTicksTooltip?: boolean;
  xAxisTicksTooltipFormat?: (value: string, index: number) => string;

  xAxisLabel?: string;
  yAxisLabel?: string;
  filters?: string[];
  onFilter?: (key: string) => void;
}

interface IRowChartData {
  key: string;
  value: number;
}

export interface IRowChart {
  data: IRowChartData[];
  width: number;
  colour: string;

  valueFormat?: (value: number) => string;
  tooltipValueFormat?: (value: number) => string;
  filters?: string[];
  onFilter?: (label: string) => void;
  labelWidth?: number;
  valueLabelWidth?: number;

  xAxisLabel?: string;
  yAxisLabel?: string;

  isAnimated?: boolean;
}

export interface IDonutChartData {
  label: string;
  value: number;
  colour: string;
}

export interface IDonutChart {
  data: IDonutChartData[];
  width: number;
  height: number;

  filters?: string[];
  onFilter?: (label: string) => void;

  valueFormat?: (value: number) => string;
  tooltipValueFormat?: (value: number) => string;
  maxTableRows?: number;
  children?: any;
  isAnimationActive?: boolean;
}

export interface INumberChart {
  value: number;
  label?: string;
  color: string;
  width: number;

  valueFormat?: (value: number) => string;
  tooltipValueFormat?: (value: number) => string;

  isAnimationActive?: boolean;
}
