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

const destinations = [
    { name: 'Australia', code: 'au' },
    { name: 'Austria', code: 'at' },
    { name: 'Bahrain', code: 'bh' },
    { name: 'Bangladesh', code: 'bd' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
];

function getListId(inputId) {
    return inputId.replace('destination-input', 'destination-list');
}

function openDestinations(inputEl) {
    const listId = getListId(inputEl.id);

    $(`#${listId}`).addClass('open');

    renderDestinations(destinations, listId, inputEl.id);
}

function filterDestinations(value, inputEl) {
    const listId = getListId(inputEl.id);

    const filtered = destinations.filter(d =>
        d.name.toLowerCase().startsWith(value.toLowerCase())
    );

    renderDestinations(filtered, listId, inputEl.id);

    $(`#${listId}`).addClass('open');
}

function renderDestinations(list, listId, inputId) {

    const ul = $(`#${listId}`);

    ul.empty();

    list.forEach(item => {

        ul.append(`
            <li 
                data-name="${item.name}"
                data-code="${item.code}"
                data-input="${inputId}"
                data-list="${listId}"
                class="!text-black destination-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-black cursor-pointer">

                <img src="https://flagcdn.com/24x18/${item.code}.png" 
                     alt="${item.code}" 
                     class="rounded-full w-7 h-7" />

                <span>${item.name}</span>
            </li>
        `);

    });
}

function nameEscape(text) {
    return text.replace(/'/g, "\\'");
}

$(document).on('click', '.destination-item', function () {
    const name = $(this).data('name');
    const inputId = $(this).data('input');
    const listId = $(this).data('list');

    $(`#${inputId}`).val(name);

    $(`#${listId}`).removeClass('open');
});

$(document).on('click', function (e) {
    !$(e.target).closest('.dropdown-wrapper').length && $('.dropdown-list').removeClass('open');
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

function showAll(listId) {
    const list = document.getElementById(listId);
    if (!list) return;

    const hiddenItems = list.querySelectorAll('.extra-country');
    if (!hiddenItems.length) return;

    const toggleBtn = document.querySelector(`[onclick="showAll('${listId}')"] span`);
    const isHidden = hiddenItems[0].classList.contains('hidden');

    hiddenItems.forEach(item => item.classList.toggle('hidden'));

    const isArabic = document.documentElement.lang === 'ar';
    if (isArabic) {
        toggleBtn.textContent = isHidden ? 'عرض أقل' : 'عرض جميع الوجهات';
    } else {
        toggleBtn.textContent = isHidden ? 'Show Less' : 'Show all Destinations';
    }
}

// function showAll(btn, listId = null) {
//     const hiddenItems = listId
//         ? document.getElementById(listId).querySelectorAll('.extra-country')
//         : btn.closest('div').querySelector('.faq-list').querySelectorAll('.extra-country');

//     const toggleBtn = btn.querySelector('span');
//     const isHidden = hiddenItems[0].classList.contains('hidden');

//     hiddenItems.forEach(item => item.classList.toggle('hidden'));

//     const isArabic = document.documentElement.lang === 'ar';
//     if (isArabic) {
//         toggleBtn.textContent = isHidden ? 'عرض أقل' : (listId ? 'عرض جميع الوجهات' : 'عرض جميع المقالات');
//     } else {
//         toggleBtn.textContent = isHidden ? 'Show Less' : (listId ? 'Show all Destinations' : 'See all 10 articles');
//     }
// }