<script setup>
import Carousel from '@/Components/Carousel.vue';

const props = defineProps({
    imgUrl: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    }
})

</script>

<template>
    <section class="py-12 bg-gray-50 dark:bg-slate-900 sm:pb-16 lg:pb-20 xl:pb-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="relative">
                <div class="lg:w-2/3">
                    <p class="text-sm font-normal tracking-widest text-gray-600 dark:text-gray-300 uppercase">Un Portal informativo para personal y estudiantes del TecNM</p>
                    <!-- <h1 class="mt-6 text-4xl font-normal text-black sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl dark:text-white"><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">Unlimited Design</span> Inspiration</h1> -->
                    <h1 class="mt-6 text-4xl font-normal sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl text-black dark:text-white">{{ title }}</h1>
                    <!-- <p class="max-w-lg mt-4 text-xl font-normal text-gray-400 sm:mt-8 dark:text-gray-400">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.</p> -->
                    <p class="max-w-lg mt-4 text-xl font-normal text-gray-600 sm:mt-8 dark:text-gray-300"> {{ description }} </p>
                    <div class="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                        <div class="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                        <a href="/login" title="" class="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Acceder al sistema </a>
                    </div>

                    <div>
                        <div class="inline-flex items-center pt-6 mt-8 border-t border-gray-800 dark:border-white sm:pt-10 sm:mt-14">
                            <span class="ml-2 text-base font-normal text-black dark:text-white"> Difusión cultural, deportiva y académica </span>
                        </div>
                    </div>
                </div>

                <div class="hidden mt-8 md:block md:absolute md:mt-0 md:top-32 md:right-0 lg:top-0 lg:left-2/4">
                    <Carousel>
                        
                    </Carousel>
                </div>
                <!-- <div class="hidden mt-8 md:block md:absolute md:mt-0 md:top-32 lg:top-0 md:right-0"> -->
                    <!-- <img class="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png" alt="" /> -->
                    <!-- bueno<img class="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl" :src="imgUrl" alt="mockup" /> -->
                <!-- </div> -->
            </div>
        </div>
    </section>
</template>