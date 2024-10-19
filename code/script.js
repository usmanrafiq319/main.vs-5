
 document.addEventListener("DOMContentLoaded", function() {


// Variables to track the current styles
let currentFullTextStyle = null;
let currentWordStyle = null;
let currentCharStyle = null;
let currentSpaceStyle = null;
let transformedText = ''; // Universal text after any modification

const customData = sessionStorage.getItem('customData'); // migrated data

if (customData) {
    document.getElementById('decoreinputText').textContent = customData;  // Use the  migrated data as needed
  }

// Populate the dropdown with the phrase "Font Style" styled accordingly
function populateFontSelect() {
    const fontSelect = document.getElementById('fontSelect');
    
    Object.keys(fonts).forEach(fontName => {
        const option = document.createElement('option');
        option.value = fontName;
        
        // The phrase to display in each font style
        const phrase = "Font Style";
        
        // Map the phrase into its custom font style
        const fontMapping = generateFontMapping(fonts[fontName]);
        const styledPhrase = mapToFont(fontMapping, phrase); // Convert the phrase "Font Style" to the custom font
        
        option.textContent = styledPhrase;  // Set the styled phrase in the dropdown
        option.classList.add('font-option');
        option.style.fontFamily = fontName;  // Optionally set the font-family to the font
        fontSelect.appendChild(option);
    });
}


// Initialize dropdown on page load
window.onload = function() {
    populateFontSelect();
};


function applyFontStyle() {
    const fontName = document.getElementById('fontSelect').value;
    let inputText = document.getElementById('decoreinputText').value;

    // Function to check if the input contains only ASCII characters
    function isAsciiOnly(text) {
        return /^[\x00-\x7F]*$/.test(text);  // Regex for ASCII characters only
    }

    // Fetch sharedInput value from sessionStorage if it exists
    const sharedInput = sessionStorage.getItem('sharedInput');

    // If a font is selected, perform the input checks
    if (fontName) {
        // Check if the inputText is non-ASCII or empty
        if (!isAsciiOnly(inputText) || inputText === "") {
            // If inputText contains non-ASCII characters or is empty and sharedInput exists, use it
            if (sharedInput) {
                inputText = sharedInput;  // Replace inputText with sharedInput
                console.log("Non-ASCII detected or empty input. Using shared input from sessionStorage.");
            } else {
                console.log("Non-ASCII detected or empty input, but no shared input found.");
            }
        }
    }
            // Apply font style to the input text
            if (fonts[fontName]) {
                const fontMapping = generateFontMapping(fonts[fontName]);
                transformedText = mapToFont(fontMapping, inputText);  // Use the updated inputText
            } else {
                transformedText = inputText;  // Default case if no font is selected
            }
    
            applyModifications(transformedText);  // Trigger the modification after applying font
}



// Event listener for dynamic input changes
document.getElementById('decoreinputText').addEventListener('input', applyFontStyle);
document.getElementById('fontSelect').addEventListener('change', applyFontStyle);

// Apply modifications in order of priority
function applyModifications(transformedText) {
    let modifiedText = transformedText;

    // Apply character modification first if it exists
    if (currentCharStyle) {
        if (currentCharStyle.type === 'doubleChar') {
            modifiedText = addTwoSignsAroundChars(modifiedText, currentCharStyle.sign1, currentCharStyle.sign2);
        } else {
            modifiedText = insertEmojiBetweenChars(modifiedText, currentCharStyle.emoji);
        }
    }

    // Apply word modification if it exists
    if (currentWordStyle) {
        modifiedText = separateEmojisAroundWord(modifiedText, currentWordStyle.left, currentWordStyle.right);
    }

    // Apply space replacement if it exists
    if (currentSpaceStyle) {
        modifiedText = addEmojiToSpaces(modifiedText, currentSpaceStyle.emoji);
    }

   // Apply full text modification if it exists and if there are characters or words present
    if (currentFullTextStyle && modifiedText.trim() !== "") {
     modifiedText = currentFullTextStyle.start + modifiedText + currentFullTextStyle.end;
    }

    document.getElementById('outputSection').textContent = modifiedText;
}


function createScrollButtons(container1Id, container2Id, container3Id, container4Id, styles, descriptor, applyCallback) {
    const container1 = document.getElementById(container1Id);
    const container2 = document.getElementById(container2Id);
    const container3 = document.getElementById(container3Id);
    const container4 = document.getElementById(container4Id);

    styles.forEach((style, index) => {
        const button = document.createElement('button');
        button.textContent = descriptor(style);
        button.addEventListener('click', () => {
            applyCallback(style);
            applyModifications(transformedText);

            // Set active style for the current category (FullText, Word, Char, or Space)
            if (container1Id.includes('fullText')) {
                setActiveButton(container1Id, button);
                setActiveButton(container2Id, button);
                setActiveButton(container3Id, button);
                setActiveButton(container4Id, button);
            } else if (container1Id.includes('word')) {
                setActiveButton(container1Id, button);
                setActiveButton(container2Id, button);
                setActiveButton(container3Id, button);
                setActiveButton(container4Id, button);
            } else if (container1Id.includes('char')) {
                setActiveButton(container1Id, button);
                setActiveButton(container2Id, button);
                setActiveButton(container3Id, button);
                setActiveButton(container4Id, button);
            } else if (container1Id.includes('space')) {
                setActiveButton(container1Id, button);
                setActiveButton(container2Id, button);
                setActiveButton(container3Id, button);
                setActiveButton(container4Id, button);
            }
        });

        // Append buttons in four separate rows, sharing the same scroll area
        if (index % 4 === 0) {
            container1.appendChild(button);
        } else if (index % 4 === 1) {
            container2.appendChild(button);
        } else if (index % 4 === 2) {
            container3.appendChild(button);
        } else {
            container4.appendChild(button);
        }
    });
}



// Define descriptors for the button labels
function fullTextStyleDescriptor(style) {
    return `${style.start}Text${style.end}`;
}

function wordStyleDescriptor(style) {
    return `${style.left}Word${style.right}`;
}

function charStyleDescriptor(style) {
    if (style.type === 'doubleChar') {
        return `${style.sign1}A${style.sign2}`;
    } else {
        return `A${style.emoji}B`;
    }
}

function spaceStyleDescriptor(style) {
    return ` Space${style.emoji} `;
}

// Apply style functions
function applyFullTextStyle(style) {
    currentFullTextStyle = style;
}

function applyWordStyle(style) {
    currentWordStyle = style;
}

function applyCharStyle(style) {
    currentCharStyle = style;
}

function applySpaceStyle(style) {
    currentSpaceStyle = style;
}

// Button style arrays
const fullTextStyles = [
    { start: '▄︻デ', end: '═══━一 ҉~•' }, { start: '»»————', end: '————⌲' }, 
    { start: '(˶◕‿◕)ノ✿ ', end: '  (˶◕‿◕)ノ✿' },  { start: '▬▬ι══', end: '═════ﺣ' },
    { start: '⚛》》》', end: '《《《⚛' }, { start: '✯¸.•´*¨`*•✿', end: '✿•*`¨*`•.¸✯' }, 
    { start: '.·͙*̩̩͙˚̩̥̩̥*̩̩̥͙', end: '*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ .' }, { start: '◦•●◉✿', end: '✿◉●•◦' }, 
    { start: ' ┈ ⋞ 〈', end: '〉 ⋟ ┈' },  { start: '·͙⁺˚*•̩̩͙✩•̩̩͙*˚⁺‧', end: '‧⁺˚*•̩̩͙✩•̩̩͙*˚⁺‧͙' },
    { start: '»»——⍟', end: '⍟——««' }, { start: '══✿══╡°˖✧', end: '✧˖°╞══✿══' }, 
    { start: '𝕂𝕚𝕟𝕘(♛| ', end: ' |♛)𝕂𝕚𝕟𝕘' }, { start: '⟦', end: '⟧' },    
    { start: '╾━╤デ╦︻(▀̿Ĺ̯▀̿ ̿) ', end: ' ╾━╤デ╦︻(▀̿Ĺ̯▀̿ ̿)' }, { start: '︻╦̵̵̿╤── ', end: ' ҉~•' },    
    { start: '( -_•)╦̵̵̿╤─ ', end: ' 💥' }, { start: '(◕ᴥ◕) ', end: ' (◕ᴥ◕)' }, 
    { start: '( ͡° ᴥ ͡°)', end: '  ( ͡° ᴥ ͡°)' }, { start: '(≖ᴗ≖✿)', end: '(≖ᴗ≖✿)' },    
    { start: 'ʕ⊙ᴥ⊙ʔ', end: 'ʕ⊙ᴥ⊙ʔ' }, { start: '^ↀᴥↀ^', end: '^ↀᴥↀ^' },    
    { start: '╔════ ✿ ❀', end: '✿ ❀ ════╗' }, { start: '✎ (❁ᴗ͈ˬᴗ͈) ༉‧ ♡*', end: '✎ (❁ᴗ͈ˬᴗ͈) ༉‧ ♡*' }, 
    { start: '╚══ ❀•°', end: '°•❀ ══╝' },  { start: '•┈••✦ 🌹', end: '🌹 ✦••┈•' },
    { start: '≪ ◦ ❖', end: '❖ ◦ ≫' }, { start: '.·:*¨༺', end: '༻¨*:·.' }, 
    { start: '╚════▣', end: '▣════╝' }, { start: '╔════▣', end: '▣════╗' }, 
    { start: ' ▄▀▄▀▄▀▄▀', end: '▀▄▀▄▀▄▀▄' },  { start: '█ ✪ █▓▓▓', end: '▓▓▓█ ✪ █' },
    { start: '❢◥ ▬▬▬', end: '▬▬▬ ◤❢' }, { start: '◤◢◣◥', end: '◤◢◣◥' }, 
    { start: '✺✳ ┅', end: '┅ ✳✺' }, { start: '╔═✬✩══╡', end: '╞══✩✬══╗' }, 
    { start: '┗━━•❅❈❅•━━┛', end: '┗━━•❅❈❅•━━┛' },  { start: '•┈••✦❤', end: '❤✦••┈•' },
    { start: '───※', end: '※───' }, { start: '✧⋄⋆⋅⋆⋄', end: '⋄⋆⋅⋆⋄✧' }, 
    { start: '* . °•★|•°∵', end: '∵°•|☆•° . *' }, { start: '❣→→❣ ', end: ' ❣←←❣' }, 
    { start: '(͡o‿O͡)', end: '(͡o‿O͡)' }, { start: 'ʕ·ᴥ·ʔ', end: 'ʕ·ᴥ·ʔ' },
    { start: '▄︻デ═', end: '═━一💨' }, { start: '(⌐▨_▨)', end: '(⌐▨_▨)' },   
    { start: '❤ » —— ╫ ❲ ', end: ' ❳ ╫ —— « ❤' }, { start: '۩❦۩¤═══¤ ', end: ' ¤═══¤۩❦۩' },
    { start: '╚══《 ', end: ' 》══╝' }, { start: '┍━☽【❖ ', end: ' ❖】☾━┑' }, 
    { start: '┌─── ∘°❉ ', end: ' ❉°∘ ───┐' }, { start: '┗━━━━━༻❁ ', end: ' ❁༺━━━━━┛' }, 
    { start: '╰ ─┉─¡! • ', end: ' • !¡─┉─ ╯' }, { start: '┏━✦❘༻ ', end: ' ༺❘✦━┓' }, 
    { start: '•════◄░░░ ', end: ' ░░░►════•' }, { start: '═✮❁•°♛°•❁✮═ ', end: ' ═✮❁•°♛°•❁✮═' },
    { start: '•°•°•❈', end: '❈•°•°•' }, { start: '(ㅅ´ ˘ `) ', end: ' (ㅅ´ ˘ `)' }, 
    { start: 'ฅ^._.^ฅ', end: 'ฅ^._.^ฅ' }, { start: '•❅───✧❅✦ ', end: ' ✦❅✧───❅•' }, 
    { start: '───※ ', end: ' ※───' }, { start: '─── ･ ｡ﾟ☆: ', end: ' :☆ﾟ. ───' }, 
    { start: '* . °•★|•°∵ ', end: ' ∵°•|☆•° . *' }, { start: '★彡 ', end: ' 彡★' },
    { start: '☆★☆★→ ', end: ' ←☆★☆★' }, { start: '✸→→⛤', end: '⛤←←✸' }, 
    { start: '╚══ ≪ °❈|', end: '|❈° ≫ ══╝' }, { start: '•°♛°•', end: '•°♛°•' }, 
    { start: '( ͡° ͜ʖ ͡°) ', end: ' ( ͡° ͜ʖ ͡°)' }, { start: '(´•‿•`) ', end: ' (´•‿•`)' },  
    { start: '︶︵︶ ', end: ' ︶︵︶' }, { start: '꧁༒☬ ', end: ' ☬༒꧂' }, 
    { start: '꧁♥ ', end: ' ♥꧂' }, { start: '꧁𓊈𒆜', end: '𒆜𓊉꧂' }, 
    { start: '꧁•⊹٭ ', end: ' ٭⊹•꧂' }, { start: '(◍•ᴗ•◍) ', end: ' (◍•ᴗ•◍)' },  
    { start: '♥╣[-_-]╠♥ ', end: ' ♥╣[-_-]╠♥' }, { start: '(◞‸◟) ', end: ' (◞‸◟)' }, 
    { start: '(^▽^) ', end: ' (^▽^)' }, { start: '(*ˊᗜˋ*)', end: '(*ˊᗜˋ*)' }, 
    { start: '(oꆤ︵ꆤo) ', end: ' (oꆤ︵ꆤo)' }, { start: '(●︿●) ', end: ' (●︿●)' },    
    { start: '(∵❤◡❤∵)', end: '(∵❤◡❤∵)' }, { start: '(*ˊᗜˋ*)', end: '(*ˊᗜˋ*)' },    
    { start: '╡°˖✧ ', end: ' ✧˖°╞' }, { start: '─╤╦︻ ', end: ' ︻╦╤─' },   
    { start: '▁ ▂ ▄ ▅ ▆ ▇ █ ', end: ' █ ▇ ▆ ▅ ▄ ▂ ▁' }, { start: '★彡[', end: ']彡★' },    
    { start: '꧁༺ ', end: ' ༻꧂' }, { start: '☆꧁✬◦°˚°◦. ', end: ' .◦°˚°◦✬꧂☆' },    
    { start: '┣▇▇ ', end: ' ▇▇═─ 💦' }, { start: '❤꧁ღ⊱♥ ', end: ' ♥⊱ღ꧂❤' },     
    { start: '▓▒░ ', end: ' ░▒▓' }, { start: '☽', end: '☾' },    
    { start: '(•̀o•́)┌iii┐~ ', end: ' (•̀o•́)┌iii┐~' }, { start: '( ✿˃̣̣̥᷄⌓˂̣̣̥᷅ )', end: '( ✿˃̣̣̥᷄⌓˂̣̣̥᷅ )' },
    /* 
    { start: '', end: '' }, { start: '', end: '' },    
    { start: '', end: '' }, { start: '', end: '' },    
    { start: '', end: '' }, { start: '', end: '' },        
*/


];
const spaceStyles = [
    { emoji: '❄' }, { emoji: '•❅─✦─❅•' }, { emoji: '♛' },
    { emoji: '🎕' }, { emoji: 'ʕ⊙ᴥ⊙ʔ' },{ emoji: '(◕ᴥ◕)' }, 
    { emoji: '°•❈•°' }, { emoji: '' },{ emoji: '♜' }, 
    { emoji: '⧳' }, { emoji: '♢' },{ emoji: '♦' }, 
    { emoji: '❆' }, { emoji: '⧰' },{ emoji: '✺✳┅✳✺' }, 
    { emoji: '⇼' }, { emoji: '↭' },{ emoji: '⇹' }, 
    { emoji: '⇿' }, { emoji: '⤄' },{ emoji: '⟺' }, 
    { emoji: 'ꝏ' }, { emoji: '⧝' },{ emoji: '❂' }, 
    { emoji: '=' }, { emoji: '+' },{ emoji: '-' }, 
    { emoji: '≪ °❈|❈° ≫' }, { emoji: '༻❁༺' },{ emoji: '|─※─|' }, 
    { emoji: '͋' }, { emoji: '͠' },{ emoji: '֍' }, 
    { emoji: '࿋' }, { emoji: '※' },{ emoji: '⁐' }, 
    { emoji: '⁑' }, { emoji: '' },{ emoji: '≣' }, 
    { emoji: '∺' }, { emoji: '∻' },{ emoji: '≍' }, 
    { emoji: '⑄' }, { emoji: '⎶' },{ emoji: '≎' }, 
    { emoji: '☫' }, { emoji: '☪' },{ emoji: '⚙' }, 
    { emoji: '☬' }, { emoji: '☣' },{ emoji: '☢' }, 
    { emoji: '⚚' }, { emoji: '♱' },{ emoji: '☯' }, 
    { emoji: '⚛' }, { emoji: '⚝' },{ emoji: '⚯' }, 
    { emoji: '⛭' }, { emoji: '⛦' },{ emoji: '⛤' }, 
    { emoji: '✟' }, { emoji: '✺' },{ emoji: '⟗' }, 
    { emoji: '⥈' }, { emoji: '⸎' },{ emoji: 'ꖼ' }, 
    { emoji: 'ꔙ' }, { emoji: 'ꖢ' },{ emoji: '' }, 
    { emoji: 'ﷲ' }, { emoji: '﷽' },{ emoji: 'ꗮ' }, 
    { emoji: '▇█▇' }, { emoji: 'ﷴ' },{ emoji: '❅✧─✧❅' }, 
    { emoji: '🎕🎂🎕' }, { emoji: '🕉︎' },{ emoji: '✠' }, 
    { emoji: '🖤' }, { emoji: '☧' },{ emoji: '▇' }, 
    { emoji: '◍' }, { emoji: '⫶' },{ emoji: '▨' }, 
    { emoji: '(⌐▨_▨)' }, { emoji: '' },{ emoji: '' }, 
    { emoji: '' }, { emoji: '' },{ emoji: '' }, 
    { emoji: '' }, { emoji: '' },{ emoji: '' }, 

    /* 
    { emoji: '' }, { emoji: '' },{ emoji: '' }, 
    { emoji: '' }, { emoji: '' },{ emoji: '' }, 
    { emoji: '' }, { emoji: '' },{ emoji: '' }, 
     */

];
const wordStyles = [
    { left: '╡°˖✧', right: '✧˖°╞' },
    { left: '🍀', right: '🍀' }, 
    { left: '───✧₊∘', right: '∘₊✧───' },
    { left: '＼', right: '／' }, 
    { left: '❄', right: '❄' },
    { left: '❄ |', right: '| ❄' }, 
    { left: '═✿╡', right: '╞✿═' },
    { left: '♛', right: '♛' }, 
    { left: '☜', right: '☞' },
    { left: '◐', right: '◑' }, 
    { left: '"', right: '"' },
    { left: '～', right: '～' }, 
    { left: '⧱', right: '⧱' },
    { left: '⤝', right: '⤞' },
    { left: '⤟', right: '⤠' }, 
    { left: '↜', right: '↝' },
    { left: '↞', right: '↠' }, 
    { left: '⇷', right: '⇸' },
    { left: '═◄░', right: '░►═' }, 
    { left: '🌸', right: '🌸' },
    { left: '✣', right: '✣' }, 
    { left: '(', right: ')' },
    { left: '{', right: '}' }, 
    { left: '[', right: ']' },
    { left: '<', right: '>' },
    { left: '⟦', right: '⟧' }, 
    { left: '⦑', right: '⦒' },
    { left: '꜍', right: '꜉' },
    { left: '﴾', right: '﴿' }, 
    { left: '⧼', right: '⧽' },
    { left: '⦏', right: '⦎' },
    { left: '〘', right: '〙' }, 
    { left: '=', right: '=' },
    { left: '+', right: '+' },
    { left: '|─※', right: '※─|' }, 
    { left: '⫶', right: '⫶' },
    { left: 'ͼ', right: 'ͽ' },
    { left: '࿋', right: '࿋' }, 
    { left: '↢', right: '↣' },
    { left: '⎰', right: '⎱' },
    { left: '◣', right: '◢' },
    { left: '◤', right: '◥' }, 
    { left: '☽', right: '☾' },
    { left: '⦇', right: '⦈' },
    { left: '⦓', right: '⦔' }, 
    { left: '⮜', right: '⮞' },
    { left: '【', right: '】' },
    { left: '◄', right: '►' }, 
    { left: '❤', right: '❤' },
    { left: '❅─✦', right: '✦─❅' },
    { left: '╟', right: '╢' }, 
    { left: '⫶', right: '⫶' },
    { left: '❤️️', right: '❤️️' },
    { left: '❥', right: '❥' }, 
    { left: '❀', right: '❀' },
    { left: '✾', right: '✾' },
    { left: '⫷', right: '⫸' }, 
    { left: '', right: '' },
    /* 
    { left: '', right: '' },
    { left: '', right: '' }, 
    { left: '', right: '' },
     */
];
const charStyles = [

    { emoji: '✾' }, { type: 'doubleChar', sign1: '(', sign2: ')' },
    { emoji: '✿' }, { type: 'doubleChar', sign1: '[', sign2: ']' },
    { emoji: '✤' }, { type: 'doubleChar', sign1: '{', sign2: '}' },
    { emoji: '❀' }, { type: 'doubleChar', sign1: '〖', sign2: '〗' },
    { emoji: '❁' }, { type: 'doubleChar', sign1: '〔', sign2: '〕' },
    { emoji: '❃' }, { type: 'doubleChar', sign1: '【', sign2: '】' },
    { emoji: '❊' }, { type: 'doubleChar', sign1: '『', sign2: '』' },
    { emoji: '❋' }, { type: 'doubleChar', sign1: '【', sign2: '】' },
    { emoji: '✣' }, { type: 'doubleChar', sign1: '「', sign2: '」' },
    { emoji: '✤' }, { type: 'doubleChar', sign1: '︸', sign2: '︷' },
    { emoji: 'ꕤ' }, { type: 'doubleChar', sign1: '︼', sign2: '︻' },
    { emoji: 'ꕥ' }, { type: 'doubleChar', sign1: '︿', sign2: '﹀' },
    { emoji: '✽' }, { type: 'doubleChar', sign1: '﹂', sign2: '﹁' },
    { emoji: '⚜' }, { type: 'doubleChar', sign1: '〘', sign2: '〙' },
    { emoji: '♡' }, { type: 'doubleChar', sign1: '〚', sign2: '〛' },
    { emoji: '❤' }, { type: 'doubleChar', sign1: '«', sign2: '»' },
    { emoji: '♥' }, { type: 'doubleChar', sign1: '《', sign2: '》' },
    { emoji: '❤️️'}, { type: 'doubleChar', sign1: '◤', sign2: '◢' },
    { emoji: '❥' }, { type: 'doubleChar', sign1: '╟', sign2: '╢' },
    { emoji: '❣' }, { type: 'doubleChar', sign1: '⦑', sign2: '⦒' },
    { emoji: '❦' }, { type: 'doubleChar', sign1: '⧼', sign2: '⧽' },
    { emoji: '❧' }, { type: 'doubleChar', sign1: '﴾', sign2: '﴿' },
    { emoji: '🖤'}, { type: 'doubleChar', sign1: '|', sign2: '|' },
    { emoji: '۵' }, { type: 'doubleChar', sign1: '╞', sign2: '╡' },
    { emoji: '✩' }, { type: 'doubleChar', sign1: '◄', sign2: '►' },
    { emoji: '✰' }, { type: 'doubleChar', sign1: '⮜', sign2: '⮞' },
    { emoji: '✬' }, { type: 'doubleChar', sign1: '⦓', sign2: '⦔' },
    { emoji: '★' }, { type: 'doubleChar', sign1: '▨', sign2: '▨' },
    { emoji: '✦' },{ type: 'doubleChar', sign1: '⫶', sign2: '⫶' },
    { emoji: '✧' }, { type: 'doubleChar', sign1: '︺', sign2: '︹' },
    { emoji: '✡' }, { type: 'doubleChar', sign1: '︶', sign2: '︵' },
    { emoji: '⁂' },
    { emoji: '⁑' }, 
    { emoji: '✭' }, 
    { emoji: '✮' },
    { emoji: '✯' }, 
    { emoji: '✪' },
    { emoji: '✫' },
    { emoji: '♱' }, 
    { emoji: '✶' }, 
    { emoji: '❄' }, 
    { emoji: '☽' }, 
    { emoji: '🌸' }, 
    { emoji: '💮' }, 
    { emoji: '🎕' }, 
    { emoji: '⧳' },
    { emoji: '～' },
    { emoji: '⧰' }, 
    { emoji: '+' },
    { emoji: '=' },
    { emoji: '⊶' },
    { emoji: '⨳' }, 
    { emoji: '⫶' }, 
    { emoji: 'ɸ' }, 
    { emoji: 'ʘ' }, 
    { emoji: '~' }, 
    { emoji: '♛' }, 
    { emoji: '▨' }, 
    { emoji: '' },     
    /*
    { emoji: '' }, 
    { emoji: '' }, 
    { emoji: '' }, 
    { emoji: '' }, { type: 'doubleChar', sign1: '', sign2: '' },
    { emoji: '' }, { type: 'doubleChar', sign1: '', sign2: '' }, 
     */

];



const fonts = {
    'Fraktur Bold Font  or  Blackboard Bold':'𝕬,𝕭,𝕮,𝕯,𝕰,𝕱,𝕲,𝕳,𝕴,𝕵,𝕶,𝕷,𝕸,𝕹,𝕺,𝕻,𝕼,𝕽,𝕾,𝕿,𝖀,𝖁,𝖂,𝖃,𝖄,𝖅,𝖆,𝖇,𝖈,𝖉,𝖊,𝖋,𝖌,𝖍,𝖎,𝖏,𝖐,𝖑,𝖒,𝖓,𝖔,𝖕,𝖖,𝖗,𝖘,𝖙,𝖚,𝖛,𝖜,𝖝,𝖞,𝖟,1,2,3,4,5,6,7,8,9,0' ,
    'Dark Squares Gem Font':'🅰,🅱,🅲,🅳,🅴,🅵,🅶,🅷,🅸,🅹,🅺,🅻,🅼,🅽,🅾,🅿,🆀,🆁,🆂,🆃,🆄,🆅,🆆,🆇,🆈,🆉,🅰,🅱,🅲,🅳,🅴,🅵,🅶,🅷,🅸,🅹,🅺,🅻,🅼,🅽,🅾,🅿,🆀,🆁,🆂,🆃,🆄,🆅,🆆,🆇,🆈,🆉,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,0️⃣' ,
    'Curvy Font':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
    'Full Width Font':'Ａ,Ｂ,Ｃ,Ｄ,Ｅ,Ｆ,Ｇ,Ｈ,Ｉ,Ｊ,Ｋ,Ｌ,Ｍ,Ｎ,Ｏ,Ｐ,Ｑ,Ｒ,Ｓ,Ｔ,Ｕ,Ｖ,Ｗ,Ｘ,Ｙ,Ｚ,ａ,ｂ,ｃ,ｄ,ｅ,ｆ,ｇ,ｈ,ｉ,ｊ,ｋ,ｌ,ｍ,ｎ,ｏ,ｐ,ｑ,ｒ,ｓ,ｔ,ｕ,ｖ,ｗ,ｘ,ｙ,ｚ,１,２,３,４,５,６,７,８,９,０' ,
    'Fancy Asthetic Font':"Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,1,2,3,4,5,6,7,8,9,0" ,
    'Monospace Font':'𝙰,𝙱,𝙲,𝙳,𝙴,𝙵,𝙶,𝙷,𝙸,𝙹,𝙺,𝙻,𝙼,𝙽,𝙾,𝙿,𝚀,𝚁,𝚂,𝚃,𝚄,𝚅,𝚆,𝚇,𝚈,𝚉,𝚊,𝚋,𝚌,𝚍,𝚎,𝚏,𝚐,𝚑,𝚒,𝚓,𝚔,𝚕,𝚖,𝚗,𝚘,𝚙,𝚚,𝚛,𝚜,𝚝,𝚞,𝚟,𝚠,𝚡,𝚢,𝚣,1,2,3,4,5,6,7,8,9,0' ,
    'Script  Italic Font':'𝒜,𝐵,𝒞,𝒟,𝐸,𝐹,𝒢,𝐻,𝐼,𝒥,𝒦,𝐿,𝑀,𝒩,𝒪,𝒫,𝒬,𝑅,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,𝑒,𝒻,𝑔,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,𝑜,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0' ,
    'Light Bubbles Font':'Ⓐ,Ⓑ,Ⓒ,Ⓓ,Ⓔ,Ⓕ,Ⓖ,Ⓗ,Ⓘ,Ⓙ,Ⓚ,Ⓛ,Ⓜ,Ⓝ,Ⓞ,Ⓟ,Ⓠ,Ⓡ,Ⓢ,Ⓣ,Ⓤ,Ⓥ,Ⓦ,Ⓧ,Ⓨ,Ⓩ,ⓐ,ⓑ,ⓒ,ⓓ,ⓔ,ⓕ,ⓖ,ⓗ,ⓘ,ⓙ,ⓚ,ⓛ,ⓜ,ⓝ,ⓞ,ⓟ,ⓠ,ⓡ,ⓢ,ⓣ,ⓤ,ⓥ,ⓦ,ⓧ,ⓨ,ⓩ,⓪,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⓪',
    'Mathematical Fraktur Font':"𝔄,𝔅,ℭ,𝔇,𝔈,𝔉,𝔊,ℌ,ℑ,𝔍,𝔎,𝔏,𝔐,𝔑,𝔒,𝔓,𝔔,ℜ,𝔖,𝔗,𝔘,𝔙,𝔚,𝔛,𝔜,ℨ,𝔞,𝔟,𝔠,𝔡,𝔢,𝔣,𝔤,𝔥,𝔦,𝔧,𝔨,𝔩,𝔪,𝔫,𝔬,𝔭,𝔮,𝔯,𝔰,𝔱,𝔲,𝔳,𝔴,𝔵,𝔶,𝔷,1,2,3,4,5,6,7,8,9,0",
    'Fairytale Font':'Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,1,2,3,4,5,6,7,8,9,0',
    'Heart Fancy Curvy Font Black':"ᗩ,ᗷ,ᑕ,ᗫ,ꜫ,ፑ,Ԍ,ዙ,ǀ,ᒍ,Қ,ᒷ,ᘻ,Ṇ,Ơ,ᑶ,Ɋ,Ʀ,Տ,Ⲧ,ᑌ,ᕓ,ᙡ,乂,ㄚ,乙,შ,ɓ,ር,Ԃ,Ⲉ,𐍆,ↅ,𐌷,ĺ,ᒎ,Ҡ,し,ᗰ,ᑎ,❍,ᑭ,ᑫ,Ր,Ȿ,Է,ᑌ,Ʋ,ᗯ,Ҳ,ㄚ,乙,ŀ,ᘖ,Ȝ,Ч,ち,꘦,７,ზ,ᑫ,㋨", 
    'Yatagan Font':'ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,1,2,3,4,5,6,7,8,9,0',
    'Math Italic Bold sign':'𝑨,𝑩,𝑪,𝑫,𝑬,𝑭,𝑮,𝑯,𝑰,𝑱,𝑲,𝑳,𝑴,𝑵,𝑶,𝑷,𝑸,𝑹,𝑺,𝑻,𝑼,𝑽,𝑾,𝑿,𝒀,𝒁,𝒂,𝒃,𝒄,𝒅,𝒆,𝒇,𝒈,𝒉,𝒊,𝒋,𝒌,𝒍,𝒎,𝒏,𝒐,𝒑,𝒒,𝒓,𝒔,𝒕,𝒖,𝒗,𝒘,𝒙,𝒚,𝒛,1,2,3,4,5,6,7,8,9,0', 
    'English Gem':'Ⲁ,Ⲃ,Ⲥ,Ⲇ,Ⲉ,𝓕,𝓖,Ⲏ,Ⲓ,𝓙,Ⲕ,𝓛,Ⲙ,Ⲛ,Ⲟ,Ⲣ,𝓠,Ꞅ,Ϩ,Ⲧ,ⴑ,𝓥,Ⲱ,Ⲭ,Ⲩ,Ⲍ,ⲁ,ⲃ,ⲥ,ⲇ,ⲉ,𝓯,𝓰,ⲏ,ⲓ,𝓳,ⲕ,𝓵,ⲙ,ⲛ,ⲟ,ⲣ,𝓺,ꞅ,𝛓,ⲧ,𐌵,𝓿,ⲱ,ⲭ,ⲩ,ⲍ,1,2,3,4,5,6,7,8,9,0',
    'Soviet Fancy Font':'Д,Ѣ,Ҁ,D,З,F,G,њ,I,J,К,L,M,Й,Ф,P,Q,Я,S,Ҭ,Ц,V,Ш,Ж,Ӳ,Z,ӓ,ѣ,ҁ,d,Э,f,g,ћ,ї,j,К,ʅ,m,ђ,ѳ,p,q,Г,s,ҭ,Ч,ѵ,Ш,x,ӳ,z,1,2,3,4,5,6,7,8,9,0', 
    'Ancient Gem 4 Font ':'𒋻,𒁀,𐏓,𒁓,𒀼,𐎣,𒋝,𒀂,𒐕,𒑟,𒐞,𒁇,𐎠,𒐖,𒆸,𒇬,𒌒,𒇲,丂,𒈦,𒑚,𐎏,𒉼,𒉽,𒌨,𒑣,𒋻,𒁀,𐏓,𒁓,𒀼,𐎣,𒋝,𒀂,𒐕,𒑟,𒐞,𒁇,𐎠,𒐖,𒆸,𒇬,𒌒,𒇲,丂,𒈦,𒑚,𐎏,𒉼,𒉽,𒌨,𒑣,𝟏,𝟐,𝟑,𝟒,𝟓,𝟔,𝟕,𝟖,𝟗',
    'Hourglass Font':'A,♭,꒞,꒯,㉹,f,꒸,♬,ﭐ,꒻,k,L,Ѫ,ո,♡,р,զ,r,Ֆ,†,ﮠ,v,ա,꒾,վ,Հ,a,♭,꒞,꒯,㉹,f,꒸,♬,ﭐ,꒻,k,L,Ѫ,ո,♡,р,զ,r,Ֆ,†,ﮠ,v,ա,꒾,վ,Հ,1,2,3,4,5,6,7,8,9,0',
    'Blackboard Bold Font':'𝔸,𝔹,ℂ,𝔻,𝔼,𝔽,𝔾,ℍ,𝕀,𝕁,𝕂,𝕃,𝕄,ℕ,𝕆,ℙ,ℚ,ℝ,𝕊,𝕋,𝕌,𝕍,𝕎,𝕏,𝕐,ℤ,𝕒,𝕓,𝕔,𝕕,𝕖,𝕗,𝕘,𝕙,𝕚,𝕛,𝕜,𝕝,𝕞,𝕟,𝕠,𝕡,𝕢,𝕣,𝕤,𝕥,𝕦,𝕧,𝕨,𝕩,𝕪,𝕫,𝟙,𝟚,𝟛,𝟜,𝟝,𝟞,𝟟,𝟠,𝟡,𝟘',
    'Gem Glitch Font':'λ,ß,Ȼ,ɖ,ε,ʃ,Ģ,ħ,ί,ĵ,κ,ι,ɱ,ɴ,Θ,ρ,ƣ,ર,Ș,τ,Ʋ,ν,ώ,Χ,ϓ,Հ,λ,ß,Ȼ,ɖ,ε,ʃ,Ģ,ħ,ί,ĵ,κ,ι,ɱ,ɴ,Θ,ρ,ƣ,ર,Ș,τ,Ʋ,ν,ώ,Χ,ϓ,Հ,1,2,3,4,5,6,7,8,9,0',
    'Light Squares gem Font':'🄰,🄱,🄲,🄳,🄴,🄵,🄶,🄷,🄸,🄹,🄺,🄻,🄼,🄽,🄾,🄿,🅀,🅁,🅂,🅃,🅄,🅅,🅆,🅇,🅈,🅉,🄰,🄱,🄲,🄳,🄴,🄵,🄶,🄷,🄸,🄹,🄺,🄻,🄼,🄽,🄾,🄿,🅀,🅁,🅂,🅃,🅄,🅅,🅆,🅇,🅈,🅉,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,0️⃣ ',
    'Gem Mix 2':'ᗩ,ᗷ,ᑕ,ᗪ,Ⓔ,ᖴ,Ⓖ,ᕼ,Ⓘ,ᒍ,Ⓚ,ᒪ,ᗰ,ᑎ,Ⓞ,ᑭ,ᑫ,ᖇ,ᔕ,Ⓣ,ᑌ,ᐯ,ᗯ,᙭,Ⓨ,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,Ⓔ,ᖴ,Ⓖ,ᕼ,Ⓘ,ᒍ,Ⓚ,ᒪ,ᗰ,ᑎ,Ⓞ,ᑭ,ᑫ,ᖇ,ᔕ,Ⓣ,ᑌ,ᐯ,ᗯ,᙭,Ⓨ,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦',
    'Ancient Gem 1 Font ':'ꍏ,ꌃ,ꉓ,ꀸ,ꍟ,ꎇ,ꁅ,ꃅ,ꀤ,ꀭ,ꀘ,꒒,ꂵ,ꈤ,ꂦ,ꉣ,ꆰ,ꋪ,ꌗ,꓄,ꀎ,ꃴ,ꅏ,ꊼ,ꌩ,ꁴ,ꍏ,ꌃ,ꉓ,ꀸ,ꍟ,ꎇ,ꁅ,ꃅ,ꀤ,ꀭ,ꀘ,꒒,ꂵ,ꈤ,ꂦ,ꉣ,ꆰ,ꋪ,ꌗ,꓄,ꀎ,ꃴ,ꅏ,ꊼ,ꌩ,ꁴ,1,2,3,4,5,6,7,8,9,0',
    'Crimped Fancy':'α,Ⴆ,ƈ,ԃ,ҽ,ϝ,ɠ,ԋ,ι,ʝ,ƙ,ʅ,ɱ,ɳ,σ,ρ,ϙ,ɾ,ʂ,ƚ,υ,ʋ,ɯ,X,ყ,ȥ,α,Ⴆ,ƈ,ԃ,ҽ,ϝ,ɠ,ԋ,ι,ʝ,ƙ,ʅ,ɱ,ɳ,σ,ρ,ϙ,ɾ,ʂ,ƚ,υ,ʋ,ɯ,x,ყ,ȥ,1,2,3,4,5,6,7,8,9,0',
    'Inverted Upside Down Font':'∀,ᗺ,Ɔ,ᗡ,Ǝ,Ⅎ,⅁,H,I,ſ,ꓘ,˥,W,N,O,Ԁ,ტ,ᴚ,S,⊥,∩,Λ,M,X,⅄,Z,ɐ,q,ɔ,p,ǝ,ɟ,ƃ,ɥ,ı,ɾ,ʞ,ן,ɯ,u,o,d,b,ɹ,s,ʇ,n,ʌ,ʍ,x,ʎ,z,Ɩ,ᘔ,Ɛ,♄,5,9,ㄥ,8,6,0',
    'Zalgo Level 3':'"̵̡̔A̸̦͂̔,̴̘̓̅͋B̷͚̫͊́,̸̘̪̍̍C̷̙͍̍͜,̷̖̆D̴͍̯̻̐͑,̸̧͚̣͊Ḛ̵̤̽̇̚,̷̟̟̑͑F̴̳̞̃̓,̵͕͕̗̅̒G̴͙̋,̷̜͐͂H̶͍̠̩̍̋̾,̸̻̅̈́͜Ḭ̶̰̘̏,̷̢̣̠̉̀J̵̡̉̀̌,̴͔͔̇̀̕K̸͓̿̓͜,̵̰̰̇̎͜L̶̀͐͜,̸͉͚͇̌̿M̵͕̲͓̐,̶̬͖͂̎͋N̴̪͖͑̕̚,̷̟̋̚Ó̴͖ͅ,̸͍̤̎̈̍P̴̠̟͛,̵̖̇͘͝Q̷̬͔́,̸̣̏̕R̷̛̞̪̥̓,̴̧̘͌S̵͚̯̏͛̕,̴̞̀͊͊T̸̮̀̌,̵̟̰̭̎Ȕ̵͎̜̯̓̽,̸̟͛V̴͍̯͙̐̂,̷̯͋W̵̰͊͑,̴͎̭̞̏̚X̴̨͖̙̆,̶̟͌͠Y̸̳̳̤͂̑͋,̸̪̉͋̅Z̵̲͉͖͋,̶̖̮̳̀̿a̸̺̠͚̽͆,̴͗͌͜b̷̫͊̆,̴͓̘͕͒͘c̴̨̐́͋,̵͉̎d̴̫͕̬̿̏,̸̧̻̻́̕e̴̙̖̋,̷̠̈͛f̵̜̠͑́̾,̷͙̀̃͊g̴̱̣͇̈́͘,̸̞͔̀ḧ̴͍́,̶̧̰̐͌i̷̤̍̀̅,̷̠̇̊j̶̭̲͔͋̊,̷͚̞̓k̸͍͙̿,̸̢̻̻̽͐l̸̲̲͙̉͆,̵̨̰̆̾ṃ̴̼̊̓͋,̸̞͈̊ṋ̷͎̌͜,̴̦̽̀ȍ̶̯̰̘̒́,̷̥̊p̷̜̥͒͗,̵̗̱͍̉̉q̶̜̔̀,̶̢̥̅̑͆r̷͕͝,̵͉̤̯̓͋s̶̗͍̃̍̈,̷̥̽͠ẗ̵̢͔́,̸̼̓͑͝ṷ̵͔͆̂,̶͚̩̿̓v̶̟̩̗̈,̷̙̈́͗̌w̵͔͊͐̕,̸͕̆̆x̵͕͕̒,̷̩̝̭̆̚y̷̟̠̐͐̈́,̵̭̯̃z̸̜̮̄͊,̴͉̣̃͑͝1̴̮̯̐̎̉,̴͖̽̈2̸̲́̇,̵̬͚͈̂̂̿3̴̦̹̘̓,̴̠͕̓4̸̰͍͒͌,̷̺̼̖̓̈́5̸̆͐͜,̴̥̽̕͠6̷̖̈͆͐,̸̹͚̏7̶̨̈́,̸̨̤̀8̶̡̲͈̑͋̕,̶̱̬̪̔͒̔9̶̑̄̃ͅ,̸̪̲̈́0̴̢͎̜̂̂͝"̷̳̏̒',
    'Tiny upper Gem 1':'ᴬ,ᴮ,ᶜ,ᴰ,ᴱ,ᶠ,ᴳ,ᴴ,ᴵ,ᴶ,ᴷ,ᴸ,ᴹ,ᴺ,ᴼ,ᴾ,ᵠ,ᴿ,ˢ,ᵀ,ᵁ,ⱽ,ᵂ,ˣ,ʸ,ᶻ,ᵃ,ᵇ,ᶜ,ᵈ,ᵉ,ᶠ,ᵍ,ʰ,ⁱ,ʲ,ᵏ,ˡ,ᵐ,ⁿ,ᵒ,ᵖ,ᵠ,ʳ,ˢ,ᵗ,ᵘ,ᵛ,ʷ,ˣ,ʸ,ᶻ,¹,²,³,⁴,⁵,⁶,⁷,⁸,⁹,⁰' ,
    'Fancy Gem':'ⲇ,ⲃ,ⲥ,𝖽,ⲉ,f,ⳋ,ⲏ,ⳕ,ⳗ,қ,ⳑ,ϻ,ⲛ,ⲟ,ⳏ,ⳝ,ⲅ,⳽,τ,υ,ⳳ,ⲱ,ⲭ,ⲩ,ⲹ,ⲇ,ⲃ,ⲥ,𝖽,ⲉ,f,ⳋ,ⲏ,ⳕ,ⳗ,қ,ⳑ,ϻ,ⲛ,ⲟ,ⳏ,ⳝ,ⲅ,⳽,τ,υ,ⳳ,ⲱ,ⲭ,ⲩ,ⲹ,1,2,3,4,5,6,7,8,9,0',
    'Bracket Font':'﴾Ä̤﴿,﴾B̤̈﴿,﴾C̤̈﴿,﴾D̤̈﴿,﴾Ë̤﴿,﴾F̤̈﴿,﴾G̤̈﴿,﴾Ḧ̤﴿,﴾Ï̤﴿,﴾J̤̈﴿,﴾K̤̈﴿,﴾L̤̈﴿,﴾M̤̈﴿,﴾N̤̈﴿,﴾Ö̤﴿,﴾P̤̈﴿,﴾Q̤̈﴿,﴾R̤̈﴿,﴾S̤̈﴿,﴾T̤̈﴿,﴾Ṳ̈﴿,﴾V̤̈﴿,﴾Ẅ̤﴿,﴾Ẍ̤﴿,﴾Ÿ̤﴿,﴾Z̤̈﴿,﴾ä̤﴿,﴾b̤̈﴿,﴾c̤̈﴿,﴾d̤̈﴿,﴾ë̤﴿,﴾f̤̈﴿,﴾g̤̈﴿,﴾ḧ̤﴿,﴾ï̤﴿,﴾j̤̈﴿,﴾k̤̈﴿,﴾l̤̈﴿,﴾m̤̈﴿,﴾n̤̈﴿,﴾ö̤﴿,﴾p̤̈﴿,﴾q̤̈﴿,﴾r̤̈﴿,﴾s̤̈﴿,﴾ẗ̤﴿,﴾ṳ̈﴿,﴾v̤̈﴿,﴾ẅ̤﴿,﴾ẍ̤﴿,﴾ÿ̤﴿,﴾z̤̈﴿,﴾1̤̈﴿,﴾2̤̈﴿,﴾3̤̈﴿,﴾4̤̈﴿,﴾5̤̈﴿,﴾6̤̈﴿,﴾7̤̈﴿,﴾8̤̈﴿,﴾9̤̈﴿',
    'Different font 2':'𝐀,β,ⓒ,𝓭,𝑒,ⓕ,ᵍ,ⓗ,Ꭵ,ן,ᵏ,𝕃,ｍ,ⓝ,𝓸,Ƥ,ℚ,ⓡ,𝓼,Ｔ,𝓾,v,𝓌,ⓧ,ץ,Ż,𝐚,๒,Ć,𝓭,𝑒,ⓕ,𝕘,𝓱,Ɨ,Ｊ,Ⓚ,ᒪ,м,𝐍,Ø,卩,q,я,丂,𝐓,ย,ｖ,𝔀,x,𝔂,𝓩,➀,❷,➂,４,❺,６,❼,➇,❾,０', 
    'Indian Fancy':'ค,ც,८,ძ,૯,Բ,૭,Һ,ɿ,ʆ,қ,Ն,ɱ,Ո,૦,ƿ,ҩ,Ր,ς,੮,υ,౮,ω,૪,ע,ઽ,ค,ც,८,ძ,૯,Բ,૭,Һ,ɿ,ʆ,қ,Ն,ɱ,Ո,૦,ƿ,ҩ,Ր,ς,੮,υ,౮,ω,૪,ע,ઽ,1,2,3,4,5,6,7,8,9,0',
    'Dark Bubbles Font':'🅐,🅑,🅒,🅓,🅔,🅕,🅖,🅗,🅘,🅙,🅚,🅛,🅜,🅝,🅞,🅟,🅠,🅡,🅢,🅣,🅤,🅥,🅦,🅧,🅨,🅩,🅐,🅑,🅒,🅓,🅔,🅕,🅖,🅗,🅘,🅙,🅚,🅛,🅜,🅝,🅞,🅟,🅠,🅡,🅢,🅣,🅤,🅥,🅦,🅧,🅨,🅩,➊,➋,➌,➍,➎,➏,➐,➑,➒,⓿',
    'Small gem':'ꭺ,ᏼ,ꮯ,ꭰ,ꭼ,ꮁ,ᏽ,ꮋ,ꮖ,ꭻ,ꮶ,ꮮ,ꮇ,ꮑ,ꮎ,ꮲ,ꭴ,ꭱ,ꮪ,ꭲ,ꮼ,ꮩ,ꮤ,ꮂ,ꭹ,ꮓ,ꭺ,ᏼ,ꮯ,ꭰ,ꭼ,ꮁ,ᏽ,ꮋ,ꮖ,ꭻ,ꮶ,ꮮ,ꮇ,ꮑ,ꮎ,ꮲ,ꭴ,ꭱ,ꮪ,ꭲ,ꮼ,ꮩ,ꮤ,ꮂ,ꭹ,ꮓ,1,2,3,4,5,6,7,8,9,0',
    'Crimped Fancy Box':'[α̲̅],[Ⴆ],[ƈ̲̅],[ԃ̲̅],[ҽ̲̅],[ϝ̲̅],[ɠ̲̅],[ԋ̲̅],[ι̲̅],[ʝ̲̅],[ƙ̲̅],[ʅ̲̅],[ɱ̲̅],[ɳ̲̅],[σ̲̅],[ρ̲̅],[ϙ̲̅],[ɾ̲̅],[ʂ̲̅],[ƚ̲̅],[υ̲̅],[ʋ̲̅],[ɯ̲̅],[X̲̅],[ყ],[ȥ̲̅],[α̲̅],[Ⴆ],[ƈ̲̅],[ԃ̲̅],[ҽ̲̅],[ϝ̲̅],[ɠ̲̅],[ԋ̲̅],[ι̲̅],[ʝ̲̅],[ƙ̲̅],[ʅ̲̅],[ɱ̲̅],[ɳ̲̅],[σ̲̅],[ρ̲̅],[ϙ̲̅],[ɾ̲̅],[ʂ̲̅],[ƚ̲̅],[υ̲̅],[ʋ̲̅],[ɯ̲̅],[x̲̅],[ყ],[ȥ̲̅],[1̲̅],[2̲̅],[3̲̅],[4̲̅],[5̲̅],[6̲̅],[7̲̅],[8̲̅],[9̲̅],[0̲̅]',
    "Gem Mix 1":'ᗩ,ᗷ,ᑕ,ᗪ,𝐸,ᖴ,𝒢,ᕼ,𝐼,ᒍ,𝒦,ᒪ,ᗰ,ᑎ,𝒪,ᑭ,ᑫ,ᖇ,ᔕ,𝒯,ᑌ,ᐯ,ᗯ,᙭,𝒴,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,𝐸,ᖴ,𝒢,ᕼ,𝐼,ᒍ,𝒦,ᒪ,ᗰ,ᑎ,𝒪,ᑭ,ᑫ,ᖇ,ᔕ,𝒯,ᑌ,ᐯ,ᗯ,᙭,𝒴,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦',
    'Mix Gem Bold':'𝓐,𝓑,𝓒,𝓓,𝓔,𝓕,𝓖,𝓗,𝓘,𝓙,𝓚,𝑳,𝕸,𝕹,𝕺,𝕻,𝕼,𝕽,𝕾,𝕿,𝖀,𝗩,𝗪,𝗫,𝗬,𝗭,𝗮,𝗯,𝗰,𝗱,𝗲,𝗳,𝗴,𝗵,𝗶,𝗷,𝗸,𝕝,𝕞,𝕟,𝕠,𝕡,𝕢,𝕣,𝕤,𝕥,𝕦,𝙫,𝙬,𝙭,𝙮,𝙯,𝟭,𝟮,𝟑,𝟒,𝟓,𝟔,𝟕,𝟖,𝟗,𝟎',
    'Curvy Bracket':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
    'Stylish Gem':'𝛥,𝛣,𝐶,𝐷,𝛴,𝐹,𝐺,𝛨,𝛪,𝐽,𝛫,𝐿,𝛺,𝛱,𝛩,𝛲,𝛷,𝛤,𝑆,𝛵,𝑈,𝛻,𝑊,𝛸,𝛹,𝛧,𝛼,𝛽,𝜍,𝛿,𝜀,𝑓,𝑔,𝜆,𝑖,𝑗,𝜅,𝜄,𝑚,𝜂,𝜃,𝜌,𝜑,𝛾,𝑠,𝜏,𝜇,𝜈,𝜛,𝜒,𝜓,𝑧,1,2,3,4,5,6,7,8,9,0',
    'Blackboard Bold Cross':'𝔸,𝔹,ℂ,𝔻,𝔼,𝔽,𝔾,ℍ,𝕀,𝕁,𝕂,𝕃,𝕄,ℕ,𝕆,ℙ,ℚ,ℝ,𝕊,𝕋,𝕌,𝕍,𝕎,𝕏,𝕐,ℤ,𝕒,𝕓,𝕔,𝕕,𝕖,𝕗,𝕘,𝕙,𝕚,𝕛,𝕜,𝕝,𝕞,𝕟,𝕠,𝕡,𝕢,𝕣,𝕤,𝕥,𝕦,𝕧,𝕨,𝕩,𝕪,𝕫,𝟙,𝟚,𝟛,𝟜,𝟝,𝟞,𝟟,𝟠,𝟡,𝟘',
    'Fancy Gem 1':'λ,𐒈,𐒨,Ꮷ,𐒢,Ӻ,Ⳓ,𐒅,Ꭵ,Ꮽ,Ꮵ,Ꮣ,𐒄,𐒐,𐒀,Ꮅ,𐒉,Ⲅ,Ꮄ,Ꮏ,𐒜,Ꮙ,Ꮚ,𐒎,𐒍,೩,λ,𐒈,𐒨,Ꮷ,𐒢,Ӻ,Ⳓ,𐒅,Ꭵ,Ꮽ,Ꮵ,Ꮣ,𐒄,𐒐,𐒀,Ꮅ,𐒉,Ⲅ,Ꮄ,Ꮏ,𐒜,Ꮙ,Ꮚ,𐒎,𐒍,೩,ꛨ,੨,Ѯ,Ч,Ҕ,Ҩ,𑁭,8,૭,θ',
    'Bold Gem':'𝝙,𝝗,𝗖,𝗗,𝝨,𝗙,𝗚,𝝜,𝝞,𝗝,𝝟,𝗟,𝝮,𝝥,𝝝,𝝦,𝝫,𝝘,𝗦,𝝩,𝗨,𝝯,𝗪,𝝬,𝝭,𝝛,𝝰,𝝱,𝞁,𝝳,𝝴,𝗳,𝗴,𝝺,𝗶,𝗷,𝝹,𝝸,𝗺,𝝶,𝝷,𝞀,𝞅,𝝲,𝘀,𝞃,𝝻,𝝼,𝞏,𝞆,𝞇,𝘇,𝟭,𝟮,𝟯,𝟰,𝟱,𝟲,𝟳,𝟴,𝟵,𝟬',



// Add more fonts here
   };



function generateFontMapping(fontString) {
    const fontArray = fontString.split(',');
    const baseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    const mapping = {};
    for (let i = 0; i < baseCharacters.length; i++) {
        mapping[baseCharacters[i]] = fontArray[i];
    }
    return mapping;
}

function mapToFont(fontMapping, inputText) {
    return inputText.split('').map(char => fontMapping[char] || char).join('');
}


// Create shared scrollable lines for each modification type
createScrollButtons('charButtonsRow1', 'charButtonsRow2','charButtonsRow3', 'charButtonsRow4', charStyles, charStyleDescriptor, applyCharStyle);
createScrollButtons('wordButtonsRow1', 'wordButtonsRow2','wordButtonsRow3', 'wordButtonsRow4', wordStyles, wordStyleDescriptor, applyWordStyle);
createScrollButtons('spaceButtonsRow1', 'spaceButtonsRow2','spaceButtonsRow3', 'spaceButtonsRow4',  spaceStyles, spaceStyleDescriptor, applySpaceStyle);
createScrollButtons('fullTextButtonsRow1', 'fullTextButtonsRow2','fullTextButtonsRow3', 'fullTextButtonsRow4', fullTextStyles, fullTextStyleDescriptor, applyFullTextStyle);

// Remove button logic
document.getElementById('removeFullTextButton').addEventListener('click', () => { currentFullTextStyle = null; applyModifications(transformedText); });
document.getElementById('removeWordButton').addEventListener('click', () => { currentWordStyle = null; applyModifications(transformedText); });
document.getElementById('removeCharButton').addEventListener('click', () => { currentCharStyle = null; applyModifications(transformedText); });
document.getElementById('removeSpaceButton').addEventListener('click', () => { currentSpaceStyle = null; applyModifications(transformedText); });

document.getElementById('removeFullTextButton').addEventListener('click', () => { 
    currentFullTextStyle = null; 
    applyModifications(transformedText); 
    // Clear active state for all four rows of Full Text buttons
    setActiveButton('fullTextButtonsRow1', null);
    setActiveButton('fullTextButtonsRow2', null);
    setActiveButton('fullTextButtonsRow3', null);
    setActiveButton('fullTextButtonsRow4', null);
});

document.getElementById('removeWordButton').addEventListener('click', () => { 
    currentWordStyle = null; 
    applyModifications(transformedText); 
    // Clear active state for all four rows of Word buttons
    setActiveButton('wordButtonsRow1', null);
    setActiveButton('wordButtonsRow2', null);
    setActiveButton('wordButtonsRow3', null);
    setActiveButton('wordButtonsRow4', null);
});

document.getElementById('removeCharButton').addEventListener('click', () => { 
    currentCharStyle = null; 
    applyModifications(transformedText); 
    // Clear active state for all four rows of Char buttons
    setActiveButton('charButtonsRow1', null);
    setActiveButton('charButtonsRow2', null);
    setActiveButton('charButtonsRow3', null);
    setActiveButton('charButtonsRow4', null);
});

document.getElementById('removeSpaceButton').addEventListener('click', () => { 
    currentSpaceStyle = null; 
    applyModifications(transformedText); 
    // Clear active state for all four rows of Space buttons
    setActiveButton('spaceButtonsRow1', null);
    setActiveButton('spaceButtonsRow2', null);
    setActiveButton('spaceButtonsRow3', null);
    setActiveButton('spaceButtonsRow4', null);
});

const element1 = document.getElementById('outputText');
const element2 = document.getElementById('outputSection');
const element3 = document.getElementById('copyButton');

const copyButton = document.getElementById('copyButton');

// Function to change the button text when either element is clicked
function changeButtonText() {
  copyButton.textContent = 'Copied';
  setTimeout(() => {
    copyButton.textContent = 'Copy';
  }, 2000);
}

// Add click event listeners to both elements
element1.addEventListener('click', changeButtonText);
element2.addEventListener('click', changeButtonText);
element3.addEventListener('click', changeButtonText);


// Helper Function
function separateEmojisAroundWord(text, leftEmoji, rightEmoji) {
    // Use a regular expression to split the text while preserving spaces
    const wordsAndSpaces = text.split(/(\s+)/);  // This keeps spaces as separate elements

    return wordsAndSpaces.map(item => {
        // Only add emojis around words, ignore spaces
        if (item.trim() !== "") {  // Check if it's not a space (trim removes spaces)
            return `${leftEmoji}${item}${rightEmoji}`;  // Add emojis around non-space items
        } else {
            return item;  // Return spaces without modification
        }
    }).join("");  // Join the array back into a string without altering spaces
}

/*
function insertEmojiAroundChars(text, emoji) {
    const newText = insertEmojiBetweenChars(text, emoji); // Apply emoji between characters
    return separateEmojisAroundWord(newText, emoji, emoji); // Then separate words with emojis
}
*/

function addTwoSignsAroundChars(text, sign1, sign2) {
    return Array.from(text).map(char => char !== ' ' ? `${sign1}${char}${sign2}` : char).join('');
}

function insertEmojiBetweenChars(text, emoji) {
    let chars = Array.from(text);
    let result = [];
    chars.forEach((char, index) => {
        result.push(char);
        if (index < chars.length - 1 && char !== ' ' && chars[index + 1] !== ' ') {
            result.push(emoji);
        }
    });
    return result.join('');
}


function addEmojiToSpaces(text, emoji) {
    return text.replace(/(?<=\S) +(?=\S)/g, `${emoji}`);
}


function setActiveButton(containerId, activeButton) {
    const container = document.getElementById(containerId);
    
    if (!container) return; // If container is not found, stop execution.

    // Remove active class from all buttons in the container
    const buttons = container.getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('active-style'); // Remove 'active-style' class
    }

    // If the activeButton is null, just return (no need to set any class)
    if (!activeButton) return;

    // Add active class to the current button
    activeButton.classList.add('active-style');
}


 
    
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const range = document.createRange();
    const selection = window.getSelection();
  
    // Clear any current selection
    selection.removeAllRanges();
  
    // Select the text within the specified element
    range.selectNodeContents(element);
    selection.addRange(range);
  
    // Execute the copy command
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  
    // Get the copied HTML
    let copiedHTML = element.innerHTML;
  
    // Clear the selection
    selection.removeAllRanges();
  
    // Replace any <img> tags (emojis) with their alt text (emoji character)
    copiedHTML = copiedHTML.replace(/<img [^>]*alt="([^"]+)"[^>]*>/g, '$1');
  
    // Remove any existing notification
    let existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
  
    // Create a notification to indicate copied text
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `𝗖𝗼𝗽𝗶𝗲𝗱 𝗧𝗲𝘅𝘁 <br> ${copiedHTML}`;  // Show copied text (with emojis) in the notification
  
    // Create a close button (cross sign) for the notification
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';  // HTML entity for a cross sign
    closeButton.classList.add('close-button');  // Add a CSS class for styling the close button
  
    // Add event listener to the close button to remove the notification
    closeButton.addEventListener('click', () => {
      notification.remove();
    });
  
    // Append the close button to the notification
    notification.appendChild(closeButton);
  
    // Append the notification to the body
    document.body.appendChild(notification);
  
    // Remove the notification after 7 seconds
    setTimeout(() => {
      notification.remove();
    }, 7000);
  }
  
   document.getElementById("outputSection").addEventListener("click", function() {
       copyToClipboard('outputSection');
    });

    document.getElementById("copyButton").addEventListener("click", function() {
         copyToClipboard('outputSection');
    });
    document.getElementById("outputText").addEventListener("click", function() {
        copyToClipboard('outputSection');
   });


    //erase text from input  
        const eraseLogo = document.getElementById('eraseLogo');
        const input = document.getElementById('decoreinputText');
        
        // Hide erase logo initially
        eraseLogo.style.display = input.value.length > 0 ? 'inline-block' : 'none';
        
        eraseLogo.addEventListener('click', () => {
            input.value = '';
            eraseLogo.style.display = 'none';
        });
        
        input.addEventListener('input', () => {
            eraseLogo.style.display = input.value.length > 0 ? 'inline-block' : 'none';
        });
        
        
        
              // Menu JavaScript
    
        const leftSign = document.querySelector('.left-sign');
        const rightSign = document.querySelector('.right-sign');
        const fontsMenu = document.querySelector('.fonts-menu');
        let scrollInterval;
        const scrollAmount = 10;
    
        // Check arrow visibility
        const checkArrowVisibility = () => {
         const atStart = fontsMenu.scrollLeft <= 0;
         const atEnd = fontsMenu.scrollLeft >= (fontsMenu.scrollWidth - fontsMenu.clientWidth - 1);
         leftSign.classList.toggle('hidden', atStart);
         rightSign.classList.toggle('hidden', atEnd);
        };
    
        fontsMenu.addEventListener('scroll', checkArrowVisibility);
    
        // Start scrolling function
        const startScrolling = (direction) => {
    
            scrollInterval = setInterval(() => {
              fontsMenu.scrollLeft += direction * scrollAmount;
              checkArrowVisibility(); // Ensure arrow visibility is updated during scrolling
            }, 15); // Adjust the speed of scrolling here (lower value means faster scrolling)
    
        };
    
        // Stop scrolling function
        const stopScrolling = () => {
            clearInterval(scrollInterval);
        };
    
        // Mouse events
        leftSign.addEventListener('mousedown', () => {
            startScrolling(-1); // Scroll left
            leftSign.classList.add('active'); // Manually add active class
        });
    
        rightSign.addEventListener('mousedown', () => {
            startScrolling(1); // Scroll right
            rightSign.classList.add('active'); // Manually add active class
        });
    
        document.addEventListener('mouseup', () => {
            stopScrolling();
            leftSign.classList.remove('active'); // Manually remove active class
            rightSign.classList.remove('active'); // Manually remove active class
        });
    
        // Touch events
        leftSign.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent default behavior
            startScrolling(-1); // Scroll left
            leftSign.classList.add('active'); // Manually add active class
        });
    
        rightSign.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent default behavior
            startScrolling(1); // Scroll right
            rightSign.classList.add('active'); // Manually add active class
        });
    
        document.addEventListener('touchend', () => {
            stopScrolling();
            leftSign.classList.remove('active'); // Manually remove active class
            rightSign.classList.remove('active'); // Manually remove active class
        });
    
        document.addEventListener('touchcancel', () => {
            stopScrolling();
            leftSign.classList.remove('active'); // Manually remove active class
            rightSign.classList.remove('active'); // Manually remove active class 
        });
    
        // Initial check for arrow visibility
        checkArrowVisibility();
    
        // Function to set active menu item based on current page URL
        function setActiveMenuItem() {
            const currentPageUrl = window.location.href;
            const menuItems = document.querySelectorAll('.fonts-menu-item');
            let activeItem = null;
    
            menuItems.forEach(item => {
    
                const itemUrl = item.getAttribute('data-url');
    
                if (itemUrl === currentPageUrl) {
                    item.classList.add('active');
                    activeItem = item;
                } else {
                    item.classList.remove('active');
                }
    
            });
    
            // Move the active item to the first position if there is one
            if (activeItem) {
                fontsMenu.insertBefore(activeItem, fontsMenu.firstChild);
            }
    
        }
    
        setActiveMenuItem();
    
        document.querySelectorAll('.fonts-menu-item').forEach(item => {
    
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                window.location.href = url;
            });
    
        });
    
    
 
        
    
    
});
    