// ▫データ

// ▫DOM
const status = document.querySelector("#status");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#wind-speed");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");

// ▫状態
// ▫状態
const cityMap = {
  "東京": "Tokyo",
  "大阪": "Osaka",
  "千葉": "Chiba",
  "横浜": "Yokohama"
};

// ▫関数

// 天気を取得する関数
async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Asia%2FTokyo`
  );

  const data = await response.json();

  temperature.textContent =
    `気温：${data.current.temperature_2m} ℃`;

  windSpeed.textContent =
    `風速：${data.current.wind_speed_10m} km/h`;

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
  temperature.textContent = "";
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

// ▫イベント
searchButton.addEventListener("click", searchCity);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchCity();
  }
});

// ▫初期表示