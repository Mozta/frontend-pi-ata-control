// BubbleChart.js
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, BubbleController, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

export const BubbleChart = ({ pointPos }) => {
    const mapPositionToDiv = (x, y) => ({
        x: x,
        y: y * -1 + 180,
    });

    const { x, y } = mapPositionToDiv(pointPos.x || 0, pointPos.y || 0);

    const dataBubble = {
        datasets: [
            {
                label: 'Pinata Position',
                data: [{ x: x, y: y, r: 10 }],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 180,
            },
            y: {
                min: 0,
                max: 180,
            },
        },
    };

    return (
        <>
            <Bubble data={dataBubble} options={options} height={180} />
            <div className='bg-gray-200 py-2 rounded-lg text-center mt-2'>
                <p className='font-medium'>X: {x.toFixed(2)} , Y: {y.toFixed(2)}</p>
            </div>
        </>
    );
};
