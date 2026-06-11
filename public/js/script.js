    document.addEventListener("mousemove",(e)=>{
    document.body.style.setProperty("--mouse-x",e.clientX+"px");
    document.body.style.setProperty("--mouse-y",e.clientY+"px");
    });
    
    // ── SCROLLSPY + NAV ACTIVE STATE ──
    const scrollContainer = document.getElementById('scroll-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const mainNav = document.getElementById('main-nav');

    function updateActive() {
      const scrollTop = scrollContainer.scrollTop;
      const containerH = scrollContainer.clientHeight;

      if (scrollTop > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 80;
        if (scrollTop >= top) {
          current = sec.id;
        }
      });

      navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
      });
    }

    scrollContainer.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // ── SMOOTH SCROLL FOR NAV LINKS ──
    navLinks.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ── MORPH / INTERSECTION OBSERVER ──
    const morphObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate section children with staggered delay
          const children = entry.target.querySelectorAll('.morph-child');
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, i * 140);
          });

          // Animate skill bars
          const bars = entry.target.querySelectorAll('.level-bar');
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.transform = `scaleX(${bar.dataset.level})`;
              bar.classList.add('animated');
            }, 200 + i * 80);
          });
        }
      });
    }, {
      root: scrollContainer,
      threshold: 0.15
    });

    sections.forEach(sec => morphObserver.observe(sec));

    const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
        if(entry.isIntersecting){
            document
            .querySelectorAll("section")
            .forEach(sec => sec.classList.remove("active-section"));

            entry.target.classList.add("active-section");
        }
        });
    },
    {
        root: scrollContainer,
        threshold: 0.4
    }
    );

    sections.forEach(section => {
    sectionObserver.observe(section);
    });

    // ── PARALLAX ON HERO ──
    scrollContainer.addEventListener('scroll', () => {
      const scrolled = scrollContainer.scrollTop;
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
    }, { passive: true });

    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("open");
    });
    });

    // ── 3D TILT ON PROJECT CARDS ──

    document.querySelectorAll('.project-card').forEach(card=>{

    card.addEventListener('mousemove',(e)=>{

    const rect=card.getBoundingClientRect();

    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;

    const rotateY=(x-rect.width/2)/20;
    const rotateX=(rect.height/2-y)/20;

    card.style.transform=
    `perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-8px)`;

    });

    card.addEventListener('mouseleave',()=>{
    card.style.transform='';
    });

    });

    // Smooth replay animation for sections

    const animatedSections = new Set();

    const enhancedObserver = new IntersectionObserver(
    (entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

        if(!animatedSections.has(entry.target)){

            const children =
            entry.target.querySelectorAll('.morph-child');

            children.forEach((child,index)=>{

            child.style.transitionDelay =
            `${index * 120}ms`;

            child.classList.add('visible');
            });

            animatedSections.add(entry.target);
        }
        }
    });

    },
    {
    root: scrollContainer,
    threshold: 0.3
    });

    sections.forEach(section=>{
    enhancedObserver.observe(section);
    });
    
    // scroll Bar
    const progressBar =
    document.querySelector(".scroll-progress-bar");

    scrollContainer.addEventListener("scroll", () => {

    const scrollTop = scrollContainer.scrollTop;

    const maxScroll =
    scrollContainer.scrollHeight -
    scrollContainer.clientHeight;

    const progress =
    (scrollTop / maxScroll) * 100;

    progressBar.style.height = `${progress}%`;

    });