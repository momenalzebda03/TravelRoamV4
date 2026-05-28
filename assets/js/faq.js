const items = document.querySelectorAll(".faq-item");

function closeItem(item) {
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    item.classList.remove("active");
    content.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
}

function openItem(item) {
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    item.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
    icon.style.transform = "rotate(50deg)";
}

items.forEach((item) => {
    const btn = item.querySelector(".faq-btn");

    btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        items.forEach(closeItem);

        !isOpen && openItem(item);
    });
});