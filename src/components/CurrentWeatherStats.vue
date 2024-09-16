<script setup>
import { ref, computed } from 'vue';
import { currentWeather } from './WeatherForecastAPI';

const isDay = computed(() => {
    return currentWeather.value.isDay;
});
const humidity = computed(() => {
    return currentWeather.value.humidity;
});
const temp = computed(() => {
    return currentWeather.value.temperature;
});
const date = computed(() => {
    const str = new String(currentWeather.value.date);
    return str.split((/(?:-)|(?:T)/));
});
const weatherCode = computed(() => {
    return currentWeather.value.weatherCode;
});

const iconClass = ref({
    thermometer: {
        str: "pe-is-w-thermometer-1",
        change: function (isOver) {
            this.str = isOver ? "pe-is-w-thermometer-1-f" : "pe-is-w-thermometer-1";
        }
    },
    humidity: {
        str: "pe-is-w-drop-percentage",
        change: function (isOver) {
            this.str = isOver ? "pe-is-w-drop-percentage-f" : "pe-is-w-drop-percentage";
        }
    },
    weather: {
        str: "",
        dayStr: "",
        codeStr: "",
        change: function (isOver, isDay, code) {
            switch (code) {
                case 0: // 快晴
                    this.str = isDay ? "pe-is-w-sun-1" : "pe-is-w-moon-1";
                    this.codeStr = "快晴";
                    break;
                case 1: // 晴れ
                case 2:
                    this.str = isDay ? "pe-is-w-partly-cloudy-2" : "pe-is-w-partly-cloudy-3";
                    this.codeStr = "晴れ";
                    break;
                case 3: // 曇り
                    this.str = isDay ? "pe-is-w-mostly-cloudy-2" : "pe-is-w-partly-cloudy-3";
                    this.codeStr = "曇り";
                    break;
                case 45: // 霧
                case 48:
                    this.str = isDay ? "pe-is-w-fog-3" : "pe-is-w-fog-4";
                    this.codeStr = "霧";
                    break;
                case 51: // 霧雨
                case 53:
                case 55:
                case 56:
                case 57:
                    this.str = "pe-is-w-drizzle";
                    this.codeStr = "霧雨";
                    break;
                case 61: // 雨
                case 63:
                case 65:
                case 80:
                case 81:
                case 82:
                    this.str = isDay ? "pe-is-w-rain-day" : "pe-is-w-rain-night";
                    this.codeStr = "雨";
                    break;
                case 71: // 雪
                case 73:
                case 75:
                case 77:
                case 85:
                case 86:
                    this.str = isDay ? "pe-is-w-snow-day-1" : "pe-is-w-snow-night-1";
                    this.codeStr = "雪";
                    break;
                case 95: // 雷
                case 96:
                case 99:
                    this.str = isDay ? "pe-is-w-thunderstorm-day-2" : "pe-is-w-thunderstorm-night-2";
                    this.codeStr = "雷雨";
                    break;
            }
            if (isOver) this.str = this.str + '-f';
            this.dayStr = isDay ? "昼" : "夜";
        },
    },
});

// 大分無理やり初期化処理してるけど通ってるからヨシ 多分watcherを使えばいける？
const initWeatherIcon = computed(() => {
    iconClass.value.weather.change(false, isDay.value, weatherCode.value);
    return null;
});

</script>

<template>

    <section class="p-4 bg-gray-900">

        <div class="grid grid-flow-row grid-cols-2 grid-rows-2 gap-2 md:grid-flow-col content-center">

            <div class="transition truncate bg-gray-400 h-16 rounded-lg content-center hover:bg-gray-300"
                v-on:mouseover="iconClass.weather.change(true, isDay, weatherCode)"
                v-on:mouseleave="iconClass.weather.change(false, isDay, weatherCode)">
                <div class="flex flex-row justify-center text-center items-center">
                    <i v-bind:class="`${iconClass.weather.str} text-4xl basis-1/5 min-w-9 pl-3`"
                        v-bind:key="initWeatherIcon" />
                    <div class="basis-3/5">
                        <p>{{ iconClass.weather.dayStr }}</p>
                        <p>{{ iconClass.weather.codeStr }}</p>
                    </div>
                    <div class="basis-1/5"></div>
                </div>

            </div>

            <div class="transition truncate bg-gray-400 h-16 rounded-lg content-center hover:bg-gray-300"
                v-on:mouseover="iconClass.humidity.change(true)" v-on:mouseleave="iconClass.humidity.change(false)">
                <div class="flex flex-row justify-center items-center text-center">
                    <i v-bind:class="`${iconClass.humidity.str} text-4xl basis-1/5 pl-3 min-w-10`" />
                    <p class="basis-3/5 text-3xl">{{ humidity }}</p>
                    <p class="basis-1/5 pr-3 text-3xl">%</p>
                </div>
            </div>

            <div class="transition truncate bg-gray-400 h-16 rounded-lg content-center hover:bg-gray-300"
                v-on:mouseover="iconClass.thermometer.change(true)"
                v-on:mouseleave="iconClass.thermometer.change(false)">
                <div class="flex flex-row gap-2 justify-center items-center text-center">
                    <i v-bind:class="`${iconClass.thermometer.str} text-4xl basis-1/5 pl-3 min-w-10`" />
                    <p class="basis-3/5 text-3xl">{{ temp }}</p>
                    <i class="basis-1/5 pr-3 pe-is-w-degree-celsius text-2xl" />
                </div>
            </div>

            <div
                class="transition truncate bg-gray-400 h-16 p-2  rounded-lg text-center content-center hover:bg-gray-300 group">
                <div class="flex flex-row">
                    <p class="basis-1/5 group-hover:underline">DATA<br>TIME</p>
                    <div class="basis-3/5 inline-flex flex-col">
                        <p class="truncate">{{ date[0] }} / {{ date[1] }} / {{ date[2] }}</p>
                        <p class="">{{ date[3] }}</p>
                    </div>
                    <div class="basis-1/5 "></div>
                </div>
            </div>
        </div>
    </section>
</template>