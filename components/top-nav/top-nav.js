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
        // const menuIcon = this.shadowRoot.querySelector("menu-icon");
        // const menu = this.shadowRoot.querySelector(".top-nav__menu");
        // const links = this.shadowRoot.querySelectorAll(".top-nav__link");

    
        // //If a top nav link is clicked it removed the active status from the existing link and adds it to the one that has been clicked. 
        // links.forEach(link => {
        //     link.addEventListener("click", () => {
        //         links.forEach(l => l.classList.remove("top-nav__link--active"));
        //         link.classList.add("top-nav__link--active");
        //         //If the display is smaller than 768px 
        //         if (window.innerWidth <= 768){
        //             menuIcon.removeAttribute("open");
        //             menu.style.display = "none";
        //             window.dispatchEvent(new CustomEvent("resizetoggle", { detail: {}}));
        //         }
        //     });
        // });
        
        // const title = this.shadowRoot.querySelector(".top-nav__title");
        // const homeLink = this.shadowRoot.getElementById("home-link");


        

        // if (title){
        //     title.addEventListener("click", () => {
        //         links.forEach( l => l.classList.remove("top-nav__link--active"));

        //         if (homeLink){
        //             homeLink.classList.add("top-nav__link--active");
        //             eventDispatcher(title, )
        //         };
               

        //         if (window.innerWidth <= 768){
        //             menuIcon.removeAttribute("open");
        //             menu.style.display = "none";
        //         }
        //     });
        // }
        // menuIcon.addEventListener("toggle", (e) => {
        //     const isOpen = e.detail.open;

        //     if (window.innerWidth <= 768) {
        //         menu.style.display = isOpen ? "flex" : "none";
        //     }
        // });
        // const handleResize = () => {
        //     if (window.innerWidth > 768){
        //         menu.style.display = "flex";
        //         menuIcon.style.display = "none";
        //     } else{
        //         menu.style.display = "none";
        //         menuIcon.style.display = "block";
        //         menuIcon.removeAttribute("open");
        //     }
        // };
        // handleResize();
        // window.addEventListener("resize", handleResize);

    // pageClicked(event){
    //     console.log(event.target.dataset.page);   
    // }


