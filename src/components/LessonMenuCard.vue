<template>
<div class="whole-lesson-container">
    <div :class="'primary ' + lessonCardAnim " 
        @mouseenter="enterHover"
        @mouseleave="exitHover"
        @click="handleClick">
        <div class="lesson-menu-card">
            <h1 class="lesson-title">
                {{lessonTitle}}
            </h1>
        </div>
        <div class="progress-bar"></div>
    </div>

    <div class="menuVisibility" v-if="showMenu">
        <router-link v-for="lesson in lessons" :key="lesson.id" :to="{
            name: 'about', 
            params: {
                data: JSON.stringify(lesson.data),

                }}"
            >
            <div :class="'card ' + zIndex + ' '+ subLessonAnim" >
                <h4 class="sub-lesson-title">
                    {{lesson.title}}
                </h4>
            </div>
        </router-link>
    </div>
</div>

</template>

<script lang="ts">
import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";
import { defineComponent } from 'vue';
import SubLessonCard from './SubLessonCard.vue';

gsap.registerPlugin(Flip);


export default defineComponent({
    props: {
        lessons: [],
        id: Number,
        lessonTitle: String,
    },

    data() {
        return {
            bounce: gsap,
            raise: gsap,
            settle: gsap,
            elevateMenu: gsap,
            lowerMenu: gsap,
            inImportantTransition: false,
            showMenu: false,
            menuPositionX: -230,
            menuPositionY: -105,
            menuTransitionSpeed: 0.4,
            testElement: Object,
            inPlace: false,
        };
    },

    computed: {
        lessonCardAnim(){
            return 'lesson-card-anim-' + this.id;
        },

        subLessonAnim(){
            return 'sub-lesson-anim-' + this.id;
        },

        menuVisibility(){
            return (this.showMenu) ? 'menu-visible' : 'menu-invisible';
        },

        zIndex(){
            return this.inPlace ? 'z-index-override' : '';
        },
    },

    methods: {
        testStuff() {
            let test = this.$refs.desto as HTMLElement;
            test.classList.toggle("hello-world");
            const state = Flip.getState(".test", { props: "position" });
            let destination = document.getElementById("destination");
            let elements = document.getElementsByClassName("sub-class-lesson");
            // Flip.from(state, {
            //     duration: 1,
            //     ease: "power1.inOut",
            //     absolute: true,
            // });
        },
        handleClick() {
            this.raise.pause();
            this.bounce.pause();
            if (!this.inImportantTransition) {
                if (this.showMenu) {
                    this.lowerMenu.play(0);
                }
                else {
                    this.elevateMenu.play(0);
                    
                }
            }
        },
        enterHover() {
            if (!this.showMenu && !this.inImportantTransition) {
                this.bounce.pause();
                this.raise = gsap.to("." + this.lessonCardAnim, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power1.out",
                });
            }
        },
        exitHover() {
            if (!this.showMenu && !this.inImportantTransition) {
                this.settle = gsap.to("." + this.lessonCardAnim, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power1.out",
                    onComplete: () => this.bounce.play(),
                });
            }
        },
        handleMenuClosedFinish() {
            this.inImportantTransition = false;
            this.bounce.play(0);
            this.showMenu = false;
        },

        handleMenuCloseStart() {
            this.inPlace = false;
            this.inImportantTransition = true;
            gsap.to("." + this.subLessonAnim, {
                x: 20,
                y: 20,
                duration: .6,
                stagger: .05,
            })
        },

        handleImportantTask() {
            this.inPlace = false;
            this.inImportantTransition = true;
        },
        handleMenuOpenedFinish() {
            this.inImportantTransition = false;
            this.showMenu = true;
            gsap.utils.toArray("." + this.subLessonAnim).forEach( (btn, index) => {
                        let i = index as Number
                            gsap.to(btn, { 
                                x: 120 * (i % 4),
                                y: 120 * (Math.floor(i / 4)),
                                z: 5,
                                duration: .8,
                                delay: 1 - (i * .1),
                                onComplete: () => {
                                    this.inPlace = true;
                                }
                                })
                    });
        },

        handleMenuOpenedStart(){

        },
    },
    mounted() {
        this.bounce = gsap.to("." + this.lessonCardAnim, {
            y: -10,
            repeat: -1,
            duration: 1,
            yoyo: true,
        });
        this.elevateMenu = gsap.to("." + this.lessonCardAnim, {
            x: this.menuPositionX,
            y: this.menuPositionY,
            z: 100,
            scale: 0.4,
            duration: this.menuTransitionSpeed,
            paused: true,
            ease: "power1.out",
            onStart: () => {
                this.inImportantTransition = true;
                this.showMenu = true;
                
            },
            onComplete: this.handleMenuOpenedFinish,
        });
        this.lowerMenu = gsap.to("." + this.lessonCardAnim, {
            x: 0,
            y: 0,
            scale: 1,
            duration: this.menuTransitionSpeed,
            paused: true,
            ease: "power1.out",
            onStart: this.handleMenuCloseStart,
            onComplete: this.handleMenuClosedFinish,
        });
    },
    components: { SubLessonCard }
});
</script>

<style>
.card {
    position: absolute;
    background-color: #98d6d6e6;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    z-index: -1;
}

.card:hover {
    cursor: pointer;
    box-shadow: 1px 1px #8ba0b8;
}

.sub-lesson-title {
    color: white;
    text-align: center;
    vertical-align: middle;
}

.whole-lesson-container {
    width: 44vw;
    height: 50vh;
    position: relative;
    right: 31vw;
    top: -40vh;
}

.lesson-menu-card{
    background-color: #98d6d6;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    z-index: 10000;
    /* animation-name: pulse;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out; */
}

.lesson-menu-card:hover{
    box-shadow: 2px 2px #8ba0b8;
}

.sub-lessons-container {
    position: absolute;
    width: 800px;
    pointer-events: none;


}

.test-div {
    width: 100px;
    height: 100px;
    background-color: black;
}

.menu-visible {
    visibility: visible;
    pointer-events: none;
    z-index: -5;
}

.menu-invisible {
    visibility: hidden;
}

.z-index-override {
    z-index: 10 !important;
}

.primary {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#destination {
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background-color: blue  ;
}

.progress-bar {
    width: 290px; 
    margin-top: 10px;
    height: 10px; 
    background-color: #D9D9D9;
    border-radius: 5px;
}

.sub-progress-bar {
    width: 90px; 
    margin-top: 10px;
    height: 10px; 
    background-color: #D9D9D9;
    border-radius: 5px;
}

.sub-class-lesson {
    position: relative;
    display: block;
    width: 50px;
    height: 50px;

    background-color: #98d6d6e6;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
}


.primary:hover {
    cursor: pointer;
    
}



.lesson-title {
    color: white;
    font-size: 64px;
    text-align: center;
    vertical-align: middle;
}

@keyframes pulse {
  0% {
    transform:translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes raise {
  0% {
    transform:translateY();
  }
  100% {
    transform: translateY(-10px);
  }
}

</style>