<template>
  <header>
    <div class="logo-container">
      <h1 class="logo-header">HelloWorld ︱こんにちは世界</h1>
    </div>
  </header>
  <main class="main-page">
    <div class="lesson-container">
      <LessonMenuCard
        lessonTitle="ひらがな"
        :lessons="hiragana"
        :id="1"
      ></LessonMenuCard>
      <LessonMenuCard
        lessonTitle="漢字"
        :lessons="kanji"
        :id="3"
      ></LessonMenuCard>
    </div>
    <div class="lesson-container">
      <LessonMenuCard
        lessonTitle="カタカナ"
        :lessons="katakana"
        :id="2"
      ></LessonMenuCard>
    </div>
  </main>
</template>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px #729e9e;
  min-height: 10vh;
  width: 100%;
  background-color: #98d6d6;
  z-index: 100;
}

.logo-header {
  color: white;
}

.logo-container {
  margin-left: 5vw;
}

.main-page {
  position: absolute;
  padding-top: 10vh;
  display: flex;
  flex-direction: row;
}

.lesson-container {
  position: relative;
}
</style>

<script setup lang="ts">
import LessonMenuCard from "../components/LessonMenuCard.vue";

const kanji = [
  {
    id: 0,
    title: "色",
    data: [
      {
        japanese: "赤",
        english: "Red",
        furigana: "あか",
      },
      {
        japanese: "橙色",
        english: "Orange",
        furigana: "だいだいいろ",
      },
      {
        japanese: "黄色",
        english: "Yellow",
        furigana: "きいろ",
      },
      {
        japanese: "緑",
        english: "Green",
        furigana: "みどり",
      },
      {
        japanese: "青",
        english: "Blue",
        furigana: "あお",
      },
      {
        japanese: "紫",
        english: "Purple",
        furigana: "むらさき",
      },
      {
        japanese: "桃色",
        english: "Pink",
        furigana: "ももいろ",
      },
      {
        japanese: "茶色",
        english: "Brown",
        furigana: "ちゃいろ",
      },
      {
        japanese: "灰色",
        english: "Grey",
        furigana: "はいいろ",
      },
      {
        japanese: "黒",
        english: "Black",
        furigana: "くろ",
      },
      {
        japanese: "白",
        english: "White",
        furigana: "しろ",
      },
      {
        japanese: "色",
        english: "Colour",
        furigana: "いろ",
      },
    ],
  },
  {
    id: 1,
    title: "時間 ",
    data: [
      {
        japanese: "時間",
        english: "Time",
        furigana: "じかん",
      },
      {
        japanese: "年",
        english: "Year",
        furigana: "とし / ねん",
      },
      {
        japanese: "月",
        english: "Month",
        furigana: "げつ / つき",
      },
      {
        japanese: "日",
        english: "Day",
        furigana: "にち / ひ",
      },
      {
        japanese: "今日",
        english: "Today",
        furigana: "きょう",
      },
      {
        japanese: "明日",
        english: "Tomorrow",
        furigana: "あした",
      },
      {
        japanese: "昨日",
        english: "Yesterday",
        furigana: "きのう",
      },
      {
        japanese: "分",
        english: "Minute",
        furigana: "ふん / ぶん",
      },
      {
        japanese: "時",
        english: "Hour",
        furigana: "じ / とき",
      },
    ],
  },
  {
    id: 2,
    title: "時間 ",
    data: [
      {
        japanese: "時間",
        english: "Time",
        furigana: "じかん",
      },
      {
        japanese: "年",
        english: "Year",
        furigana: "とし / ねん",
      },
      {
        japanese: "月",
        english: "Month",
        furigana: "げつ / つき",
      },
      {
        japanese: "日",
        english: "Day",
        furigana: "にち / ひ",
      },
      {
        japanese: "今日",
        english: "Today",
        furigana: "きょう",
      },
      {
        japanese: "明日",
        english: "Tomorrow",
        furigana: "あした",
      },
      {
        japanese: "昨日",
        english: "Yesterday",
        furigana: "きのう",
      },
      {
        japanese: "分",
        english: "Minute",
        furigana: "ふん / ぶん",
      },
      {
        japanese: "時",
        english: "Hour",
        furigana: "じ / とき",
      },
    ],
  },
];

const katakana = [
  {
    id: 0,
    title: "アイウエオ",
    data: [
      {
        japanese: "ア",
        english: "a",
      },
      {
        japanese: "イ",
        english: "i",
      },
      {
        japanese: "ウ",
        english: "u",
      },
      {
        japanese: "エ",
        english: "e",
      },
      {
        japanese: "オ",
        english: "o",
      },
    ],
  },
  {
    id: 1,
    title: "カキクケコ",
    data: [
      {
        japanese: "カ",
        english: "ka",
      },
      {
        japanese: "キ",
        english: "ki",
      },
      {
        japanese: "ク",
        english: "ku",
      },
      {
        japanese: "ケ",
        english: "ke",
      },
      {
        japanese: "コ",
        english: "ko",
      },
    ],
  },
  {
    id: 2,
    title: "サシスセソ",
    data: [
      {
        japanese: "サ",
        english: "sa",
      },
      {
        japanese: "シ",
        english: "shi",
      },
      {
        japanese: "ス",
        english: "su",
      },
      {
        japanese: "セ",
        english: "se",
      },
      {
        japanese: "ソ",
        english: "so",
      },
    ],
  },
  {
    id: 3,
    title: "タチツテト",
    data: [
      {
        japanese: "タ",
        english: "ta",
      },
      {
        japanese: "チ",
        english: "chi",
      },
      {
        japanese: "ツ",
        english: "tsu",
      },
      {
        japanese: "テ",
        english: "te",
      },
      {
        japanese: "ト",
        english: "to",
      },
    ],
  },
  {
    id: 4,
    title: "ナニヌネノ",
    data: [
      {
        japanese: "ナ",
        english: "ta",
      },
      {
        japanese: "ニ",
        english: "chi",
      },
      {
        japanese: "ヌ",
        english: "tsu",
      },
      {
        japanese: "ネ",
        english: "te",
      },
      {
        japanese: "ノ",
        english: "to",
      },
    ],
  },
  {
    id: 4,
    title: "ハヒフヘホ",
    data: [
      {
        japanese: "ハ",
        english: "ha",
      },
      {
        japanese: "ヒ",
        english: "hi",
      },
      {
        japanese: "フ",
        english: "fu",
      },
      {
        japanese: "ヘ",
        english: "he",
      },
      {
        japanese: "ホ",
        english: "ho",
      },
    ],
  },
  {
    id: 5,
    title: "マミムメモ",
    data: [
      {
        japanese: "マ",
        english: "ma",
      },
      {
        japanese: "ミ",
        english: "mi",
      },
      {
        japanese: "ム",
        english: "mu",
      },
      {
        japanese: "メ",
        english: "me",
      },
      {
        japanese: "モ",
        english: "mo",
      },
    ],
  },
  {
    id: 6,
    title: "ヤユヨ",
    data: [
      {
        japanese: "ヤ",
        english: "ya",
      },
      {
        japanese: "ユ",
        english: "yu",
      },
      {
        japanese: "ヨ",
        english: "yo",
      },
    ],
  },
  {
    id: 7,
    title: "ラリルレロ",
    data: [
      {
        japanese: "ラ",
        english: "ra",
      },
      {
        japanese: "リ",
        english: "ri",
      },
      {
        japanese: "ル",
        english: "ru",
      },
      {
        japanese: "レ",
        english: "re",
      },
      {
        japanese: "ロ",
        english: "ro",
      },
    ],
  },
  {
    id: 8,
    title: "ワオン",
    data: [
      {
        japanese: "ワ",
        english: "wa",
      },
      {
        japanese: "オ",
        english: "wo",
      },
      {
        japanese: "ン",
        english: "n",
      },
    ],
  },
];

const hiragana = [
  {
    id: 0,
    title: "あいうえお",
    data: [
      {
        japanese: "あ",
        english: "a",
      },
      {
        japanese: "い",
        english: "i",
      },
      {
        japanese: "う",
        english: "u",
      },
      {
        japanese: "え",
        english: "e",
      },
      {
        japanese: "お",
        english: "o",
      },
    ],
  },
  {
    id: 1,
    title: "かきくけこ",
    progress: "",
    data: [
      {
        japanese: "か",
        english: "ka",
      },
      {
        japanese: "き",
        english: "ki",
      },
      {
        japanese: "く",
        english: "ku",
      },
      {
        japanese: "け",
        english: "ke",
      },
      {
        japanese: "こ",
        english: "ko",
      },
    ],
  },
  {
    id: 2,
    title: "さしすせそ",
    data: [
      {
        japanese: "さ",
        english: "sa",
      },
      {
        japanese: "し",
        english: "shi",
      },
      {
        japanese: "す",
        english: "su",
      },
      {
        japanese: "せ",
        english: "se",
      },
      {
        japanese: "そ",
        english: "so",
      },
    ],
  },
  {
    id: 3,
    title: "たちつてと",
    data: [
      {
        japanese: "た",
        english: "ta",
      },
      {
        japanese: "ち",
        english: "ti",
      },
      {
        japanese: "つ",
        english: "tsu",
      },
      {
        japanese: "て",
        english: "te",
      },
      {
        japanese: "と",
        english: "to",
      },
    ],
  },
  {
    id: 4,
    title: "なにぬねの",
    data: [
      {
        japanese: "な",
        english: "na",
      },
      {
        japanese: "に",
        english: "ni",
      },
      {
        japanese: "ぬ",
        english: "nu",
      },
      {
        japanese: "ね",
        english: "ne",
      },
      {
        japanese: "の",
        english: "no",
      },
    ],
  },
  {
    id: 5,
    title: "はひふへほ",
    data: [
      {
        japanese: "は",
        english: "ha",
      },
      {
        japanese: "ひ",
        english: "hi",
      },
      {
        japanese: "ふ",
        english: "fu",
      },
      {
        japanese: "へ",
        english: "he",
      },
      {
        japanese: "ほ",
        english: "ho",
      },
    ],
  },
  {
    id: 6,
    title: "まみむめも",
    data: [
      {
        japanese: "ま",
        english: "ma",
      },
      {
        japanese: "み",
        english: "mi",
      },
      {
        japanese: "む",
        english: "mu",
      },
      {
        japanese: "め",
        english: "me",
      },
      {
        japanese: "も",
        english: "mo",
      },
    ],
  },
  {
    id: 7,
    title: "やゆよ",
    data: [
      {
        japanese: "や",
        english: "ya",
      },
      {
        japanese: "ゆ",
        english: "yu",
      },
      {
        japanese: "よ",
        english: "yo",
      },
    ],
  },
  {
    id: 8,
    title: "らりうれろ",
    data: [
      {
        japanese: "ら",
        english: "ra",
      },
      {
        japanese: "り",
        english: "ri",
      },
      {
        japanese: "う",
        english: "ru",
      },
      {
        japanese: "れ",
        english: "re",
      },
      {
        japanese: "ろ",
        english: "ro",
      },
    ],
  },
  {
    id: 9,
    title: "わをん",
    data: [
      {
        japanese: "わ",
        english: "wa",
      },
      {
        japanese: "を",
        english: "wo",
      },
      {
        japanese: "ん",
        english: "n",
      },
    ],
  },
];
</script>
