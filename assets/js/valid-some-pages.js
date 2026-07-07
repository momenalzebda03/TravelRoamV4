const params = new URLSearchParams(window.location.search);
const dataType = params.get('data');

const sections = document.querySelectorAll('#country, #region');

sections.forEach(section => {
    section.classList.add('hidden');

    if (section.id === dataType) {
        section.classList.remove('hidden');
    }
});

if (!dataType || !['country', 'region'].includes(dataType)) {
    window.location.replace('index.html');
}