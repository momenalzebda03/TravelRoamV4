const destinations = [
    { name: 'Australia', code: 'au' },
    { name: 'Austria', code: 'at' },
    { name: 'Bahrain', code: 'bh' },
    { name: 'Bangladesh', code: 'bd' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
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
        <img src="https://flagcdn.com/24x18/${item.code}.png" alt="${item.code}" class="rounded-full w-7 h-7" />
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

function showTab(tab) {
    document.getElementById('list-country').classList.toggle('hidden', tab !== 'country')
    document.getElementById('list-region').classList.toggle('hidden', tab !== 'region')

    document.getElementById('tab-country').classList.toggle('active-destinations', tab === 'country')
    document.getElementById('tab-region').classList.toggle('active-destinations', tab === 'region')
}