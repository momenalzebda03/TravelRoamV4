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

    isScrollingDown ? hideNavbar(navbar) : showNavbar(navbar);

    setNavbarStyle(navbar, currentScroll <= 100);
    lastScrollTop = Math.max(currentScroll, 0);
});

const lang = document.documentElement.lang;

function t(text) {
    return typeof text === 'object' ? text[lang] : text;
}

const destinations = [
    { name: { en: 'Australia', ar: 'أستراليا' }, code: 'au', phone: '+61' },
    { name: { en: 'Austria', ar: 'النمسا' }, code: 'at', phone: '+43' },
    { name: { en: 'Bahrain', ar: 'البحرين' }, code: 'bh', phone: '+973' },
    { name: { en: 'Bangladesh', ar: 'بنغلاديش' }, code: 'bd', phone: '+880' },
    { name: { en: 'Canada', ar: 'كندا' }, code: 'ca', phone: '+1' },
    { name: { en: 'China', ar: 'الصين' }, code: 'cn', phone: '+86' },
];

function getListId(inputId) {
    return inputId.replace('destination-input', 'destination-list');
}

function openDestinations(inputEl) {
    const listId = getListId(inputEl.id);

    renderDestinations(destinations, listId, inputEl.id);
    $(`#${listId}`).addClass('open');
}

function openDestinationsByList(listId) {
    const $list = $(`#${listId}`);
    const isOpen = $list.hasClass('open');

    // close any other open dropdowns
    $('.dropdown-list').removeClass('open');

    if (!isOpen) {
        renderDestinations(destinations, listId, null); // render items first
        $list.addClass('open');                          // add class AFTER render
    }
}

function filterDestinations(value, inputEl) {
    const listId = getListId(inputEl.id);

    const filtered = destinations.filter(d =>
        getName(d).toLowerCase().startsWith(value.toLowerCase())
    );

    renderDestinations(filtered, listId, inputEl.id);

    $(`#${listId}`).addClass('open');
}

function closeAllDropdowns() {
    $('.dropdown-list').removeClass('open');
}

function getName(item) {
    return typeof item.name === 'object' ? item.name[lang] : item.name;
}

function renderDestinations(list, listId, inputId) {
    const ul = $(`#${listId}`);
    ul.empty();

    closeAllDropdowns();

    if (list.length === 0) {
        const isArabic = document.documentElement.lang === 'ar';

        ul.append(`
        <li class="!text-black flex items-center justify-center px-4 text-gray-400">
            ${isArabic ? 'لم يتم العثور على وجهات' : 'No destinations found'}
        </li>
    `);

        return;
    }

    list.forEach(item => {
        ul.append(`
            <li 
                data-name="${t(item.name)}"
                data-code="${item.code}"
                data-phone="${item.phone}"
                ${inputId ? `data-input="${inputId}"` : ''}
                data-list="${listId}"
                class="!text-black destination-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-black cursor-pointer">
                <img src="https://flagcdn.com/24x18/${item.code}.png" alt="${item.code}" class="rounded-full w-7 h-7" />
                <span>${t(item.name)}</span>
                ${!inputId ? `<span class="ms-auto text-gray-400 text-sm">${item.phone}</span>` : ''}
            </li>
        `);
    });
}

function nameEscape(text) {
    return text.replace(/'/g, "\\'");
}

$(document).on('click', '.destination-item', function () {
    const name = $(this).data('name');
    const phone = $(this).data('phone');
    const code = $(this).data('code');
    const inputId = $(this).data('input');
    const listId = $(this).data('list');

    if (inputId) {
        $(`#${inputId}`).val(name);

        $(`#${inputId}`).closest('.dropdown-wrapper').find('#flag').attr('src', `https://flagcdn.com/24x18/${code}.png`);

        $('.phone-code').text(phone);
        $('.phone-code').closest('.dropdown-wrapper').find('#flag').attr('src', `https://flagcdn.com/24x18/${code}.png`);
    } else {
        const $wrapper = $(`#${listId}`).closest('.dropdown-wrapper');
        $wrapper.find('.phone-code').text(phone);
        $wrapper.find('#flag').attr('src', `https://flagcdn.com/24x18/${code}.png`);
    }

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

    const $input = $wrapper.find('input');
    if ($input.length) {
        $input.val(value);
    } else {
        $wrapper.find('.selected-value').text(value);
    }

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
            0: { slidesPerView: 3 },
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

const airports = [
    {
        name: {
            en: 'London Heathrow Airport',
            ar: 'مطار لندن هيثرو'
        },
        code: 'LHR',
        country: 'gb'
    },
    {
        name: {
            en: 'Istanbul Airport',
            ar: 'مطار إسطنبول'
        },
        code: 'IST',
        country: 'tr'
    },
    {
        name: {
            en: 'Paris Charles de Gaulle Airport',
            ar: 'مطار باريس شارل ديغول'
        },
        code: 'CDG',
        country: 'fr'
    },
    {
        name: {
            en: 'Amsterdam Airport Schiphol',
            ar: 'مطار أمستردام شيفول'
        },
        code: 'AMS',
        country: 'nl'
    },
    {
        name: {
            en: 'Frankfurt Airport',
            ar: 'مطار فرانكفورت'
        },
        code: 'FRA',
        country: 'de'
    },
    {
        name: {
            en: 'Adolfo Suárez Madrid–Barajas Airport',
            ar: 'مطار مدريد باراخاس'
        },
        code: 'MAD',
        country: 'es'
    },
    {
        name: {
            en: 'Leonardo da Vinci–Fiumicino Airport',
            ar: 'مطار ليوناردو دا فينشي روما'
        },
        code: 'FCO',
        country: 'it'
    },
    {
        name: {
            en: 'Munich Airport',
            ar: 'مطار ميونخ'
        },
        code: 'MUC',
        country: 'de'
    },
    {
        name: {
            en: 'Barcelona–El Prat Airport',
            ar: 'مطار برشلونة'
        },
        code: 'BCN',
        country: 'es'
    },
    {
        name: {
            en: 'Zurich Airport',
            ar: 'مطار زيورخ'
        },
        code: 'ZRH',
        country: 'ch'
    }
];

function filterAirports(value, inputEl) {
    const $wrapper = $(inputEl).closest('.dropdown-wrapper');
    const $list = $wrapper.find('.dropdown-list');

    const lang = document.documentElement.lang;

    function t(text) {
        return typeof text === 'object' ? text[lang] : text;
    }

    const filtered = airports.filter(a =>
        t(a.name).toLowerCase().includes(value.toLowerCase()) ||
        a.code.toLowerCase().includes(value.toLowerCase())
    );

    $list.empty();

    closeAllDropdowns();

    if (filtered.length === 0) {
        const isArabic = lang === 'ar';

        $list.append(`
            <li class="!text-black flex items-center justify-center px-4 text-gray-400">
                ${isArabic ? 'لم يتم العثور على مطارات' : 'No airports found'}
            </li>
        `);

        $list.addClass('open');
        return;
    }

    filtered.forEach(item => {
        $list.append(`
            <li class="!text-black flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onclick="
                    $(this).closest('.dropdown-wrapper').find('input').val('${t(item.code)}');
                    $(this).closest('.dropdown-wrapper').find('#flag').attr('src', 'https://flagcdn.com/24x18/${item.country}.png');
                    $(this).closest('.dropdown-wrapper').find('#flag').removeAttr('style');
                    $(this).closest('.dropdown-wrapper').find('.dropdown-list').removeClass('open');
                ">
                <span>${t(item.name)}</span>
                <span class="ms-auto text-gray-400 text-sm">${item.code}</span>
            </li>
        `);
    });

    $list.addClass('open');
}

const terminals = [
    { en: 'Terminal 1', ar: 'المبنى 1' },
    { en: 'Terminal 2', ar: 'المبنى 2' },
    { en: 'Terminal 3', ar: 'المبنى 3' },
    { en: 'Terminal 4', ar: 'المبنى 4' },
    { en: 'Terminal 5', ar: 'المبنى 5' }
];

function filterTerminals(value, inputEl) {
    const $wrapper = $(inputEl).closest('.dropdown-wrapper');
    const $list = $wrapper.find('.dropdown-list');

    const lang = document.documentElement.lang;

    function t(text) {
        return typeof text === 'object' ? text[lang] : text;
    }

    const filtered = terminals.filter(item =>
        t(item).toLowerCase().includes(value.toLowerCase())
    );

    $list.empty();

    closeAllDropdowns();

    if (filtered.length === 0) {
        const isArabic = lang === 'ar';

        $list.append(`
            <li class="!text-black flex items-center justify-center px-4 text-gray-400">
                ${isArabic ? 'لم يتم العثور على مبنى ركاب' : 'No terminals found'}
            </li>
        `);

        $list.addClass('open');
        return;
    }

    filtered.forEach(item => {
        $list.append(`
            <li class="!text-black px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onclick="
                    $(this).closest('.dropdown-wrapper').find('input').val('${t(item)}');
                    $(this).closest('.dropdown-wrapper').find('.dropdown-list').removeClass('open');
                ">
                ${t(item)}
            </li>
        `);
    });

    $list.addClass('open');
}