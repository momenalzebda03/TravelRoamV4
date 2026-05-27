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