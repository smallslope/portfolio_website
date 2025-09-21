class ColorSwatch extends HTMLElement {
    static get observedAttributes() {
        return ["color"]; 
    }
    constructor(){
        super()
        this.attachShadow({ mode: "open"})
        this._swatch = null;
    }
    async connectedCallback() {
        const res = await fetch("./components/color-swatch.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("color-swatch-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._swatch = this.shadowRoot.querySelector(".swatch");
        this.updateColor();
    }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "color" && oldVal !== newVal) {
      this.updateColor();
    }
  }

  updateColor() {
    if (!this._swatch) return;
    const colorAttr = this.getAttribute("color");
    if (colorAttr) {
      this._swatch.style.backgroundColor = colorAttr;
    }
  }
}
customElements.define("color-swatch",ColorSwatch)