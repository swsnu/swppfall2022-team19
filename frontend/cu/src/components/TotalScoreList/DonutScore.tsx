// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

type Props = {
    scoreCnt: number[],
    legendCheck: boolean
}

const DonutScore = (props: Props) => {
    const { scoreCnt, legendCheck } = props;

    let data = [
        {
            "id": "0점",
            "label": "0점",
            "value": scoreCnt[0],
            "color": "hsl(112, 70%, 50%)"
        },
        {
            "id": "1점",
            "label": "1점",
            "value": scoreCnt[1],
            "color": "hsl(181, 70%, 50%)"
        },
        {
            "id": "2점",
            "label": "2점",
            "value": scoreCnt[2],
            "color": "hsl(215, 70%, 50%)"
        },
        {
            "id": "3점",
            "label": "3점",
            "value": scoreCnt[3],
            "color": "hsl(15, 70%, 50%)"
        },
        {
            "id": "4점",
            "label": "4점",
            "value": scoreCnt[4],
            "color": "hsl(345, 70%, 50%)"
        },
        {
            "id": "5점",
            "label": "5점",
            "value": scoreCnt[5],
            "color": "hsl(345, 70%, 50%)"
        }

    ]

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            innerRadius={0.5}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'set2' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsDiagonalLength={15}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabel="value"
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}


            legends={props.legendCheck ? [
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ] : []}
        />
    )
}

export default DonutScore;