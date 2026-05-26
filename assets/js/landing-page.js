function showTab(tab) {
    document.getElementById('list-country').classList.toggle('hidden', tab !== 'country')
    document.getElementById('list-region').classList.toggle('hidden', tab !== 'region')

    document.getElementById('tab-country').classList.toggle('active-destinations', tab === 'country')
    document.getElementById('tab-region').classList.toggle('active-destinations', tab === 'region')
}

function selectDestination(name, code) {
    $('#destination-input').val(name);
    $('#destination-list').removeClass('open');
}

$(document).on('click', function (e) {
    if (!$(e.target).closest('.dropdown-wrapper').length) {
        $('#destination-list').removeClass('open');
    }
});

const commonSwiperOptions = {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 800,
};

document.addEventListener('DOMContentLoaded', () => {
    new Swiper(".mySwiperCards", {
        ...commonSwiperOptions,
        spaceBetween: 40,
        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },
        breakpoints: {
            0: { slidesPerView: 2 },
            990: { slidesPerView: 4 }
        }
    });

    new Swiper(".mySwiperJournal", {
        ...commonSwiperOptions,
        centeredSlides: true,
        initialSlide: 2,
        breakpoints: {
            0: { slidesPerView: 2, spaceBetween: 10 },
            990: { slidesPerView: 4.5, spaceBetween: 40 }
        }
    });
});