document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('model').classList.remove('hidden');
});

document.querySelectorAll('#cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('[id="model"]')?.classList.add('hidden');
        document.getElementById('model').classList.add('hidden');
    });
});

document.getElementById('model').addEventListener('click', (e) => {
    if (e.target === document.getElementById('model')) {
        document.getElementById('model').classList.add('hidden');
    }
});