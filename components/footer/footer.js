class Footer extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./components/footer/footer.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("footer-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);

        const links = this.shadowRoot.querySelectorAll(".footer__link");

        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(l => l.classList.remove("footer__link--active"));
                link.classList.add("footer__link--active");
            });
        });

        const title = this.shadowRoot.querySelector(".footer__title");
        const homeLink = this.shadowRoot.getElementById("home-link");

        if (title){
            title.addEventListener("click", () => {
                links.forEach( l => l.classList.remove("footer__link--active"));

                if (homeLink){
                    homeLink.classList.add("footer__link--active");
                }
            });
        }
    }
}
customElements.define("site-footer", Footer);
