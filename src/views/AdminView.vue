<template>
  <div class="admin-page-container">
    <div class="admin-header-bar">
      <LogoImage></LogoImage>
    </div>
    <div class="main-admin-container">
      <div class="content-manager-container">
        <div class="content-manager-header">
          <div class="language-selector">
            <v-select
              class="selector"
              label="Language"
              outlined
              :items="selectableLanguages"
              v-model="currentValue"
              no-data-text="No Languages"
            ></v-select>
          </div>
        </div>
        <div class="content-manager-editor">
          <div class="section-container">
            <SectionBlock
              v-for="(section, index) in languages[currentLanguage]['sections']"
              :difficulty="section['difficulty']"
              :name="section['title']"
              :id="section['sectionId']"
              :key="section['sectionId']"
              :active-selection="currentSection"
              :index="index"
              @click="handleSectionChange(index)"
              @updated="sync"
            ></SectionBlock>
            <AddBlock
              :current-language="languages[currentLanguage]['id']"
              :current-section="
                languages[currentLanguage]['sections'][currentSection][
                  'sectionId'
                ]
              "
              @added="sync"
              type="section"
            ></AddBlock>
          </div>
          <v-divider vertical class="admin-divider"></v-divider>
          <div class="lesson-container">
            <LessonBlock
              v-for="(lesson, index) in languages[currentLanguage]['sections'][
                currentSection
              ]['lessons']"
              :id="lesson['id']"
              :name="lesson['name']"
              :key="lesson['id']"
              :index="index"
              :active-lesson="currentLesson"
              @click="handleLessonChange(index)"
              @updated="sync"
            ></LessonBlock>
            <AddBlock
              :current-language="languages[currentLanguage]['id']"
              :current-section="
                languages[currentLanguage]['sections'][currentSection][
                  'sectionId'
                ]
              "
              @added="sync"
              type="lesson"
            ></AddBlock>
          </div>
          <v-divider vertical class="admin-divider"></v-divider>
          <div class="vocab-container">
            <div
              class="vocab-skin"
              v-if="
                languages[currentLanguage]['sections'][currentSection][
                  'lessons'
                ][currentLesson]
              "
            >
              <VocabBlock
                v-for="vocab in languages[currentLanguage]['sections'][
                  currentSection
                ]['lessons'][currentLesson]['vocabulary']"
                :id="vocab['id']"
                :foreign-alternative="vocab['foreignAlternative']"
                :foreign-word="vocab['foreignWord']"
                :native-word="vocab['nativeWord']"
                :pronunciation="vocab['pronunciation']"
                :key="vocab['id']"
                @updated="sync"
              ></VocabBlock>
              <AddBlock
                :current-language="languages[currentLanguage]['id']"
                :current-section="
                  languages[currentLanguage]['sections'][currentSection][
                    'sectionId'
                  ]
                "
                :current-lesson="
                  languages[currentLanguage]['sections'][currentSection][
                    'lessons'
                  ][currentLesson]['id']
                "
                type="vocab"
                @added="sync"
              ></AddBlock>
              <ImportBlock
                :section-id="
                  languages[currentLanguage]['sections'][currentSection][
                    'sectionId'
                  ]
                "
                :lesson-id="
                  languages[currentLanguage]['sections'][currentSection][
                    'lessons'
                  ][currentLesson]['id']
                "
              ></ImportBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockData } from "@/helpers/mockData";
import LogoImage from "@/components/LogoImage.vue";
import SectionBlock from "@/components/Admin/SectionBlock.vue";
import LessonBlock from "@/components/Admin/LessonBlock.vue";
import VocabBlock from "@/components/Admin/VocabBlock.vue";
import { route } from "@/helpers/api-routes";
import AddBlock from "@/components/Admin/AddBlock.vue";
import ImportBlock from "@/components/Admin/ImportBlock.vue";

export default {
  name: "AdminView",
  components: {
    ImportBlock,
    AddBlock,
    VocabBlock,
    LessonBlock,
    SectionBlock,
    LogoImage,
  },

  data() {
    return {
      languages: mockData,
      currentSection: 0,
      currentLesson: 0,
      currentValue: "",
    };
  },

  computed: {
    selectableLanguages() {
      return this.languages.map((language) => {
        return language.name;
      });
    },

    currentLanguage() {
      if (this.currentValue === "") {
        return 0;
      } else {
        return this.languages.findIndex(
          (language) => language.name === this.currentValue
        );
      }
    },
  },

  methods: {
    handleLanguageChange(newLanguage) {
      this.currentLanguage = new newLanguage();
      this.currentSection = 0;
      this.currentLesson = 0;
    },

    handleSectionChange(newSection) {
      this.currentSection = newSection;
      this.currentLesson = 0;
    },

    handleLessonChange(newLesson) {
      this.currentLesson = newLesson;
    },

    async sync() {
      this.languages = await route("get", "language");
    },
  },

  async mounted() {
    await this.sync();
    console.log(this.languages);
    this.currentValue = this.selectableLanguages[0];
  },
};
</script>

<style scoped>
.selector {
  width: 10vw;
  margin-left: 30px;
  margin-top: 30px;
}

.admin-header-bar {
  height: 10vh;
  width: 100%;
  background-color: #9dcfcf;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.main-admin-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-manager-editor {
  width: 80vw;
  height: 70vh;
  border: solid 2px #9dcfcf;
  display: flex;
  flex-direction: row;
}

.content-manager-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5vh;
  background-color: #9dcfcf;
  padding-bottom: 10px;
}

.content-manager-header {
  width: 100%;
  height: 100%;
  border: solid 2px #9dcfcf;
}

.section-container {
  width: 20%;
  overflow: auto;
  border-top: 5px solid white;
}

.lesson-container {
  width: 20%;
  overflow: auto;
  border-top: 5px solid white;
}

.vocab-container {
  width: 60%;
  overflow: auto;
  border-top: 5px solid white;
}

.admin-page-container {
  width: 100%;
  height: 100%;
}

.admin-divider {
  border: 2px solid #9dcfcf;
  opacity: 1;
}

.content-manager-container {
  margin-top: 50px;
}
</style>
