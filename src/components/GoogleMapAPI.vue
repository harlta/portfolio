<script setup>

import { ref, watch, defineEmits } from 'vue';
import { GoogleMap, AdvancedMarker } from 'vue3-google-map';

const key = process.env.VUE_APP_MAPSAPIKEY;
const mapId = process.env.VUE_APP_MAPID;

const center = ref({
    lat: 34.77933569442749,
    lng: 137.7576958061166,
});

const posRef = ref({
    lat: 34.77933569442749,
    lng: 137.7576958061166,
});
const mapRef = ref(null);

watch(() => mapRef.value?.ready, (ready) => {
    if (!ready) return;
    const map = mapRef.value.map;

    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        posRef.value = { lat: lat, lng: lng };
        // console.log(`${lat}, ${lng}`);
        // geocoding(lat, lng);
    });
});

const emit = defineEmits(['getLatLng']);
function emitLatLng(lat, lng) {
    emit('getLatLng', lat, lng);
}

</script>

<template>
    <div>
        <GoogleMap :api-key="key" :mapId="mapId" ref="mapRef" style="width:100%; height: 400px;" :center="center"
            :zoom="10" class="p-2">
            <AdvancedMarker :options="{ position: posRef }" />
        </GoogleMap>
    </div>
    <div id="Button">
        <button @click="emitLatLng(posRef.lat, posRef.lng)"
            class="cursor-pointer rounded-md bg-neutral-950 mx-2 px-3 py-1 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]">表示</button>
    </div>
</template>