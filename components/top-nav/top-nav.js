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
        
        const menuIcon = this.shadowRoot.querySelector("menu-icon");
        const menu = this.shadowRoot.querySelector(".top-nav__menu");
        const links = this.shadowRoot.querySelectorAll(".top-nav__link");

        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(l => l.classList.remove("top-nav__link--active"));
                link.classList.add("top-nav__link--active");

                if (window.innerWidth <= 768){
                    menuIcon.removeAttribute("open");
                    menu.style.display = "none";
                    window.dispatchEvent(new CustomEvent("resizetoggle", { detail: {}}));
                }
            });
        });
        
        const title = this.shadowRoot.querySelector(".top-nav__title");
        const homeLink = this.shadowRoot.getElementById("home-link");

        // If the website title is clicked set the homepage to active.//
        if (title){
            title.addEventListener("click", () => {
                links.forEach( l => l.classList.remove("top-nav__link--active"));

                if (homeLink){
                    homeLink.classList.add("top-nav__link--active");
                    eventDispatcher(title, )
                };
               

                if (window.innerWidth <= 768){
                    menuIcon.removeAttribute("open");
                    menu.style.display = "none";
                }
            });
        }
        menuIcon.addEventListener("toggle", (e) => {
            const isOpen = e.detail.open;

            if (window.innerWidth <= 768) {
                menu.style.display = isOpen ? "flex" : "none";
            }
        });
        const handleResize = () => {
            if (window.innerWidth > 768){
                menu.style.display = "flex";
                menuIcon.style.display = "none";
            } else{
                menu.style.display = "none";
                menuIcon.style.display = "block";
                menuIcon.removeAttribute("open");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
    }

    pageClicked(event){
        console.log(event.target.dataset.page);   
    }
}
customElements.define("top-nav", TopNav);

