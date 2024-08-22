// tests/1_unit-tests.js

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  
  test('Translate "Mangoes are my favorite fruit." to British English', () => {
    const text = "Mangoes are my favorite fruit.";
    const locale = "american-to-british";
    const expectedTranslation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "I ate yogurt for breakfast." to British English', () => {
    const text = "I ate yogurt for breakfast.";
    const locale = "american-to-british";
    const expectedTranslation = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "We had a party at my friend\'s condo." to British English', () => {
    const text = "We had a party at my friend's condo.";
    const locale = "american-to-british";
    const expectedTranslation = 'We had a party at my friend\'s <span class="highlight">flat</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
    const text = "Can you toss this in the trashcan for me?";
    const locale = "american-to-british";
    const expectedTranslation = 'Can you toss this in the <span class="highlight">bin</span> for me?';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "The parking lot was full." to British English', () => {
    const text = "The parking lot was full.";
    const locale = "american-to-british";
    const expectedTranslation = 'The <span class="highlight">car park</span> was full.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
    const text = "Like a high tech Rube Goldberg machine.";
    const locale = "american-to-british";
    const expectedTranslation = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "To play hooky means to skip class or work." to British English', () => {
    const text = "To play hooky means to skip class or work.";
    const locale = "american-to-british";
    const expectedTranslation = 'To <span class="highlight">bunk off</span> means to skip class or work.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
    const text = "No Mr. Bond, I expect you to die.";
    const locale = "american-to-british";
    const expectedTranslation = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Dr. Grosh will see you now." to British English', () => {
    const text = "Dr. Grosh will see you now.";
    const locale = "american-to-british";
    const expectedTranslation = '<span class="highlight">Dr</span> Grosh will see you now.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Lunch is at 12:15 today." to British English', () => {
    const text = "Lunch is at 12:15 today.";
    const locale = "american-to-british";
    const expectedTranslation = 'Lunch is at <span class="highlight">12.15</span> today.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "We watched the footie match for a while." to American English', () => {
    const text = "We watched the footie match for a while.";
    const locale = "british-to-american";
    const expectedTranslation = 'We watched the <span class="highlight">soccer</span> match for a while.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Paracetamol takes up to an hour to work." to American English', () => {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = "british-to-american";
    const expectedTranslation = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "First, caramelise the onions." to American English', () => {
    const text = "First, caramelise the onions.";
    const locale = "british-to-american";
    const expectedTranslation = 'First, <span class="highlight">caramelize</span> the onions.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "I spent the bank holiday at the funfair." to American English', () => {
    const text = "I spent the bank holiday at the funfair.";
    const locale = "british-to-american";
    const expectedTranslation = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "I had a bicky then went to the chippy." to American English', () => {
    const text = "I had a bicky then went to the chippy.";
    const locale = "british-to-american";
    const expectedTranslation = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', () => {
    const text = "I've just got bits and bobs in my bum bag.";
    const locale = "british-to-american";
    const expectedTranslation = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "The car boot sale at Boxted Airfield was called off." to American English', () => {
    const text = "The car boot sale at Boxted Airfield was called off.";
    const locale = "british-to-american";
    const expectedTranslation = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Have you met Mrs Kalyani?" to American English', () => {
    const text = "Have you met Mrs Kalyani?";
    const locale = "british-to-american";
    const expectedTranslation = 'Have you met <span class="highlight">Mr.</span>s Kalyani?';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Prof Joyner of King\'s College, London." to American English', () => {
    const text = "Prof Joyner of King's College, London.";
    const locale = "british-to-american";
    const expectedTranslation = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "Tea time is usually around 4 or 4.30." to American English', () => {
    const text = "Tea time is usually around 4 or 4.30.";
    const locale = "british-to-american";
    const expectedTranslation = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });

  test('Translate "She organised a fancy party." to American English', () => {
    const text = "She organised a fancy party.";
    const locale = "british-to-american";
    const expectedTranslation = 'She <span class="highlight">organized</span> a fancy party.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });
  
  test('Translate "I am travelling to the theatre." to American English', () => {
    const text = "I am travelling to the theatre.";
    const locale = "british-to-american";
    const expectedTranslation = 'I am <span class="highlight">traveling</span> to the <span class="highlight">theater</span>.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });
  
  test('Translate "My favourite colour is blue." to American English', () => {
    const text = "My favourite colour is blue.";
    const locale = "british-to-american";
    const expectedTranslation = 'My <span class="highlight">favorite</span> <span class="highlight">color</span> is blue.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });
  
  test('Translate "He is a very well-known defence lawyer." to American English', () => {
    const text = "He is a very well-known defence lawyer.";
    const locale = "british-to-american";
    const expectedTranslation = 'He is a very well-known <span class="highlight">defense</span> lawyer.';
    const { translation } = translator.translate(text, locale);
    assert.equal(translation, expectedTranslation);
  });
  
});
