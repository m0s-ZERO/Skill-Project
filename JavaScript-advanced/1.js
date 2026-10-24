// # Day85
const works = [
  {
    title: "m0s Hair",
    category: "Web Site",
    price: 50000
  },
  {
    title: "m0s Table",
    category: "Web Site",
    price: 80000
  },
  {
    title: "Weather App",
    category: "Web App",
    price: 30000
  }
];

// 価格が50,000円以上の作品を抽出
const expensiveWorks = works.filter(work => {
  return work.price >= 50000;
});
console.log("価格が50,000円以上の作品を抽出");
console.log(expensiveWorks);

// タイトルがm0s Tableの作品を検索
const targetWork = works.find(work => {
  return work.title === "m0s Table";
});
console.log("タイトルがm0s Tableの作品を検索");
console.log(targetWork);

// タイトルにWeatherが含まれているか判定
const hasWeather = works.some(work => {
  return work.title.includes("Weather");
});
console.log("タイトルにWeatherが含まれているか判定");
console.log(hasWeather);

// worksのtitleから新しい配列を作成する
const workTitles = works.map(work => {
  return work.title;
});
console.log("作品のタイトル一覧");
console.log(workTitles);

// 課題：すべての作品の価格を10%値上げした、新しい配列を作る。
const increasedPriceWorks = works.map(work => {
  return {
    ...work,
    price: work.price * 1.1
  };
});
console.log("価格が10%値上げされた作品一覧");
console.log(increasedPriceWorks);

// 価格の安い順に並べる
const sortedLowPriceWorks = [...works].sort((a, b) => {
  return a.price - b.price;
});
console.log("価格の安い順に並べた作品一覧");
console.log(sortedLowPriceWorks);

// 課題：価格の高い順に並び替える
const sortedHighPriceWorks = [...works].sort((a, b) => {
  return b.price - a.price;
});
console.log("価格の高い順に並べた作品一覧");
console.log(sortedHighPriceWorks);