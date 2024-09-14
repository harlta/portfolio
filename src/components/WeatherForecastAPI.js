import axios from "axios";
import { ref } from "vue";

export const weeklyTemp = ref({
    max: null, // 週間最高気温
    min: null, // 週間最低気温
    date: null,// 日付
    setValue: function (max, min, d) {
        this.max = max;
        this.min = min;
        this.date = d;
    }
});

export const currentWeather = ref({
    isDay: null,
    humidity: null,
    temperature: null,
    date: null,
    weatherCode: null,
    windDirection: null,
    windSpeed: null,
    setValue: function (isDay, humidity, temp, date, weatherCode, windDir, windSpd) {
        this.isDay = isDay;
        this.humidity = humidity;
        this.temperature = temp;
        this.date = date;
        this.weatherCode = weatherCode;
        this.windDirection = windDir;
        this.windSpeed = windSpd;
    }
});

export function getPositionWeather(lat, lng) {
    let isResponded = true;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
    axios
        .get(url)
        .then(function (res) {
            weeklyTemp.value.setValue(
                res.data.daily.temperature_2m_max,
                res.data.daily.temperature_2m_min,
                res.data.daily.time
            );
            currentWeather.value.setValue(
                res.data.current.is_day, // 日中1 or 夜0
                res.data.current.relative_humidity_2m, // 湿度
                res.data.current.temperature_2m, // 現在気温
                res.data.current.time, // 日付時刻
                res.data.current.weather_code, // 天気
                res.data.current.wind_direction_10m, // 風向き
                res.data.current.wind_speed_10m // 風速
            );
            //console.log(res);
        })
        .catch(function (err) {
            console.log(err);
            isResponded = false;
        });
    return isResponded;
}