document.addEventListener('DOMContentLoaded', function () {
  const slideshow = document.querySelector('.slideshow-container');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  const prevBtn = document.querySelector('.slideshow-prev');
  const nextBtn = document.querySelector('.slideshow-next');

  let currentIndex = 0;
  const slideCount = slides.length;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlideshow();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlideshow();
  }

  function updateSlideshow() {
    slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlideshow();
    });
  });

  let slideInterval = setInterval(nextSlide, 5000);

  const slideshowContainer = document.querySelector('.slideshow');
  slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  slideshowContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
});

function clearInput() {
  document.querySelector('input[type="search"]').value = '';
}

function verzendEmail() {
  const email = document.getElementById('email').value;
  if (email) {
    document.getElementById('bevestigingstekst').style.display = 'block';
  }
}
