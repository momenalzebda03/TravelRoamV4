/**
 * Coop Lounge - Navbar Web Component
 * Usage: <coop-navbar active-page="about" lang="en" currency="USD $"></coop-navbar>
 *
 * الـ dropdown logic (toggleDropdown / selectItem / click-outside) موجودة
 * في navbar-layout.js وتشتغل على document-level — الـ component ما يتدخل.
 * الـ mobile hamburger بس عنده listener خاص لأنو ما في global function له.
 */

class CoopSideBar extends HTMLElement {

    static get observedAttributes() {
        return ['active-page', 'lang', 'currency'];
    }

    attributeChangedCallback() {
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    get activePage() { return this.getAttribute('active-page') || ''; }
    get lang() { return this.getAttribute('lang') || 'en'; }

    _active(page) {
        const path = window.location.pathname;
        const isActive = path.includes(page) || this.activePage === page;
        return isActive ? 'text-[var(--is-gold)]' : '';
    }

    get isArabic() {
        return this.lang === 'ar';
    }

    get baseLang() {
        const path = window.location.pathname;
        if (path.includes('/ar/')) return '/ar';
        return '/en';
    }

    _render() {
        const path = window.location.pathname;
        const baseLang = this.baseLang;

        const isActive = (page) => path.includes(page)
            ? 'opacity-[1] !text-white'
            : 'opacity-[0.6]';

        this.innerHTML = `           
                <ul class="h-full bg-[var(--is-pink)] rounded-[23px] py-[42px] px-[40px] flex flex-col gap-[40px]">
                    <li class="flex">
                        <a title="${this.isArabic ? "لوحىة التحكم" : 'Dashboard'}" href="home.html" class="active flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('home')}">
                            <img src="/assets/icons/dashboard.svg" alt="dashboard" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "لوحة التحكم" : 'Dashboard'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "الحساب" : 'Account'}" href="account.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('account')}">
                            <img src="/assets/icons/account.svg" alt="account" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "الحساب" : 'Account'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "بطاقات eSIM الخاصة بي" : 'My eSIMs'}" href="esim.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('esim')}">
                            <img src="/assets/icons/sim.svg" alt="sim" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "بطاقات eSIM الخاصة بي" : 'My eSIMs'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "متجر eSIM" : 'eSIM Store'}" href="esim.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('esim')}">
                            <img src="/assets/icons/sim.svg" alt="sim" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "متجر eSIM" : 'eSIM Store'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "سوق" : 'Marketplace'}" href="${baseLang}/marketplace.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('marketplace')}">
                            <img src="/assets/icons/marketplace.svg" alt="marketplace" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "سوق" : 'Marketplace'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "الإشعارات" : 'Notifications'}" href="notifications.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('notifications')}">
                            <img src="/assets/icons/notifications.svg" alt="notifications" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "الإشعارات" : 'Notifications'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "الدفع" : 'Payment'}" href="payment.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('payment')}">
                            <img src="/assets/icons/payment.svg" alt="payment" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "الدفع" : 'Payment'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "الدعم الفني" : 'Support'}" href="support.html" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('support')}">
                            <img src="/assets/icons/support.svg" alt="support" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "الدعم الفني" : 'Support'}</span>
                        </a>
                    </li>
                    <li class="flex">
                        <a title="${this.isArabic ? "تسجيل الخروج" : 'Logout'}" href="Logout" class="flex items-center gap-[17px]
                                    text-white hover:opacity-[1] opacity-[0.6] ${isActive('logout')}">
                            <img src="/assets/icons/logout.svg" alt="Logout" width="22" height="22" />
                            <span class="text-nowrap">${this.isArabic ? "تسجيل الخروج" : 'Logout'}</span>
                        </a>
                    </li>
                </ul>
        `;
    }
}

customElements.define('coop-sidebar', CoopSideBar);