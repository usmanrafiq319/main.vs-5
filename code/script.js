// Variables to track the current styles
let currentFullTextStyle = null;
let currentWordStyle = null;
let currentCharStyle = null;
let currentSpaceStyle = null;

// Apply modifications in order of priority
function applyModifications() {
    let inputText = document.getElementById('inputText').value;
    let modifiedText = inputText;

    // Apply character modification first if it exists
    if (currentCharStyle) {
        if (currentCharStyle.type === 'doubleChar') {
            modifiedText = addTwoSignsAroundChars(modifiedText, currentCharStyle.sign1, currentCharStyle.sign2);
        } else if (currentCharStyle.type === 'aroundChars') {
            modifiedText = insertEmojiAroundChars(modifiedText, currentCharStyle.emoji);
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

    // Apply full text modification if it exists
    if (currentFullTextStyle) {
        modifiedText = currentFullTextStyle.start + modifiedText + currentFullTextStyle.end;
    }

    document.getElementById('outputSection').textContent = modifiedText;
}

// Helper function to create a single shared scrollable line for each category
function createScrollButtons(container1Id, container2Id, styles, descriptor, applyCallback) {
    const container1 = document.getElementById(container1Id);
    const container2 = document.getElementById(container2Id);

    styles.forEach((style, index) => {
        const button = document.createElement('button');
        button.textContent = descriptor(style);
        button.addEventListener('click', () => {
            applyCallback(style);
            applyModifications();
        });
        // Append buttons in two separate rows but sharing the same scroll area
        if (index % 2 === 0) {
            container1.appendChild(button);
        } else {
            container2.appendChild(button);
        }
    });
}

// Define descriptors for the button labels
function fullTextStyleDescriptor(style) {
    return `${style.start}Text${style.end}`;
}

function wordStyleDescriptor(style) {
    return `${style.left}Words${style.right}`;
}

function charStyleDescriptor(style) {
    if (style.type === 'doubleChar') {
        return `${style.sign1}Char${style.sign2}`;
    } else if (style.type === 'aroundChars') {
        return ` ${style.emoji}C${style.emoji}h${style.emoji}r${style.emoji} `;
    }
    return `W${style.emoji}o${style.emoji}r${style.emoji}d`;
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
    { start: '❗', end: '❗' }, 
    { start: '🔥', end: '🔥' }, 
    { start: '⭐', end: '⭐' }
];
const wordStyles = [
    { left: '✨', right: '✨' }, 
    { left: '🍀', right: '🍀' }, 
    { left: '🌟', right: '🌟' }
];
const charStyles = [
    { emoji: '🎵' }, 
    { emoji: '🌸' }, 
    { type: 'doubleChar', sign1: '(', sign2: ')' },
    { type: 'aroundChars', emoji: '💎' }
];
const spaceStyles = [
    { emoji: '🔹' }, 
    { emoji: '⭐' }, 
    { emoji: '🌟' }
];

// Create shared scrollable lines for each modification type
createScrollButtons('charButtonsRow1', 'charButtonsRow2', charStyles, charStyleDescriptor, applyCharStyle);
createScrollButtons('wordButtonsRow1', 'wordButtonsRow2', wordStyles, wordStyleDescriptor, applyWordStyle);
createScrollButtons('spaceButtonsRow1', 'spaceButtonsRow2', spaceStyles, spaceStyleDescriptor, applySpaceStyle);
createScrollButtons('fullTextButtonsRow1', 'fullTextButtonsRow2', fullTextStyles, fullTextStyleDescriptor, applyFullTextStyle);

// Remove button logic
document.getElementById('removeFullTextButton').addEventListener('click', () => { currentFullTextStyle = null; applyModifications(); });
document.getElementById('removeWordButton').addEventListener('click', () => { currentWordStyle = null; applyModifications(); });
document.getElementById('removeCharButton').addEventListener('click', () => { currentCharStyle = null; applyModifications(); });
document.getElementById('removeSpaceButton').addEventListener('click', () => { currentSpaceStyle = null; applyModifications(); });

// Helper Functions
function separateEmojisAroundWord(text, leftEmoji, rightEmoji) {
    const words = text.split(" ");
    return words.map(word => `${leftEmoji}${word}${rightEmoji}`).join(" ");
}

function insertEmojiAroundChars(text, emoji) {
    const newText = insertEmojiBetweenChars(text, emoji); // Apply emoji between characters
    return separateEmojisAroundWord(newText, emoji, emoji); // Then separate words with emojis
}

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
    return text.replace(/ /g, ` ${emoji} `);
}
