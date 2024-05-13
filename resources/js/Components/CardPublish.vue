<script setup>
// import computed from 'vue';
import { mdiArrowRightCircle, mdiClose } from "@mdi/js";
import CardBox from "@/Components/CardBox.vue";
import CardBoxComponentEmpty from "@/Components/CardBoxComponentEmpty.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import JetModal from "@/Components/Modal.vue";
import Label from "@/Components/Label.vue";
import ModalArticle from "@/Components/ModalArticle.vue";
import { computed, defineProps, ref, provide } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const props = defineProps({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    model: {
        type: String,
    },
    publications: {
        type: Object,
        default: () => ({}),
        // required: true,
    },
    storage: {
        type: String,
        required: true,
    },
    idVue: {
        type: String,
        default: "/#",
    },
});

const readMore = ref(false);

const publication = ref({});

const updateReadMore = (value) => {
    readMore.value = value;
};

const actualPublish = ({ id, title, description, image, url, created_at }) => {
    if (image != null) {
        image = props.storage + image.storage
    } else {
        image = '';
    }
    updateReadMore(true);
    return {
        id,
        title,
        description,
        image,
        url,
        date: created_at,
    };
};

const modules = [Autoplay, Pagination];

provide("readMore", { readMore, updateReadMore });

// const info = (desc) => desc.slice(0, 100) + "...";
</script>

<style>
.swiper-pagination-bullet {
    background-color: rgb(148 163 184);
}

.swiper-pagination-bullet-active {
    background-color: rgb(8 145 178);
}
</style>

<style scoped>
.swiper {
    max-width: 1400px;
}

.swiper-slide {
    padding: 1rem;
    padding-bottom: 2rem;
    margin-bottom: 1rem;
}
</style>

<template>
    <div :id="idVue" class="bg-blue-600 py-1 text-center rounded-xl">
        <p class="text-xl lg:text-base font-bold text-white dark:text-white">
            {{ title }} {{ description }}
        </p>
    </div>

    <CardBoxComponentEmpty v-if="publications.data.length < 1" />
    <!-- :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
        }" -->
    <Swiper v-else :pagination="{
        dynamicBullets: true,
    }" :watchSlidesProgress="true" :modules="modules" :breakpoints="{
        '640': {
            slidesPerView: 2,
        },
        '1040': {
            slidesPerView: 3,
        },
    }">
        <SwiperSlide v-for="item in publications.data" :key="item.id">
            <div
                class="p-4 shadow-xl transition-all duration-200 hover:translate-y-2.5 hover:shadow-none min-w-fit lg:max-w-screen-xl border rounded-lg dark:bg-gray-800 dark:border-slate-700">
                <img v-if="item.image" :src="storage + item.image.storage" class="w-full h-52 object-cover" />

                <p class="mt-4 mb-1 text-justify text-base font-semibold h-12 truncate whitespace-normal">
                    {{ item.title }}
                </p>

                <p class="text-justify font-normal h-12 truncate whitespace-normal text-gray-700 dark:text-gray-400"
                    v-html="item.description"></p>

                <div class="h-14">
                    <p class="text-sm text-gray-500 dark:text-gray-400 my-2">
                        Fecha de publicación:
                        {{ new Date(item.created_at).toLocaleString() }}
                    </p>

                    <p v-if="item.url != null" class="text-sm text-left text-gray-500 dark:text-gray-400 my-2">
                        URL adicional:
                        <a :href="item.url" target="_blank" class="text-sm text-sky-400 underline decoration-sky-450">
                            Click aquí
                        </a>
                    </p>
                </div>

                <BaseButtons type="justify-start" no-wrap>
                    <BaseButton :icon="mdiArrowRightCircle" color="info" label="Leer más"
                        @click="publication = actualPublish(item)" />
                </BaseButtons>
            </div>
        </SwiperSlide>
    </Swiper>

    <ModalArticle :model="model" :publication="publication"> </ModalArticle>
</template>
