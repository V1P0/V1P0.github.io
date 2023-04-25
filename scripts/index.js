/*jslint browser:true  */
/*jslint devel: true */
/*global
  alert, confirm, console, prompt,Image
*/
const menu = document.querySelector(".menu");

menu.classList.remove("no-js");
menu.classList.add("js");

// zapisz referencję do przycisku i listy nawigacji
const hamburgerBtn = document.querySelector(".hamburger");
const menuList = document.querySelector(".menu-list");
console.log(hamburgerBtn, menuList);
// dodaj obsługę zdarzenia kliknięcia do przycisku "hamburger"
hamburgerBtn.addEventListener("click", function () {
  console.log("kliknięto przycisk hamburgera");
  // przełącz klasę "is-active" na przycisku
  hamburgerBtn.classList.toggle("is-active");

  // przełącz widoczność listy nawigacji
  menuList.classList.toggle("is-active");
});

// Pomise image loader
const images = [
  "https://picsum.photos/id/10/300/200",
  "https://picsum.photos/id/20/300/200",
  "https://picsum.photos/id/30/300/200",
  "https://picsum.photos/id/40/300/200",
  "https://picsum.photos/id/50/300/200"
];

const loadImages = function (images) {
  const promises = images.map(function (url) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reject(new Error(`Failed to load image from URL: ${url}`));
      };
      img.src = url;
    });
  });

  return Promise.all(promises);
};

const createGallery = function (images) {
  const galleryEl = document.querySelector(".gallery");

  images.forEach(function (img) {
    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = "Gallery image";
    galleryEl.appendChild(imgEl);
  });
};

loadImages(images)
  .then(function (loadedImages) {
    createGallery(loadedImages);
  })
  .catch(function (error) {
    console.error(error);
  });
