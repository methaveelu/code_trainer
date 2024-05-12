'use client'

import { ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart, CartesianGrid, Legend } from "recharts";

interface TopAttemptedQuestion{
    title: string;
    attemptCount: number | null;
    topic: {
        slug: string;
    };
}

interface BarChartTrendingProps {
  topAttemptedQuestions: TopAttemptedQuestion[];
}

export default function BarChartTrending({topAttemptedQuestions}: BarChartTrendingProps){
    const trendData = [
        {
            name: `${topAttemptedQuestions[0].title}  (${topAttemptedQuestions[0].topic.slug})`,
            attempts: topAttemptedQuestions[0].attemptCount,
        },
        {
            name:  `${topAttemptedQuestions[1].title} (${topAttemptedQuestions[1].topic.slug})`,
            attempts: topAttemptedQuestions[1].attemptCount,
        },
        {
            name: `${topAttemptedQuestions[2].title} (${topAttemptedQuestions[2].topic.slug})`,
            attempts: topAttemptedQuestions[2].attemptCount,
        },
    ];

    return(
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                layout="vertical"
                data={trendData}
                margin={{
                    top: 17,
                    right: 15,
                    left: 20,
                    bottom: 58,
                }}
            >
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="hsl(42, 100%, 70%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(42, 100%, 70%)" stopOpacity={0.9} />
                    </linearGradient>
                </defs>
                <CartesianGrid horizontal={false} stroke={'#48494e'} />
                <XAxis type="number" axisLine={{ stroke: '#d3d3d3' }} tickLine={{ stroke: '#d3d3d3' }} style={{ fontSize: '12px', fill: '#d3d3d3' }}/> {/* Adjusted axis line and tick line color */}
                <YAxis dataKey="name" type="category" axisLine={{ stroke: '#d3d3d3' }} tickLine={{ stroke: '#d3d3d3' }} style={{ fontSize: '12px', fill: '#d3d3d3' }}/>
                <Tooltip contentStyle={{backgroundColor:'#191f45'}}/>
                <Legend />
                <Bar dataKey="attempts" fill="url(#colorGradient)" fillOpacity={1} />
            </BarChart>
        </ResponsiveContainer>
    );
}
