class ProjectCard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./components/project-card/project-card.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("project-card-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);
    }
}
customElements.define("project-card", ProjectCard);