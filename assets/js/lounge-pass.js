// ------------------------------------------------

var btnFind = document.getElementById("btn-find");
var sectionChoose = document.getElementById("section-choose");
var detailsBox = document.getElementById("details-box");
var closeBtns = document.querySelectorAll(".close-btn");

btnFind?.addEventListener("click", () => {
    sectionChoose.classList.remove("hidden");
});

closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        sectionChoose.classList.remove("hidden");
        detailsBox.classList.add("hidden");
    });
});

const indicator = document.getElementById("indicator");
const details = document.getElementById("details");
const timings = document.getElementById("timings");
const conditions = document.getElementById("conditions");
const showDetails = document.getElementById("showDetails");
const showTimings = document.getElementById("showTimings");
const showConditions = document.getElementById("showConditions");

const tabs = {
    details: {
        btn: details,
        content: showDetails,
        translate: "0%"
    },
    timings: {
        btn: timings,
        content: showTimings,
        translate: "100%"
    },
    conditions: {
        btn: conditions,
        content: showConditions,
        translate: "200%"
    }
};

function setActive(tabKey) {
    Object.values(tabs).forEach(tab => {
        tab.btn.classList.remove("!text-black");
        tab.content.classList.add("hidden");
    });

    const tab = tabs[tabKey];

    tab.btn.classList.add("!text-black");
    tab.content.classList.remove("hidden");

    indicator.style.transform = `translateX(${tab.translate})`;
}

Object.keys(tabs).forEach(key => {
    tabs[key].btn?.addEventListener("click", () => setActive(key));
});

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", function () {

        const id = this.dataset.id;
        const name = this.dataset.name;

        sectionChoose.classList.add("hidden");
        detailsBox.classList.remove("hidden");

        loadLounge(id, name);
    });
});

const loungeName = document.getElementById("loungeName");
function loadLounge(id, name) {
    loungeName.innerText = name;
}