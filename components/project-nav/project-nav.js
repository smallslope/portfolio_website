class ProjectNav extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }
    async connectedCallback(){
        const res = await fetch("./components/project-nav/project-nav.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("project-nav-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.dropdown = this.shadowRoot.querySelector('.dropdown');
        this.topCell = this.shadowRoot.querySelector('.top-cell');
        this.dropdownContent = this.shadowRoot.querySelector('.dropdown-content');
        this.pageRoot = this.getRootNode();

        this.renderOptions();

        this.topCell.addEventListener('click', () => {
            this.toggleDropdown();
        });

        document.addEventListener('click', this.handleDocumentClick, true);
    }
    disconnectedCallback(){
        document.removeEventListener('click', this.handleDocumentClick, true);
    }
    renderOptions(){
        if (!this.dropdownContent || !(this.pageRoot instanceof ShadowRoot)) return;

        const headings = [...this.pageRoot.querySelectorAll('section-heading')];
        this.dropdownContent.innerHTML = '';

        const topOption = document.createElement('div');
        topOption.className = 'dropdown-option body-reg';
        topOption.textContent = 'Top';
        topOption.addEventListener('click', () => {
            this.navigateToTop();
        });
        this.dropdownContent.appendChild(topOption);

        headings.forEach((heading, index) => {
            const headingLabel = this.getHeadingLabel(heading);
            if (!headingLabel) return;

            const headingId = heading.id || this.createHeadingId(headingLabel);
            heading.id = headingId;

            const option = document.createElement('div');
            option.className = 'dropdown-option body-reg';

            if (index === headings.length - 1) {
                option.classList.add('bottom-cell');
            }

            option.textContent = headingLabel;
            option.dataset.target = headingId;
            option.addEventListener('click', () => {
                this.navigateToSection(headingId);
            });

            this.dropdownContent.appendChild(option);
        });

        if (!this.dropdownContent.children.length) {
            this.topCell.classList.add('is-disabled');
        }
    }
    getHeadingLabel(heading){
        const slottedText = heading.querySelector('[slot="text"]');
        return slottedText?.textContent?.trim() || '';
    }
    createHeadingId(label){
        return label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
    toggleDropdown(){
        if (this.topCell.classList.contains('is-disabled')) return;

        const isOpen = this.topCell.getAttribute('aria-expanded') === 'true';
        this.setDropdownState(!isOpen);
    }
    setDropdownState(isOpen){
        this.topCell.setAttribute('aria-expanded', String(isOpen));
        this.dropdownContent.hidden = !isOpen;
    }
    handleDocumentClick(event){
        if (event.composedPath().includes(this)) return;

        this.setDropdownState(false);
    }
    navigateToSection(sectionId){
        if (!(this.pageRoot instanceof ShadowRoot)) return;

        const targetSection = this.pageRoot.getElementById(sectionId);
        if (!targetSection) return;

        this.setDropdownState(false);

        const stickyOffset = this.getBoundingClientRect().height;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - stickyOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    navigateToTop(){
        this.setDropdownState(false);

        const pageHost = this.pageRoot.host;
        const stickyOffset = this.getBoundingClientRect().height;
        const targetPosition = pageHost.getBoundingClientRect().top + window.scrollY - stickyOffset;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }
    listClickHandler(event){
        if (event.target.tagName === "LI"){
            console.log("clicked", event.target.textContent);
        }
    }
}
customElements.define("project-nav", ProjectNav);
