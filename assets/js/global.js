let lastScrollTop = 0;

const navbar = document.querySelector(".navbar");

function showNavbar(navbar) {
    navbar.classList.add("nav-visible");
    navbar.classList.remove("nav-hidden");
}

function hideNavbar(navbar) {
    navbar.classList.add("nav-hidden");
    navbar.classList.remove("nav-visible");
}

function setNavbarStyle(navbar, isTop) {
    isTop ? navbar.classList.remove("nav-white") : navbar.classList.add("nav-white");
}

window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    const isScrollingDown = currentScroll > lastScrollTop;

    if (isScrollingDown) {
        hideNavbar(navbar);
    } else {
        showNavbar(navbar);
    }

    setNavbarStyle(navbar, currentScroll <= 300);
    lastScrollTop = Math.max(currentScroll, 0);
});

function toggleDropdown(trigger) {
    const $wrapper = $(trigger).closest('.dropdown-wrapper');
    const $list = $wrapper.find('.dropdown-list');

    $('.dropdown-list').not($list).removeClass('open');
    $('.dropdown-wrapper').not($wrapper).find('.dropdown-arrow, .menu-icon').removeClass('open');

    $list.toggleClass('open');
    $wrapper.find('.dropdown-arrow, .menu-icon').toggleClass('open');
}

function selectItem(li, value) {
    const $wrapper = $(li).closest('.dropdown-wrapper');
    $wrapper.find('.selected-value').text(value);
    $wrapper.find('.dropdown-list, .dropdown-arrow, .menu-icon').removeClass('open');
    $wrapper.find('li').removeClass('active');
    $(li).addClass('active');
}

$(document).on('click', function (e) {
    if (!$(e.target).closest('.dropdown-wrapper').length) {
        $('.dropdown-list, .dropdown-arrow, .menu-icon').removeClass('open');
    }
});

window.addEventListener('load', () => {
    document.getElementById('loadingOverlay').remove();
    const app = document.getElementById('app');
    app.style.display = 'block';
    AOS.init({
        once: true,
        duration: 900,
    });
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
        spaceBetween: 40,
        centeredSlides: true,
        initialSlide: 2,
        breakpoints: {
            0: { slidesPerView: 2 },
            990: { slidesPerView: 4.5 }
        }
    });
});