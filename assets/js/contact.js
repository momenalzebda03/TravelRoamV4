document.querySelectorAll('select').forEach(select => {
    const arrow = select.nextElementSibling.querySelector('img');
    select.addEventListener('focus', () => arrow.classList.add('rotate-180'));
    select.addEventListener('blur', () => arrow.classList.remove('rotate-180'));
});