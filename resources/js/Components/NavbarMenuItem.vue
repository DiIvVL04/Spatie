<script setup>
import { Link } from "@inertiajs/vue3";
import NarvbarMenuItem from "@/Components/NavbarMenuItem.vue";
import DropdownNested from "@/Components/DropdownNested.vue";
import { inject, ref } from "vue";
const props = defineProps({
    section: {
        type: Object,
        default: () => ({}),
        required: true,
    },
    sections: {
        type: Object,
        default: () => ({}),
        required: true,
    },
});

// const sections = inject("sections");
</script>

<style scoped>
/* since nested groupes are not supported we have to use 
     regular css for the nested dropdowns 
  */
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

/* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
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
    <button
        class="outline-none focus:outline-none text-xs rounded-sm flex items-center"
    >
        <span class="pr-1 font-semibold flex-1">{{ section.name }}</span>
        <span>
            <svg
                class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
            </svg>
        </span>
    </button>

    <ul
        class="rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 bg-slate-100 dark:bg-gray-800"
    >
        <div v-for="item in section.subsections" :key="item.id">
            <!-- Nivel anidado -->
            <li
                v-if="item.parent_id && item.url === null"
                class="rounded-sm relative px-3 py-1 hover:bg-gray-200 hover:dark:bg-gray-700"
            >
                <DropdownNested :section="item" :sections="sections" />
            </li>
            <!-- Nivel 2 -->
            <li
                v-else
                class="text-sm rounded-sm px-3 py-1 hover:bg-gray-200 hover:dark:bg-gray-700"
            >
                <Link :href="item.url"> {{ item.name }}</Link>
            </li>
        </div>
    </ul>
    <!-- </div> -->
</template>
