class ImageCarousel extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        const res = await fetch("./components/image-carousel/image-carousel.html");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const template = doc.getElementById("image-carousel-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.currentIndex = 0;
        this.slidesEl = this.shadowRoot.querySelector('.slides');
        this.dotsEl = this.shadowRoot.querySelector('.dots');
        this.slotEl = this.shadowRoot.querySelector('slot');

        this.prevArrow = this.shadowRoot.querySelector('.arrow-left');
        this.nextArrow = this.shadowRoot.querySelector('.arrow-right');

        this.slotEl.addEventListener('slotchange', () => {
            this.slides = this.slotEl.assignedElements();
            this.updateDots();
            this.updateSlide();
            console.log(this.slides.length);
          });

        this.prevArrow.addEventListener('click', () => this.showPrev());
        this.nextArrow.addEventListener('click', () => this.showNext());
    }
    updateDots() {
        this.dotsEl.innerHTML = '';
        this.slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === this.currentIndex) dot.classList.add('active');
        this.dotsEl.appendChild(dot);
        });
     } 
     updateSlide() {
        this.slides.forEach((slide, i) => {
          slide.style.display = i === this.currentIndex ? 'block' : 'none';
        });
    
        // Update dots
        [...this.dotsEl.children].forEach((dot, i) => {
          dot.classList.toggle('active', i === this.currentIndex);
        });
      }
    showPrev() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.slides.length - 1;
        }
        this.updateSlide();
    }
    showNext() {
        if (this.currentIndex < this.slides.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
        this.updateSlide();
    }

}
customElements.define("image-carousel", ImageCarousel);