/**
 * Coop Lounge - Footer Web Component
 * Usage: <coop-footer lang="en" currency="USD $"></coop-footer>
 *
 * Attributes:
 *   lang     : "en" (default) | "ar"
 *   currency : "USD $" (default) | "EUR €" | "GBP £"
 */

class CoopFooter extends HTMLElement {

  static get observedAttributes() {
    return ['lang', 'currency'];
  }

  get baseLang() {
    const path = window.location.pathname;
    if (path.includes('/ar/')) return '/ar';
    return '/en';
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  get lang() { return this.getAttribute('lang') || 'en'; }
  get currency() { return this.getAttribute('currency') || 'USD $'; }

  get isArabic() {
    return this.lang === 'ar';
  }

  _render() {
    this.innerHTML = `
<footer class="bg-[var(--is-black-1)]">
  <div class="overflow-hidden sections-marign-top text-white py-10 md:py-20 text-center flex flex-col gap-8 md:gap-20">

    <!-- Top CTA -->
    <div class="container flex flex-col gap-8">
      <p class="text-xl md:text-4xl font-bold">
      ${this.isArabic ? ' اذهب إلى أين' : 'Go where'} <span class="text-[var(--is-pink)]">TravelRoam</span> ${this.isArabic ? ' يأخذك.' : 'takes you.'}
      </p>
      <div class="flex justify-center">
        <div class="relative dropdown-wrapper w-full md:w-[70%]">
          <div class="relative border border-white rounded-[12px] md:rounded-[5px] flex items-center justify-between gap-3">
            <img src="../../assets/icons/eSIM.svg" alt="eSIM" class="px-5 absolute" />
            <input type="text"
              class="px-12 z-1 w-full text-white placeholder:text-white py-4 outline-none focus:outline-none"
              placeholder="${this.isArabic ? "إلى أين أنت ذاهب؟" : 'Where are you going?'}"
              id="destination-input-2"
              oninput="filterDestinations(this.value, this)"
              onfocus="openDestinations(this)" />
            <div class="absolute ${this.isArabic ? "left-0" : 'right-0'} px-5">
              <img src="../../assets/icons/search.svg" alt="search" />
            </div>
          </div>
               <ul id="destination-list-2"
                                    class="shadow-2xl dropdown-list !block !px-0 absolute w-full mt-2 rounded-[12px] !bg-white overflow-hidden z-50">
                                </ul>
        </div>
      </div>
    </div>

    <!-- Logo + Description -->
    <div class="container">
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-50">
        <a href="index.html">
          <img alt="Golden Esim" src="../../assets/icons/logo-pink.svg" class="h-10 md:h-[unset]" />
        </a>
        <p class="text-gray-500 md:text-white mt-3 text-center md:text-start text-md font-medium">
        ${this.isArabic ? 'نحن نقدم باقات eSIM ميسورة التكلفة وسهلة الاستخدام في أكثر من 200 دولة حول العالم. أقل تعقيدًا، صفقات أفضل على الإنترنت في الخارج.' : 'We provide affordable, easy to use eSIM bundles in over 200+ countries worldwide. Less fuss, better deals on internet abroad.'}          
        </p>
      </div>
    </div>

    <hr class="hidden md:block" />

    <!-- Links Grid -->
    <div class="text-gray-500 md:text-white container-footer-mobile container flex justify-between flex-col md:flex-row gap-10 md:gap-5 py-3 text-center md:text-start">

      <!-- Popular Countries -->
      <div>
        <h5 class="font-bold mb-3 text-capitalize text-lg">${this.isArabic ? "الدول الشهيرة" : 'Popular Countries'}</h5>
        <ul class="flex flex-col gap-2">
          <li><a title="${this.isArabic ? "تركيا" : 'Turkey'}"       class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/VFI=/param/">${this.isArabic ? "تركيا" : 'Turkey'}</a></li>
          <li><a title="${this.isArabic ? "الولايات المتحدة الأمريكية" : 'USA'}"          class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/VVM=/param/">${this.isArabic ? "الولايات المتحدة الأمريكية" : 'USA'}</a></li>
          <li><a title="${this.isArabic ? "الإمارات" : 'UAE'}"          class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/QUU=/param/">${this.isArabic ? "الإمارات" : 'UAE'}</a></li>
          <li><a title="${this.isArabic ? "المملكة العربية السعودية" : 'Saudi Arabia'}" class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/U0E=/param/">${this.isArabic ? "المملكة العربية السعودية" : 'Saudi Arabia'}</a></li>
          <li><a title="${this.isArabic ? "فرنسا" : 'France'}"       class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/RlI=/param/">${this.isArabic ? "فرنسا" : 'France'}</a></li>
          <li><a title="${this.isArabic ? "المملكة المتحدة" : 'UK'}"           class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/R0I=/param/">${this.isArabic ? "المملكة المتحدة" : 'UK'}</a></li>
          <li><a title="${this.isArabic ? "إسبانيا" : 'Spain'}"        class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/RVM=/param/">${this.isArabic ? "إسبانيا" : 'Spain'}</a></li>
          <li><a title="${this.isArabic ? "إيطاليا" : 'Italy'}"        class="nav-link" href="https://goldenesim.com/chooseBundlesPlan/type/country/id/SVQ=/param/">${this.isArabic ? "إيطاليا" : 'Italy'}</a></li>
        </ul>
      </div>

      <!-- Menu -->
      <div>
        <h5 class="font-bold mb-3 text-capitalize text-lg">${this.isArabic ? "القائمة" : 'Menu'}</h5>
        <ul class="flex flex-col gap-2">
          <li><a title="${this.isArabic ? "حول" : 'About'}" class="nav-link" href="${this.baseLang}/about.html">${this.isArabic ? "حول" : 'About'}</a></li>
          <li><a title="${this.isArabic ? "التوافق" : 'Compatibility'}" class="nav-link" href="${this.baseLang}/compatibility.html">${this.isArabic ? "التوافق" : 'Compatibility'}</a></li>
          <li><a title="${this.isArabic ? "الأسئلة الشائعة" : 'FAQ'}" class="nav-link" href="${this.baseLang}/faq.html">${this.isArabic ? "الأسئلة الشائعة" : 'FAQ'}</a></li>
          <li><a title="${this.isArabic ? "اتصال" : 'Contact'}" class="nav-link" href="${this.baseLang}/contact.html">${this.isArabic ? "اتصال" : 'Contact'}</a></li>
          <li><a title="${this.isArabic ? "مدونة" : 'Blog'}" class="nav-link" href="${this.baseLang}/blog.html">${this.isArabic ? "مدونة" : 'Blog'}</a></li>
          <li><a title="${this.isArabic ? "تسجيل الدخول / الحساب" : 'Login / Account'}" class="nav-link" href="${this.baseLang}/login.html">${this.isArabic ? "تسجيل الدخول / الحساب" : 'Login / Account'}</a></li>
        </ul>
      </div>

      <!-- Useful Information -->
      <div>
        <h5 class="font-bold mb-3 text-capitalize text-lg">${this.isArabic ? "المعلومات المفيدة" : 'Useful Information'}</h5>
        <ul class="flex flex-col gap-2">
          <li><a title="${this.isArabic ? "ما هي بطاقة eSIM" : 'What is an eSIM'}" class="nav-link" href="${this.baseLang}/about.html">${this.isArabic ? "ما هي بطاقة eSIM" : 'What is an eSIM'}</a></li>
          <li><a title="${this.isArabic ? "دليل التثبيت" : 'Installation Guide'}" class="nav-link" href="">${this.isArabic ? "دليل التثبيت" : 'Installation Guide'}</a></li>
          <li><a title="${this.isArabic ? "سياسة الاستخدام المقبول" : 'Acceptable Use Policy'}" class="nav-link" href="${this.baseLang}/acceptable-use-policy.html">${this.isArabic ? "سياسة الاستخدام المقبول" : 'Acceptable Use Policy'}</a></li>
          <li><a title="${this.isArabic ? "سياسة الشكاوى" : 'Complaints Policy'}" class="nav-link" href="${this.baseLang}/complaints-policy.html">${this.isArabic ? "سياسة الشكاوى" : 'Complaints Policy'}</a></li>
          <li><a title="${this.isArabic ? "سياسة الخصوصية" : 'Privacy policy'}" class="nav-link" href="${this.baseLang}/privacy-policy.html">${this.isArabic ? "سياسة الخصوصية" : 'Privacy policy'}</a></li>
          <li><a title="${this.isArabic ? "شروط الخدمة" : 'Terms of service'}" class="nav-link" href="${this.baseLang}/terms-of-service.html">${this.isArabic ? "شروط الخدمة" : 'Terms of service'}</a></li>
        </ul>
      </div>

      <!-- Social Media + Dropdowns -->
      <div>
        <h5 class="font-bold mb-3 text-capitalize text-lg">${this.isArabic ? "وسائل التواصل الاجتماعي" : 'Social Media'}</h5>
        <ul class="flex justify-center md:justify-start gap-[12px]">
          <li><a href="" title=""><img src="../../assets/icons/meta.svg" alt="meta" /></a></li>
          <li><a href="" title=""><img src="../../assets/icons/instgram.svg" alt="instagram" /></a></li>
          <li><a href="" title=""><img src="../../assets/icons/tiktok.svg" alt="tiktok" /></a></li>
        </ul>

        <div class="flex flex-col gap-3 mt-10">
          <a title="${this.isArabic ? "الإعدادات" : 'Settings'}" class="nav-link" href="https://goldenesim.com/term-conditions">${this.isArabic ? "الإعدادات" : 'Settings'}</a>

          <!-- Language dropdown -->
          <div class="flex justify-center md:justify-start gap-3">
          <div class="flex">
            <div class="relative dropdown-wrapper">
              <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
                <span class="font-medium text-lg selected-value">${this.lang === 'ar' ? 'العربية' : 'English'}</span>
                <img src="../assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
              </div>
              <ul class="px-22 dropdown-list text-md font-semibold rounded-[8px] border border-gray-500 flex flex-col items-center gap-3 absolute top-11 w-full bg-[var(--is-blue-1)] backdrop-blur-md py-5">
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'العربية')"><a href="../ar/index.html">العربية</a></li>
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'English')"><a href="/index.html">English</a></li>
              </ul>
            </div>
          </div>

          <!-- Currency dropdown -->
          <div class="flex">
            <div class="relative flex justify-center dropdown-wrapper">
              <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
                <span class="font-medium text-lg selected-value">${this.currency}</span>
                <img src="../assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
              </div>
              <ul class="dropdown-list">
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'USD $')">USD $</li>
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'EUR €')">EUR €</li>
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'GBP £')">GBP £</li>
              </ul>
            </div>
          </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="flex flex-col gap-10">
      <hr />
      <div class="container flex gap-6 flex-col md:flex-row items-center justify-between">
        <p class="text-gray-500 md:text-white">Copyright 2026. TravelRoam Limited. All Rights Reserved.</p>
        <ul class="flex gap-4 items-center">
          <li><img src="../../assets/icons/apple-pay.svg"  alt="Apple Pay"  width="49" height="27" /></li>
          <li><img src="../../assets/icons/google-pay.svg" alt="Google Pay" width="49" height="27" /></li>
          <li><img src="../../assets/icons/visa.svg"       alt="Visa"       width="49" height="27" /></li>
          <li><img src="../../assets/icons/mastercard.svg" alt="Mastercard" width="49" height="27" /></li>
        </ul>
      </div>
    </div>

  </div>
</footer>`;
  }
}

customElements.define('coop-footer', CoopFooter);