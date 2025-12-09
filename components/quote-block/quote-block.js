class QuoteBlock extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./components/quote-block/quote-block.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("quote-block-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(template);
    }
}
customElements.define("quote-block", QuoteBlock);