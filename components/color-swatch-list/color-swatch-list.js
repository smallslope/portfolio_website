class ColorSwatchList extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this._colors = [];
        this._container = null;
    }

    async connectedCallback(){
        const res = await fetch("./components/color-swatch-list/color-swatch-list.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("color-swatch-list-template");

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._container = this.shadowRoot.querySelector(".swatch-list");
        this.render(); 
    }
    set data(colors){
        this._colors = colors;
        this.render();
    }

    render(){
        if(!this._container || !this._colors) return;
        this._container.innerHTML = "";
    
        this._colors.forEach(color => {
            const swatch = document.createElement("color-swatch");
            swatch.setAttribute("color", color.swatch_hsl);

            const nameSlot = document.createElement("span");
            nameSlot.setAttribute("slot", "color-name");
            nameSlot.textContent = color.swatch_name;

            const hexSlot = document.createElement("span");
            hexSlot.setAttribute("slot", "color-hex");
            hexSlot.textContent = color.swatch_hex;

            const hslSlot = document.createElement("span");
            hslSlot.setAttribute("slot", "color-hsl");
            hslSlot.textContent = color.swatch_hsl;

            swatch.appendChild(nameSlot);
            swatch.appendChild(hexSlot);
            swatch.appendChild(hslSlot);

            this._container.appendChild(swatch);
        });
    }
}
customElements.define("color-swatch-list", ColorSwatchList);
