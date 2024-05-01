import CanvasJSReact from '@canvasjs/react-charts';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

interface DataType {
    date: string,
    totalCases: number
}
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineGraph = () => {
    const [dataPoints, setDataPoints] = useState<DataType[]>([]);
    const getData = async () => {
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        return response.json();
    }
    const { data, error, isLoading } = useQuery('casesByDate', getData);
    useEffect(() => {
        if (data) {
            const arr = Object.entries(data.cases).map(([key, value]) => ({ date: key, totalCases: value }));
            setDataPoints(arr as DataType[]);
        }
    }, [data]);
    if (error) return <div>Request Failed</div>
    else if (isLoading) return <div>Loading....</div>

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        title: {
            text: "Cases Fluctuation"
        },
        axisY: {
            title: "No. of cases",
        },
        axisX: {
            title: "Date",
        },
        data: [{
            type: "line",
            toolTipContent: "Date: {x} <br/> Cases: {y}",
            dataPoints: dataPoints.map(dataPoint => ({ x: new Date(dataPoint.date), y: dataPoint.totalCases }))
        }]
    }
    return (
        <div className='mb-10'>
            <CanvasJSChart options={options} />
        </div>
    );
}
export default LineGraph;                              