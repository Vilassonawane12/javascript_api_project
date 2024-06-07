const accessKey = "dlTOO1M1bXAyEpqSxUggWmG9Cdkv4F38J5JtCQWreHQ";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagesLink = document.createElement("a");
    imagesLink.href = result.links.html;
    imagesLink.target = "_blank";
    imagesLink.textContent = result.alt_description;

    imagesWrapper.appendChild(image);
    imagesWrapper.appendChild(imagesLink);
    searchResults.appendChild(imagesWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMore.addEventListener("click", () => {
  searchImages();
});

// alert("Thank you for visiting this page");
