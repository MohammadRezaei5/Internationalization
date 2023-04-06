const html = document.querySelector("html");
const languageButton = document.querySelector("nav > button");
const navigationButtons = document.querySelectorAll("nav > ul > li > button  ");
const nameElement = document.querySelector("main > .info > span");
const headingElement = document.querySelector("main > .info > h2");
const paragraphElement = document.querySelector("main > .info > p");
const callToActionButton = document.querySelector("main > .info > button");
const imageElement = document.querySelector("main > .cover > img");

let games;
let languages;
let gameIndex = 0;
let language = "en";

const fetchData = async () => {
  gameIndex = +(localStorage.getItem("gameIndex") ?? 0);
  language = localStorage.getItem("language") ?? "en";

  games = await (await fetch("./data/games.json")).json();

  const en = await (await fetch("./languages/en.json")).json();
  const fa = await (await fetch("./languages/fa.json")).json();
  languages = { en, fa };
};

const injectData = () => {
  localStorage.setItem("language", language);
  localStorage.setItem("gameIndex", gameIndex);

  if (language === "en") {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
  } else {
    html.setAttribute("lang", "fa");
    html.setAttribute("dir", "rtl");
  }

  injectGameData();
  injectLanguageData();
};

const injectGameData = () => {
  nameElement.innerHTML = games[gameIndex].name;
  callToActionButton.style.backgroundColor =
    games[gameIndex].callToActionButton.backgroundColor;
  callToActionButton.style.color = games[gameIndex].callToActionButton.color;
  imageElement.src = games[gameIndex].image;
};

const injectLanguageData = () => {
  headingElement.innerHTML = languages[language].GAMES[gameIndex].HEADING;
  paragraphElement.innerHTML = languages[language].GAMES[gameIndex].DESCRIPTION;
  callToActionButton.innerHTML = languages[language].GENERAL.CALL_TO_ACTION;
};

const initializeEventListeners = () => {
  languageButton.addEventListener("click", () => {
    language = language === "en" ? "fa" : "en";

    injectData();
  });

  navigationButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
      navigationButtons[gameIndex].classList.remove("active");
      navigationButtons[i].classList.add("active");

      gameIndex = i;
      injectData();
    });
  });
};

const main = async () => {
  await fetchData();

  navigationButtons[0].classList.remove("active");
  navigationButtons[gameIndex].classList.add("active");

  injectData();
  initializeEventListeners();
};

main().then;
