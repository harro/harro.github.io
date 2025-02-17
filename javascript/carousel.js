class carouselControls extends HTMLElement {
  slideIndex = 1;

  connectedCallback() {
    let html_string = `
      <a class="carousel-prev" onclick="document.querySelector('carousel-controls').advanceCarousel(-1)">&#10094;</a>
      <a class="carousel-next" onclick="document.querySelector('carousel-controls').advanceCarousel(1)">&#10095;</a>
      <footer class="carousel-footer">
      <!-- Add row here for every section above. -->
    `;
    let slides = document.getElementsByClassName("carousel-slides");
    for (let i = 0; i < slides.length; i += 1) {
      html_string += `${" ".repeat(8)}<span class="carousel-dot" onclick="document.querySelector('carousel-controls').showCarousel(${i +1})"></span>\n`
    }
    this.innerHTML = html_string + ' '.repeat(6) + '</footer>';
    this.showCarousel(1);
  }

  /* Next/previous controls. */
  advanceCarousel(n) {
    this.showCarousel(this.slideIndex += n);
  }

  showCarousel(n) {
    this.slideIndex = n
    let slides = document.getElementsByClassName("carousel-slides");
    /* A carousel is circular, so advancing off the end wraps around. */
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) { this.slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    let dots = document.getElementsByClassName("carousel-dot");
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" carousel-active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " carousel-active";
  }
};
/* Create custom HTML element to populate with the carouselMenu. */
customElements.define('carousel-controls', carouselControls);