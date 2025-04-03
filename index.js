import { translateText } from "./translation.js";

const inputElement = document.getElementById("trnaslate-textarea");
const formElement = document.querySelector("form");
const languagesList = document.querySelector(".languages-list");
const selectLanguageFieldset = document.querySelector(
  ".select-language-fieldset"
);

window.onload = () => {
  formElement.reset();
  inputElement.focus();
};

async function getTranslation() {
  const outputElement = document.getElementById("output");
  const text = inputElement.value || "How are you?";
  try {
    const translatedText = await translateText(text, getLanguage());
    displayTranslation(translatedText, text);
  } catch (error) {
    outputElement.textContent = "Translation Failed";
    // selectLanguageFieldset.innerHTML = "<p class='error'>Translation Failed</p>";
  }
}

function displayTranslation(translatedText, text) {
  document.getElementById("input-header").textContent = "Original Text";
  inputElement.value = text;
  inputElement.disabled = true;
  selectLanguageFieldset.querySelector("legend h3").textContent =
    "Your translation";
  languagesList.remove();
  const textareaElement = document.createElement("textarea");
  textareaElement.disabled = true;
  textareaElement.value = translatedText;
  selectLanguageFieldset.append(textareaElement);
  const submitButton = document.getElementById("submit-button");
  submitButton.textContent = "Start Over";
  submitButton.addEventListener("click", () => {
    window.location.reload();
  });
}

function getLanguage() {
  const languagesListLi = Array.from(languagesList.querySelectorAll("li"));
  const selectedLanguage = languagesListLi.find(
    (li) => li.querySelector("label input").checked
  );
  return selectedLanguage
    ? selectedLanguage.querySelector("label input").dataset.language
    : null;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  getTranslation();
});
