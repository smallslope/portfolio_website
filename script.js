const homePage = document.querySelector('home-page');
const pages = document.querySelectorAll('[data-page]');

document.addEventListener('open-page', (event) => {
    console.log('Event fired!', event.detail.page);
    const { page } = event.detail;
    
    homePage.hidden = true;

    pages.forEach(webPage => {
        webPage.hidden = webPage.dataset.page !== page;
    })
})