class Homepage extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./pages/homepage/homepage.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("homepage-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);
    }
}
customElements.define("home-page", Homepage);