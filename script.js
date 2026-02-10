const homePage = document.querySelector('home-page');
const pages = document.querySelectorAll('[data-project]');

document.addEventListener('open-project', (event) => {
    console.log('Event fired!', event.detail.project);
    const { project } = event.detail;
    
    homePage.hidden = true;

    pages.forEach(page => {
        page.hidden = page.dataset.project !== project;
    })
})