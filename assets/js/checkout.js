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

document.querySelectorAll('#payment-btns .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#payment-btns .btn').forEach(b => {
            b.dataset.active = "false";
            b.classList.remove('bg-[var(--is-pink)]', 'text-white');
            b.classList.add('text-[var(--is-gray-14)]', 'shadow-[0_2px_5px_var(--is-black)]');
        });

        btn.dataset.active = "true";
        btn.classList.add('bg-[var(--is-pink)]', 'text-white');
        btn.classList.remove('text-[var(--is-gray-14)]', 'shadow-[0_2px_5px_var(--is-black)]');
    });
});