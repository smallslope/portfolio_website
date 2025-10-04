class MenuIcon extends HTMLElement{
    static svgCache = new Map();
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    static get ObservedAttributes(){
        return ["open"];
    }
    async connectedCallback(){
        const res = await fetch("./components/menu-icon/menu-icon.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("menu-icon-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true)); 

        const container = this.shadowRoot.querySelector(".menu-icon");

        const [burgerSVG, closeSVG] = await Promise.all([
            this._getSVG("./assets/icons/burger-icon.svg"),
            this._getSVG("./assets/icons/x-icon.svg")
        ]);
        const burgerNode = burgerSVG.cloneNode(true);
        const closeNode = closeSVG.cloneNode(true);

        burgerNode.classList.add("burger-icon");
        closeNode.classList.add("close-icon");

        container.append(burgerNode, closeNode);

        this._updateIconVisibility();

        container.addEventListener("click", () => {
            this.toggleAttribute("open");
            this.dispatchEvent(
                new CustomEvent("toggle", { detail: { open: this.hasAttribute("open")}})
            );
            this._open = !this._open;
            this._updateIconVisibility();
            // this.dispatchEvent(new CustomEvent("toggle", { detail: { open: this._open}}));
        });
    }
    async _getSVG(url) {
        if(MenuIcon.svgCache.has(url)){
            return MenuIcon.svgCache.get(url);
        }
        const res = await fetch(url);
        const text = await res.text();
        const svgDoc = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
        MenuIcon.svgCache.set(url, svgDoc);
        return svgDoc;
    }
    attributeChangedCallback(name, oldValue, newValue){
        if (name === "open" && oldValue !== newValue){
            this._updateIconVisibility();
        }
    }
    _updateIconVisibility(){
        const open = this.hasAttribute("open");
        const burger = this.shadowRoot.querySelector(".burger-icon");
        const close = this.shadowRoot.querySelector(".close-icon");

        if(!burger || !close) return;

        burger.style.display = open ? "block" : "none";

        if (this._open){
            burger.style.display = "none";
            close.style.display = "block";
        }
        else{
            burger.style.display = "block";
            close.style.display = "none";
        }
    }
}
customElements.define("menu-icon", MenuIcon);