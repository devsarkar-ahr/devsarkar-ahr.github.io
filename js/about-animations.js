// Lightweight scroll reveal + parallax for about page
(function(){
  // Reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = { threshold: 0.12 };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        }
      });
    }, obsOptions);
    reveals.forEach(r=> io.observe(r));
  } else {
    // fallback: show all
    reveals.forEach(r=> r.classList.add('in-view'));
  }

  // Parallax effect for elements with .parallax and data-speed
  const parallaxEls = Array.from(document.querySelectorAll('.parallax')).filter(e=>e.dataset && e.dataset.speed);
  function handleParallax(){
    const scTop = window.scrollY || window.pageYOffset;
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.speed) || 0.2;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scTop) * speed;
      // subtle translateY based on scroll
      el.style.transform = `translate3d(0, ${offset * -0.02}px, 0)`;
    });
  }
  if(parallaxEls.length){
    let ticking = false;
    window.addEventListener('scroll', ()=>{
      if(!ticking){
        window.requestAnimationFrame(()=>{ handleParallax(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    // initial
    handleParallax();
  }
  
  // Animated counters: elements with data-count
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  function animateCounter(el, target){
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();
    function step(now){
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t<.5 ? 2*t*t : -1 + (4-2*t)*t; // simple ease
      const value = Math.floor(start + (target - start) * eased);
      el.textContent = value.toLocaleString();
      if(t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if('IntersectionObserver' in window && counters.length){
    const counterObs = new IntersectionObserver((entries, obs)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const el = en.target;
          const target = parseInt(el.getAttribute('data-count'),10) || 0;
          animateCounter(el, target);
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.4});
    counters.forEach(c=> counterObs.observe(c));
  } else {
    // fallback: set directly
    counters.forEach(c=> c.textContent = Number(c.getAttribute('data-count')||0).toLocaleString());
  }
})();
