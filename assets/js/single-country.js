let currentTab = 'bundle';

function showTab(tab) {
    currentTab = tab;

    document.querySelectorAll('.regular-bundle').forEach(el =>
        el.classList.toggle('hidden', tab !== 'bundle')
    );
    document.querySelectorAll('.list-unlimited-plans').forEach(el =>
        el.classList.toggle('hidden', tab !== 'unlimited-bundles')
    );
    document.querySelectorAll('.list-help').forEach(el =>
        el.classList.toggle('hidden', tab !== 'help')
    );

    document.getElementById('tab-bundle').classList.toggle('active-bundle', tab === 'bundle');
    document.getElementById('tab-unlimited-bundles').classList.toggle('active-bundle', tab === 'unlimited-bundles');
    document.getElementById('tab-help')?.classList.toggle('active-bundle', tab === 'help');

    document.querySelectorAll('.bundle-item').forEach(el => {
        el.classList.remove('is-selected', 'bg-[var(--is-blue)]', 'text-white');
    });
    selectedBundles.length = 0;

    const activeList = tab === 'bundle' ? '.regular-bundle' : '.list-unlimited-plans';
    const firstItem = document.querySelector(`${activeList} .bundle-item`);
    if (firstItem) {
        firstItem.classList.add('is-selected', 'bg-[var(--is-blue)]', 'text-white');
        selectedBundles.push(JSON.parse(firstItem.dataset.bundle));
    }
}

const selectedBundles = [];

document.querySelectorAll('.bundle-item').forEach(item => {
    item.addEventListener('click', () => {
        const bundle = JSON.parse(item.dataset.bundle);
        const isSelected = item.classList.contains('is-selected');

        document.querySelectorAll('.bundle-item').forEach(el => {
            el.classList.remove('is-selected', 'bg-[var(--is-blue)]', 'text-white');
        });
        selectedBundles.length = 0;

        if (!isSelected) {
            item.classList.add('is-selected', 'bg-[var(--is-blue)]', 'text-white');
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