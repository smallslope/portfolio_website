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
        this.shadowRoot.appendChild(template.content);
        const links = this.shadowRoot.querySelectorAll(".top-nav__link");
        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(l => l.classList.remove("top-nav__link--active"));
                link.classList.toggle("top-nav__link--active");
            })
        });
        const menuIcon = this.shadowRoot.getElementById("menu-icon");
        menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle("active");
        })

        document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const response = await fetch('/icons/burger.svg');
        this.svgText = await response.text();
    }
}
customElements.define("top-nav", TopNav);