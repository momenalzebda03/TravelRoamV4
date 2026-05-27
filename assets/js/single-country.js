function showTab(tab) {
    document.getElementById('list-bundle').classList.toggle('hidden', tab !== 'bundle')
    document.getElementById('list-unlimited-bundles').classList.toggle('hidden', tab !== 'unlimited-bundles')

    document.getElementById('tab-bundle').classList.toggle('active-bundle', tab === 'bundle')
    document.getElementById('tab-unlimited-bundles').classList.toggle('active-bundle', tab === 'unlimited-bundles')
}

const selectedBundles = [];

document.querySelectorAll('.bundle-item').forEach(item => {
    item.addEventListener('click', () => {
        const bundle = JSON.parse(item.dataset.bundle);
        const radio = item.querySelector('.radio-circle');
        const isSelected = item.classList.contains('selected');

        if (isSelected) {
            // deselect
            item.classList.remove('selected', 'bg-[var(--is-blue)]', 'text-white');
            radio.classList.remove('bg-[var(--is-pink)]', 'border-0');
            const index = selectedBundles.findIndex(b => b.name === bundle.name && b.size === bundle.size);
            if (index !== -1) selectedBundles.splice(index, 1);
        } else {
            // select
            item.classList.add('selected', 'bg-[var(--is-blue)]', 'text-white');
            radio.classList.add('bg-[var(--is-pink)]', 'border-0');
            selectedBundles.push(bundle);
        }

        console.log('الباقات المختارة:', selectedBundles);
    });
});

function openBundleModal() {
    document.getElementById('bundleModal').classList.remove('hidden');
}
function closeBundleModal() {
    document.getElementById('bundleModal').classList.add('hidden');
}