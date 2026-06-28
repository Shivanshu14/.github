/* ========== app.js — interactivity ========== */

/* 1. Split text inside [data-split] into .ch spans
      so each letter can animate independently. */
(function splitText() {
  const targets = document.querySelectorAll('[data-split]');
  targets.forEach(el => {
    const walk = (node) => {
      const children = Array.from(node.childNodes);
      children.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent;
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          [...text].forEach(ch => {
            if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
            const span = document.createElement('span');
            span.className = 'ch';
            span.textContent = ch;
            frag.appendChild(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // skip splitting inside .em and <br>; otherwise recurse
          if (child.tagName === 'BR') return;
          if (child.classList && child.classList.contains('em')) return;
          walk(child);
        }
      });
    };
    walk(el);
  });
})();

/* 2. Reveal-on-scroll for any .reveal element */
(function reveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* 3. Custom cursor blob (desktop only) */
(function cursorBlob() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const blob = document.createElement('div');
  blob.className = 'cursor-blob';
  blob.style.opacity = "0"; // Hidden initially
  document.body.appendChild(blob);

  let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
  let tx = x,
      ty = y;

  // Mouse enters page
  document.addEventListener('mouseenter', () => {
    blob.style.opacity = "1";
  });

  // Mouse moves
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    blob.style.opacity = "1";
  });

  // Mouse leaves browser window
  document.addEventListener('mouseleave', () => {
    blob.style.opacity = "0";
  });

  function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;

    blob.style.transform =
      `translate(${x}px, ${y}px) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }

  tick();

  /* Grow + recolor blob over key interactive zones */
  const grow = (cls) => {
    document.body.classList.add('blob-grow');
    if (cls) document.body.classList.add(cls);
  };

  const shrink = () => {
    document.body.classList.remove(
      'blob-grow',
      'blob-blue',
      'blob-orange',
      'blob-lime'
    );
  };

  document.querySelectorAll(
    '.skill-card, .cert, .btn, .hero__sticker, .ach__item, .tl-row, .nav__links a'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (
        el.matches('.skill-card:nth-child(1)') ||
        el.classList.contains('cert--blue') ||
        el.classList.contains('btn--blue')
      ) grow('blob-blue');
      else if (
        el.matches('.skill-card:nth-child(2)') ||
        el.classList.contains('cert--orange')
      ) grow('blob-orange');
      else if (
        el.matches('.skill-card:nth-child(3)') ||
        el.classList.contains('cert--lime')
      ) grow('blob-lime');
      else grow();
    });

    el.addEventListener('mouseleave', shrink);
  });
})();

/* 4. Magnetic hover for sticker (gently pulls toward cursor) */
(function magnetic() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.hero__sticker').forEach(el => {
    let raf;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('translate', `${dx}px ${dy}px`);
      });
    });
    el.addEventListener('mouseleave', () => { el.style.setProperty('translate', '0 0'); });
  });
})();







/*---------------------------
Hamburger Menu
------------------------------*/

const
menuBtn=
document.getElementById("menuBtn");
const
navLinks=
document.getElementById("navLinks");
const
overlay=
document.getElementById("menuOverlay");

if(menuBtn && navLinks && overlay){
  function closeMenu(){
  menuBtn.classList.remove("active");
 navLinks.classList.remove("active");
  overlay.classList.remove("active");
document.body.classList.remove("menu-open")
}
menuBtn.addEventListener("click",()=>{
                menuBtn.classList.toggle("active");
                navLinks.classList.toggle("active");
                overlay.classList.toggle("active");
                document.body.classList.toggle("menu-open");
});
overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".nav__linksa").forEach(link=>{
           
  link.addEventListener("click", closeMenu);
                 });
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape"){
    closeMenu();
  }
})
}


/*Back to top button*/

const backtotop =
document.getElementById("backtotop");

window.addEventListener("scroll", ()=>{
  if(window.scrollY > 400){
    backtotop.classList.add("show");
  }else{
    backtotop.classList.remove("show");
  }
});
backtotop.addEventListener("click", ()=> {
  window.scrollTo({
    top:0,
    behavior:"smooth"
    });
});






/*Smooth Transition btw pages */
document.querySelectorAll("a").forEach(links=>{
  link.addEventListener("click", function(e){
    const href=this.getAttribute("href");
    if(
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
       !href.startsWith("tel:") &&
       this.target!=="_blank"
    ){
      e.preventDefault();
      document.body.classList.add("page-leave");
      setTimeout(()=>{
        window.location.href=href;
      },450);
    }
  });
});







