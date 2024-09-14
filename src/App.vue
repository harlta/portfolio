<script setup>
import CurrentWeatherStats from './components/CurrentWeatherStats.vue';
import weeklyTemperatureLineChart from './components/weeklyTemperatureLineChart.vue';
import GoogleMapAPI from './components/GoogleMapAPI.vue';
import { getPositionWeather } from './components/WeatherForecastAPI';
import RevGeocoding from './components/RevGeocoding.vue';
import { ref, computed } from 'vue';


let isResponded = ref(false);

let coords = ref({
    lng: 137.7576958061166,
    lat: 34.77933569442749,
});

function getLatLng(lat, lng) {
    coords.value = { lat: lat, lng: lng };
    isResponded.value = getPositionWeather(lat, lng);
    if (!isResponded.value) console.log("WeatherForecastAPI is not Responded. :(");
}

</script>

<template>
    <div class="m-4 py-4 px-8 bg-gray-900 grid grid-cols-2 gap-4 font-barlow items-center">

        <div>

            <div class="bg-gray-900">
                <GoogleMapAPI @getLatLng="getLatLng"></GoogleMapAPI>
            </div>

        </div>

        <div class="inline-grid grid-cols-1 grid-rows-2">
            <p v-if="isResponded">
                <RevGeocoding v-bind:coords="coords" />
            </p>

            <p v-if="isResponded">
                <CurrentWeatherStats />
            </p>
        </div>

    </div>



    <div v-if="isResponded" class="m-4 bg-gray-900">
        <p>
            <weeklyTemperatureLineChart />
        </p>
    </div>

    <div class="text-center text-2xl text-white">
        <a href="https://github.com/harlta/portfolio">READ ME (This is Portfolio)</a>
    </div>
</template>