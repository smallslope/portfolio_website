class ProjectNav extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./components/project-nav/project-nav.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("project-nav-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);
    }
}
customElements.define("project-nav", ProjectNav);