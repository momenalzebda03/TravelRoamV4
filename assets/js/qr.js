function generateQR(elementId, text) {
    const container = document.getElementById(elementId);
    if (!container) return;

    // انتظر يتحمل العنصر
    setTimeout(() => {
        const size = Math.min(container.offsetWidth || 250, 250);
        new QRCode(container, {
            text: text || "https://example.com",
            width: size,
            height: size,
            correctLevel: QRCode.CorrectLevel.H
        });
    }, 100);
}

// شغّل الـ QR
generateQR("qrcode", "https://example.com");

// Modal logic
var modelQr = document.getElementById("modelQr");
var cancelBooking = document.getElementById("cancelBooking");
var noModel = document.getElementById("noModel");

function openModal() {
    if (modelQr) {
        modelQr.classList.remove("hidden");
        modelQr.classList.add("flex");
    }
}

function closeModal() {
    if (modelQr) {
        modelQr.classList.add("hidden");
        modelQr.classList.remove("flex");
    }
}

if (cancelBooking) cancelBooking.onclick = openModal;
if (noModel) noModel.onclick = closeModal;