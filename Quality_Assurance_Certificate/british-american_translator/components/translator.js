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
    if (text?.trim() === "") {
      return { error: 'No text to translate' };
    }

    if (!text || !locale) {
      return { error: "Required field(s) missing" };
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
        text: translatedText,
        translation: "Everything looks good to me!",
      };
    }

    return { text: text, translation: translatedText };
  }

  translateAmericanToBritish(text) {
    text = this.translateTime(text, "british");
    text = this.translateTitles(text, "british");
    text = this.replaceWords(text, this.americanToBritishSpelling, 'british');
    text = this.replaceWords(text, this.americanOnly, 'british');

    return text;
  }

  translateBritishToAmerican(text) {
    text = this.translateTime(text, "american");
    text = this.translateTitles(text, "american");
    text = this.replaceWordsBritishOnly(text, 'american');
    text = this.replaceWords(text, this.americanToBritishSpelling, 'american');

    return text;
  }

  translateTime(text, targetLocale) {
    const timeRegex = /(\d{1,2})[:.](\d{2})/g;
    return text.replace(timeRegex, (match, hours, minutes) => {
      return targetLocale === "american"
        ? `<span class="highlight">${hours}:${minutes}</span>`
        : `<span class="highlight">${hours}.${minutes}</span>`;
    });
  }

  translateTitles(text, targetLocale) {
    const titles = this.americanToBritishTitles;
    for (const [american, british] of Object.entries(titles)) {
      
      const regex = targetLocale === 'american' ? new RegExp(`${british}`, "gi") : new RegExp(`${american}`, "gi");

      const locale = targetLocale === 'american' ? american : british

      text = text.replace(regex, `<span class="highlight">${this.capitalizeFirstWord(locale)}</span>`);
    }
    return text;
  }

  replaceWords(text, dictionary, targetLocale) {

    for (const [american, british] of Object.entries(dictionary)) {
      const regex = targetLocale === 'american' ? new RegExp(`\\b${british}\\b`, "gi") : new RegExp(`\\b${american}\\b`, "gi");
      text = text.replace(regex, `<span class="highlight">${targetLocale === 'american' ? american : british}</span>`);
      
    }
    return text;
  }

  replaceWordsBritishOnly(text, targetLocale) {
    for (const [american, british] of Object.entries(this.britishOnly)) {
      // Create a regex that explicitly excludes text within <span class="highlight"> elements
      const regex = new RegExp(`\\b${american}\\b(?![^<]*<\\/span>)`, "gi");
  
      text = text.replace(regex, `<span class="highlight">${targetLocale === 'american' ? british : american}</span>`);
    }
  
    return text;
  }

  capitalizeFirstWord(text='') {
    text = text.trim().replace('\\','');

    if (text.length === 0) {
      return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

module.exports = Translator;
