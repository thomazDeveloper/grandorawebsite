import Swiper, { Pagination, Navigation } from 'swiper';
import 'swiper/scss'; // eslint-disable-line
import 'swiper/scss/pagination'; // eslint-disable-line
import 'swiper/scss/navigation'; // eslint-disable-line

import Panorama from '../assets/panorama';

import "../assets/css/slider.css"

export const init_swiper = () => {
    // const swiper = new Swiper('.panorama-slider .swiper', {
    //     // pass Panorama module
    //     modules: [Navigation, Pagination, Panorama],
    //     // enable "panorama" effect
    //     effect: 'panorama',
    //     slidesPerView: 1.5,
    //     loop: true,
    //     loopedSlides: 10,
    //     centeredSlides: true,
    //     grabCursor: true,
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //         dynamicBullets: true,
    //         dynamicMainBullets: 3,
    //     },
    //     // panorama effect parameters
    //     panorama: {
    //         depth: 150,
    //         rotate: 45,
    //     },
    //     breakpoints: {
    //         480: {
    //             slidesPerView: 1,
    //             panorama: {
    //                 rotate: 35,
    //                 depth: 150,
    //             },
    //         },
    //         640: {
    //             slidesPerView: 1,
    //             panorama: {
    //                 rotate: 30,
    //                 depth: 150,
    //             },
    //         },
    //         1024: {
    //             slidesPerView: 3,
    //             panorama: {
    //                 rotate: 40,
    //                 depth: 350,
    //             },
    //         },
    //         1200: {
    //             slidesPerView: 3,
    //             panorama: {
    //                 // rotate: 45,
    //                 // depth: 1050,
    //                 rotate: 35,
    //                 depth: 650,
    //                 // rotate: 25,
    //                 // depth: 250,
    //             },
    //         },
    //     },
    // });

    const swiper = new Swiper('.panorama-slider .swiper', {
        // pass Panorama module
        modules: [Navigation, Pagination, Panorama],
        // enable "panorama" effect
        effect: 'panorama',
        slidesPerView:1.5 ,
        loop: true,
        loopedSlides: 10,
        centeredSlides: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            dynamicMainBullets: 3,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // panorama effect parameters
        panorama: {
            depth: 150,
            rotate: 45,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                panorama: {
                    rotate: 35,
                    depth: 150,
                },
            },
            640: {
                slidesPerView: 3,
                panorama: {
                    rotate: 30,
                    depth: 150,
                },
            },
            1024: {
                slidesPerView: 4,
                panorama: {
                    rotate: 30,
                    depth: 200,
                },
            },
            1200: {
                slidesPerView: 2,
                panorama: {
                    rotate: 25,
                    depth: 250,
                },
            },
        },
    });

    return swiper;
}
