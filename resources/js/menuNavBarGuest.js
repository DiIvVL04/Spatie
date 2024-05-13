import {
  mdiMenu,
  mdiSchool,
  mdiLightbulbOutline,
  mdiLightbulbOnOutline,
  mdiThemeLightDark,
  mdiTheater,
  mdiLogin,
} from "@mdi/js";

export default [
    {
        label: "Educación Continua",
        // href: "/#educacion",
        menu: [
            {
                label: "Conciencia verde",
                href: "/educacion-continua#conciencia",
            },
            {
                label: "Mooc del TecNM",
                href: "/educacion-continua#mooc",
            },
            {
                label: "Lenguas extranjeras y maternas",
                // href: "/educacion-continua",
                menu: [
                    {
                        label: "Lenguas extranjeras",
                        href: "/educacion-continua",
                    },
                    {
                        label: "Lenguas Maternas",
                        href: "/educacion-continua",
                    },
                    {
                        label: "Eventos",
                        href: "/educacion-continua",
                    },
                ],
            },
        ],
    },
    {
        label: "Emprendimiento Social y Tecnológico",
        // href: "/#emprendimiento",
        menu: [
            {
                label: "CIIES",
                href: "/emprendimiento-social#ciies",
            },
            {
                label: "InnovaTecNM",
                // href: "/emprendimiento-social#innovatecnm",
                menu: [
                    {
                        label: "¿Que es?",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Eventos simultáneos",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Etapa Local",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Etapa Regional",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Etapa Nacional",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Sistema",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Estadísticas",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Documentos de referencia",
                        href: "/emprendimiento-social",
                    },
                ],
            },
            {
                label: "Modelo talento emprendedor",
                // href: "/emprendimiento-social#innovatecnm",
                menu: [
                    {
                        label: "¿Que es?",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "¿Como interpretarlo?",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Indicador",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Estadísticas",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "MOOC MTE",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Despliegues",
                        href: "/emprendimiento-social",
                    },
                    {
                        label: "Documentos de referencia",
                        href: "/emprendimiento-social",
                    },
                ],
            },
            {
                label: "Nodess",
                href: "/emprendimiento-social#nodess",
            },
        ],
    },
    {
        label: "Innovación y Transferencia Tecnológica",
        // href: "/#innovacion",
        menu: [
            {
                label: "Cátalogo de servicios externos TecNM",
                // href: "/emprendimiento-social#innovatecnm",
                menu: [
                    {
                        label: "Institutos y centros",
                        href: "/innovacion-transferencia",
                    },
                ],
            },
            {
                label: "CIIA",
                href: "/innovacion-transferencia#ciia",
            },
            {
                label: "Nodos",
                href: "/innovacion-transferencia#nodos",
            },
            {
                label: "Protección de autoría",
                // href: "/emprendimiento-social#innovatecnm",
                menu: [
                    {
                        label: "Protección intelectual",
                        href: "/innovacion-transferencia",
                    },
                    {
                        label: "Centros de planteamiento",
                        href: "/innovacion-transferencia",
                    },
                    {
                        label: "Servicios de transferencia tecnológica",
                        href: "/innovacion-transferencia",
                    },
                    {
                        label: "Indicadores",
                        href: "/innovacion-transferencia",
                    },
                    {
                        label: "Noticias",
                        href: "/innovacion-transferencia",
                    },
                ],
            },
        ],
    },
    {
        label: "Intercambio Académico y Movilidad",
        href: "/intercambio-academico",
    },
    {
        label: "Promoción Cultura y Deportiva",
        // href: "/intercambio-academico",
        menu: [
            {
                label: "Bandas de Guerra y Escoltas",
                href: "/#",
            },
            {
                label: "Cultura",
                href: "/#",
            },
            {
                label: "Deportes",
                href: "/#",
            },
        ],
    },
    {
        label: "Proyectos Estratégicos Nacionales",
        // href: "/intercambio-academico",
        menu: [
            {
                label: "Alfabetizatec",
                href: "/#",
            },
            {
                label: "CIIT",
                href: "/#",
            },
            {
                label: "Gasolineras del Bienestar",
                href: "/#",
            },
            {
                label: "Plan Sonora",
                href: "/#",
            },
            {
                label: "Tren Maya",
                href: "/#",
            },
            {
                label: "Sembrando Vida",
                href: "/#",
            },
        ],
    },
    {
        label: "Vinculación",
        menu: [
            {
                label: "Concertación de Convenios",
                href: "/concertacion-convenios",
            },
            {
                label: "Consejos de Vinculación",
                href: "/consejos-vinculacion",
            },
            {
                label: "Servicio Social y Residencias Profesionales",
                href: "/#",
            },
        ],
    },
    {
        label: "Noticias",
        menu: [
            {
                label: "Eventos",
                href: "/",
            },
        ],
    },
    {
        label: "Calendario",
        href: route("welcome.calendar"),
    },
    {
        label: "Marco Normativo",
        // href: "/intercambio-academico",
        menu: [
            {
                label: "Lineamientos",
                href: "/#",
            },
        ],
    },
    {
        icon: mdiThemeLightDark,
        label: "Light/Dark",
        isDesktopNoLabel: true,
        isToggleLightDark: true,
    },
    {
        icon: mdiLogin,
        label: "Iniciar Sesion",
        isDesktopNoLabel: false,
        isLogin: true,
    },
];
