import React from 'react';
import { BarChart } from '../export';
import DemoContainer from '../DemoContainer';
import BarChartV2 from './BarChartV2'

const BarChartDemo: React.FC = () => {

    const data = [
            { key: 'way toooo long name to show', value: 8 },
            { key: '26.12.2020 15:40', value: 9 },
            { key: 'another too long name', value: 10 },
            { key: 'another', value: 15 },
        ];

    return (
        <DemoContainer title="Bar chart" settings={{ withXLabel: true, withYLabel: true, xLabelRotate: true, xAxisTicksTooltip: true }} data={data}>
            {(settings, input) => (
              <div>
                <BarChartV2
                  brushProps={{
                    height: 30,
                    startIndex: data.length - 3
                  }}
                  width={400}
                  isAnimationActive={true}
                  data={input}
                  height={300}
                  colour="green"
                  colours={['green', 'grey']}
                  yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                  xAxisLabel={settings.withXLabel ? "X label" : undefined}
                  xAxisTicksRotate={settings.xLabelRotate}
                  xAxisTicksTooltip={settings.xAxisTicksTooltip}
                  keyFormat={(val) => val.length > 16 ? `${val.substring(0, 13)}...` : val}
                  xAxisTicksTooltipFormat={(label, index) => `${label} : ${index}`}
                />
                <br />
                <br />
                <BarChart
                  data={input}
                  height={300}
                  width={300}
                  colour="green"
                  colours={['green', 'grey']}
                  yAxisLabel={settings.withYLabel ? "Y label" : undefined}
                  xAxisLabel={settings.withXLabel ? "X label" : undefined}
                  xAxisTicksRotate={settings.xLabelRotate ? -90 : undefined}
                  xAxisTicksTooltip={settings.xAxisTicksTooltip}
                  keyFormat={(val) => val.length > 16 ? `${val.substring(0, 13)}...` : val}
                  xAxisTicksTooltipFormat={(key) => `${key} ?`}
                />
              </div>)}
        </DemoContainer>
    );
};

export default BarChartDemo;
