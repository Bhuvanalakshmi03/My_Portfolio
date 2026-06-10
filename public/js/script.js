// Hero parallax effect
window.addEventListener('scroll', () => {

    const scrolled = window.pageYOffset;

    const heroContent =
        document.querySelector('.hero-content');

    heroContent.style.transform =
        `translateY(${scrolled * 0.4}px)`;

});

// Skill and project
const reveals =
    document.querySelectorAll('.reveal');

window.addEventListener('scroll', reveal);

function reveal(){

    reveals.forEach(item => {

        const windowHeight =
            window.innerHeight;

        const top =
            item.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            item.classList.add('active');
        }

    });

}

reveal();

// About section
const aboutCard =
    document.querySelector('.about-card');

function revealAbout(){

    const trigger =
        window.innerHeight * 0.8;

    const top =
        aboutCard.getBoundingClientRect().top;

    if(top < trigger){
        aboutCard.classList.add('active');
    }

}

window.addEventListener('scroll', revealAbout);

revealAbout();
