import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


interface DonutChartProps {
  data: { labels: string[]; values: number[] };
  colors?: string[]; // Colors prop for customizing the colors
  handleChartClick?: (event: MouseEvent) => void; // Custom click handler
}

const DonutChart: React.FC<DonutChartProps> = ({ data, colors = [], handleChartClick }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<'doughnut'> | null>(null);



  useEffect(() => {
    if (chartRef.current && chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const backgroundColors =
        colors.length > 0
          ? colors
          : ['#FF6384', '#36A2EB', '#FFCE56', '#C70039', '#900C3F', '#581845'];

      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 13,
                   
                },
              },
            },
          },
          layout: {
            padding: {
              top: 10, 
              bottom: 0, 
            },
          },
          color: 'white',
          
        },
      });
    }
  }, [data, colors]);

  return (
    <div>
      <canvas ref={chartRef} width={200} height={200} ></canvas>
    </div>
  );
};

export default DonutChart;