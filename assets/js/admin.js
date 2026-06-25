const amountInput = document.querySelector('input[type="number"]');

amountInput.addEventListener('input', () => {
    const val = parseFloat(amountInput.value);
    if (val > 50) amountInput.value = 50;
    if (val < 1 && amountInput.value !== '') amountInput.value = 1;
});

function copyReferral(el) {
    const text = el.querySelector('p').innerText.replace('Referral Code: ', '');
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Referral code copied: ' + text);
    });
}