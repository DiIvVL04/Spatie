<script setup>
import LayoutWelcome from "@/Layouts/LayoutWelcome.vue";
import HeroSection from "@/Components/HeroSection.vue";
import CardPublish from "@/Components/CardPublish.vue";
import CardBox from "@/Components/CardBox.vue";
import { Head } from "@inertiajs/vue3";
import GraphicAgreement from "@/Components/GraphicAgreement.vue";
import GraphicAgreementVinculation from "@/Components/GraphicAgreementVinculation.vue";
import Carousel from "@/Components/Carousel.vue";
import BaseButton from "@/Components/BaseButton.vue";
import { mdiChevronDown, mdiClose, mdiChevronUp } from "@mdi/js";
import BaseButtons from "@/Components/BaseButtons.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";

const props = defineProps({
    titulo: { type: String, required: true },
});

</script>

<template>
    <Head :title="titulo">
        <link rel="shortcut icon" type="image/png" href="/img/TecnmBlanco.png">
    </Head>

    <LayoutWelcome>
        <!-- Pantalla inicial -->
        <HeroSection imgUrl="/img/mexico.png" title="Micrositio del TecNM" description="Publicaciones de la Secretaria de Extensión y Vinculación del
            Tecnológico de México."></HeroSection>
        <section class="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <h2 id="publicaciones" class="text-center text-3xl lg:text-4xl font-bold dark:text-white my-5">
                    Acerca de
                </h2>
                <div class="md:flex">
                    <div class="md:w-1/2">
                        <div class="text-base max-lg:text-sm mt-10 text-justify">
                            El desarrollo del Micrositio de la Secretaría de Extensión y Vinculación funciona como una
                            herramienta
                            importante para dar a conocer las actividades realizadas por las direcciones de Promoción
                            Cultural y
                            Deportiva,
                            así como la de Vinculación e Intercambio Académico. El portal informativo se desarrolla por el
                            Departamento de
                            Ciencias de la Ingeniería en CENIDET, el cual va dirigido al apoyo del TecNM en su estrategia de
                            difusión.

                            Es esencial destacar que los módulos que se desarrollarán en el proyecto actual representan una
                            parte
                            fundamental y necesaria para el funcionamiento del sistema integral en su conjunto. Estos
                            módulos
                            constituyen un
                            componente esencial para la operación exitosa del sistema en su totalidad.
                        </div>
                    </div>
                    <div class="md:w-1/2 justify-end flex">
                        <img src="/img/aboutUs.png" alt="" class="w-1/2 object-cover">
                    </div>

                </div>
            </div>
        </section>
        <!-- Publicaciones -->
    </LayoutWelcome>
</template>
