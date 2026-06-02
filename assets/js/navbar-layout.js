/**
 * Coop Lounge - Navbar Web Component
 * Usage: <coop-navbar active-page="about" lang="en" currency="USD $"></coop-navbar>
 *
 * الـ dropdown logic (toggleDropdown / selectItem / click-outside) موجودة
 * في navbar-layout.js وتشتغل على document-level — الـ component ما يتدخل.
 * الـ mobile hamburger بس عنده listener خاص لأنو ما في global function له.
 */

class CoopNavbar extends HTMLElement {

  static get observedAttributes() {
    return ['active-page', 'lang', 'currency'];
  }

  connectedCallback() {
    this._render();
    this._bindMobileToggle();
  }

  attributeChangedCallback() {
    this._render();
    this._bindMobileToggle();
  }

  get activePage() { return this.getAttribute('active-page') || ''; }
  get lang() { return this.getAttribute('lang') || 'en'; }
  get currency() { return this.getAttribute('currency') || 'USD $'; }

  _active(page) {
    const path = window.location.pathname;
    const isActive = path.includes(page) || this.activePage === page;
    return isActive ? 'text-[var(--is-gold)]' : '';
  }

  get isArabic() {
    return this.lang === 'ar';
  }

  get currentPage() {
    let path = window.location.pathname;

    path = path.replace(/^\/(ar|en)/, '');

    if (path === '' || path === '/') {
      return '/index.html';
    }

    return path;
  }

  _navBgClass() {
    const path = window.location.pathname;

    const backgrounds = {
      'lounge-pass': 'bg-[var(--is-blue)]',
      'steps': 'bg-[var(--is-blue)]',
      'qr': 'bg-[var(--is-blue)]',
      'checkout': 'bg-[var(--is-blue)]',
      'purchase-details': 'bg-[var(--is-blue)]',
    };

    const matched = Object.keys(backgrounds).find(key =>
      path.includes(key)
    );

    return matched ? backgrounds[matched] : '';
  }

  _render() {
    this.innerHTML = `
<nav class="z-9 text-white navbar transition duration-300 w-full py-[33px] ${this._navBgClass()}">
  <div class="container z-1">
    <div class="flex w-full">
      <div class="w-full flex items-center justify-between">

        <!-- Logo -->
        <a href="index.html" title="Coop Lounge">
          <img src="/assets/icons/logo.svg" alt="logo" width="170" height="41" class="object-cover" />
        </a>

          <div class="flex gap-2 lg:hidden">
               <button title=${this.isArabic ? "تسجيل الدخول" : 'Login'} class="md:hidden before:bg-white border-1 border-white rounded-[5px] hover:text-black px-3 py-2 btn">
              <div class="text-base text-nowrap relative z-1 font-bold"><span>${this.isArabic ? "تسجيل الدخول" : 'Login'}</span></div>
            </button>
      <!-- Mobile Hamburger -->
      <div class="inset-y-0 left-0 flex items-center">
        <button type="button" class="coop-hamburger is-style-menu text-white relative inline-flex items-center justify-center rounded-md p-2 hover:bg-white/5 focus:outline-none">
          <span class="sr-only">Open main menu</span>
          <svg class="coop-icon-open size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg class="coop-icon-close size-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex gap-[91px] items-center">
          <div class="mt-5 lg:mt-0 flex flex-col lg:flex-row items-center gap-[30px] relative">

            <button class="before:bg-white border-1 border-white rounded-[5px] hover:text-black px-5 py-2 btn" title=${this.isArabic ? 'دليل التثبيت' : 'Installation Guide'}>
              <div class="text-base relative z-1 font-bold"><span>${this.isArabic ? 'دليل التثبيت' : 'Installation Guide'}</span></div>
            </button>

            <button title=${this.isArabic ? "تسجيل الدخول" : 'Login'} class="before:bg-white border-1 border-white rounded-[5px] hover:text-black px-5 py-2 btn">
              <div class="text-base relative z-1 font-bold"><span>${this.isArabic ? "تسجيل الدخول" : 'Login'}</span></div>
            </button>

            <!-- Menu dropdown -->
            <div class="relative flex justify-center dropdown-wrapper">
              <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)" title="Menu">
                <span class="font-medium text-lg selected-value">${this.isArabic ? "القائمة" : 'Menu'}</span>
                <div class="dropdown-arrow flex items-center gap-2 cursor-pointer relative">
                  <div class="flex flex-col gap-[3.5px] mt-[1.5px] menu-icon">
                    <div class="menu-line top-line bg-white w-[15px] h-[3px]"></div>
                    <div class="menu-line mid-line bg-white w-[15px] h-[3px]"></div>
                    <div class="menu-line bot-line bg-white w-[15px] h-[3px]"></div>
                  </div>
                </div>
              </div>
              <ul class="dropdown-list">
                <li class="${this._active('marketplace')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Marketplace')"><a href='marketplace.html'>${this.isArabic ? "سوق" : 'Marketplace'}</a></li>
                <li class="${this._active('about')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer ${this._active('about')}" onclick="selectItem(this,'About')"><a href="about.html">${this.isArabic ? "حول" : 'About'}</a></li>
                <li class="${this._active('compatibility')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer ${this._active('compatibility')}" onclick="selectItem(this,'Compatibility')"><a href="compatibility.html">${this.isArabic ? "التوافق" : 'Compatibility'}</a></li>
                <li class="${this._active('faq')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer ${this._active('faq')}" onclick="selectItem(this,'FAQ')"><a href="faq.html">${this.isArabic ? "الأسئلة الشائعة" : 'FAQ'}</a></li>
                <li class="${this._active('blog')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer ${this._active('blog')}" onclick="selectItem(this,'Blogs')"><a href="blog.html">${this.isArabic ? "المدونة" : 'Blogs'}</a></li>
                <li class="${this._active('contact')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Contact')"><a href="contact.html">${this.isArabic ? "اتصال" : 'Contact'}</a></li>
                <li class="${this._active('login')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Login')">${this.isArabic ? "تسجيل الدخول" : 'Login'}</li>
              </ul>
            </div>

            <!-- Language dropdown -->
            <div class="relative flex justify-center dropdown-wrapper">
              <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
                <span class="font-medium text-lg selected-value">${this.lang === 'ar' ? 'العربية' : 'English'}</span>
                <img src="/assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
              </div>
              <ul class="dropdown-list">
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'العربية')"><a href="/ar${this.currentPage}">العربية</a></li>
                <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'English')"><a href="/en${this.currentPage}">English</a></li>
              </ul>
            </div>

            <!-- Currency dropdown -->
            <div class="relative flex justify-center dropdown-wrapper">
              <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
                <span class="font-medium text-lg selected-value">${this.currency}</span>
                <img src="/assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
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

    <!-- Mobile Menu -->
    <div class="coop-mobile-menu hidden mt-4 rounded-lg bg-white lg:hidden">
      <div class="flex flex-col gap-2 text-black space-y-1 px-2 py-3">

        <!-- Mobile Menu dropdown -->
        <div class="relative flex dropdown-wrapper">
          <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)" title="menu">
            <span class="font-medium text-lg selected-value">Menu</span>
            <div class="dropdown-arrow flex items-center gap-2 cursor-pointer relative">
              <div class="flex flex-col gap-[3.5px] mt-[1.5px] menu-icon">
                <div class="menu-line top-line w-[15px] h-[3px]"></div>
                <div class="menu-line mid-line w-[15px] h-[3px]"></div>
                <div class="menu-line bot-line w-[15px] h-[3px]"></div>
              </div>
            </div>
          </div>
          <ul class="dropdown-list text-md font-semibold rounded-[8px] border border-gray-500 flex flex-col items-center gap-3 absolute top-11 px-22 !w-[20%] bg-[var(--is-blue-1)] backdrop-blur-md py-5">
            <li class="${this._active('marketplace')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Marketplace')">${this.isArabic ? "سوق" : 'Marketplace'}</li>
            <li class="${this._active('about')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'About')"><a href="about.html">${this.isArabic ? "حول" : 'About'}</a></li>
            <li class="${this._active('compatibility')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Compatibility')"><a href="compatibility.html">${this.isArabic ? "التوافق" : 'Compatibility'}</a></li>
            <li class="${this._active('faq')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'FAQ')"><a href="faq.html">${this.isArabic ? "الأسئلة الشائعة" : 'FAQ'}</a></li>
            <li class="${this._active('blog')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Blogs')"><a href="blog.html">${this.isArabic ? "المدونة" : 'Blogs'}</a></li>
            <li class="${this._active('contact')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Contact')"><a href="contact.html">${this.isArabic ? "اتصال" : 'Contact'}</a></li>
            <li class="${this._active('login')} hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'Login')">${this.isArabic ? "تسجيل الدخول" : 'Login'}</li>
          </ul>
        </div>

        <!-- Mobile Language dropdown -->
        <div class="relative flex dropdown-wrapper">
          <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
            <span class="font-medium text-lg selected-value">${this.lang === 'ar' ? 'العربية' : 'English'}</span>
            <img src="/assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
          </div>
          <ul class="dropdown-list text-md font-semibold rounded-[8px] border border-gray-500 flex flex-col items-center gap-3 absolute top-11 px-22 !w-[20%] bg-[var(--is-blue-1)] backdrop-blur-md py-5">
            <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'العربية')"><a href="/ar${this.currentPage}">العربية</a></li>
            <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'English')"><a href="/ar${this.currentPage}">English</a></li>
          </ul>
        </div>

        <!-- Mobile Currency dropdown -->
        <div class="relative flex dropdown-wrapper">
          <div class="flex items-center gap-2 cursor-pointer relative" onclick="toggleDropdown(this)">
            <span class="font-medium text-lg selected-value">${this.currency}</span>
            <img src="/assets/icons/arraw.svg" alt="arrow" class="dropdown-arrow w-[12px] h-[6px]" />
          </div>
          <ul class="dropdown-list text-md font-semibold rounded-[8px] border border-gray-500 flex flex-col items-center gap-3 absolute top-11 px-22 !w-[20%] bg-[var(--is-blue-1)] backdrop-blur-md py-5">
            <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'USD $')">USD $</li>
            <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'EUR €')">EUR €</li>
            <li class="hover:text-[var(--is-gold)] text-nowrap cursor-pointer" onclick="selectItem(this,'GBP £')">GBP £</li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</nav>`;
  }

  _bindMobileToggle() {
    const oldBtn = this.querySelector('.coop-hamburger');
    if (!oldBtn) return;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.replaceWith(newBtn);

    newBtn.addEventListener('click', () => {
      const menu = this.querySelector('.coop-mobile-menu');
      const iconOpen = this.querySelector('.coop-icon-open');
      const iconClose = this.querySelector('.coop-icon-close');

      const isOpen = !menu.classList.contains('hidden'); // المنيو مفتوح هلق؟

      if (isOpen) {
        // اقفل
        menu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else {
        // افتح
        menu.classList.remove('hidden');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });
  }
}

customElements.define('coop-navbar', CoopNavbar);