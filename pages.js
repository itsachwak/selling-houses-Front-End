
  let slideIndex = 0;  // Starting index for the main image

  // Function to switch to a specific thumbnail image
  function changeImage(thumbnail) {
    const main = document.getElementById("mainDisplay");
    main.src = thumbnail.src;
    slideIndex = Array.from(thumbnail.parentNode.children).indexOf(thumbnail);  // Update index to match clicked thumbnail
  }

  
  function showSlides(n) {
    let images = document.querySelectorAll('.thumbnails img');  
    if (n >= images.length) { slideIndex = 0; }  
    if (n < 0) { slideIndex = images.length - 1; }  
    
    const main = document.getElementById("mainDisplay");
    main.src = images[slideIndex].src;  // Set the main image to the current slide
  }

  // Function for navigating between images
  function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
  }

  // Initially show the first image
  showSlides(slideIndex);
