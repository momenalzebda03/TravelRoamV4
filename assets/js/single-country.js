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
        const isSelected = item.classList.contains('selected');

        // أولاً شيل الـ selection من كل العناصر
        document.querySelectorAll('.bundle-item').forEach(el => {
            el.classList.remove('selected', 'bg-[var(--is-blue)]', 'text-white');
            el.querySelector('.radio-circle')?.classList.remove('bg-[var(--is-pink)]', 'border-0');
        });
        selectedBundles.length = 0;

        // لو مش selected حدده
        if (!isSelected) {
            item.classList.add('selected', 'bg-[var(--is-blue)]', 'text-white');
            item.querySelector('.radio-circle')?.classList.add('bg-[var(--is-pink)]', 'border-0');
            selectedBundles.push(bundle);
        }

        console.log('الباقة المختارة:', selectedBundles);
    });
});

function openBundleModal() {
    document.getElementById('bundleModal').classList.remove('hidden');
}
function closeBundleModal() {
    document.getElementById('bundleModal').classList.add('hidden');
}