const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.americanOnly = americanOnly;
    this.britishOnly = britishOnly;
    this.americanToBritishTitles = americanToBritishTitles;
  }

  translate(text, locale) {
    if (!text || !locale) {
      return { error: "Required field(s) missing" };
    }

    if (text.trim() === "") {
      return { error: "No text to translate" };
    }

    if (!["american-to-british", "british-to-american"].includes(locale)) {
      return { error: "Invalid value for locale field" };
    }

    let translatedText = text;

    if (locale === "american-to-british") {
      translatedText = this.translateAmericanToBritish(translatedText);
    } else {
      translatedText = this.translateBritishToAmerican(translatedText);
    }

    translatedText = this.capitalizeFirstWord(translatedText);

    if (translatedText === text) {
      return {
        text: text,
        translation: "Everything looks good to me!",
      };
    }

    return { text: text, translation: translatedText };
  }

  translateAmericanToBritish(text) {
    text = this.translateTime(text, "british");
    text = this.translateTitles(text, "british");
    text = this.replaceWords(text, this.americanToBritishSpelling);
    text = this.replaceWords(text, this.americanOnly);

    return this.wrapHighlights(text);
  }

  translateBritishToAmerican(text) {
    text = this.translateTime(text, "american");
    text = this.translateTitles(text, "american");
    text = this.replaceWords(text, this.britishOnly);
    text = this.replaceWords(text, this.americanToBritishSpelling);

    return this.wrapHighlights(text);
  }

  translateTime(text, targetLocale) {
    const timeRegex = /(\d{1,2})[:.](\d{2})/g;
    return text.replace(timeRegex, (match, hours, minutes) => {
      return targetLocale === "american"
        ? `${hours}:${minutes}`
        : `${hours}.${minutes}`;
    });
  }

  translateTitles(text, targetLocale) {
    const titles = this.americanToBritishTitles;
    for (const [american, british] of Object.entries(titles)) {
      const regex = new RegExp(`\\b${american}\\b`, "gi");
      text = text.replace(regex, british);
    }
    return text;
  }

  replaceWords(text, dictionary) {
    for (const [american, british] of Object.entries(dictionary)) {
      const regex = new RegExp(`\\b${american}\\b`, "gi");
      text = text.replace(regex, `<span class="highlight">${british}</span>`);
    }
    return text;
  }

  wrapHighlights(text) {
    return text.replace(
      /<span class="highlight">(.*?)<\/span>/g,
      (match, p1) => `<span class="highlight">${p1}</span>`
    );
  }

  capitalizeFirstWord(text) {
    text = text.trim();

    if (text.length === 0) {
      return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

module.exports = Translator;
