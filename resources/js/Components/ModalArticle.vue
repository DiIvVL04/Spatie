<script setup>
import moment from "moment";
import JetModal from "@/Components/Modal.vue";
import Label from "@/Components/Label.vue";
import {
    mdiArrowRightCircle,
    mdiClose,
    mdiFilePdfBox,
    mdiPlayBox,
    mdiFileDocument,
    mdiClockOutline,
    mdiYoutube,
    mdiOpenInNew,
    mdiCalendarRange,
} from "@mdi/js";
import CardBox from "@/Components/CardBox.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import IFrame from "@/Components/IFrame.vue";
import { inject, provide, ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const props = defineProps({
    publication: {
        type: Object,
        required: true,
        default: () => ({}),
    },
    model: {
        type: String,
        // required: true,
    },
});

const isLoading = ref(false);

// Cierran y muestran url
const url = ref(false);

const src = ref("");

const showURL = (value, source) => {
    url.value = value;
    src.value = source;
    return source;
    // return "https://www.youtube.com/embed/CtwQuK5pB3Q?si=OGGyrN1KujRkHMNr";
};

provide("url", { url, showURL });
// Apertura de modal
const { readMore, updateReadMore } = inject("readMore");
// Recorta texto
const readingTime = (text) => {
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
};
// Muestra el archivo
const showPDF = ref(false);
const filePath = ref("");
const fileName = ref("");
const fileExtension = ref('');

const closePDF = (value) => {
    showPDF.value = value;
    updateReadMore(true);
};

const getPDF = (id) => {
    const model = props.model;
    axios
        .get(route("file.show", { id, model }))
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                fileExtension.value = data[2];
                filePath.value = data[1];
                fileName.value = data[0];
                showPDF.value = true;
                updateReadMore(false); // Cierra modal
            }
        })
        .catch((error) => {
            //console.error(error);
            Swal.fire({
                title: "Error",
                text: "Se produjo un error al consultar el archivo!",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        });
};

const showButton = ref(false)
const hasPDF = async (id) => {
    axios
        .get(route("file.show", { id, model: props.model }))
        .then((response) => {
            if (response.status === 200) {
                showButton.value = true
            }
        })
        .catch((error) => {
            showButton.value = false

        });
};

</script>

<template>
    <jet-modal :show="readMore" @close="updateReadMore(false)" :closeable="true" :maxWidth="'2xl'">
        <div class="bg-gray-50 p-8 dark:bg-gray-700">
            <div class="sticky pt-2 top-0 bg-gray-50">
                <BaseButtons classAddon="ms-auto mb-2">
                    <BaseButton :icon="mdiClose" color="info" :roundedFull="true" @click="updateReadMore(false)" />
                </BaseButtons>
            </div>

            <img v-if="publication.image != ''"
                :src="publication.image != null ? publication.image : '/public/img/ImageLogo.jpg'"
                class="rounded mt-8 pt-4 w-full h-80 object-cover" alt="Imagen de publicación" />

            <div class="my-4 pr-12">
                <h2 class="text-left text-lg font-bold">
                    {{ publication.title }}
                </h2>
            </div>

            <div v-if="publication.url != null" class="mt-5 mb-2 justify-start flex text-gray-700 md:w-1/2">
                <BaseIcon :path="mdiOpenInNew" size="15" />
                <Label class="text-left text-gray-600"> URL </Label>
                <a target="_blank" :href="publication.url"
                    class="ml-auto text-sky-400 underline decoration-sky-450 font-bold transition hover:cursor-pointer hover:text-lg">
                    Click aquí
                </a>
            </div>
            <div class="mb-2 justify-start flex text-gray-700 md:w-1/2">
                <BaseIcon :path="mdiCalendarRange" size="15" />
                <Label class="text-left text-gray-600">
                    Fecha de publicación
                </Label>
                <p class="ml-auto text-black font-bold">
                    <!-- {{ new Date(publication.date).toLocaleString() }} -->
                    {{ moment(publication.date, "YYYY-MM-DD").format("DD-MM-YYYY") }}
                </p>
            </div>

            <div class="mb-4 justify-start flex text-gray-700 md:w-1/2">
                <BaseIcon :path="mdiClockOutline" size="15" />
                <Label class="text-left text-gray-600">
                    Tiempo de lectura
                </Label>
                <p class="ml-auto text-black font-bold">
                    {{ readingTime(publication.description) }} min
                </p>
            </div>

            <BaseButtons classAddon="mb-8">
                <!-- :icon="mdiPlayBox" -->
                <BaseButton v-if="publication.url != null" class="md:w-1/5 md:mt-0 md:h-8 max-xl:mt-4 mr-1 mb-2 text-md" :href="publication.url" target="_blank" :icon="mdiYoutube" color="danger" label="Ver video" />

                <BaseButton v-if="hasPDF(publication.id) && showButton"
                    class="md:w-1/4 md:mt-0 md:h-8 max-xl:mt-4 mr-1 mb-2 text-md" @click="getPDF(publication.id)"
                    :icon="mdiFileDocument" color="info" label="Ver documento" />
            </BaseButtons>
            <hr class="border-t-2 border-solid border-sky-600" />

            <div class="py-4">
                <span v-html="publication.description" class="mt-4 text-base text-justify"></span>
            </div>
        </div>
    </jet-modal>
    <!-- Video -->
    <IFrame width="720" height="480" :src="src" />
    <!-- PDF -->
    <div v-if="showPDF"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-slate-800 bg-opacity-50"
        tabindex="0" @keydown.esc="closePDF(false)">
        <div class="relative">
            <CardBox class="mt-5" :is-modal="true">
                <div class="justify-between flex p-2">
                    <span class="font-bold text-sm">
                        Archivo: {{ fileName }}
                    </span>
                    <BaseButton color="danger" :icon="mdiClose" small @click="closePDF(false)" />
                </div>
                <iframe :src="filePath" width="900" height="580" />
            </CardBox>
        </div>
    </div>

    <div class="vl-parent">
        <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
    </div>
</template>
