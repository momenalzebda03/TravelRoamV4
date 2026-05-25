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
    if (isTop) {
        navbar.classList.add("nav-transparent");
        navbar.classList.remove("nav-white");
    } else {
        navbar.classList.add("nav-white");
        navbar.classList.remove("nav-transparent");
    }
}

window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    const isScrollingDown = currentScroll > lastScrollTop;

    if (isScrollingDown) {
        hideNavbar(navbar);
    } else {
        showNavbar(navbar);
    }

    setNavbarStyle(navbar, currentScroll <= 50);
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


const destinations = [
    { name: 'Palestine', code: 'ps' },
    { name: 'United States', code: 'us' },
    { name: 'Jordan', code: 'jo' },
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Turkey', code: 'tr' },
    { name: 'Egypt', code: 'eg' },
    { name: 'Saudi Arabia', code: 'sa' },
];

function openDestinations() {
    $('#destination-list').addClass('open');
    renderDestinations(destinations);
}

function filterDestinations(value) {
    const filtered = destinations.filter(d =>
        d.name.toLowerCase().startsWith(value.toLowerCase())
    );
    renderDestinations(filtered);
    $('#destination-list').addClass('open');
}

function renderDestinations(list) {
    const ul = $('#destination-list');
    ul.empty();
    list.forEach(item => {
        ul.append(`
      <li onclick="selectDestination('${item.name}', '${item.code}')" 
        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
        <img src="https://flagcdn.com/24x18/${item.code}.png" alt="${item.code}" />
        <span>${item.name}</span>
      </li>
    `);
    });
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