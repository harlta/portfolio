<script setup>
import { weeklyTemp } from './WeatherForecastAPI';
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import 'chart.js/auto';

const chartData = computed(() => {
    return {
        labels: weeklyTemp.value.date,
        datasets: [{
            label: '最高気温',
            data: weeklyTemp.value.max,
            borderColor: 'rgba(239, 68, 68, 1)',
            pointStyle: 'triangle',
            hoverRadius: '5.5',
        },
        {
            label: '最低気温',
            data: weeklyTemp.value.min,
            borderColor: 'rgba(59, 130, 246, 1)',
            pointStyle: 'triangle',
            pointRotation: '180',
            hoverRadius: '5.5',
        }],
    }
});

const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '週間気温予報',
                color: '#FFF',
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                ticks: {
                    color: '#FFF',
                    stepSize: 2.0,
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                ticks: {
                    color: '#FFF',
                }
            }
        }
    }
});
</script>

<template>
    <div class="p-4">
        <Line :data="chartData" :options="chartOptions" style="height: 250px; width: 100%" />
    </div>
</template>