// ▫データ

// ▫DOM
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");

const status = document.querySelector("#status");

const cityName = document.querySelector("#city-name");
const date = document.querySelector("#date");
const currentWeather = document.querySelector("#current-weather");

const temperature = document.querySelector("#temperature");
const maxTemperature = document.querySelector("#max-temperature");
const minTemperature = document.querySelector("#min-temperature");
const windSpeed = document.querySelector("#wind-speed");

// ▫状態
// ▫状態
const cityMap = {
  "東京": "Tokyo",
  "大阪": "Osaka",
  "千葉": "Chiba",
  "横浜": "Yokohama"
};

// ▫関数

// APIから天気データを取得する関数
async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Asia%2FTokyo`
  );
  if (!response.ok) {
    throw new Error("Weather API error");
  }
  const data = await response.json();
  displayWeather(data);
  status.textContent = "";
  searchButton.disabled = false;
}

// 都市を検索する関数
async function searchCity() {
  if (searchButton.disabled) {
    return;
  }
  const city = cityInput.value.trim();
  cityName.textContent = "";
  currentWeather.textContent = "";
  date.textContent = "";
  temperature.textContent = "";
  maxTemperature.textContent = "";
  minTemperature.textContent = "";
  windSpeed.textContent = "";
  if (!city) {
    status.textContent = "都市名を入力してください";
    return;
  }
  status.textContent = "検索中...";
  searchButton.disabled = true;
  const searchCityName = cityMap[city];
  console.log("city:", city);
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchCityName}&count=1&language=ja&format=json`
    );
    if (!response.ok) {
      throw new Error("Geocoding API error");
    }
    const data = await response.json();
    if (!searchCityName) {
      status.textContent = "対応していない都市です";
      searchButton.disabled = false;
      return;
    }
    if (!data.results) {
      status.textContent = "都市が見つかりません";
      searchButton.disabled = false;
      return;
    }
    const result = data.results[0];
    const latitude = result.latitude;
    const longitude = result.longitude;
    const locationName = result.name;

    console.log(latitude);
    console.log(longitude);

    cityName.textContent = `${locationName}の天気`;
    await getWeather(latitude, longitude);
  } catch (error) {
    console.error(error);
    status.textContent = "通信に失敗しました";
    searchButton.disabled = false;
  }
}

// 天気コードを天気名に変える関数
function getWeatherText(weatherCode) {
  switch (weatherCode) {
    case 0:
      return "☀️ 快晴";
    case 1:
      return "☀️ 晴れ";
    case 2:
      return "⛅ 一部曇り";
    case 3:
      return "☁️ 曇り";
    case 45:
    case 48:
      return "霧";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "霧雨";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "🌧️ 雨";
    case 71:
    case 73:
    case 75:
    case 77:
      return "❄️ 雪";
    case 80:
    case 81:
    case 82:
      return "にわか雨";
    case 85:
    case 86:
      return "にわか雪";
    case 95:
    case 96:
    case 99:
      return "⛈️ 雷雨";
    default:
      return "不明";
  }
}

// 画面に表示する関数
function displayWeather(data) {
  const weatherCode = data.current.weather_code;
  const weatherText = getWeatherText(weatherCode);
  const maxTemp = data.daily.temperature_2m_max[0];
  const minTemp = data.daily.temperature_2m_min[0];
  const today = new Date(data.daily.time[0]);
  const formattedDate =
    `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  currentWeather.textContent = weatherText;
  temperature.textContent =
    `気温：${data.current.temperature_2m} ℃`;
  maxTemperature.textContent =
    `最高：${maxTemp} ℃`;
  minTemperature.textContent =
    `最低：${minTemp} ℃`;
  windSpeed.textContent =
    `風速：${data.current.wind_speed_10m} km/h`;
  date.textContent = formattedDate;
}

// ▫イベント
searchButton.addEventListener("click", searchCity);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchCity();
  }
});

// ▫初期表示