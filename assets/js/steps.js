let isInPaymentStep = false;
let paymentMethod = null;

let walletBalance = 20;
let discount = 0;

const isLLang = window.location.pathname.startsWith("/ar") ? "ar" : "en";

const isArabic = isLLang === "ar";

function t(en, ar) {
    return isArabic ? ar : en;
}

const nextBtn = document.getElementById("nextBtn");

function handleStripe() {
    const input = document.querySelector("#billingAddress");
    const value = input?.value.trim();

    if (!value) {
        alert(t("Please enter billing address", "يرجى إدخال عنوان الفوترة"));
        input?.focus();
        return;
    }

    // nextBtn.onclick = () => {
    //     window.location.href = "/qr.html";
    // }
}

function handleCoupon() {
    const apply = document.getElementById("apply");

    apply.onclick = () => {
        const value = document.getElementById("inputCode");
        if (value.value === "1234") {
            discount = 10;
            alert(t("coupon done", "تم تطبيق الكوبون"));
        } else {
            alert(t("Invalid coupon", "كود غير صالح"));
            return;
        }
    }

    const stripe = document.querySelector("#stripe");
    const showCode = document.querySelector("#showCode");
    const divCode = document.querySelector("#divCode");
    const textCode = document.querySelector("#textCode");
    const divStripe = document.querySelector("#divStripe");
    const textStripe = document.querySelector("#textStripe");

    stripe?.classList.add("hidden");
    showCode?.classList.remove("hidden");

    divCode?.classList.add("!bg-[var(--is-blue-3)]");
    textCode?.classList.add("!text-white");

    textStripe?.classList.remove("!text-white");
    divStripe?.classList.remove("!bg-[var(--is-blue-3)]");
    textStripe?.classList.add("!text-[var(--is-blue-3)]");
}

function handleWallet() {
    const input = document.querySelector("#billingAddress");
    const value = input?.value.trim();

    if (!value) {
        alert("Please enter billing address");
        input?.focus();
        return;
    }

    paymentMethod = "wallet";

    const total = Number(totalEl?.textContent.replace("$", "").trim());

    const model = document.querySelector("#model");

    // if (walletBalance >= total) {
    //     nextBtn.onclick = () => {
    //         window.location.href = "/qr.html";
    //     };
    // } else {
    //     model?.classList.remove("hidden");
    // }

    const divCode = document.querySelector("#divCode");
    const textCode = document.querySelector("#textCode");
    const divStripe = document.querySelector("#divStripe");
    const textStripe = document.querySelector("#textStripe");

    divCode?.classList.remove("!bg-[var(--is-blue-3)]");
    textCode?.classList.remove("!text-white");

    divStripe?.classList.remove("!bg-[var(--is-blue-3)]");
    textStripe?.classList.remove("!text-white");
    textStripe?.classList.add("!text-[var(--is-blue-3)]");
}

document.addEventListener("click", (e) => {
    e.target.closest("#clickStripe") && handleStripe();
    e.target.closest("#code") && handleCoupon();
    e.target.closest("#wallet") && handleWallet();
});

var plusAdults = document.getElementById("plusAdults");
var minusAdults = document.getElementById("minusAdults");
var plusInfants = document.getElementById("plusInfants");
var minusInfants = document.getElementById("minusInfants");

var seniors = 0;
var infants = 0;
var adults = 0;
var child = 0;
var totalEl = document.getElementById("total");
var passengers = document.getElementById("passengers");

var plusSeniors = document.getElementById("plusSeniors");
var minusSeniors = document.getElementById("minusSeniors");
var seniorsEl = document.getElementById("seniors");
var seniors22 = document.getElementById("seniors22");

var adults42 = document.getElementById("adults42");
var adultsEl = document.getElementById("adults");
var infantsEl = document.getElementById("infants");
var infants42 = document.getElementById("infants42");

var plusChild = document.getElementById("plusChild");
var minusChild = document.getElementById("minusChild");
var childEl = document.getElementById("child");
var child22 = document.getElementById("child22");

const ADULT_PRICE = 42;
const CHILD_PRICE = 42;
const INFANT_PRICE = 42;
const SENIOR_PRICE = 22;

var subtotalEl = document.getElementById("subtotal");

function calculate() {
    return {
        adultsTotal: adults * ADULT_PRICE,
        childTotal: child * CHILD_PRICE,
        infantsTotal: infants * INFANT_PRICE,
        seniorsTotal: seniors * SENIOR_PRICE,
        passengersTotal: adults + child + infants + seniors
    };
}

function renderAll() {
    const calc = calculate();
    const subtotal = calc.adultsTotal + calc.childTotal + calc.infantsTotal + calc.seniorsTotal;

    if (adultsEl) adultsEl.textContent = adults;
    if (childEl) childEl.textContent = child;
    if (infantsEl) infantsEl.textContent = infants;
    if (seniorsEl) seniorsEl.textContent = seniors;

    if (adults42) adults42.textContent = `$ ${calc.adultsTotal}`;
    if (child22) child22.textContent = `$ ${calc.childTotal}`;
    if (infants42) infants42.textContent = `$ ${calc.infantsTotal}`;
    if (seniors22) seniors22.textContent = `$ ${calc.seniorsTotal}`;

    if (passengers) passengers.textContent = calc.passengersTotal;

    if (subtotalEl) subtotalEl.textContent = `$ ${subtotal}`;
    if (totalEl) totalEl.textContent = `$ ${subtotal}`;
}

function updateCounter(type, action) {
    if (type === "adults") {
        if (action === "plus") adults++;
        if (action === "minus" && adults > 0) adults--;
    }

    if (type === "child") {
        if (action === "plus") child++;
        if (action === "minus" && child > 0) child--;
    }

    if (type === "infants") {
        if (action === "plus") infants++;
        if (action === "minus" && infants > 0) infants--;
    }

    if (type === "seniors") {
        if (action === "plus") seniors++;
        if (action === "minus" && seniors > 0) seniors--;
    }

    renderAll();
}

plusAdults.onclick = () => updateCounter("adults", "plus");
minusAdults.onclick = () => updateCounter("adults", "minus");
plusChild.onclick = () => updateCounter("child", "plus");
minusChild.onclick = () => updateCounter("child", "minus");
plusInfants.onclick = () => updateCounter("infants", "plus");
minusInfants.onclick = () => updateCounter("infants", "minus");
plusSeniors.onclick = () => updateCounter("seniors", "plus");
minusSeniors.onclick = () => updateCounter("seniors", "minus");

renderAll();

function initCustomSelect() {
    document.querySelectorAll(".customSelect").forEach(select => {
        const selected = select.querySelector(".selected");
        const dropdown = select.querySelector(".dropdown");
        const selectedText = select.querySelector(".selectedText");
        const options = select.querySelectorAll(".option");

        selected.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        });

        options.forEach(option => {
            option.onclick = () => {
                selectedText.textContent = option.dataset.value;
                dropdown.classList.add("hidden");
            };
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(d => {
            d.classList.add("hidden");
        });
    });
}

let step = 0;

const isForm = document.getElementById("form");
var continueToPayment = document.getElementById("continueToPayment");
const step1 = document.getElementById("step-1");
const startSteps = document.getElementById("startSteps");

const lounge = document.getElementById("select");
const dateTrigger = document.getElementById("dateTrigger");
let selectedDateValue = null;
let selectedTimeValue = null;
const flightNumber = document.getElementById("flightNumber");

const firstStepFields = [
    {
        field: lounge,
        validate: v => v && v !== "select",
        message: "Please select a lounge"
    },
    {
        field: {
            get value() {
                return selectedDateValue;
            }
        },
        validate: v => !!v,
        message: "Please select a date"
    },
    {
        field: {
            get value() {
                return selectedTimeValue;
            }
        },
        validate: v => !!v,
        message: "Please select a time"
    },
    {
        field: flightNumber,
        validate: v => v,
        message: "Please select a flight number"
    }
];

function validateFirstStep() {
    for (let item of firstStepFields) {
        if (!item.validate(item.field.value)) {
            alert(item.message);
            return false;
        }
    }

    return true;
}

function SecondStep() {
    if (step === 0 && !validateFirstStep()) return;

    isForm.classList.add("hidden");
    startSteps.classList.remove("hidden");

    buildStepsData();
    currentStepIndex = 0;
    renderCurrentStep();
}

if (continueToPayment) {
    continueToPayment.onclick = (e) => {
        e.preventDefault();
        SecondStep();
    };
}

const stepsData = [];
const passengersData = [];
let currentStepIndex = 0;

function getFormData(form) {
    return {
        firstName: form.querySelector('[name="firstName"]')?.value || "",
        lastName: form.querySelector('[name="lastName"]')?.value || "",
        title: form.querySelector(".selectedText")?.textContent || ""
    };
}

function saveCurrentPassenger() {
    const container = document.getElementById("passengerForms");
    const form = container.querySelector("form");

    if (!form) return;

    const data = getFormData(form);

    const stepData = stepsData[currentStepIndex];

    if (!stepData) return;

    passengersData[currentStepIndex] = {
        type: stepData.type,
        index: stepData.index,
        ...data
    };
}

function nextPassenger() {
    saveCurrentPassenger();

    const isLast = currentStepIndex >= stepsData.length - 1;

    if (isLast) {
        goToPaymentStep();
        updateButtonTexts();
        return;
    }

    currentStepIndex++;
    renderCurrentStep();

    updateButtonTexts();
}

function buildStepsData() {
    stepsData.length = 0;

    for (let i = 1; i <= adults; i++) {
        stepsData.push({ type: "Adult", index: i });
    }

    for (let i = 1; i <= child; i++) {
        stepsData.push({ type: "Child", index: i });
    }

    for (let i = 1; i <= infants; i++) {
        stepsData.push({ type: "Infant", index: i });
    }
}

function renderCurrentStep() {
    const container = document.getElementById("passengerForms");

    const data = stepsData[currentStepIndex];

    container.innerHTML = createPassengerForm(data.type, data.index);

    initCustomSelect();

    updateButtonTexts();
}

function renderOrderSummary() {
    return `
        <div id="stripe" class="flex flex-col gap-[10px] md:gap-[20px]">
                                    <span class="text-[var(--is-blue-4)] font-semibold text-xl">${t("Order Summary:", "ملخص الطلب")}</span>
                                    <div
                                        class="rounded-[20px] bg-[var(--is-gray-11)] shadow-[0_2px_5px_var(--is-black-2)] py-[33px] px-[18px] flex justify-between items-end">
                                        <ul class="flex flex-col gap-2">
                                            <li class="text-xl text-[var(--is-blue-5)]">${t("Standard Lounge", "صالة قياسية")}
                                            </li>
                                            <li class="text-xl text-[var(--is-blue-5)]">${t("Adult", "بالغ")} : ${adults}</li>
                                            <li class="text-xl text-[var(--is-blue-5)]">${t("Child", "طفل")} : ${child}</li>
                                            <li class="text-xl text-[var(--is-blue-5)]">${t("Infant", "رضيع")} : ${infants}</li>
                                        </ul>
                                        <span class="text-xl font-bold">${totalEl.textContent}</span>
                                    </div>
                                </div>
    `;
}

function Title() {
    return `
    <div class="flex flex-col gap-[10px] md:gap-[20px] w-full">
                    <span class="text-[var(--is-blue)] text-md md:text-xl font-medium">${t("Title", "اللقب")}</span>
                    <div class="customSelect relative w-full">

                        <div
                            class="selected mt-[2.4px] flex gap-2 px-[15px] py-[7px] md:py-[12px] w-full text-[var(--is-gray-7)] relative flex items-center shadow-[0_1px_5px_var(--is-black-2)] bg-[var(--is-white-3)] rounded-[10px]">
                            <img src="/assets/icons/user.svg" width="16" height="16">
                            <span class="selectedText">Select</span>
                        </div>

                        <ul
                            class="dropdown hidden absolute w-full mt-2 shadow-[0_1px_5px_var(--is-black-2)] bg-[var(--is-white-3)] rounded-[10px] flex flex-col z-50">

                            <li class="option border-b-[#CFCFCF] border-b-2 p-[8px] cursor-pointer flex gap-[5px]"
                                data-value="Mr">
                                <img src="/assets/icons/user.svg" width="16" height="16">
                                <span>Mr</span>
                            </li>

                            <li class="option border-b-[#CFCFCF] border-b-2 p-[8px] cursor-pointer flex gap-[5px]"
                                data-value="Mrs">
                                <img src="/assets/icons/user.svg" width="16" height="16">
                                <span>Mrs</span>
                            </li>

                            <li class="option p-[8px] cursor-pointer flex gap-[5px]" data-value="Other">
                                <img src="/assets/icons/user.svg" width="16" height="16">
                                <span>Other</span>
                            </li>

                        </ul>
                    </div>
                </div>
    `
}

function payment() {
    return `
    <div id="showCode" class="hidden mt-5">
                                    <div class="flex flex-col gap-[30px]">
                                        <div class="flex flex-col gap-[20px]">
                                            <div class="flex gap-[12px]">
                                            <div
                                        class="relative flex-1 items-center shadow-[0_2px_5px_var(--is-black-2)] bg-[var(--is-white-3)] rounded-[10px]">
                                        <input type="number" id="inputCode"
                                            class="px-[15px] py-[12px] w-full placeholder:text-[var(--is-blue-5)] relative bg-[var(--is-white-3)] rounded-[10px]"
                                            placeholder="${t("Enter your 00 digit code", "أدخل الرمز المكوّن من 00 رقم")}" />
                                    </div>
                                                <div id="apply">
                                                    <div class="flex justify-center text-nowrap shadow-[0_2px_5px_var(--is-black-2)] !border-0 !rounded-[12px] px-10 bg-[var(--is-blue)] before:bg-[var(--is-blue-3)] transition-all duration-800
                                                                    border-3 px-9 py-3 before:bottom-0
                                                                    before:rounded-t-[50%] relative group rounded-full
                                                                    cursor-pointer overflow-hidden before:content-['']
                                                                    before:absolute before:left-0 before:w-full
                                                                    before:h-0 before:z-1 before:bottom-0
                                                                    before:transition-all before:duration-800
                                                                    hover:before:h-[180%]" title="Apply">
                                                        <div class="gap-[8px] relative z-1
                                                                        !text-[var(--is-blue-4)] text-xs md:text-base
                                                                        flex items-center !text-white font-semibold">
                                                            <span>${t("Apply", "قدّم")}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="flex">
                                                <div
                                                    class="rounded-[5px] bg-[var(--is-white-4)] py-[10px] px-[20px] flex gap-[10px] text-[var(--is-blue-3)]">
                                                    <Image src="/assets/icons/code.svg" alt="code" width={20}
                                                        height={20} />
                                                    <span>CASHBACK10</span>
                                                    <span>✕</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="py-[17px] px-[16px] bg-[var(--is-green-1)] rounded-[6px] flex flex-col">
                                            <div class="flex gap-1">
                                                <h2 class="text-xl font-medium">Cashback</h2>
                                                <Image src="/assets/icons/wallet.svg" alt="wallet" width={24}
                                                    height={24} />
                                            </div>
                                            <p class="text-xl font-medium text-[var(--is-gray-2)]">
                                            ${t("This purchase qualifies for cashback", "هذا الشراء مؤهل لاسترداد النقود")}
                                            </p>
                                            <p class="text-md font-normal text-[var(--is-gray-2)]">
${t(" You’ll earn 10% cashback, which is", "ستحصل على 10% استرجاع نقدي، وهو")}
                                                <span
                                                    class="text-[var(--is-blue-3)]">$1.40</span>
                                                    ${t("added to your account.", "تمت الإضافة إلى حسابك.")}
                                                    </p>
                                        </div>
                                    </div>
                                </div>
                                <div id="model"
                                    class="hidden fixed inset-0 flex justify-center items-center z-[999999] bg-[var(--is-blue-8)]">
                                    <div class="bg-white py-7 rounded-[18px]">
                                        <div class="flex flex-col gap-2 md:w-[850px]">
                                            <div class="flex justify-between px-[26px] text-[var(--is-blue-3)]">
                                                <h2 class="font-bold text-xl">
                                                 ${t("Split Payment", "الدفع المقسّم")}
                                                </h2>
                                                <span id="closeModel" class="cursor-pointer" title="close">✕</span>
                                            </div>
                                           <hr class="text-[var(--is-gray-17)] my-4" />
                                            <ul class="text-[var(--is-blue-3)] flex flex-col gap-3 px-[26px]">
                                                <li class="flex justify-between text-xl">
                                                    <p class="font-medium">${t("Total Amount", "المبلغ الإجمالي")}</p>
                                                    <p class="font-bold">${totalEl.textContent}</p>
                                                </li>
                                                <li class="flex justify-between text-xl">
                                                    <p class="font-medium">Wallet Balance</p>
                                                    <p class="font-bold">${walletBalance}</p>
                                                </li>
                                            </ul>
                                           <hr class="text-[var(--is-gray-17)] my-4" />
                                            <ul class="flex flex-col gap-3 px-[26px]">
                                                <li class="flex justify-between text-xl">
                                                    <p class="text-[var(--is-blue-3)] font-medium">
                                                    ${t("Remaining balance to Pay", "المتبقي للدفع")}
                                                    </p>
                                                    <p class="font-bold text-[var(--is-pink)]">
                                                        $15.71</p>
                                                </li>
                                                <li class="flex justify-between text-xl">
                                                    <p class="font-medium text-[var(--is-pink)]">
                                                    ${t("Remaining balance will be paid using stripe", "سيتم دفع الرصيد المتبقي باستخدام سترايب")}
                                                        </p>
                                                </li>
                                            </ul>
<hr class="text-[var(--is-gray-17)] my-4" />
                                            <div class="mt-4 flex justify-center gap-[12px] px-[26px]">
                                              <button
                                                     class="text-center hover:before:bg-[var(--is-pink)] border border-1 border-[var(--is-pink)] hover:text-white text-[var(--is-pink)] rounded-[15px] px-12 py-3 btn">
                                                     <div class="relative z-1 text-xs font-semibold">
                                                         <span>${t("Cancel", "إلغاء")}</span>
                                                     </div>
                                                 </button>
                                                 <button
                                                     class="text-center hover:before:bg-[var(--is-blue)] bg-[var(--is-pink)] text-white rounded-[15px] px-12 py-3 btn">
                                                     <div class="relative z-1 text-xs font-semibold">
                                                         <span>${t("Pay Now", "شراء الان")}</span>
                                                     </div>
                                                 </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `
}

function createPassengerForm(type, index) {
    return `
    <form id="step-1" class="passenger-form flex flex-col gap-[30px] md:gap-[32px]">
                                <span class="md:mt-[32px] text-[var(--is-blue-3)] text-xl font-medium">${type} ${index}
                                    ${t("Details", "التفااصيل")}</span>
                                <div class="flex gap-[10px] sm:gap-[30px] md:gap-[32px]">
                                ${Title()}
                                    <div class="flex flex-col gap-[10px] md:gap-[20px] w-full">
                                        <span class="text-[var(--is-blue-3)] text-md md:text-xl font-medium">${t("First Name", "الاسم الأول")}</span>
                                        <div
                                            class="text-[var(--is-blue-3)] relative flex items-center shadow-[0_1px_5px_var(--is-black-2)] bg-[var(--is-white-3)] rounded-[10px]">
                                            <input type="text" name="firstName"
                                                class="px-[15px] py-[7px] md:py-[12px] w-full text-[var(--is-blue-3)] relative bg-[var(--is-white-3)] rounded-[10px]"
                                                placeholder="${t("First Name", "الاسم الأول")}" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-[10px] md:gap-[20px] w-[50%]">
                                    <span class="text-[var(--is-blue)] text-md md:text-xl font-medium">${t("Last Name", "الاسم الأخير")}
                                    </span>
                                    <div
                                        class="text-[var(--is-gray-7)] relative flex items-center shadow-[0_1px_5px_var(--is-black-2)] bg-[var(--is-white-3)] rounded-[10px]">
                                        <input type="text"
                                            class="px-[15px] py-[7px] md:py-[12px] w-full text-[var(--is-gray-7)] relative bg-[var(--is-white-3)] rounded-[10px]"
                                            placeholder="${t("Last Name", "الاسم الأخير")}" />
                                    </div>
                                </div>
                            </form>
    `;
}

function goToPaymentStep() {

    isInPaymentStep = true;

    const lastCircle = steps[2].querySelector("div:last-child");
    const container = document.getElementById("passengerForms");
    const line = document.querySelector("#line");
    line.classList.add("last-line");

    lastCircle.classList.add("!bg-[var(--is-blue-3)]");

    container.innerHTML = `
        <div class="mt-5 md:mt-10 flex flex-col lg:flex-row gap-[20px] md:gap-[42px]">
        <div class="w-full order-2">
                        <div
                            class="relative w-full text-xl font-medium shadow-[0_2px_5px_var(--is-black-2)] rounded-[10px]">
                            <div class="flex flex-col gap-1 px-[15px] md:pb-[32px] md:pt-[12px] py-[12px]">
                            <div class="flex items-center gap-1">
                                <Image src="/assets/icons/map-black.svg" alt="map" class="w-[16px] h-[16px]" />
                                <span class="text-md text-[var(--is-blue)]">${t("Billing Address", "عنوان الفواتير")}</span>
                            </div>
                            <input id="billingAddress" type="number" placeholder="${t("Street 13 Asda Road", "شارع 13 طريق أسدا")}"
                                 class="text-md text-[var(--is-blue-5)] focus:outline-none focus:ring-0 focus:border-transparent" />
                                </div>
                                <div class="shadow-[0_12px_15px_var(--is-black)] ${t("right-0", "left-0")} top-0 absolute bg-[var(--is-blue-7)] w-3 h-full rounded-full">
                                </div>
                        </div>
                        </div>
                <div class="flex flex-col gap-[10px] md:gap-[50px] w-full order-1">
                    <div class="flex flex-col gap-[10px] md:gap-[20px] w-full">
                 <span class="text-[var(--is-blue-4)] font-semibold text-xl">${t("Select Payment Option:", "اختر خيار الدفع:")}</span>
                        <div class="flex flex-col md:flex-row gap-[20px]">
                                                        <div class="flex gap-3">
                                           <button id="clickStripe"
                                                     class="text-center hover:before:bg-[var(--is-blue)] bg-[var(--is-pink)] text-white rounded-[10px] md:rounded-[15px] w-full md:w-[unset] px-2 md:px-20 py-[12px] md:py-[15px] btn">
                                                     <div class="relative z-1 text-xs font-semibold">
                                                         <span>${t("Stripe", "ستريب")}</span>
                                                     </div>
                                                 </button>
                                                 <button id="wallet"
                                                     class="text-center hover:before:bg-[var(--is-pink)] border border-1 hover:text-white text-[var(--is-gray-14)] rounded-[10px] md:rounded-[15px] w-full md:w-[unset] px-2 md:px-20 py-[12px] md:py-[15px] btn">
                                                     <div class="relative z-1 text-xs font-semibold">
                                                         <span>${t("Wallet", "المحفظة")}</span>
                                                     </div>
                                                 </button>
                                             </div>
                        </div>
                    </div>
                    ${payment()}
                    <div class='hidden md:block'>
                    ${renderOrderSummary()}
                    </div>
                    </div>
                    <div class='md:hidden order-3'>
                     ${renderOrderSummary()}
                     </div>
            </div>
    `;

    updateButtonTexts();
}

document.addEventListener("input", (e) => {
    if (e.target.id === "billingAddress" && e.target.value < 0) {
        e.target.value = 0;
    }
});

nextBtn.addEventListener("click", () => {
    if (isInPaymentStep) {
        window.location.href = isArabic
            ? "/ar/qr.html"
            : "/en/qr.html";

        return;
    }

    nextPassenger();
});

var wallet = document.getElementById("wallet");
var model = document.getElementById("model");
document.addEventListener("click", (e) => {
    if (e.target.closest("#closeModel")) {
        const model = document.querySelector("#model");
        model?.classList.add("hidden");
    }
});

const steps = document.querySelectorAll(".step-item");
const prevBtns = document.querySelectorAll("#prevBtn");

const STATE = {
    FORM: "form",
    STEPS: "steps",
    PAYMENT: "payment"
};

const textTitle = "";
let currentState = STATE.FORM;

let isStripeSelected = false;

prevBtns.forEach((prevBtn) => {
    prevBtn.onclick = () => {

        const lastCircle = steps[2].querySelector("div:last-child");
        const line = document.querySelector("#line");
        line.classList.remove("last-line");

        lastCircle.classList.remove("!bg-[var(--is-blue-3)]");

        if (isInPaymentStep) {
            isInPaymentStep = false;
            currentStepIndex = stepsData.length - 1;
            renderCurrentStep();
            return;
        }

        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderCurrentStep();
            return;
        }

        startSteps.classList.add("hidden");
        isForm.classList.remove("hidden");
    };
});

if (nextBtn) {
    nextBtn.onclick = () => {
        nextPassenger();
    };
}

function updateButtonTexts() {
    const text = document.querySelector("#nextBtn span");
    if (!text) return;

    // Payment step
    if (isInPaymentStep) {
        text.textContent = t("Proceed to Pay", "إتمام الدفع");
        return;
    }

    const isLast = currentStepIndex >= stepsData.length - 1;

    textContent = isLast ? t("Continue", "متابعة") : t("Next", "التالي");
}

const dateModal = document.getElementById("dateModal");
const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

let selectedDate = null;
let currentDate = new Date();

const today = new Date();
today.setHours(0, 0, 0, 0);

dateTrigger.onclick = () => {
    dateModal.classList.remove("hidden");
    renderCalendar(currentDate);
};

document.getElementById("confirmDate").onclick = () => {
    const finalDate = selectedDate || today;

    selectedDateValue = finalDate;

    dateTrigger.textContent = finalDate.toDateString();
    dateModal.classList.add("hidden");
};

dateModal.onclick = (e) => {
    if (e.target === dateModal) {
        dateModal.classList.add("hidden");
    }
};

document.getElementById("prevMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
};

document.getElementById("nextMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
};

function renderCalendar(date) {
    calendar.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    monthTitle.textContent =
        date.toLocaleString("en", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        dateObj.setHours(0, 0, 0, 0);

        const isPast = dateObj < today;

        const isToday =
            dateObj.getTime() === today.getTime();

        calendar.innerHTML += `
        <button 
            class="p-2 rounded-[8px] text-sm 
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:cursor-pointer hover:font-bold'}
            ${isToday && ' bg-[var(--is-blue-3)] font-bold text-white'}"
            ${isPast ? "disabled" : ""}
            onclick="selectDate('${year}', '${month}', '${day}')"
        >
            ${day}
        </button>
    `;
    }
}

function selectDate(y, m, d) {
    const date = new Date(y, m, d);

    if (date < today) return;

    selectedDate = date;

    document.querySelectorAll("#calendar button").forEach(btn => {
        btn.classList.remove("bg-[var(--is-blue-3)]", "text-white");
    });

    event.target.classList.add("bg-[var(--is-blue-3)]", "text-white");
}

function createWheel(container, max, type) {
    container.innerHTML = "";

    for (let i = 0; i <= max; i++) {
        const item = document.createElement("div");

        item.className = "time-item";
        item.textContent = String(i).padStart(2, "0");

        if (
            (type === "hour" && i === selectedHour) ||
            (type === "minute" && i === selectedMinute)
        ) {
            item.classList.add("active");
        }

        container.appendChild(item);
    }
}

createWheel(hourWheel, 23);
createWheel(minuteWheel, 59);

const now = new Date();

let selectedHour = now.getHours();
let selectedMinute = now.getMinutes();

function updateWheel(wheel, type) {
    const items = wheel.querySelectorAll(".time-item");
    const wheelRect = wheel.getBoundingClientRect();

    let closest = null;
    let min = Infinity;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const diff = Math.abs(center - (wheelRect.top + wheelRect.height / 2));

        if (diff < min) {
            min = diff;
            closest = item;
        }
    });

    items.forEach(i => i.classList.remove("active"));

    if (closest) {
        closest.classList.add("active");

        if (type === "hour") selectedHour = +closest.textContent;
        if (type === "minute") selectedMinute = +closest.textContent;
    }
}

hourWheel.addEventListener("scroll", () => {
    requestAnimationFrame(() => updateWheel(hourWheel, "hour"));
});

minuteWheel.addEventListener("scroll", () => {
    requestAnimationFrame(() => updateWheel(minuteWheel, "minute"));
});

const openTime = document.getElementById("openTime");
const timeModal = document.getElementById("timeModal");
const doneTime = document.getElementById("doneTime");

openTime.onclick = () => {
    timeModal.classList.remove("hidden");
};

document.getElementById("doneTime").onclick = () => {
    const h = String(selectedHour).padStart(2, "0");
    const m = String(selectedMinute).padStart(2, "0");

    selectedTimeValue = `${h}:${m}`;

    timeText.textContent = selectedTimeValue;
    timeText.classList.remove("text-gray-400");

    timeModal.classList.add("hidden");
};

timeModal.onclick = (e) => {
    if (e.target === timeModal) {
        timeModal.classList.add("hidden");
    }
};

function scrollToCurrent() {
    const hourItem = hourWheel.querySelectorAll(".time-item")[selectedHour];
    const minuteItem = minuteWheel.querySelectorAll(".time-item")[selectedMinute];

    if (hourItem) {
        hourItem.scrollIntoView({ block: "center" });
    }

    if (minuteItem) {
        minuteItem.scrollIntoView({ block: "center" });
    }
}

openTime.onclick = () => {
    timeModal.classList.remove("hidden");

    setTimeout(() => {
        scrollToCurrent();
        updateWheel(hourWheel, "hour");
        updateWheel(minuteWheel, "minute");
    }, 50);
};