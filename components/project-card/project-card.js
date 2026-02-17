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

        const page = this.getAttribute('data-page');
        const mode = this.getAttribute('mode');
        const button = this.shadowRoot.querySelector('#cta');
        
        if(mode === 'homePage'){
            button.addEventListener('click', () => {
                this.dispatchEvent(
                    new CustomEvent('open-page', {
                        bubbles: true,
                        composed: true,
                        detail:{
                            page,
                            source: 'project-card'
                        }
                    })
                )
            });
        }
        else if(mode === 'projectPage'){
            const link = this.getAttribute('cta-link');
            button.addEventListener('click', () => {
                window.open(link, '_blank');
            });
        }
    }
}
customElements.define("project-card", ProjectCard);