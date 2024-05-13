<script>
import CardBox from "@/Components/CardBox.vue";
import LayoutMain from "@/Layouts/LayoutMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import { Link, Head, router } from "@inertiajs/vue3";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import CardBoxComponentEmpty from "@/Components/CardBoxComponentEmpty.vue";
import { mdiPoll, mdiChartDonutVariant } from "@mdi/js";

export default {
    name: 'Index',
    props: {
        institutions: {
            type: Object,
            default: () => ({}),
            required: true
        },
        sectors: {
            type: Object,
            default: () => ({}),
            required: true
        },
    },
    components: {
        Head,
        SectionTitleLineWithButton,
        LayoutMain,
        CardBox,
        BaseButton,
        BaseButtons,
        CardBoxComponentEmpty
    },
    setup(props) {
        const agreementsData = ref([]);
        const selectedType = ref('Nacional');
        const selectedInstitution = ref(null);
        const chart = ref(null);
        const exportMenuOpen = ref(false);
        const description = ref();

        const toggleExportMenu = () => {
            exportMenuOpen.value = !exportMenuOpen.value;
        };

        const loadFilteredData = () => {
            axios.get(route('welcome.apiAgreements', {
                selectedType: selectedType.value,
                selectedInstitution: selectedInstitution.value
            }))
                .then((response) => {
                    agreementsData.value = response.data;
                    updateChart();
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const updateChart = () => {
            const sectorsAPI = agreementsData.value.map(agreement => agreement.sector.name);
            const nameInstitution = agreementsData.value.map(agreement => agreement.institution.name);
            const sectors = props.sectors.map(sectors => sectors.name);
            var sectorsSum = [];
            var i = 0;

            sectors.forEach(sectorName => {
                sectorsSum[i] = 0;
                sectorsAPI.forEach(sectorNameApi => {
                    if (sectorName == sectorNameApi) {
                        sectorsSum[i]++;
                    }
                });
                i++;
            });

            const existingChart = Chart.getChart('agreementsChart');
            if (existingChart) {
                existingChart.destroy();
            }
            description.value = "Descripción general: Existen " + agreementsData.value.length + " convenios " + selectedType.value
                + "es de la institución: " + nameInstitution[0];
            const ctx = document.getElementById('agreementsChart').getContext('2d');
            chart.value = new Chart(ctx, {
                type: typeChart.value ? 'doughnut' : 'bar',
                data: {
                    labels: sectors,
                    datasets: [{
                        label: 'Valores de Instituciones',
                        data: sectorsSum,
                        backgroundColor: ['rgba(0, 123, 255, 0.2)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
                        borderColor: ['rgba(0, 123, 255, 1)', 'rgba(192, 57, 43)', 'rgba(212, 172, 13)', 'rgba(69, 179, 157)'],

                        borderWidth: 2
                    }]
                },
                options: {
                    bezierCurve: false,
                    animation: {
                        onComplete: false
                    },
                    scales: {
                        x: {

                            title: {
                                display: true,
                                text: 'Sectores',
                                // color: white,
                                font: {
                                    // size: 14,
                                    weight: 'bold'
                                },
                            },
                        },
                        y: {
                            beginAtZero: true,
                            stepSize: 1,
                            title: {
                                display: true,
                                text: 'Instituciones',
                                // color: white,
                                font: {
                                    // size: 14,
                                    weight: 'bold'
                                },
                            },
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        },
                    }
                }
            });
        };

        const optionsChart = (format) => {
            if (agreementsData.value.length > 0) {
                var base = '';
                var downloadName = `Graphic.${format}`;
                var href = '';
                var image = null;
                switch (format) {
                    case 'png':
                        image = chart.value.toBase64Image(base);
                        href = image;
                        break;
                    case 'svg':
                        base = 'image/svg+xml';
                        image = chart.value.toBase64Image(base);
                        const svgConEstilos = `<?xml version="1.0" standalone="no"?>
                        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
                        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                            ${image}
                        </svg>`;
                        href = `data:${base},${encodeURIComponent(svgConEstilos)}`;
                        break;
                    case 'pdf':
                        const doc = new jsPDF();
                        const width = 190;
                        const height = 80;
                        image = chart.value.toBase64Image('png');
                        doc.addImage(image, 'PNG', 10, 30, width, height);

                        doc.setFontSize(16);
                        doc.text('Gráfico de convenios', width / 2 + 10, 20, { align: 'center' });

                        const currentDate = new Date();
                        doc.setFontSize(10);
                        doc.text(`${description.value}`, 10, height + height / 2);
                        doc.setFontSize(10);
                        doc.text(`${currentDate.toLocaleDateString()} Fuente: TecNM`, 10, height + height / 2 + 10);
                        doc.save(downloadName);

                        return;
                    case 'fullScreen':
                        const chartContainer = document.getElementById('agreementsChart');

                        if (chartContainer.requestFullscreen) {
                            chartContainer.requestFullscreen();
                        } else if (chartContainer.mozRequestFullScreen) {
                            chartContainer.mozRequestFullScreen();
                        } else if (chartContainer.webkitRequestFullscreen) {
                            chartContainer.webkitRequestFullscreen();
                        } else if (chartContainer.msRequestFullscreen) {
                            chartContainer.msRequestFullscreen();
                        }
                        return;
                }

                const a = document.createElement('a');
                a.href = href;
                a.download = downloadName;
                document.body.appendChild(a);

                a.click();
                document.body.removeChild(a);
                //console.log(`Exportando como ${format}`);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No tiene datos la gráfica, inténtalo con diferentes filtros.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                });
            }
            exportMenuOpen.value = false;
        };

        // Observa los cambios en los filtros y carga los datos cuando cambian
        watch([selectedType, selectedInstitution], loadFilteredData);

        onMounted(() => {
            // Inicializa la gráfica con los valores predeterminados  
            loadFilteredData();
        });
        const typeChart = ref(false)
        const changeType = () => {

            typeChart.value = !typeChart.value
            console.log(typeChart.value)
            loadFilteredData()
        }
        return {
            mdiPoll,
            mdiChartDonutVariant,
            typeChart,
            changeType,
            description,
            agreementsData,
            selectedType,
            selectedInstitution,
            chart,
            exportMenuOpen,
            toggleExportMenu,
            loadFilteredData,
            updateChart,
            optionsChart,
        };
    },
};
</script>


<template>
    <CardBox>
        <div class="md:flex md:space-x-4 mb-5">
            <div class="md:w-1/2">
                <label for="filterInstitution" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Filtrar por Institución:
                </label>
                <select id="filterInstitution"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="selectedInstitution">
                    <option value=null>Seleccione una opción</option>
                    <option :value="item.id" v-for="item in institutions" :key="item.id">{{ item.name }}</option>
                </select>

            </div>

            <div class="md:w-1/2">
                <label for="filterType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Filtrar por tipo:
                </label>
                <select id="filterType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="selectedType">
                    <option value=null>Seleccione una opción</option>
                    <option value="Nacional">Nacional</option>
                    <option value="Internacional">Internacional</option>
                </select>
            </div>
        </div>

        <div class="flex justify-end items-center">
            <div class="relative inline-block text-left">
                <button @click="toggleExportMenu" type="button"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" stroke-width="2"
                        stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l11 0" />
                        <path d="M9 12l11 0" />
                        <path d="M9 18l11 0" />
                        <path d="M5 6l0 .01" />
                        <path d="M5 12l0 .01" />
                        <path d="M5 18l0 .01" />
                    </svg>
                </button>

                <div v-show="exportMenuOpen"
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu" aria-orientation="vertical" aria-labelledby="export-menu-button">
                    <div class="py-1" role="none">
                        <button @click="optionsChart('fullScreen')"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Ver en pantalla completa
                        </button>
                        <button @click="changeType()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Ver gráfico {{ typeChart ? 'Barras' : 'Dona' }}
                        </button>

                        <div class="border-t border-gray-300"></div>
                        <button @click="optionsChart('png')"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Exportar como PNG
                        </button>
                        <button @click="optionsChart('svg')"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Exportar como SVG
                        </button>
                        <button @click="optionsChart('pdf')"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Exportar como PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 w-full md:px-20">
            <canvas id="agreementsChart"></canvas>
        </div>
        <div v-if="agreementsData.length > 0">
            <div class="mt-5">
                {{ description }}
            </div>

            <table class="mt-8">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Institución</th>
                        <th>Sector</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in agreementsData" :key="item.id">
                        <td data-label="description">
                            {{ item.description }}
                        </td>
                        <td data-label="type">
                            {{ item.type }}
                        </td>
                        <td data-label="institution">
                            {{ item.institution.name }}
                        </td>
                        <td data-label="sector">
                            {{ item.sector.name }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CardBoxComponentEmpty v-else />
    </CardBox>
</template>
