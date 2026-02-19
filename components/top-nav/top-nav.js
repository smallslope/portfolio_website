class TopNav extends HTMLElement {
    svgText;
    constructor(){
        super()
        this.attachShadow({ mode: "open"})
    }
    async connectedCallback() {
        const res = await fetch("./components/top-nav/top-nav.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("top-nav-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setupNav();
        document.addEventListener('open-page', (e) => {
            if (e.detail.source === 'project-card') {
                const links = this.shadowRoot.querySelectorAll('.top-nav__link');
                links.forEach(link => link.classList.remove('active'));
            }
        });
    } 
    //Each link is linked to the appropriate data attribute (data-page)
    setupNav(){
        const links = this.shadowRoot.querySelectorAll('.top-nav__link, .top-nav__title');
        links.forEach(link => {
            const page = link.dataset.page;
            this.openPage(link, page); 
        })
    }
    setActiveLink(clickedLink, page){
        const links = this.shadowRoot.querySelectorAll('.top-nav__link');
        if(window.innerWidth < 768){

        }
        else{
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
        
    }
    //When a link is clicked it triggers the dispathOpenPage function
    openPage(navLink, page){
        navLink.addEventListener('click', () => {
            this.dispatchOpenPage(page);
            this.setActiveLink(navLink,page);
        })
        
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
    