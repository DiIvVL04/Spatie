<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { ref, onMounted, watch } from "vue";
import { router } from "@inertiajs/vue3";
import menuNavBarGuest from "@/menuNavBarGuest";
import { useStyleStore } from "@/stores/style.js";
import NavBar from "@/Components/NavBarGuestPrueba.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import axios from "axios";
import Footer from "@/Components/Footer.vue";

const sections = ref({});

function recoverSections() {
    axios.get(route("welcome.apiSections"))
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                sections.value = data[0];
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

const styleStore = useStyleStore();
const isAsideMobileExpanded = ref(false);
const menuClick = (event, item) => {
    if (item.label === "Light/Dark") {
        styleStore.setDarkMode();
    }

    if (item.isLogin) {
        router.get(route("login"));
    }
};

const reload = (ref) => {
    if (ref) router.get("/");
};

onMounted(() => {
    recoverSections();
});

</script>

<template>
    <div :class="{
        dark: styleStore.darkMode,
    }">
        <div :class="{ 'ml-60 lg:ml-0': isAsideMobileExpanded }"
            class="pt-14 min-h-screen transition-position bg-gray-100 dark:bg-slate-800 dark:text-slate-100">
            <NavBar :menu="menuNavBarGuest" @menu-click="menuClick" :sections="sections">

                <NavBarItemPlain use-margin @click="reload">
                    <div v-if="styleStore.darkMode">
                        <img src="/img/TecnmBlanco.png" class="h-8 2xl:ml-8 2xl:mr-8" alt="TecNM Logo" />
                    </div>
                    <div v-else>
                        <img src="/img/TecnmLogo.png" class="h-8 2xl:ml-8 2xl:mr-8" alt="TecNM Logo" />
                    </div>
                    <span
                        class="ml-2 mr-4 self-center text-xl font-bold text-blue-800 whitespace-nowrap dark:text-white">TecNM/SExtVinc</span>
                </NavBarItemPlain>
            </NavBar>
            <slot />
        </div>
        <Footer></Footer>
    </div>
</template>
