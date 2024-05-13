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

export default {
    name: 'Index',

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
        const chart = ref(null);
        const exportMenuOpen = ref(false);
        const description = ref();

        const toggleExportMenu = () => {
            exportMenuOpen.value = !exportMenuOpen.value;
        };

        const loadFilteredData = () => {
            axios.get(route('welcome.agreementsVinculation'))
                .then((response) => {
                    agreementsData.value = response.data;
                    updateChart();
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const updateChart = () => {
            var labelsData = agreementsData.value[0]
            var dataTotal = agreementsData.value[1]
            var federalTotal = agreementsData.value[2]
            var descentralizadoTotal = agreementsData.value[3]

            const existingChart = Chart.getChart('vinculationChart');
            if (existingChart) {
                existingChart.destroy();
            }
            // description.value = "Descripción general: Existen ";
            const ctx = document.getElementById('vinculationChart').getContext('2d');
            chart.value = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labelsData,
                    datasets: [
                        {
                            label: 'Total',
                            data: dataTotal,
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 2
                        },
                        {
                            label: 'Federal',
                            data: federalTotal,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(192, 57, 43)',
                            borderWidth: 2
                        },
                        {
                            label: 'Descentralizado',
                            data: descentralizadoTotal,
                            backgroundColor: 'rgba(255, 205, 86, 0.5)',
                            borderColor: 'rgba(212, 172, 13)',
                            borderWidth: 2
                        }
                    ]
                },
                options: {
                    bezierCurve: false,
                    animation: {
                        onComplete: false
                    },
                    scales: {
                        x: {

                            title: {
                                display: false,
                                text: 'Sectores',
                                font: {
                                    weight: 'bold'
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Numero de Convenios',
                                font: {
                                    weight: 'bold'
                                },
                            },
                            beginAtZero: true,
                            stepSize: 1,
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                    }
                }
            });
        };

        const optionsChart = (format) => {
            if (agreementsData.value) {
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
                        const chartContainer = document.getElementById('vinculationChart');

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

        onMounted(() => {
            loadFilteredData();
        });

        return {
            description,
            agreementsData,
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
                        <button @click="loadFilteredData()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem">
                            Actualizar
                        </button>
                        <div class="border-t border-gray-300"></div>
                        <button @click="optionsChart('png')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem">
                            Exportar como PNG
                        </button>
                        <button @click="optionsChart('svg')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem">
                            Exportar como SVG
                        </button>
                        <button @click="optionsChart('pdf')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem">
                            Exportar como PDF
                        </button>

                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 w-full md:px-20">
            <canvas id="vinculationChart"></canvas>
        </div>
        <table class="mt-8">
            <thead>
                <tr>
                    <th>Año</th>
                    <th>Federal</th>
                    <th>Descentralizado</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in agreementsData[0]" :key="index">
                    <td data-label="Año">
                        {{ item }}
                    </td>
                    <td data-label="Federal">
                        {{ agreementsData[2][index] }}
                    </td>
                    <td data-label="Descentralizado">
                        {{ agreementsData[3][index] }}
                    </td>
                    <td data-label="Total">
                        {{ agreementsData[1][index] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </CardBox>
</template>
