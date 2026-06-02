new QRCode(document.getElementById("qrcode"), {
    text: "https://example.com",
    width: 280,
    height: 280
});

var modelQr = document.getElementById("modelQr");
var cancelBooking = document.getElementById("cancelBooking");
var noModel = document.getElementById("noModel");

function openModal() {
    modelQr.classList.remove("hidden");
    modelQr.classList.add("flex");
}

function closeModal() {
    modelQr.classList.add("hidden");
    modelQr.classList.remove("flex");
}

if (cancelBooking) {
    cancelBooking.onclick = openModal;
}

if (noModel) {
    noModel.onclick = closeModal;
}