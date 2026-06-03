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

function gettabs() {
    return {
        details: {
            btn: document.getElementById("details"),
            content: document.getElementById("showDetails"),
            translate: "0%"
        },
        timings: {
            btn: document.getElementById("timings"),
            content: document.getElementById("showTimings"),
            translate: "100%"
        },
        conditions: {
            btn: document.getElementById("conditions"),
            content: document.getElementById("showConditions"),
            translate: "200%"
        }
    };
}

function setActive(tabKey) {
    const tabs = gettabs();
    const indicator = document.getElementById("indicator");

    Object.values(tabs).forEach(tab => {
        if (!tab.btn) return;
        tab.btn.classList.remove("!text-black");
        if (indicator) tab.btn.style.color = "var(--is-blue-3)";
        tab.content?.classList.add("hidden");
    });

    const tab = tabs[tabKey];
    if (!tab.btn) return;

    if (!indicator) {
        tab.btn.classList.add("!text-black");
    } else {
        tab.btn.style.color = "white";
    }

    tab.content?.classList.remove("hidden");
    indicator?.style.setProperty("transform", `translateX(${tab.translate})`);
}

Object.keys(gettabs()).forEach(key => {
    const btn = document.getElementById(key);
    btn?.addEventListener("click", () => setActive(key));
});

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", function () {

        const id = this.dataset.id;
        const name = this.dataset.name;

        sectionChoose.classList.add("hidden");
        detailsBox.classList.remove("hidden");

        loadLounge(id, name);
        setActive("details");
    });
});

const loungeName = document.getElementById("loungeName");
function loadLounge(id, name) {
    loungeName.innerText = name;
}