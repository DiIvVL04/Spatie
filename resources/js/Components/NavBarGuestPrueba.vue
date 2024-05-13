<script setup>
import { ref, provide } from "vue";
import { Link, usePage } from "@inertiajs/vue3";
import NavLink from "@/components/NavLink.vue";
import {
    mdiWhiteBalanceSunny,
    mdiWeatherNight,
    mdiLogin,
    mdiHomeExportOutline,
} from "@mdi/js";
import BaseIcon from "@/Components/BaseIcon.vue";
import NarvbarMenuItem from "@/Components/NavbarMenuItem.vue";
import { useStyleStore } from "@/stores/style.js";
const props = defineProps({
    sections: {
        type: Object,
        default: () => ({}),
        required: true,
    },
});
let showMenu = ref(false);
const toggleNav = () => (showMenu.value = !showMenu.value);
const styleStore = useStyleStore();

const updateLog = () => {
    return usePage().props.auth.user ? "Regresar" : "Iniciar sesion";
};
const toggleDarkMode = () => {
    styleStore.setDarkMode();
};

</script>

<style scoped>

li > ul {
    transform: translatex(100%) scale(0);
}

li:hover > ul {
    transform: translatex(101%) scale(1);
}

li > button svg {
    transform: rotate(-90deg);
}

li:hover > button svg {
    transform: rotate(-270deg);
}

.group:hover .group-hover\:scale-100 {
    transform: scale(1);
}

.group:hover .group-hover\:-rotate-180 {
    transform: rotate(180deg);
}

.scale-0 {
    transform: scale(0);
}

.min-w-32 {
    min-width: 8rem;
}

.w-14 {
    width: 3.5rem;
    max-width: 8rem;
}

.w-18 {
    width: 4.5rem;
}
</style>

<template>
    <div>
        <nav
            class="top-0 fixed w-screen z-30 pl-4 pr-12 py-4 bg-slate-100 border-b-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 2xl:flex 2xl:justify-between 2xl:items-center"
        >
            <div class="flex items-stretch justify-between">
                <slot />

                <div @click="toggleNav" class="flex 2xl:hidden">
                    <button
                        type="button"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    >
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path
                                fill-rule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <ul
                :class="showMenu ? 'flex' : 'hidden'"
                class="w-screen flex-col mt-8 space-y-4 2xl:flex 2xl:space-y-0 2xl:flex-row 2xl:items-center 2xl:space-x-12 2xl:mt-0 2xl:justify-between"
            >
                <div
                    v-show="
                        (item.parent_id === null && item.url) ||
                        (item.parent_id === null && item.url === null)
                    "
                    v-for="item in sections"
                    :key="item.id"
                >
                    <Link
                        v-if="item.parent_id === null && item.url"
                        class="text-xs font-semibold mx-0 2xl:w-16 flex items-center"
                        :href="item.url"
                        >{{ item.name }}
                    </Link>

                    <div
                        v-if="item.parent_id === null && item.url === null"
                        class="group inline-block 2xl:w-16"
                    >
                        <NarvbarMenuItem
                            v-if="item.parent_id === null"
                            :section="item"
                            :sections="sections"
                        />
                    </div>
                </div>

                <li class="w-10">
                    <div
                        class="w-16 dark-mode-toggle-container"
                        @click="toggleDarkMode"
                    >
                        <label
                            for="dark-mode-toggle"
                            class="bg-gray-200 mt-1 border dark:border-0 p-1 dark:bg-gray-700 rounded-full flex justify-between cursor-pointer"
                        >
                            <span class="inline dark:hidden">
                                <BaseIcon
                                    :path="mdiWeatherNight"
                                    class="transition-colors"
                                />
                            </span>
                            <span
                                class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-300"
                            ></span>
                            <span class="hidden dark:inline">
                                <BaseIcon
                                    :path="mdiWhiteBalanceSunny"
                                    class="transition-colors"
                                />
                            </span>
                        </label>
                    </div>
                </li>

                <Link
                    class="2xl:w-14 text-xs flex items-center relative cursor-pointer"
                    href="/login"
                >
                    <BaseIcon
                        :path="
                            usePage().props.auth.user
                                ? mdiHomeExportOutline
                                : mdiLogin
                        "
                        class="transition-colors 2xl:mx-1"
                    >
                    </BaseIcon>

                    {{ updateLog() }}
                </Link>
            </ul>
        </nav>
    </div>
</template>
