const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    suite('American to British', () => {
        suite('Single words', () => {
            test("1. Mangoes are my favorite fruit.", () => {
                assert.equal(translator.input('american-to-british', "Mangoes are my favorite fruit."), 
                "Mangoes are my <span class=\"highlight\">favourite</span> fruit.") 
            })
            test('2. I ate yogurt for breakfast.', () => {
                assert.equal(translator.input('american-to-british', "I ate yogurt for breakfast."), 
                "I ate <span class=\"highlight\">yoghurt</span> for breakfast.") 
            })
            test("3. We had a party at my friend's condo.", () => {
                assert.equal(translator.input('american-to-british', "We had a party at my friend's condo."), 
                "We had a party at my friend's <span class=\"highlight\">flat</span>.") 
            })
            test("4. Can you toss this in the trashcan for me?", () => {
                assert.equal(translator.input('american-to-british', "Can you toss this in the trashcan for me?"), 
                "Can you toss this in the <span class=\"highlight\">bin</span> for me?") 
            })
        })
        suite('Two words', () => {
            test("5. The parking lot was full.", () => {
                assert.equal(translator.input('american-to-british', "The parking lot was full."), 
                "The <span class=\"highlight\">car park</span> was full.") 
            })
            test("6. To play hooky means to skip class or work.", () => {
                assert.equal(translator.input('american-to-british', "To play hooky means to skip class or work."), 
                "To <span class=\"highlight\">bunk off</span> means to skip class or work.") 
            })
        })
        suite('Three words', () => {
            test("7. Like a high tech Rube Goldberg machine.", () => {
                assert.equal(translator.input('american-to-british', "Like a high tech Rube Goldberg machine."), 
                "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.") 
            })
        })
        suite('Titles', () => {
            test("8. No Mr. Bond, I expect you to die.", () => {
                assert.equal(translator.input('american-to-british', "No Mr. Bond, I expect you to die."), 
                "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.") 
            })
            test("9. Dr. Grosh will see you now.", () => {
                assert.equal(translator.input('american-to-british', "Dr. Grosh will see you now."), 
                "<span class=\"highlight\">Dr</span> Grosh will see you now.") 
            })
        })
        suite('Time', () => {
            test("10. Lunch is at 12:15 today.", () => {
                assert.equal(translator.input('american-to-british', "Lunch is at 12:15 today."), 
                "Lunch is at <span class=\"highlight\">12.15</span> today.") 
            })
        })
    })
    suite('British to American', () => {
        suite('Single words', () => {
            test("11. We watched the footie match for a while.", () => {
                assert.equal(translator.input('british-to-american', "We watched the footie match for a while."), 
                "We watched the <span class=\"highlight\">soccer</span> match for a while.") 
            })
            test("12. Paracetamol takes up to an hour to work.", () => {
                assert.equal(translator.input('british-to-american', "Paracetamol takes up to an hour to work."), 
                "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.") 
            })
            test("13. First, caramelise the onions.", () => {
                assert.equal(translator.input('british-to-american', "First, caramelise the onions."), 
                "First, <span class=\"highlight\">caramelize</span> the onions.") 
            })
            test("14. I had a bicky then went to the chippy.", () => {
                assert.equal(translator.input('british-to-american', "I had a bicky then went to the chippy."), 
                "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.") 
            })
        })
        suite('Two words', () => {
            test("15. I spent the bank holiday at the funfair.", () => {
                assert.equal(translator.input('british-to-american', "I spent the bank holiday at the funfair."), 
                "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.") 
            })
        })
        suite('Three words', () => {
            test("16. Translate I've just got bits and bobs in my bum bag. to American English", () => {
                assert.equal(translator.input('british-to-american', "I've just got bits and bobs in my bum bag."), 
                "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.") 
            })
            test("17. Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
                assert.equal(translator.input('british-to-american', "The car boot sale at Boxted Airfield was called off."), 
                "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.") 
            })
        })
        suite('Titles', () => {
            test("18. Translate Have you met Mrs Kalyani? to American English", () => {
                assert.equal(translator.input('british-to-american', "Have you met Mrs Kalyani?"), 
                "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?") 
            })
            test("19. Translate Prof Joyner of King's College, London. to American English", () => {
                assert.equal(translator.input('british-to-american', "Prof Joyner of King's College, London."), 
                "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.") 
            })
        })
        suite('Time', () => {
            test("20. Translate Tea time is usually around 4 or 4.30. to American English", () => {
                assert.equal(translator.input('british-to-american', "Tea time is usually around 4 or 4.30."), 
                "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.") 
            })
        })
    })
    suite('Highlighting', () => {
        test("21. Highlight translation in Mangoes are my favorite fruit.", () => {
            assert.equal(translator.input('american-to-british', "Mangoes are my favorite fruit."), 
            "Mangoes are my <span class=\"highlight\">favourite</span> fruit.") 
        })
        test("22. Highlight translation in I ate yogurt for breakfast.", () => {
            assert.equal(translator.input('american-to-british', "I ate yogurt for breakfast."), 
            "I ate <span class=\"highlight\">yoghurt</span> for breakfast.") 
        })
        test("23. Highlight translation in We watched the footie match for a while.", () => {
            assert.equal(translator.input('british-to-american', "We watched the footie match for a while."), 
            "We watched the <span class=\"highlight\">soccer</span> match for a while.") 
        })
        test("24. Highlight translation in Paracetamol takes up to an hour to work.", () => {
            assert.equal(translator.input('british-to-american', "Paracetamol takes up to an hour to work."), 
            "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.") 
        })
    })
});

