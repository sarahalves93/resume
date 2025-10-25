const botoes = document.querySelectorAll(".botao");
botoes.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 20px #b16cff";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
  });
});

const subtitle = document.getElementById("subtitle");
const text =
  "Criando experiências digitais unindo tecnologia, design e criatividade.";
let index = 0;
let deleting = false;

function typeEffect() {
  if (!subtitle) return;

  if (!deleting) {
    subtitle.textContent = text.slice(0, index++);
    if (index > text.length) {
      deleting = true;
      index = text.length - 1;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    subtitle.textContent = text.slice(0, index--);
    if (index < 0) {
      deleting = false;
      index = 0;
      setTimeout(typeEffect, 500);
      return;
    }
  }

  const speed = deleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

typeEffect();

const voltarTopo = document.querySelector(".voltar-topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    voltarTopo.style.opacity = "1";
    voltarTopo.style.pointerEvents = "auto";
    voltarTopo.style.transform = "scale(1)";
  } else {
    voltarTopo.style.opacity = "0";
    voltarTopo.style.pointerEvents = "none";
    voltarTopo.style.transform = "scale(0.8)";
  }
});

voltarTopo.addEventListener("click", (e) => {
  e.preventDefault();
  const duration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start * (1 - easeOut));

    if (elapsed < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
});

const reveals = document.querySelectorAll(".container-mobile");

const observerOptions = {
  root: null,
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add("ativo");
    } else {
      el.classList.remove("ativo");
    }
  });
}, observerOptions);

reveals.forEach((el) => observer.observe(el));
