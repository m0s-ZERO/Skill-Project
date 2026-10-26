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


// # Day86
// Web Appだけを抽出して、価格の高い順に並べる
const filteredAndSortedWorks = works
  .filter(work => work.category === "Web Site")
  .sort((a, b) => b.price - a.price);
console.log("Web Siteの価格が高い順");
console.log(filteredAndSortedWorks);

// キーワードで作品を検索する
const keyword = "m0s";
const searchedWorks = works.filter(work => {
  return work.title.includes(keyword);
});
console.log("検索キーワード：" + keyword);
console.log("検索結果：");
console.log(searchedWorks);

// キーワードとカテゴリーで作品を絞り込む
const searchKeyword = "m0s";
const selectedCategory = "Web Site";

const filteredWorks = works.filter(work => {
  return (
    work.title.includes(searchKeyword) &&
    work.category === selectedCategory
  );
});
console.log("キーワード：" + searchKeyword);
console.log("カテゴリー：" + selectedCategory);
console.log("絞り込み結果：");
console.log(filteredWorks);

// 課題
// 次の3つの処理を順番に実行する。
// 1. 検索： タイトルにキーワードが含まれる作品を抽出する
// 2. 絞り込み： 指定したカテゴリーの作品だけを残す
// 3. 並び替え： 価格の高い順に並べる
// 実装条件
// - 検索キーワード："m0s"
// - カテゴリー："Web Site"
// - 価格：高い順
// - 結果を finalWorks という変数に格納する
// - 最後に console.log(finalWorks) で表示する
const finalWorks = works
  .filter(work => work.title.includes("m0s"))
  .filter(work => work.category === "Web Site")
  .sort((a, b) => b.price - a.price);

console.log("最終結果：");
console.log(finalWorks);

// # Day87
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("m0s"));
console.log(greet("Ray"));

// 課題：作品の価格を表示する関数
// 次の条件を満たす関数を作成してね。
// - 関数名は getWorkPrice
// - 引数で作品オブジェクト work を受け取る
// - work.price を return する
// - works[0] を渡して、結果を console.log() で表示する
function getWorkPrice(work) {
  return work.price;
}
console.log(getWorkPrice(works[0]));

// 課題は「指定したカテゴリーの作品だけを取得する関数」を作ること。
// - 関数名：getWorksByCategory
// - 引数：作品の配列 works と、取得したいカテゴリー category
// - 処理：指定カテゴリーと一致する作品だけを返す
// - 使用するメソッド：filter()
function getWorksByCategory(works, category) {
  // ここに処理を書く
  return works.filter(work => work.category === category);
}
console.log(getWorksByCategory(works, "Web Site"));

// 課題：指定カテゴリーの作品を、価格の高い順に取得する関数を作る。
// 条件は3つ。
// 1. 関数名は getSortedWorksByCategory
// 2. 引数は works と category
// 3. 指定カテゴリーの作品を抽出し、価格の降順に並べて返す
function getSortedWorksByCategory(works, category) {
  // ① filter() でカテゴリーを絞り込む
  const filteredWorks = works.filter(work => work.category === category);
  // ② sort() で価格の高い順に並べる
  return filteredWorks.sort((a, b) => b.price - a.price);
}
console.log(getSortedWorksByCategory(works, "Web Site"));

// 課題：キーワードとカテゴリーの両方で作品を検索し、価格の高い順に返す関数を作る。
// 条件は次の4つ。
// 1. 関数名：searchWorks
// 2. 引数：works、keyword、category
// 3. 作品タイトルにキーワードが含まれ、かつカテゴリーが一致する作品だけを抽出する
// 4. 価格の高い順に並べて返す
function searchWorks(works, keyword, category) {
  // ① filter() でキーワードとカテゴリーを絞り込む
  const filteredWorks = works.filter(work => {
    return work.title.includes(keyword) && work.category === category;
  });
  // ② sort() で価格の高い順に並べる
  return filteredWorks.sort((a, b) => b.price - a.price);
}
console.log(searchWorks(works, "m0s", "Web Site"));