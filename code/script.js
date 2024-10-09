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
            applyModifications();

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
    } else if (style.type === 'aroundChars') {
        return ` ${style.emoji}A${style.emoji}`;
    }
    return `A${style.emoji}B`;
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
    { start: '▄︻デ', end: '═══━一 ҉~•' }, 
    { start: '»»————', end: '————⌲' }, 
    { start: '▬▬ι══', end: '═════ﺤ' }, { start: '▄︻デ', end: '═══━一 ҉~•' }, 
    { start: '»»————', end: '————⌲' }, 
    { start: '▬▬ι══', end: '═════ﺤ' }
];
const wordStyles = [
    { left: '✨', right: '✨' }, 
    { left: '🍀', right: '🍀' }, 
    { left: '🌟', right: '🌟' },{ left: '✨', right: '✨' }, 
    { left: '🍀', right: '🍀' }
];
const charStyles = [
    { emoji: '🎵' }, 
    { emoji: '🌸' }, 
    { type: 'doubleChar', sign1: '(', sign2: ')' },
    { type: 'aroundChars', emoji: '💎' },
    { emoji: '🎵' }, 
    { emoji: '🌸' }, 
    { type: 'doubleChar', sign1: '(', sign2: ')' },
    { type: 'aroundChars', emoji: '💎' },
    { emoji: '🎵' }, 
    { emoji: '🌸' }, 
    { type: 'doubleChar', sign1: '(', sign2: ')' },
    { type: 'aroundChars', emoji: '💎' }, { emoji: '🎵' }, 
    { emoji: '🌸' }, 
    { type: 'doubleChar', sign1: '(', sign2: ')' },
    { type: 'aroundChars', emoji: '💎' }
];
const spaceStyles = [
    { emoji: '🔹' }, 
    { emoji: '⭐' }, 
    { emoji: '🌟' },{ emoji: '🔹' }, 
    { emoji: '⭐' }
];

// Create shared scrollable lines for each modification type
createScrollButtons('charButtonsRow1', 'charButtonsRow2','charButtonsRow3', 'charButtonsRow4', charStyles, charStyleDescriptor, applyCharStyle);
createScrollButtons('wordButtonsRow1', 'wordButtonsRow2','wordButtonsRow3', 'wordButtonsRow4', wordStyles, wordStyleDescriptor, applyWordStyle);
createScrollButtons('spaceButtonsRow1', 'spaceButtonsRow2','spaceButtonsRow3', 'spaceButtonsRow4',  spaceStyles, spaceStyleDescriptor, applySpaceStyle);
createScrollButtons('fullTextButtonsRow1', 'fullTextButtonsRow2','fullTextButtonsRow3', 'fullTextButtonsRow4', fullTextStyles, fullTextStyleDescriptor, applyFullTextStyle);

// Remove button logic
document.getElementById('removeFullTextButton').addEventListener('click', () => { currentFullTextStyle = null; applyModifications(); });
document.getElementById('removeWordButton').addEventListener('click', () => { currentWordStyle = null; applyModifications(); });
document.getElementById('removeCharButton').addEventListener('click', () => { currentCharStyle = null; applyModifications(); });
document.getElementById('removeSpaceButton').addEventListener('click', () => { currentSpaceStyle = null; applyModifications(); });

document.getElementById('removeFullTextButton').addEventListener('click', () => { 
    currentFullTextStyle = null; 
    applyModifications(); 
    // Clear active state for all four rows of Full Text buttons
    setActiveButton('fullTextButtonsRow1', null);
    setActiveButton('fullTextButtonsRow2', null);
    setActiveButton('fullTextButtonsRow3', null);
    setActiveButton('fullTextButtonsRow4', null);
});

document.getElementById('removeWordButton').addEventListener('click', () => { 
    currentWordStyle = null; 
    applyModifications(); 
    // Clear active state for all four rows of Word buttons
    setActiveButton('wordButtonsRow1', null);
    setActiveButton('wordButtonsRow2', null);
    setActiveButton('wordButtonsRow3', null);
    setActiveButton('wordButtonsRow4', null);
});

document.getElementById('removeCharButton').addEventListener('click', () => { 
    currentCharStyle = null; 
    applyModifications(); 
    // Clear active state for all four rows of Char buttons
    setActiveButton('charButtonsRow1', null);
    setActiveButton('charButtonsRow2', null);
    setActiveButton('charButtonsRow3', null);
    setActiveButton('charButtonsRow4', null);
});

document.getElementById('removeSpaceButton').addEventListener('click', () => { 
    currentSpaceStyle = null; 
    applyModifications(); 
    // Clear active state for all four rows of Space buttons
    setActiveButton('spaceButtonsRow1', null);
    setActiveButton('spaceButtonsRow2', null);
    setActiveButton('spaceButtonsRow3', null);
    setActiveButton('spaceButtonsRow4', null);
});


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
    return text.replace(/ /g, `${emoji}`);
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
    notification.innerHTML = `Copied Text: ${copiedHTML}`;  // Show copied text (with emojis) in the notification
  
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

    