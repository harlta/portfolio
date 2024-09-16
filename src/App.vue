<script setup>
import TheHeader from './components/TheHeader.vue';
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

    <TheHeader class="z-10 sticky top-0"></TheHeader>

    <div class="m-4 py-4 px-8 bg-gray-900 flex flex-col md:flex-row justify-center md:px-4">

        <div class="basis-1/2 md:basis-full md:w-full">

            <div class="bg-gray-900">
                <GoogleMapAPI @getLatLng="getLatLng"></GoogleMapAPI>
            </div>

        </div>

        <div class="inline-flex flex-col basis-1/2 md:basis-full md:w-full place-content-center ">
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

</template>