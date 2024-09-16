<script setup>

import axios from 'axios';
import { ref, defineProps, watchEffect } from 'vue';

const key = process.env.VUE_APP_MAPSAPIKEY;

const props = defineProps(['coords']);

const addressData = {
    plusCode: null,
    country: null,
    city: null,
}

const location = ref(addressData);

const isLoad = ref(false);

watchEffect(async () => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.coords.lat},${props.coords.lng}&key=${key}`;

    await axios
        .get(url)
        .then((res) => {
            //console.log(res);
            isLoad.value = false;
            location.value = setLocationValue(res.data.plus_code.compound_code);
        })
        .finally(() => {
            isLoad.value = true;
        })
        .catch((err) => {
            console.log(err);
            location.value = null;
        });
});

function setLocationValue(code) {
    const str = String(code).split((/(?: )|(?:、)/));
    let data = addressData;
    data.plusCode = str[0];
    data.country = str[1];
    let cityStr = new String();
    for (let i = 2; i < str.length; i++) cityStr += str[i];
    data.city = cityStr;
    return data;
}
</script>

<template>
    <div class="bg-gray-400 m-4 p-4 rounded-lg transition hover:bg-gray-300 group relative truncate">
        <div class="inline-grid grid-cols-2 gap-2 items-center justify-center">
            <div class="flex flex-col w-3/4  text-center">
                <span class="pe-is-w-compass-s text-3xl"></span>
                <span>LOCATION</span>
            </div>

            <span v-if="isLoad" class="text-left items-center justify-center">
                <span class="">{{ location.country }}<br></span>
                <span> {{ location.city }}</span>
            </span>
            <span v-else>location : loading...</span>

            <div
                class="absolute bg-black text-gray-400 top-full my-2 p-2 opacity-0 transition group-hover:opacity-100 pointer-events-none text-left">
                <p>plus_code : {{ location.plusCode }}<br>lat : {{ props.coords.lat }}<br> lng : {{ props.coords.lng }}
                </p>
            </div>
        </div>
    </div>
</template>