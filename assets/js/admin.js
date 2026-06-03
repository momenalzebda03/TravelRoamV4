function copyReferral(el) {
    const text = el.querySelector('p').innerText.replace('Referral Code: ', '');
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Referral code copied: ' + text);
    });
}