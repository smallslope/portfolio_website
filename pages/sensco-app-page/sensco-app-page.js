class SenscoAppPage extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./pages/sensco-app-page/sensco-app-page.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("sensco-app-page-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);
    }
}
customElements.define("sensco-app-page", SenscoAppPage);