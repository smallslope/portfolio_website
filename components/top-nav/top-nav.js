class TopNav extends HTMLElement {
    svgText;
    constructor(){
        super()
        this.attachShadow({ mode: "open"})
        this.handleResize = this.handleResize.bind(this);
    }
    async connectedCallback() {
        const res = await fetch("./components/top-nav/top-nav.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("top-nav-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setupMobileMenu();
        this.setupNav();
        this.setupExternalLinks();
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        document.addEventListener('open-page', (e) => {
            if (e.detail.source === 'project-card') {
                const links = this.shadowRoot.querySelectorAll('.top-nav__link');
                links.forEach(link => link.classList.remove('active'));
            }
        });
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }
    //Each link is linked to the appropriate data attribute (data-page)
    setupNav(){
        const links = this.shadowRoot.querySelectorAll('.top-nav__link[data-page], .top-nav__title[data-page]');
        links.forEach(link => {
            const page = link.dataset.page;
            this.openPage(link, page); 
        })
    }
    setupMobileMenu(){
        this.menu = this.shadowRoot.querySelector('.top-nav__menu');
        this.menuIcon = this.shadowRoot.querySelector('menu-icon');

        if (!this.menu || !this.menuIcon) return;

        this.menuIcon.addEventListener('toggle', (event) => {
            if (window.innerWidth >= 768) return;

            this.menu.style.display = event.detail.open ? 'flex' : 'none';
        });
    }
    setupExternalLinks(){
        const cvLink = this.shadowRoot.querySelector('#cv-link');
        if (!cvLink) return;

        cvLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.open('/assets/pdfs/cv/maya-osaka-cv.pdf', '_blank');
            this.closeMobileMenu();
        });
    }
    setActiveLink(clickedLink, page){
        const links = this.shadowRoot.querySelectorAll('.top-nav__link');
        if(clickedLink.classList.contains('top-nav__link')){
            links.forEach(link => link.classList.remove('active'));
            if (clickedLink.dataset.page !== page) return;
            clickedLink.classList.add('active');
        }
        else if (clickedLink.classList.contains('top-nav__title')) {
            const homeLink = this.shadowRoot.querySelector('.top-nav__link[data-page="homePage"]');
            console.log('homeLink Active')
            if (!homeLink) return;
            links.forEach(link => link.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }
    //When a link is clicked it triggers the dispathOpenPage function
    openPage(navLink, page){
        if (!page) return;

        navLink.addEventListener('click', () => {
            this.dispatchOpenPage(page);
            this.setActiveLink(navLink,page);
            this.closeMobileMenu();
        })
        
    }
    closeMobileMenu(){
        if (window.innerWidth >= 768 || !this.menu || !this.menuIcon) return;

        this.menu.style.display = 'none';
        this.menuIcon.removeAttribute('open');
        this.menuIcon._updateIconVisibility();
    }
    handleResize(){
        if (!this.menu || !this.menuIcon) return;

        if (window.innerWidth >= 768) {
            this.menu.style.display = '';
            this.menuIcon.removeAttribute('open');
            this.menuIcon._updateIconVisibility();
            return;
        }

        this.menu.style.display = this.menuIcon.hasAttribute('open') ? 'flex' : 'none';
    }
    //dispathes the event listener outside of the shadowDOM
    dispatchOpenPage(page){
        console.log('clicked', page);
        this.dispatchEvent(
            new CustomEvent('open-page', {
                bubbles: true,
                composed: true,
                detail:{
                    page
                }
            }));
    }
}
customElements.define("top-nav", TopNav);
    
