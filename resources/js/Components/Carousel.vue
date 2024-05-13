<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination} from "swiper/modules";

const modules = [ Autoplay, EffectCreative, Pagination];
</script>

<style>
.swiper-pagination-bullet{
    background-color: rgb(148 163 184);
}

.swiper-pagination-bullet-active{
    background-color: rgb(8 145 178);
}

</style>

<style scoped>
.swiper {
    /* padding: 40px 0 30px 0; */
    /* width: 600px;
    height: 550px; */
    margin-top: 64px;
    padding-bottom: 32px;
    width: 400px;
    height: 250px;
}

@media (min-width: 1024px) {
    .swiper {
        margin-left: 64px;
        width: 450px;
        height: 375px; 
    }
}

@media (min-width: 1280px) {
    .swiper {
        margin-left: 32px;
        margin-right: 32px;
        width: 650px;
        height: 550px; 
    }
}
</style>

<template>
    <Swiper
        :grabCursor="true"
        :effect="'creative'"
        :pagination="true"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
        }"
        :creativeEffect="{
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        }"
        :modules="modules"
    >
        <!-- <SwiperSlide>
            <img
                class="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl"
                src="img/bck2.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl"
                src="img/bck2.jpg"
            />
        </SwiperSlide> -->
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider1.jpeg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider2.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider3.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider4.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider5.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider6.jpg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <img
                class="w-full h-full max-w-xs mx-auto lg:max-w-lg xl:max-w-2xl"
                src="img/slider7.jpg"
            />
        </SwiperSlide>
    </Swiper>
</template>
