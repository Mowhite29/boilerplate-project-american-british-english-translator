const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    input(locale, text){
        const textArray = text.split(' ');
        if (locale == 'american-to-british'){
            return this.americanToBritish(textArray);
        }else {
            return this.britishToAmerican(textArray);
        };
    };

    americanToBritish(textArray){
        const translationArray = []
        let conjoined = false;
        let triple = 0;
        for (let i = 0; i < textArray.length; i++){
            let translation = '';
            let punctuation
            let translated = false;
            if (conjoined){
                conjoined = false;
            }else if (triple != 0){
                triple--;
            }else {
                let word = textArray[i];
                punctuation = '';
                //Titles
                Object.keys(americanToBritishTitles).forEach(key => {
                    if (key.toLowerCase() == word.toLowerCase()){
                        translation = americanToBritishTitles[key];
                        translated = true;
                        if (word[0].toUpperCase() == word[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + punctuation);
                    }
                });
                //Three words
                if (!translated){
                    let string = (textArray[i] + ' ' + textArray[i + 1] + ' ' + textArray[i + 2]);
                    let longStringPunctuation = ''
                    for (let j = string.length - 1; j >= 0; j--){
                        if (/\s/.test(string[j])){
                            break;
                        }
                        if (/\W/.test(string[j])){
                            longStringPunctuation = string.slice(j);
                            string = string.slice(0, j);
                            break;
                        };
                    };
                    Object.keys(americanOnly).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = americanOnly[key];
                            triple = 2;
                            translated = true;
                        }
                    })
                    Object.keys(americanToBritishSpelling).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = americanToBritishSpelling[key];
                            triple = 2;
                            translated = true;
                        }
                    })
                    if (translated){
                        if (string[0].toUpperCase() == string[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + longStringPunctuation);
                    };
                };
                //Two words
                if (!translated){
                    let string = (textArray[i] + ' ' + textArray[i + 1]);
                    let stringPunctuation = ''
                    for (let j = string.length - 1; j >= 0; j--){
                        if (/\s/.test(string[j])){
                            break;
                        }
                        if (/\W/.test(string[j])){
                            stringPunctuation = string.slice(j);
                            string = string.slice(0, j);
                            break;
                        };
                    };
                    Object.keys(americanOnly).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = americanOnly[key];
                            conjoined = true;
                            translated = true;
                        }
                    })
                    Object.keys(americanToBritishSpelling).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = americanToBritishSpelling[key];
                            conjoined = true;
                            translated = true;
                        }
                    })
                    if (translated){
                        if (string[0].toUpperCase() == string[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + stringPunctuation);
                    }
                } 
                //Single words
                if (!translated){
                    for (let j = 0; j < textArray[i].length; j++){
                        if (/^\d\d\:\d\d$/i.test(textArray[i])){
                            break;
                        }else if (/^\d\d\:\d\d\.$/i.test(textArray[i])){
                            word = textArray[i].slice(0, textArray[i].length - 1);
                            punctuation = '.';
                            break;
                        }    
                        if (/\W/.test(textArray[i][j])){
                            word = textArray[i].slice(0, j);
                            punctuation = textArray[i].slice(j);
                            break;
                        };
                    };
                    Object.keys(americanOnly).forEach(key => {
                        if (key.toLowerCase() == word.toLowerCase()){
                            translation = americanOnly[key];
                            translated = true;
                        }
                    })
                    Object.keys(americanToBritishSpelling).forEach(key => {
                        if (key.toLowerCase() == word.toLowerCase()){
                            translation = americanToBritishSpelling[key];
                            translated = true;
                        }
                    })
                    if (/\d\d\:\d\d/i.test(textArray[i])){
                        translation = word[0] + word[1] + '.' + word[3] + word[4];
                        translated = true;
                    }
                    if (translated){
                        if (word[0].toUpperCase() == word[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + punctuation);
                    };
                };
                if (!translated) {
                    translationArray.push(word + punctuation);
                };
            };
        };
        return translationArray.join(' ');
    };

    britishToAmerican(textArray){
        const translationArray = []
        let conjoined = false;
        let triple = 0;
        for (let i = 0; i < textArray.length; i++){
            let translation = '';
            let punctuation
            let translated = false;
            if (conjoined){
                conjoined = false;
            }else if (triple != 0){
                triple--;
            }else {
                let word = textArray[i];
                punctuation = '';
                //Titles
                Object.values(americanToBritishTitles).forEach(value => {
                    if (value.toLowerCase() == word.toLowerCase()){
                        const index = Object.values(americanToBritishTitles).indexOf(value);
                        translation = Object.keys(americanToBritishTitles)[index];
                        translated = true;
                        if (word[0].toUpperCase() == word[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + punctuation);
                    }
                });
                //Three words
                if (!translated){
                    let string = (textArray[i] + ' ' + textArray[i + 1] + ' ' + textArray[i + 2]);
                    let longStringPunctuation = ''
                    for (let j = string.length - 1; j >= 0; j--){
                        if (/\s/.test(string[j])){
                            break;
                        }
                        if (/\W/.test(string[j])){
                            longStringPunctuation = string.slice(j);
                            string = string.slice(0, j);
                            break;
                        };
                    };
                    Object.keys(britishOnly).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = britishOnly[key];
                            translated = true;
                            triple = 2
                        }
                    })
                    Object.values(americanToBritishSpelling).forEach(value => {
                        if (value.toLowerCase() == string.toLowerCase()){
                            const index = Object.values(americanToBritishSpelling).indexOf(string);
                            translation = Object.keys(americanToBritishSpelling)[index];
                            translated = true;
                            triple = 2
                        }
                    })
                    if (translated){
                        if (string[0].toUpperCase() == string[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + longStringPunctuation);
                    }
                }
                //Two words
                if (!translated){
                    let string = (textArray[i] + ' ' + textArray[i + 1]);
                    let stringPunctuation = ''
                    for (let j = string.length - 1; j >= 0; j--){
                        if (/\s/.test(string[j])){
                            break;
                        }
                        if (/\W/.test(string[j])){
                            stringPunctuation = string.slice(j);
                            string = string.slice(0, j);
                            break;
                        };
                    };
                    Object.keys(britishOnly).forEach(key => {
                        if (key.toLowerCase() == string.toLowerCase()){
                            translation = britishOnly[key];
                            translated = true;
                            conjoined = true;
                        }
                    })
                    Object.values(americanToBritishSpelling).forEach(value => {
                        if (value.toLowerCase() == string.toLowerCase()){
                            const index = Object.values(americanToBritishSpelling).indexOf(textArray[i]);
                            translation = Object.keys(americanToBritishSpelling)[index];
                            translated = true;
                            conjoined = true;
                        }
                    })
                    if (translated){
                        if (string[0].toUpperCase() == string[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + stringPunctuation);
                    }
                } 
                //Single words
                if (!translated){
                    for (let j = 0; j < textArray[i].length; j++){
                        if (/^\d{1,2}\.\d\d$/i.test(textArray[i])){
                            break;
                        }else if (/^\d{1,2}\.\d\d\.$/i.test(textArray[i])){
                            word = textArray[i].slice(0, textArray[i].length - 1);
                            punctuation = '.';
                            break;
                        }    
                        if (/\W/.test(textArray[i][j])){
                            word = textArray[i].slice(0, j);
                            punctuation = textArray[i].slice(j);
                            break;
                        };
                    };
                    Object.keys(britishOnly).forEach(key => {
                        if (key.toLowerCase() == word.toLowerCase()){
                            translation = britishOnly[key];
                            translated = true;
                        }
                    })
                    Object.values(americanToBritishSpelling).forEach(value => {
                        if (value.toLowerCase() == word.toLowerCase()){
                            const index = Object.values(americanToBritishSpelling).indexOf(textArray[i]);
                            translation = Object.keys(americanToBritishSpelling)[index];
                            translated = true;
                        }
                    })
                    if (/\d{1,2}\.\d\d/i.test(textArray[i])){
                        if (/\d{2}\.\d\d/i.test(textArray[i])){
                            translation = word[0] + word[1] + ':' + word[3] + word[4];
                        }else if (/\d{1}\.\d\d/i.test(textArray[i])){
                            translation = word[0] + ':' + word[2] + word[3];
                        }
                        translated = true;
                    }
                    if (translated){
                        if (word[0].toUpperCase() == word[0]){
                            translation = String(translation).charAt(0).toUpperCase() + String(translation).slice(1)
                        };
                        translationArray.push('<span class="highlight">' + translation + '</span>' + punctuation);
                    }
                };
                if (!translated) {
                    translationArray.push(word + punctuation);
                };
            }
        }
        return translationArray.join(' ');
    };
}

module.exports = Translator;
