document.addEventListener("DOMContentLoaded", function () {
  const typewrite = document.querySelector(".typewrite");
  const words = JSON.parse(typewrite.getAttribute("data-text"));
  let txt = "";
  let wordIndex = 0;
  let isDeleting = false;
  let wait = 100;

  function type() {
    const current = wordIndex % words.length;
    const fullTxt = words[current];

    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }

    typewrite.innerHTML = txt;

    if (!isDeleting && txt === fullTxt) {
      wait = 1500;
      isDeleting = true;
    } else if (isDeleting && txt === "") {
      isDeleting = false;
      wordIndex++;
      wait = 500;
    } else {
      wait = isDeleting ? 50 : 100;
    }

    setTimeout(type, wait);
  }

  type();
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

const socials = document.querySelector('.footer-socials');
observer.observe(socials);
