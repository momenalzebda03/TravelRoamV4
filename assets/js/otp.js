// OTP Logic
const otpContainer = document.getElementById('otp-inputs');
const otpInputs = [...otpContainer.querySelectorAll('.otp-box')];
const otpSubmit = document.getElementById('otp-submit');
const otpMsg = document.getElementById('otp-msg');
const resendBtn = document.getElementById('resend-btn');

function getOtpVal() { return otpInputs.map(i => i.value).join(''); }

otpInputs.forEach((input, idx) => {
    input.addEventListener('keydown', e => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (input.value) {
                input.value = '';
            } else if (idx > 0) {
                otpInputs[idx - 1].focus();
                otpInputs[idx - 1].value = '';
            }
            otpSubmit.disabled = getOtpVal().length < 4;
        }
        if (e.key === 'ArrowLeft' && idx > 0) otpInputs[idx - 1].focus();
        if (e.key === 'ArrowRight' && idx < 3) otpInputs[idx + 1].focus();
    });

    input.addEventListener('input', e => {
        const val = input.value.replace(/\D/g, '');
        if (!val) { input.value = ''; return; }
        input.value = val[0];
        if (idx < 3) otpInputs[idx + 1].focus();
        otpSubmit.disabled = getOtpVal().length < 4;
    });

    input.addEventListener('paste', e => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 4);
        pasted.split('').forEach((d, i) => {
            if (otpInputs[i]) otpInputs[i].value = d;
        });
        otpInputs[Math.min(pasted.length, 3)].focus();
        otpSubmit.disabled = getOtpVal().length < 4;
    });

    input.addEventListener('focus', () => input.select());
});

// فتح الـ modal
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('model').classList.remove('hidden');
    otpInputs[0].focus();
});

// زر CONTINUE
otpSubmit.addEventListener('click', () => {
    const code = getOtpVal();
    // هنا ترسل الكود للسيرفر
    console.log('OTP submitted:', code);
});

// زر Resend
resendBtn.addEventListener('click', () => {
    otpInputs.forEach(i => i.value = '');
    otpSubmit.disabled = true;
    otpMsg.textContent = 'Code resent!';
    otpMsg.style.color = 'green';
    setTimeout(() => { otpMsg.textContent = ''; }, 2000);
    otpInputs[0].focus();
});