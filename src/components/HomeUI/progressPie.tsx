'use client'

import { ResponsivePie } from '@nivo/pie'

interface ProgressPieProp{
    solvedQuestionsUser: number;
    totalQuestions: number;
}

export default function ProgressPie({solvedQuestionsUser, totalQuestions}:ProgressPieProp){
    const remainder =  totalQuestions-solvedQuestionsUser;
    const data = [
        {
            "id": "completed",
            "label": "Completed",
            "value": solvedQuestionsUser,
            "color": "hsl(42,100%,70%)"
        },
        {
            "id": "uncompleted",
            "label": "Remainder",
            "value": remainder,
            "color": "hsl(42.3,42.7%,28%)"
        }
    
    ]
    return(
        
        <ResponsivePie
        theme={{tooltip:{container:{color:"rgb(20, 20, 19)"}}}}
        data={data}
        margin={{ top: 20,  bottom: 120 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={8}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={5}
        borderColor={{ theme: 'background' }}
        enableArcLinkLabels={false}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 120,
                itemHeight: 18,
                itemTextColor: 'white',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 20,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: 'rgb(255, 209, 102)',
                        }
                    }
                ]
            }
        ]}
    /> 
    )
} 


