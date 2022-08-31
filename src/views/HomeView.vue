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
import type { Lessons } from "@/components/LessonMenuCard.vue";

const kanji: Lessons = {
  lessonData: [
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
  ],
};

const katakana: Lessons = {
  lessonData: [
    {
      id: 0,
      title: "アイウエオ",
      data: [
        {
          japanese: "ア",
          english: "a",
          furigana: "",
        },
        {
          japanese: "イ",
          english: "i",
          furigana: "",
        },
        {
          japanese: "ウ",
          english: "u",
          furigana: "",
        },
        {
          japanese: "エ",
          english: "e",
          furigana: "",
        },
        {
          japanese: "オ",
          english: "o",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "キ",
          english: "ki",
          furigana: "",
        },
        {
          japanese: "ク",
          english: "ku",
          furigana: "",
        },
        {
          japanese: "ケ",
          english: "ke",
          furigana: "",
        },
        {
          japanese: "コ",
          english: "ko",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "シ",
          english: "shi",
          furigana: "",
        },
        {
          japanese: "ス",
          english: "su",
          furigana: "",
        },
        {
          japanese: "セ",
          english: "se",
          furigana: "",
        },
        {
          japanese: "ソ",
          english: "so",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "チ",
          english: "chi",
          furigana: "",
        },
        {
          japanese: "ツ",
          english: "tsu",
          furigana: "",
        },
        {
          japanese: "テ",
          english: "te",
          furigana: "",
        },
        {
          japanese: "ト",
          english: "to",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ニ",
          english: "chi",
          furigana: "",
        },
        {
          japanese: "ヌ",
          english: "tsu",
          furigana: "",
        },
        {
          japanese: "ネ",
          english: "te",
          furigana: "",
        },
        {
          japanese: "ノ",
          english: "to",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ヒ",
          english: "hi",
          furigana: "",
        },
        {
          japanese: "フ",
          english: "fu",
          furigana: "",
        },
        {
          japanese: "ヘ",
          english: "he",
          furigana: "",
        },
        {
          japanese: "ホ",
          english: "ho",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ミ",
          english: "mi",
          furigana: "",
        },
        {
          japanese: "ム",
          english: "mu",
          furigana: "",
        },
        {
          japanese: "メ",
          english: "me",
          furigana: "",
        },
        {
          japanese: "モ",
          english: "mo",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ユ",
          english: "yu",
          furigana: "",
        },
        {
          japanese: "ヨ",
          english: "yo",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "リ",
          english: "ri",
          furigana: "",
        },
        {
          japanese: "ル",
          english: "ru",
          furigana: "",
        },
        {
          japanese: "レ",
          english: "re",
          furigana: "",
        },
        {
          japanese: "ロ",
          english: "ro",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "オ",
          english: "wo",
          furigana: "",
        },
        {
          japanese: "ン",
          english: "n",
          furigana: "",
        },
      ],
    },
  ],
};

const hiragana: Lessons = {
  lessonData: [
    {
      id: 0,
      title: "あいうえお",
      data: [
        {
          japanese: "あ",
          english: "a",
          furigana: "",
        },
        {
          japanese: "い",
          english: "i",
          furigana: "",
        },
        {
          japanese: "う",
          english: "u",
          furigana: "",
        },
        {
          japanese: "え",
          english: "e",
          furigana: "",
        },
        {
          japanese: "お",
          english: "o",
          furigana: "",
        },
      ],
    },
    {
      id: 1,
      title: "かきくけこ",
      data: [
        {
          japanese: "か",
          english: "ka",
          furigana: "",
        },
        {
          japanese: "き",
          english: "ki",
          furigana: "",
        },
        {
          japanese: "く",
          english: "ku",
          furigana: "",
        },
        {
          japanese: "け",
          english: "ke",
          furigana: "",
        },
        {
          japanese: "こ",
          english: "ko",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "し",
          english: "shi",
          furigana: "",
        },
        {
          japanese: "す",
          english: "su",
          furigana: "",
        },
        {
          japanese: "せ",
          english: "se",
          furigana: "",
        },
        {
          japanese: "そ",
          english: "so",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ち",
          english: "ti",
          furigana: "",
        },
        {
          japanese: "つ",
          english: "tsu",
          furigana: "",
        },
        {
          japanese: "て",
          english: "te",
          furigana: "",
        },
        {
          japanese: "と",
          english: "to",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "に",
          english: "ni",
          furigana: "",
        },
        {
          japanese: "ぬ",
          english: "nu",
          furigana: "",
        },
        {
          japanese: "ね",
          english: "ne",
          furigana: "",
        },
        {
          japanese: "の",
          english: "no",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ひ",
          english: "hi",
          furigana: "",
        },
        {
          japanese: "ふ",
          english: "fu",
          furigana: "",
        },
        {
          japanese: "へ",
          english: "he",
          furigana: "",
        },
        {
          japanese: "ほ",
          english: "ho",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "み",
          english: "mi",
          furigana: "",
        },
        {
          japanese: "む",
          english: "mu",
          furigana: "",
        },
        {
          japanese: "め",
          english: "me",
          furigana: "",
        },
        {
          japanese: "も",
          english: "mo",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "ゆ",
          english: "yu",
          furigana: "",
        },
        {
          japanese: "よ",
          english: "yo",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "り",
          english: "ri",
          furigana: "",
        },
        {
          japanese: "う",
          english: "ru",
          furigana: "",
        },
        {
          japanese: "れ",
          english: "re",
          furigana: "",
        },
        {
          japanese: "ろ",
          english: "ro",
          furigana: "",
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
          furigana: "",
        },
        {
          japanese: "を",
          english: "wo",
          furigana: "",
        },
        {
          japanese: "ん",
          english: "n",
          furigana: "",
        },
      ],
    },
  ],
};
</script>
