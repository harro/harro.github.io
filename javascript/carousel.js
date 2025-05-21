class carouselControls extends HTMLElement {
  slideIndex = 1;

  connectedCallback() {
    // There is only one 'live' carousel footer in a document.
    if (document.querySelector('carousel-footer') !== null) {
      return;
    }

    // The carousel controls are added as a footer of the document.
    let html_string = `
      <a class="carousel-prev" onclick="
      document.querySelector('carousel-controls').advanceCarousel(-1)"
      >&#10094;</a>
      <a class="carousel-next" onclick="
      document.querySelector('carousel-controls').advanceCarousel(1)"
      >&#10095;</a>
      <footer class="carousel-footer">
      <!-- A row is added here for every "carousel-slides" section above. -->
    `;
    let slides = document.getElementsByClassName("carousel-slides");
    for (let i = 0; i < slides.length; i += 1) {
      html_string += `${" ".repeat(8)}<span class="carousel-dot" 
      onclick="
      document.querySelector('carousel-controls').showCarousel(${ i + 1})"
      ></span >\n`
    }
    this.innerHTML = html_string + ' '.repeat(6) + '</footer>';
    window.addEventListener('keydown', this.keyEvent);
    // Set the first slide to be visible.
    this.showCarousel(1);
  }

  /* Next/previous controls. */
  advanceCarousel(n) {
    this.showCarousel(this.slideIndex += n);
  }

  /* 
   * Key-based navigation.
   * @param: Event
   */
  keyEvent(e) {
    let c = document.querySelector('carousel-controls')
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      c.advanceCarousel(1);
    } else if (e.code === 'ArrowLeft') {
      c.advanceCarousel(-1);
    } else if (e.code === 'Home') {
      c.showCarousel(1);
    }
    else if (e.code === 'End') {
      c.showCarousel();
    }
  }

  showCarousel(n=0) {
    let slides = document.getElementsByClassName("carousel-slides");
    // If slide number not specified then set to the end.
    if (!n) {
      n = slides.length;
    }
    this.slideIndex = n
    // A carousel is circular, so advancing off the end wraps around.
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