<script setup>
import { inject, ref } from "vue";
const { readMore, updateReadMore } = inject("readMore");
const { url, showURL } = inject("url");

const props = defineProps({
    width: {
        type: String,
        default: "560",
    },
    height: {
        type: String,
        default: "315",
    },
    src: {
        type: String,
        default: "https://www.youtube.com/embed/4CjFwqOwvCU",
    },
});

const formattedURL = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<template>
    <div
        v-if="url"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
        @click="
            showURL(false);
            updateReadMore(true);
        "
       
    >
        <div class="relative">
            <!-- src="https://www.youtube.com/embed/CtwQuK5pB3Q?si=OGGyrN1KujRkHMNr" -->
            <iframe
                :width="width"
                :height="height"
                :src="formattedURL(src)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                ></iframe>
                <!-- @keydown.tab.stop -->
        </div>
    </div>
</template>
