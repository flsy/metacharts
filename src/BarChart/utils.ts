import { InjectedProps } from '../focusedHOC';
import { textWidth } from '../Axis/tools';
import { IBarChart } from '../interfaces';

export const BAR_CHART_LABEL_MAX_CHAR_COUNT = 15;

interface IProps extends Omit<IBarChart, 'width' | 'xAxisTicksRotate'> {
  xAxisTicksRotate: boolean;
}

const getLongestStr = (arr: string[]) => {
  const res = arr.reduce((acc, curr) => (curr.length > acc.length ? curr : acc), '');
  return res.substr(0, BAR_CHART_LABEL_MAX_CHAR_COUNT);
};

export const getXAxisHeight = (props: IProps & InjectedProps) => {
  if (!props.xAxisTicksRotate) {
    return 30;
  }

  const longestLabel = getLongestStr(props.data.map((d) => d.key));
  return textWidth(longestLabel) + (props.xAxisLabel ? 12 : 0);
};

export const getYAxisWidth = (props: IProps & InjectedProps) => {
  const longestLabel = getLongestStr(props.data.map((d) => d.value.toString()));
  return textWidth(longestLabel) + (props.yAxisLabel ? 12 : 0);
};
