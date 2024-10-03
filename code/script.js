    document.addEventListener("DOMContentLoaded", function() {


    const inputText = document.getElementById("inputText");
    const outputContainers = document.querySelectorAll('.output-container');
    const loadMoreFontsButton = document.getElementById('loadMoreFonts');
    const defaultText = 'Welcome in FontsGem Text World';



    // default runing text
    const generateRunningPlaceholder = (text) => (() => text.slice(0, index++) + (index <= text.length ? "|" : ""));
    const placeholderText = "Enter your text here and see the magic below ⬇ ";
    const inputTextforplaceholder = document.getElementById('inputText');
    const runningPlaceholder = generateRunningPlaceholder(placeholderText);
   
    let index = 0, animationInterval = setInterval(() => {
        inputTextforplaceholder.setAttribute('placeholder', runningPlaceholder());
        if (index > placeholderText.length) clearInterval(animationInterval);
    }, 60);

    
  document.getElementById('inputText').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // Add any custom logic if needed
    }});

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}



   // Function to generate a nickname based on the input text or randomly
function generateNickname(name = "") {
    const nameParts = name.split(" ").filter(Boolean); // Split and remove empty parts
    const prefixes = [
        'Phantom', 'Shadow', 'Storm', 'Blaze', 'Venom', 'Titan',
        'Vortex', 'Inferno', 'Fury', 'Thunder', 'Apex', 'Ghost',
        'Savage', 'Rage', 'Death', 'Eclipse', 'Omega', 'Night',
        'Hunter', 'Iron', 'Chaos', 'Nova', 'Dragon', 'Ultra'
    ];

    const suffixes = [
        'Slayer', 'Reaper', 'Rider', 'Breaker', 'Stalker', 'Warlord',
        'Sniper', 'Killer', 'King', 'Master', 'Emperor', 'Legend',
        'Wizard', 'Crusader', 'Champion', 'Guru', 'Beast', 'Warrior',
        'Ninja', 'Assassin', 'Warrior', 'Knight', 'Predator', 'Bringer'
    ];

    // Randomly select a prefix and suffix
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let nickname = "";

    // Handle cases when there is no input
    if (!nameParts.length) {
        // Choose either a prefix or a prefix + suffix
        nickname = Math.random() > 0.5 ? randomPrefix : `${randomPrefix} ${randomSuffix}`;
    } else {
        // Randomly choose among four patterns (with input)
        const pattern = Math.floor(Math.random() * 4);
        
        // Prioritize the first word, but also allow for random selection from input
        const firstWord = nameParts[0];
        const randomWord = nameParts[Math.floor(Math.random() * nameParts.length)];

        switch (pattern) {
            case 0: // Use prefix + first word
                nickname = `${randomPrefix} ${firstWord}`;
                break;
            case 1: // Use random word + suffix
                nickname = `${randomWord} ${randomSuffix}`;
                break;
            case 2: // Use only the first word but ensure it includes a prefix
                nickname = randomPrefix; // Ensure a prefix is included
                break;
            case 3: // Use prefix + suffix combination
                nickname = `${randomPrefix} ${randomSuffix}`;
                break;
            default:
                nickname = `${randomPrefix} ${firstWord}`;
        }
    }

    // Limit the resulting nickname to a maximum of 2 words
    const nicknameWords = nickname.split(" ").filter(Boolean);
    if (nicknameWords.length > 2) {
        nickname = nicknameWords.slice(0, 2).join(" ");
    }

    return nickname.trim();
}

// Get references to the elements
const inputElement = document.getElementById('inputText');
const nicknameBox = document.getElementById('nicknameBox');

// Function to update the nickname box with 50 generated names (distributed into two rows)
function updateNicknameBox(name = "") {
    nicknameBox.innerHTML = ""; // Clear existing nicknames

    // Create two separate rows inside the nicknameBox
    const nicknameRow1 = document.createElement('div');
    nicknameRow1.classList.add('nickname-row');

    const nicknameRow2 = document.createElement('div');
    nicknameRow2.classList.add('nickname-row');

    // Generate 50 names and evenly distribute them between the two rows
    for (let i = 0; i < 50; i++) {
        const nickname = generateNickname(name);

        // Create a separate clickable box for each nickname
        const nicknameItem = document.createElement('span');
        nicknameItem.textContent = nickname;
        nicknameItem.classList.add('nickname-item');

        // Add click event to update inputText with the clicked nickname
        nicknameItem.addEventListener('click', () => {
            inputElement.value = nickname; // Update input field
            inputElement.dispatchEvent(new Event('input')); // Manually trigger input event
        });

        // Alternate placing names into two rows
        if (i % 2 === 0) {
            nicknameRow1.appendChild(nicknameItem); // Even indices go to the first row
        } else {
            nicknameRow2.appendChild(nicknameItem); // Odd indices go to the second row
        }
    }

    // Append both rows to the main nicknameBox
    nicknameBox.appendChild(nicknameRow1);
    nicknameBox.appendChild(nicknameRow2);
}

// Initial nickname generation (50 random nicknames)
updateNicknameBox();

// Event listener to capture input changes and update nicknames dynamically
inputElement.addEventListener('input', function () {
    const name = inputElement.value.trim();
    updateNicknameBox(name);
});


    
    // Call convertText function on page load
    convertText();
    
    
    // Function to detect if the user is on a mobile phone or tablet
    function isMobile() {
       return /Mobi|Android/i.test(navigator.userAgent);
    }

    // Get the input box element
   const inputBox = document.getElementById('inputText');

   // Auto-focus the input box only if not on a mobile device or tablet
   if (!isMobile()) {
       inputBox.focus();

       // Listen for any keypress and ensure it goes to the input box
        document.addEventListener('keydown', (event) => {
           if (document.activeElement !== inputBox) {
             inputBox.focus(); // Refocus the input box if it's not focused
            }
        });
    }
    

    // Add input event listener
    inputText.addEventListener("input", () => {

        convertText();
        updateDynamicFonts(); // Update dynamically loaded fonts when input text changes

    });



    // Add event listener to the "Load More Fonts" button
    if (loadMoreFontsButton) {

        loadMoreFontsButton.addEventListener('click', () => {
            const textToConvert = inputText.value.trim() || defaultText; // Use defaultText if input is empty
            loadMoreFonts(outputContainers, textToConvert);
            // Add signs after loading more fonts, only if not added before
        });

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
        const copiedHTML = element.innerHTML;
      
        // Clear the selection
        selection.removeAllRanges();
      
        // Remove any existing notification
        let existingNotification = document.querySelector('.notification');
        if (existingNotification) {
          existingNotification.remove();
        }
      
        // Create a notification to indicate copied text
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `Copied Text: ${copiedHTML}`;  // Show copied HTML in the notification
      
        // Create a close button (cross sign) for the notification
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';  // HTML entity for a cross sign
        closeButton.classList.add('close-button');  // Add a CSS class for styling the close button
      
        // Add event listener to the close button to remove the notification
        closeButton.addEventListener('click', () => {
          notification.remove();
        });
      
        // Create the "Decorate Text" button with the CSS class
        const decorateButton = document.createElement('button');
        decorateButton.innerHTML = '✨ Decorate Text ✨';  // Button text with emoji
        decorateButton.classList.add('decorate-button');  // Add the CSS class to the button
      
        // Add event listener for the button to replace text and redirect
        decorateButton.addEventListener('click', () => {
          // Replace innerText of the element with id "inputText"
          const inputTextElement = document.getElementById('inputText');
          if (inputTextElement) {
            inputTextElement.innerText = copiedHTML;
          }
          // Redirect to the specified page
          window.location.href = 'https://yourlink.com'; // Replace with your link
        });
      
        // Append the close button to the notification
        notification.appendChild(closeButton);
      
        // Append the "Decorate Text" button to the notification
        notification.appendChild(decorateButton);
      
        // Append the notification to the body
        document.body.appendChild(notification);
      
        // Remove the notification after 7 seconds
        setTimeout(() => {
          notification.remove();
        }, 70000);
      }
      
        
              

    function createOutputBox(fontName, container) {
       const outputBoxId = `output${fontName.replace(/\s+/g, '')}`;
       const outputButtonId = `outputCopyButton${fontName.replace(/\s+/g, '')}`;

       let outputBox = document.getElementById(outputBoxId);
       let outputButton = document.getElementById(outputButtonId);

       if (!outputBox) {

           const outOutputBox = document.createElement('div');
           outOutputBox.classList.add('out-output-box');

            outputBox = document.createElement('div');
            outputBox.id = outputBoxId;
            outputBox.classList.add('output-box');
            outputBox.style.fontFamily = `"${fontName}", sans-serif`;

            outOutputBox.appendChild(outputBox);
            container.appendChild(outOutputBox);

        }

       if (!outputButton) {

         const fontNameDisplay = document.createElement('p');
         fontNameDisplay.textContent = fontName;
         fontNameDisplay.classList.add('font-name');

         outputButton = document.createElement('button');
         outputButton.id = outputButtonId;
         outputButton.classList.add('copy-button', 'output-copy-button');
         outputButton.setAttribute('data-output-box', outputBoxId);
         outputButton.textContent = 'Copy';

         container.appendChild(fontNameDisplay);
         container.appendChild(outputButton);

        }

       if (!outputButton.dataset.listenerAdded) {

         outputButton.addEventListener('click', () => {
            copyToClipboard(outputBoxId);
            changeButtonText(outputBox);
        
        });

        outputButton.dataset.listenerAdded = true;

    }

    outputBox.addEventListener('mouseover', () => {
        outputButton.style.backgroundColor = '#FF4500';
        outputButton.style.color = 'white';
        outputBox.style.color = '#FF4500';
        outputBox.style.paddingTop = '14px';
        outputBox.style.paddingLeft = '21px';
        outputButton.style.boxShadow = '0 0 0px 0px #808080';
    });

    outputBox.addEventListener('mouseout', () => {
        outputButton.style.backgroundColor = 'rgb(255, 255, 255)';
        outputButton.style.color = '#808080';
        outputButton.style.boxShadow = 'inset 0 0 2px 1px #808080';
        outputBox.style.color = 'Black';
        outputBox.style.paddingTop = '13px';
        outputBox.style.paddingLeft = '20px';
    });

    outputButton.addEventListener('mouseover', () => {
        outputButton.style.backgroundColor = '#FF4500';
        outputButton.style.color = 'white';
        outputButton.style.boxShadow = '0 0 0px 0px #808080';
        outputBox.style.color = '#FF4500';
        outputBox.style.paddingTop = '14px';
        outputBox.style.paddingLeft = '21px';
    });

    outputButton.addEventListener('mouseout', () => {
        outputButton.style.backgroundColor = 'rgb(255, 255, 255)';
        outputButton.style.color = '#808080';
        outputButton.style.boxShadow = 'inset 0 0 2px 1px #808080';
        outputBox.style.color = 'Black';
        outputBox.style.paddingTop = '13px';
        outputBox.style.paddingLeft = '20px';
    });

    outputBox.addEventListener('click', () => {
        copyToClipboard(outputBoxId);
        changeButtonText(outputBox);
    });

    return outputBox;
}



    function convertText() {        //function use to convert input into  const fonts 

        let inputTextValue = inputText.value.trim();

        if (inputTextValue === "") {
            inputTextValue = defaultText; // Use "defaultText" if input is empty

        }

        const fonts = {
         'Crown Fraktur Bold':'𝕬,𝕭,𝕮,𝕯,𝕰,𝕱,𝕲,𝕳,𝕴,𝕵,𝕶,𝕷,𝕸,𝕹,𝕺,𝕻,𝕼,𝕽,𝕾,𝕿,𝖀,𝖁,𝖂,𝖃,𝖄,𝖅,𝖆,𝖇,𝖈,𝖉,𝖊,𝖋,𝖌,𝖍,𝖎,𝖏,𝖐,𝖑,𝖒,𝖓,𝖔,𝖕,𝖖,𝖗,𝖘,𝖙,𝖚,𝖛,𝖜,𝖝,𝖞,𝖟,1,2,3,4,5,6,7,8,9,0' ,
         'Dark Squares Gem':'🅰,🅱,🅲,🅳,🅴,🅵,🅶,🅷,🅸,🅹,🅺,🅻,🅼,🅽,🅾,🅿,🆀,🆁,🆂,🆃,🆄,🆅,🆆,🆇,🆈,🆉,🅰,🅱,🅲,🅳,🅴,🅵,🅶,🅷,🅸,🅹,🅺,🅻,🅼,🅽,🅾,🅿,🆀,🆁,🆂,🆃,🆄,🆅,🆆,🆇,🆈,🆉,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,0️⃣' ,
         'Curvy Cross':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
         'Full Width':'Ａ,Ｂ,Ｃ,Ｄ,Ｅ,Ｆ,Ｇ,Ｈ,Ｉ,Ｊ,Ｋ,Ｌ,Ｍ,Ｎ,Ｏ,Ｐ,Ｑ,Ｒ,Ｓ,Ｔ,Ｕ,Ｖ,Ｗ,Ｘ,Ｙ,Ｚ,ａ,ｂ,ｃ,ｄ,ｅ,ｆ,ｇ,ｈ,ｉ,ｊ,ｋ,ｌ,ｍ,ｎ,ｏ,ｐ,ｑ,ｒ,ｓ,ｔ,ｕ,ｖ,ｗ,ｘ,ｙ,ｚ,１,２,３,４,５,６,７,８,９,０' ,
         'Square Braket Sans Serif':'⟦A⟧,⟦B⟧,⟦C⟧,⟦D⟧,⟦E⟧,⟦F⟧,⟦G⟧,⟦H⟧,⟦I⟧,⟦J⟧,⟦K⟧,⟦L⟧,⟦M⟧,⟦N⟧,⟦O⟧,⟦P⟧,⟦Q⟧,⟦R⟧,⟦S⟧,⟦T⟧,⟦U⟧,⟦V⟧,⟦W⟧,⟦X⟧,⟦Y⟧,⟦Z⟧,⟦a⟧,⟦b⟧,⟦c⟧,⟦d⟧,⟦e⟧,⟦f⟧,⟦g⟧,⟦h⟧,⟦i⟧,⟦j⟧,⟦k⟧,⟦l⟧,⟦m⟧,⟦n⟧,⟦o⟧,⟦p⟧,⟦q⟧,⟦r⟧,⟦s⟧,⟦t⟧,⟦u⟧,⟦v⟧,⟦w⟧,⟦x⟧,⟦y⟧,⟦z⟧,⟦1⟧,⟦2⟧,⟦3⟧,⟦4⟧,⟦5⟧,⟦6⟧,⟦7⟧,⟦8⟧,⟦9⟧,⟦0⟧',
         'Asthetic Gem':"Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,1,2,3,4,5,6,7,8,9,0" ,
         'Monospace Flower':'𝙰,𝙱,𝙲,𝙳,𝙴,𝙵,𝙶,𝙷,𝙸,𝙹,𝙺,𝙻,𝙼,𝙽,𝙾,𝙿,𝚀,𝚁,𝚂,𝚃,𝚄,𝚅,𝚆,𝚇,𝚈,𝚉,𝚊,𝚋,𝚌,𝚍,𝚎,𝚏,𝚐,𝚑,𝚒,𝚓,𝚔,𝚕,𝚖,𝚗,𝚘,𝚙,𝚚,𝚛,𝚜,𝚝,𝚞,𝚟,𝚠,𝚡,𝚢,𝚣,1,2,3,4,5,6,7,8,9,0' ,
         'Script  Italic':'𝒜,𝐵,𝒞,𝒟,𝐸,𝐹,𝒢,𝐻,𝐼,𝒥,𝒦,𝐿,𝑀,𝒩,𝒪,𝒫,𝒬,𝑅,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,𝑒,𝒻,𝑔,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,𝑜,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0' ,
         'Light Bubbles ':'Ⓐ,Ⓑ,Ⓒ,Ⓓ,Ⓔ,Ⓕ,Ⓖ,Ⓗ,Ⓘ,Ⓙ,Ⓚ,Ⓛ,Ⓜ,Ⓝ,Ⓞ,Ⓟ,Ⓠ,Ⓡ,Ⓢ,Ⓣ,Ⓤ,Ⓥ,Ⓦ,Ⓧ,Ⓨ,Ⓩ,ⓐ,ⓑ,ⓒ,ⓓ,ⓔ,ⓕ,ⓖ,ⓗ,ⓘ,ⓙ,ⓚ,ⓛ,ⓜ,ⓝ,ⓞ,ⓟ,ⓠ,ⓡ,ⓢ,ⓣ,ⓤ,ⓥ,ⓦ,ⓧ,ⓨ,ⓩ,⓪,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⓪',
         'Covered Mathematical Fraktur ':"𝔄,𝔅,ℭ,𝔇,𝔈,𝔉,𝔊,ℌ,ℑ,𝔍,𝔎,𝔏,𝔐,𝔑,𝔒,𝔓,𝔔,ℜ,𝔖,𝔗,𝔘,𝔙,𝔚,𝔛,𝔜,ℨ,𝔞,𝔟,𝔠,𝔡,𝔢,𝔣,𝔤,𝔥,𝔦,𝔧,𝔨,𝔩,𝔪,𝔫,𝔬,𝔭,𝔮,𝔯,𝔰,𝔱,𝔲,𝔳,𝔴,𝔵,𝔶,𝔷,1,2,3,4,5,6,7,8,9,0",
         'Sans Serif Box':'[A̲̅],[B̲̅],[C̲̅],[D̲̅],[E̲̅],[F̲̅],[G̲̅],[H̲̅],[I̲̅],[J̲̅],[K̲̅],[L̲̅],[M̲̅],[N̲̅],[O̲̅],[P̲̅],[Q̲̅],[R̲̅],[S̲̅],[T̲̅],[U̲̅],[V̲̅],[W̲̅],[X̲̅],[Y̲̅],[Z̲̅],[a̲̅],[b̲̅],[c̲̅],[d̲̅],[e̲̅],[f̲̅],[g̲̅],[h̲̅],[i̲̅],[j̲̅],[k̲̅],[l̲̅],[m̲̅],[n̲̅],[o̲̅],[p̲̅],[q̲̅],[r̲̅],[s̲̅],[t̲̅],[u̲̅],[v̲̅],[w̲̅],[x̲̅],[y̲̅],[z̲̅],[1̲̅],[2̲̅],[3̲̅],[4̲̅],[5̲̅],[6̲̅],[7̲̅],[8̲̅],[9̲̅],[0̲̅]',
         'Fairytale':'Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,1,2,3,4,5,6,7,8,9,0',
         'Heart Fancy Curvy Font Black':"ᗩ,ᗷ,ᑕ,ᗫ,ꜫ,ፑ,Ԍ,ዙ,ǀ,ᒍ,Қ,ᒷ,ᘻ,Ṇ,Ơ,ᑶ,Ɋ,Ʀ,Տ,Ⲧ,ᑌ,ᕓ,ᙡ,乂,ㄚ,乙,შ,ɓ,ር,Ԃ,Ⲉ,𐍆,ↅ,𐌷,ĺ,ᒎ,Ҡ,し,ᗰ,ᑎ,❍,ᑭ,ᑫ,Ր,Ȿ,Է,ᑌ,Ʋ,ᗯ,Ҳ,ㄚ,乙,ŀ,ᘖ,Ȝ,Ч,ち,꘦,７,ზ,ᑫ,㋨", 
         'Yatagan':'ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,1,2,3,4,5,6,7,8,9,0',
         'Math Italic Bold sign':'𝑨,𝑩,𝑪,𝑫,𝑬,𝑭,𝑮,𝑯,𝑰,𝑱,𝑲,𝑳,𝑴,𝑵,𝑶,𝑷,𝑸,𝑹,𝑺,𝑻,𝑼,𝑽,𝑾,𝑿,𝒀,𝒁,𝒂,𝒃,𝒄,𝒅,𝒆,𝒇,𝒈,𝒉,𝒊,𝒋,𝒌,𝒍,𝒎,𝒏,𝒐,𝒑,𝒒,𝒓,𝒔,𝒕,𝒖,𝒗,𝒘,𝒙,𝒚,𝒛,1,2,3,4,5,6,7,8,9,0', 
         'Soviet Fancy':'Д,Ѣ,Ҁ,D,З,F,G,њ,I,J,К,L,M,Й,Ф,P,Q,Я,S,Ҭ,Ц,V,Ш,Ж,Ӳ,Z,ӓ,ѣ,ҁ,d,Э,f,g,ћ,ї,j,К,ʅ,m,ђ,ѳ,p,q,Г,s,ҭ,Ч,ѵ,Ш,x,ӳ,z,1,2,3,4,5,6,7,8,9,0', 
         'Ancient Gem 4':'𒋻,𒁀,𐏓,𒁓,𒀼,𐎣,𒋝,𒀂,𒐕,𒑟,𒐞,𒁇,𐎠,𒐖,𒆸,𒇬,𒌒,𒇲,丂,𒈦,𒑚,𐎏,𒉼,𒉽,𒌨,𒑣,𒋻,𒁀,𐏓,𒁓,𒀼,𐎣,𒋝,𒀂,𒐕,𒑟,𒐞,𒁇,𐎠,𒐖,𒆸,𒇬,𒌒,𒇲,丂,𒈦,𒑚,𐎏,𒉼,𒉽,𒌨,𒑣,𝟏,𝟐,𝟑,𝟒,𝟓,𝟔,𝟕,𝟖,𝟗',
         'Curvy Sniper':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
         'Crimped Fancy Box':'[α̲̅],[Ⴆ],[ƈ̲̅],[ԃ̲̅],[ҽ̲̅],[ϝ̲̅],[ɠ̲̅],[ԋ̲̅],[ι̲̅],[ʝ̲̅],[ƙ̲̅],[ʅ̲̅],[ɱ̲̅],[ɳ̲̅],[σ̲̅],[ρ̲̅],[ϙ̲̅],[ɾ̲̅],[ʂ̲̅],[ƚ̲̅],[υ̲̅],[ʋ̲̅],[ɯ̲̅],[X̲̅],[ყ],[ȥ̲̅],[α̲̅],[Ⴆ],[ƈ̲̅],[ԃ̲̅],[ҽ̲̅],[ϝ̲̅],[ɠ̲̅],[ԋ̲̅],[ι̲̅],[ʝ̲̅],[ƙ̲̅],[ʅ̲̅],[ɱ̲̅],[ɳ̲̅],[σ̲̅],[ρ̲̅],[ϙ̲̅],[ɾ̲̅],[ʂ̲̅],[ƚ̲̅],[υ̲̅],[ʋ̲̅],[ɯ̲̅],[x̲̅],[ყ],[ȥ̲̅],[1̲̅],[2̲̅],[3̲̅],[4̲̅],[5̲̅],[6̲̅],[7̲̅],[8̲̅],[9̲̅],[0̲̅]',
         'Hourglass':'A,♭,꒞,꒯,㉹,f,꒸,♬,ﭐ,꒻,k,L,Ѫ,ո,♡,р,զ,r,Ֆ,†,ﮠ,v,ա,꒾,վ,Հ,a,♭,꒞,꒯,㉹,f,꒸,♬,ﭐ,꒻,k,L,Ѫ,ո,♡,р,զ,r,Ֆ,†,ﮠ,v,ա,꒾,վ,Հ,1,2,3,4,5,6,7,8,9,0',
         'Blackboard Bold Gem':'𝔸,𝔹,ℂ,𝔻,𝔼,𝔽,𝔾,ℍ,𝕀,𝕁,𝕂,𝕃,𝕄,ℕ,𝕆,ℙ,ℚ,ℝ,𝕊,𝕋,𝕌,𝕍,𝕎,𝕏,𝕐,ℤ,𝕒,𝕓,𝕔,𝕕,𝕖,𝕗,𝕘,𝕙,𝕚,𝕛,𝕜,𝕝,𝕞,𝕟,𝕠,𝕡,𝕢,𝕣,𝕤,𝕥,𝕦,𝕧,𝕨,𝕩,𝕪,𝕫,𝟙,𝟚,𝟛,𝟜,𝟝,𝟞,𝟟,𝟠,𝟡,𝟘',
         'Gem Arrow Glitch':'λ,ß,Ȼ,ɖ,ε,ʃ,Ģ,ħ,ί,ĵ,κ,ι,ɱ,ɴ,Θ,ρ,ƣ,ર,Ș,τ,Ʋ,ν,ώ,Χ,ϓ,Հ,λ,ß,Ȼ,ɖ,ε,ʃ,Ģ,ħ,ί,ĵ,κ,ι,ɱ,ɴ,Θ,ρ,ƣ,ર,Ș,τ,Ʋ,ν,ώ,Χ,ϓ,Հ,1,2,3,4,5,6,7,8,9,0',
         'Light Squares gem':'🄰,🄱,🄲,🄳,🄴,🄵,🄶,🄷,🄸,🄹,🄺,🄻,🄼,🄽,🄾,🄿,🅀,🅁,🅂,🅃,🅄,🅅,🅆,🅇,🅈,🅉,🄰,🄱,🄲,🄳,🄴,🄵,🄶,🄷,🄸,🄹,🄺,🄻,🄼,🄽,🄾,🄿,🅀,🅁,🅂,🅃,🅄,🅅,🅆,🅇,🅈,🅉,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,0️⃣ ',
         "Gem Mix 1":'ᗩ,ᗷ,ᑕ,ᗪ,𝐸,ᖴ,𝒢,ᕼ,𝐼,ᒍ,𝒦,ᒪ,ᗰ,ᑎ,𝒪,ᑭ,ᑫ,ᖇ,ᔕ,𝒯,ᑌ,ᐯ,ᗯ,᙭,𝒴,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,𝐸,ᖴ,𝒢,ᕼ,𝐼,ᒍ,𝒦,ᒪ,ᗰ,ᑎ,𝒪,ᑭ,ᑫ,ᖇ,ᔕ,𝒯,ᑌ,ᐯ,ᗯ,᙭,𝒴,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦',
         'Tiny upper Gem':'ᴬ,ᴮ,ᶜ,ᴰ,ᴱ,ᶠ,ᴳ,ᴴ,ᴵ,ᴶ,ᴷ,ᴸ,ᴹ,ᴺ,ᴼ,ᴾ,ᵠ,ᴿ,ˢ,ᵀ,ᵁ,ⱽ,ᵂ,ˣ,ʸ,ᶻ,ᵃ,ᵇ,ᶜ,ᵈ,ᵉ,ᶠ,ᵍ,ʰ,ⁱ,ʲ,ᵏ,ˡ,ᵐ,ⁿ,ᵒ,ᵖ,ᵠ,ʳ,ˢ,ᵗ,ᵘ,ᵛ,ʷ,ˣ,ʸ,ᶻ,¹,²,³,⁴,⁵,⁶,⁷,⁸,⁹,⁰' ,
         'Ancient Gem 1':'ꍏ,ꌃ,ꉓ,ꀸ,ꍟ,ꎇ,ꁅ,ꃅ,ꀤ,ꀭ,ꀘ,꒒,ꂵ,ꈤ,ꂦ,ꉣ,ꆰ,ꋪ,ꌗ,꓄,ꀎ,ꃴ,ꅏ,ꊼ,ꌩ,ꁴ,ꍏ,ꌃ,ꉓ,ꀸ,ꍟ,ꎇ,ꁅ,ꃅ,ꀤ,ꀭ,ꀘ,꒒,ꂵ,ꈤ,ꂦ,ꉣ,ꆰ,ꋪ,ꌗ,꓄,ꀎ,ꃴ,ꅏ,ꊼ,ꌩ,ꁴ,1,2,3,4,5,6,7,8,9,0',
         'Square Bracket Sans Serif':'⟦A⟧,⟦B⟧,⟦C⟧,⟦D⟧,⟦E⟧,⟦F⟧,⟦G⟧,⟦H⟧,⟦I⟧,⟦J⟧,⟦K⟧,⟦L⟧,⟦M⟧,⟦N⟧,⟦O⟧,⟦P⟧,⟦Q⟧,⟦R⟧,⟦S⟧,⟦T⟧,⟦U⟧,⟦V⟧,⟦W⟧,⟦X⟧,⟦Y⟧,⟦Z⟧,⟦a⟧,⟦b⟧,⟦c⟧,⟦d⟧,⟦e⟧,⟦f⟧,⟦g⟧,⟦h⟧,⟦i⟧,⟦j⟧,⟦k⟧,⟦l⟧,⟦m⟧,⟦n⟧,⟦o⟧,⟦p⟧,⟦q⟧,⟦r⟧,⟦s⟧,⟦t⟧,⟦u⟧,⟦v⟧,⟦w⟧,⟦x⟧,⟦y⟧,⟦z⟧,⟦1⟧,⟦2⟧,⟦3⟧,⟦4⟧,⟦5⟧,⟦6⟧,⟦7⟧,⟦8⟧,⟦9⟧,⟦0⟧',
         'Inverted Upside Down':'∀,ᗺ,Ɔ,ᗡ,Ǝ,Ⅎ,⅁,H,I,ſ,ꓘ,˥,W,N,O,Ԁ,ტ,ᴚ,S,⊥,∩,Λ,M,X,⅄,Z,ɐ,q,ɔ,p,ǝ,ɟ,ƃ,ɥ,ı,ɾ,ʞ,ן,ɯ,u,o,d,b,ɹ,s,ʇ,n,ʌ,ʍ,x,ʎ,z,Ɩ,ᘔ,Ɛ,♄,5,9,ㄥ,8,6,0',
         'Sword Curvy Cross':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
         'Light Bubbles Gem':'Ⓐ,Ⓑ,Ⓒ,Ⓓ,Ⓔ,Ⓕ,Ⓖ,Ⓗ,Ⓘ,Ⓙ,Ⓚ,Ⓛ,Ⓜ,Ⓝ,Ⓞ,Ⓟ,Ⓠ,Ⓡ,Ⓢ,Ⓣ,Ⓤ,Ⓥ,Ⓦ,Ⓧ,Ⓨ,Ⓩ,ⓐ,ⓑ,ⓒ,ⓓ,ⓔ,ⓕ,ⓖ,ⓗ,ⓘ,ⓙ,ⓚ,ⓛ,ⓜ,ⓝ,ⓞ,ⓟ,ⓠ,ⓡ,ⓢ,ⓣ,ⓤ,ⓥ,ⓦ,ⓧ,ⓨ,ⓩ,⓪,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⓪',
         'Underline Text':'A͟,B͟,C͟,D͟,E͟,F͟,G͟,H͟,I͟,J͟,K͟,L͟,M͟,N͟,O͟,P͟,Q͟,R͟,S͟,T͟,U͟,V͟,W͟,X͟,Y͟,Z͟,a͟,b͟,c͟,d͟,e͟,f͟,g͟,h͟,i͟,j͟,k͟,l͟,m͟,n͟,o͟,p͟,q͟,r͟,s͟,t͟,u͟,v͟,w͟,x͟,y͟,z͟,1͟,2͟,3͟,4͟,5͟,6͟,7͟,8͟,9͟,0͟',    //'Underline':"A̠,̠B̠,̠C̠,̠D̠,̠E̠,̠F̠,̠G̠,̠H̠,̠I̠,̠J̠,̠K̠,̠L̠,̠M̠,̠N̠,̠O̠,̠P̠,̠Q̠,̠R̠,̠S̠,̠T̠,̠U̠,̠V̠,̠W̠,̠X̠,̠Y̠,̠Z̠,a̠,̠b̠,̠c̠,̠d̠,̠e̠,̠f̠,̠g̠,̠h̠,̠i̠,̠j̠,̠k̠,̠l̠,̠m̠,̠n̠,̠o̠,̠p̠,̠q̠,̠r̠,̠s̠,̠t̠,̠u̠,̠v̠,̠w̠,̠x̠,̠y̠,̠z̠,̠1̠,̠2̠,̠3̠,̠4̠,̠5̠,̠6̠,̠7̠,̠8̠,̠9̠,0̠",
         'English Gem':'Ⲁ,Ⲃ,Ⲥ,Ⲇ,Ⲉ,𝓕,𝓖,Ⲏ,Ⲓ,𝓙,Ⲕ,𝓛,Ⲙ,Ⲛ,Ⲟ,Ⲣ,𝓠,Ꞅ,Ϩ,Ⲧ,ⴑ,𝓥,Ⲱ,Ⲭ,Ⲩ,Ⲍ,ⲁ,ⲃ,ⲥ,ⲇ,ⲉ,𝓯,𝓰,ⲏ,ⲓ,𝓳,ⲕ,𝓵,ⲙ,ⲛ,ⲟ,ⲣ,𝓺,ꞅ,𝛓,ⲧ,𐌵,𝓿,ⲱ,ⲭ,ⲩ,ⲍ,1,2,3,4,5,6,7,8,9,0',
         'Monospace Puppy':'𝙰,𝙱,𝙲,𝙳,𝙴,𝙵,𝙶,𝙷,𝙸,𝙹,𝙺,𝙻,𝙼,𝙽,𝙾,𝙿,𝚀,𝚁,𝚂,𝚃,𝚄,𝚅,𝚆,𝚇,𝚈,𝚉,𝚊,𝚋,𝚌,𝚍,𝚎,𝚏,𝚐,𝚑,𝚒,𝚓,𝚔,𝚕,𝚖,𝚗,𝚘,𝚙,𝚚,𝚛,𝚜,𝚝,𝚞,𝚟,𝚠,𝚡,𝚢,𝚣,1,2,3,4,5,6,7,8,9,0' ,
         'Zalgo Level 3':'A̸̦͂̔,̴̘̓̅͋B̷͚̫͊́,̸̘̪̍̍C̷̙͍̍͜,̷̖̆D̴͍̯̻̐͑,̸̧͚̣͊Ḛ̵̤̽̇̚,̷̟̟̑͑F̴̳̞̃̓,̵͕͕̗̅̒G̴͙̋,̷̜͐͂H̶͍̠̩̍̋̾,̸̻̅̈́͜Ḭ̶̰̘̏,̷̢̣̠̉̀J̵̡̉̀̌,̴͔͔̇̀̕K̸͓̿̓͜,̵̰̰̇̎͜L̶̀͐͜,̸͉͚͇̌̿M̵͕̲͓̐,̶̬͖͂̎͋N̴̪͖͑̕̚,̷̟̋̚Ó̴͖ͅ,̸͍̤̎̈̍P̴̠̟͛,̵̖̇͘͝Q̷̬͔́,̸̣̏̕R̷̛̞̪̥̓,̴̧̘͌S̵͚̯̏͛̕,̴̞̀͊͊T̸̮̀̌,̵̟̰̭̎Ȕ̵͎̜̯̓̽,̸̟͛V̴͍̯͙̐̂,̷̯͋W̵̰͊͑,̴͎̭̞̏̚X̴̨͖̙̆,̶̟͌͠Y̸̳̳̤͂̑͋,̸̪̉͋̅Z̵̲͉͖͋,̶̖̮̳̀̿a̸̺̠͚̽͆,̴͗͌͜b̷̫͊̆,̴͓̘͕͒͘c̴̨̐́͋,̵͉̎d̴̫͕̬̿̏,̸̧̻̻́̕e̴̙̖̋,̷̠̈͛f̵̜̠͑́̾,̷͙̀̃͊g̴̱̣͇̈́͘,̸̞͔̀ḧ̴͍́,̶̧̰̐͌i̷̤̍̀̅,̷̠̇̊j̶̭̲͔͋̊,̷͚̞̓k̸͍͙̿,̸̢̻̻̽͐l̸̲̲͙̉͆,̵̨̰̆̾ṃ̴̼̊̓͋,̸̞͈̊ṋ̷͎̌͜,̴̦̽̀ȍ̶̯̰̘̒́,̷̥̊p̷̜̥͒͗,̵̗̱͍̉̉q̶̜̔̀,̶̢̥̅̑͆r̷͕͝,̵͉̤̯̓͋s̶̗͍̃̍̈,̷̥̽͠ẗ̵̢͔́,̸̼̓͑͝ṷ̵͔͆̂,̶͚̩̿̓v̶̟̩̗̈,̷̙̈́͗̌w̵͔͊͐̕,̸͕̆̆x̵͕͕̒,̷̩̝̭̆̚y̷̟̠̐͐̈́,̵̭̯̃z̸̜̮̄͊,̴͉̣̃͑͝1̴̮̯̐̎̉,̴͖̽̈2̸̲́̇,̵̬͚͈̂̂̿3̴̦̹̘̓,̴̠͕̓4̸̰͍͒͌,̷̺̼̖̓̈́5̸̆͐͜,̴̥̽̕͠6̷̖̈͆͐,̸̹͚̏7̶̨̈́,̸̨̤̀8̶̡̲͈̑͋̕,̶̱̬̪̔͒̔9̶̑̄̃ͅ,̸̪̲̈́0̴̢͎̜̂̂͝"̷̳̏̒',
         'Different 2':'𝐀,β,ⓒ,𝓭,𝑒,ⓕ,ᵍ,ⓗ,Ꭵ,ן,ᵏ,𝕃,ｍ,ⓝ,𝓸,Ƥ,ℚ,ⓡ,𝓼,Ｔ,𝓾,v,𝓌,ⓧ,ץ,Ż,𝐚,๒,Ć,𝓭,𝑒,ⓕ,𝕘,𝓱,Ɨ,Ｊ,Ⓚ,ᒪ,м,𝐍,Ø,卩,q,я,丂,𝐓,ย,ｖ,𝔀,x,𝔂,𝓩,➀,❷,➂,４,❺,６,❼,➇,❾,０', 
         'Gem Mix 2':'ᗩ,ᗷ,ᑕ,ᗪ,Ⓔ,ᖴ,Ⓖ,ᕼ,Ⓘ,ᒍ,Ⓚ,ᒪ,ᗰ,ᑎ,Ⓞ,ᑭ,ᑫ,ᖇ,ᔕ,Ⓣ,ᑌ,ᐯ,ᗯ,᙭,Ⓨ,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,Ⓔ,ᖴ,Ⓖ,ᕼ,Ⓘ,ᒍ,Ⓚ,ᒪ,ᗰ,ᑎ,Ⓞ,ᑭ,ᑫ,ᖇ,ᔕ,Ⓣ,ᑌ,ᐯ,ᗯ,᙭,Ⓨ,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦',
        
            // Add more fonts here
        };


        for (const fontName in fonts) {

            const outputBox = createOutputBox(fontName, outputContainers[0]);
            const mFontChars = generateFontMapping(fonts[fontName]);
            let convertedText = '';


            for (let i = 0; i < inputTextValue.length; i++) { //compare input string to fonts element's mapping then genrate result
            
                const char = inputTextValue.charAt(i);
                convertedText += mFontChars[char] || char;

            }

            switch(fontName){  

                case  'Math Italic Bold sign':            //  for wrraping every word with emoji 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    afterlogo=addEmojiToSpaces(convertedText,"❋")
                    outputBox.textContent = afterlogo;
                break;
                
                case  'Crown Fraktur Bold':            //  for wrraping every word with emoji 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    afterlogo=SeprateEmojisAroundWord(convertedText,"⊶","⊷")
                    outputBox.textContent = afterlogo;
                break;

                case  'Times New Roman':            //  for wrraping every word with emoji 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    afterlogo=addEmojiToSpaces(convertedText,"🌸")
                    outputBox.textContent = afterlogo;
                break;

                case  'Light Bubbles Gem':            //  for wrraping every char with emoji          
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    afterlogo=addEmojiToSpaces(convertedText,"✠")
                    outputBox.textContent = afterlogo;
                break;
                                                
                case  'Heart Fancy Curvy Font Black': 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    convertedText =addEmojiToSpaces(convertedText, "🖤") 
                    outputBox.textContent =convertedText;
                break;
                
                case  'Sword Curvy Cross': 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    convertedText =addEmojiToSpaces(convertedText, "═") 
                    outputBox.textContent =convertedText;
                break;

              /* 
              
                case  '': 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    convertedText =surroundWordsWith(convertedText, "") 
                    outputBox.textContent =convertedText;
                break; */

                default:
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    outputBox.textContent = convertedText;
             
                }

            }
        
        index--;
        addSignsToOutput('Gem Arrow Glitch', '»»————', '————⌲'); 
        addSignsToOutput('Curvy Sniper', '▄︻デ', '═══━一 ҉~•');     // Gem Arrow Glitch here add signs to specific font output
        addSignsToOutput('Covered Mathematical Fraktur ', 'ஜ۞ஜ[ ', ' ]ஜ۞ஜ');     // here add signs to specific font output
        addSignsToOutput('Curvy Cross', '✟', '✟');     //  here add signs to specific font output
        addSignsToOutput('Monospace Flower', '❀ꗥ～', '～ꗥ❀');     // he      readd signs to specific font output
        addSignsToOutput('Blackboard Bold Gem','█▓▒▒░░░','░░░▒▒▓█');
        addSignsToOutput('Monospace Puppy','ʕ•ᴥ•ʔ','ʕ•ᴥ•ʔ');
        addSignsToOutput('Sword Curvy Cross','▬▬ι══','═════ﺤ');

    }


    const additionalFonts = {
       'Curvy Cryptic':'ᗩ,ᗷ,ᑢ,ᕲ,ᘿ,ᖴ,ᘜ,ᕼ,ᓰ,ᒚ,K,ᒪ,ᘻ,ᘉ,ᓍ,ᕵ,ᕴ,ᖇ,S,ᖶ,ᑘ,ᐺ,ᘺ,᙭,ᖻ,ᗱ,ᗩ,ᗷ,ᑢ,ᕲ,ᘿ,ᖴ,ᘜ,ᕼ,ᓰ,ᒚ,k,ᒪ,ᘻ,ᘉ,ᓍ,ᕵ,ᕴ,ᖇ,S,ᖶ,ᑘ,ᐺ,ᘺ,᙭,ᖻ,ᗱ,1,2,3,4,5,6,7,8,9,0', 
       'Script Bold Italic Gem':'𝓐,𝓑,𝓒,𝓓,𝓔,𝓕,𝓖,𝓗,𝓘,𝓙,𝓚,𝓛,𝓜,𝓝,𝓞,𝓟,𝓠,𝓡,𝓢,𝓣,𝓤,𝓥,𝓦,𝓧,𝓨,𝓩,𝓪,𝓫,𝓬,𝓭,𝓮,𝓯,𝓰,𝓱,𝓲,𝓳,𝓴,𝓵,𝓶,𝓷,𝓸,𝓹,𝓺,𝓻,𝓼,𝓽,𝓾,𝓿,𝔀,𝔁,𝔂,𝔃,1,2,3,4,5,6,7,8,9,0',
       'Fancy Ancient  2':'ꋫ,ꃲ,ꉓ,ꃸ,ꑾ,ꄘ,ꁅ,ꃄ,꒐,꒑,ꀗ,꒒,ꂵ,ꁹ,ꄱ,ꉣ,ꋟ,ꋪ,ꇘ,꓅,ꌇ,꒦,ꅏ,ꋋ,ꌥ,꒗,ꋫ,ꃲ,ꉓ,ꃸ,ꑾ,ꄘ,ꁅ,ꃄ,꒐,꒑,ꀗ,꒒,ꂵ,ꁹ,ꄱ,ꉣ,ꋟ,ꋪ,ꇘ,꓅,ꌇ,꒦,ꅏ,ꋋ,ꌥ,꒗,1,2,3,4,5,6,7,8,9,0',
       'Fancy Script Italic':'𝒜,ℬ,𝒞,𝒟,ℰ,ℱ,𝒢,ℋ,ℐ,𝒥,𝒦,ℒ,ℳ,𝒩,𝒪,𝒫,𝒬,ℛ,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,ℯ,𝒻,ℊ,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,ℴ,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0',
       'Math Sans Gem':'𝖠,𝖡,𝖢,𝖣,𝖤,𝖥,𝖦,𝖧,𝖨,𝖩,𝖪,𝖫,𝖬,𝖭,𝖮,𝖯,𝖰,𝖱,𝖲,𝖳,𝖴,𝖵,𝖶,𝖷,𝖸,𝖹,𝖺,𝖻,𝖼,𝖽,𝖾,𝖿,𝗀,𝗁,𝗂,𝗃,𝗄,𝗅,𝗆,𝗇,𝗈,𝗉,𝗊,𝗋,𝗌,𝗍,𝗎,𝗏,𝗐,𝗑,𝗒,𝗓,1,2,3,4,5,6,7,8,9,0',
       'Comet Tail':'Ą̵̺̰̻̻͔͇͓̈́̓͛̏̈́͌͋̄̑͆̏,B̶̨̛̺̤̱̾̀́̋̔̆̏̎͘͘,C̴̀͐ͅ,Ḑ̷̮̳̣̟͉͋͗̓̕͜,Ȩ̸̪̯̗̘̥̣̲̣̣͍͚͙̥̩́̀̈̆͑,F̵̜̜͎͉̯̜̓͂,G̶̺̥̎̄͌͑͂̔̏̓̂́̈́͜͝͝͝͝ͅ,Ḩ̵̛̘̤͙͔̝̫̖̻̦̞͙̺̅̿͘͝,I̸̺̺͎̰̥̜̯̼̮̰͖̜͂͆̿̈́̿̔,Ĵ̸͔̣̮̤̝̥̆̏͋͒͝,K̵̢̛̛͉̳̫͔̺̱̗̫̽̉́͋̾́͂͛,L̷͖͈̓͌̎̉͒͗͂̓̌̚͝,M̶̧͚̪͉̯̜̰͎̘̀͋̇̀͗̍́͆̑̏͂̿̊̚,N̸̡̧͕͙̼̻̳̦̪̞̯͎̦͓̏̒͌͑͒͊̾͌̑̅̕͝ͅ,O̵̧̗͕̹̼̦̗̮̱̝͆͊́́̈̿̋ͅ,P̷̛̛̛̩̺͇̊̅̍͂͗͑͐̎̂̏̐̐,Q̷̡̠̝͚̼̘̜̜̠͍͓̎̒̀̿͋̅̄̀̿̄̏͠ͅ,Ŗ̷͇̙̰̭̪̟̺̲̜̹͔̎̍́ͅ,Ś̸͙̺̥̰̯͙̭͆̏͂,T̷̡̧̬̲̭̦̘̩̊̉͛̓̓̌͌̕,U̴̡̢̱̳̳͓̗͔̮̔͜͜͜,V̵̧͖͙̲̯̞͇̲͔̤͊̔͌͂͆͑́́̑͒͝,W̵̰̻͍̉̔̅̀̐͐͒͆̒̚,X̶̨̢̗͍̪͚͍̱̭̣̰̳̠͌̓͌̅͆̈́̊̅̓̿͠,Ý̴̥͙̘̇̈́̇̃͒̿́͘͘͝͝ͅ,Z̵̥̼̐̀̐́̅̀̈͆̓͒́̕̚͠,ǎ̴̯̀͠,b̸̼̋͛̑͆̈́͗̿̅,c̵̛̥͊,d̶̡̲̗̼̮̤̤̳̲͖͓͍͔͓̓̎̽́̽̏̐͂̆͆͘͘͘,ë̸͓̮͉͈͇͍̖͎̩̞͈́́́̋̇̾͋̈́̾͆͑͘͘͜͠͝,f̵̢̻͈̫̬̻͔̘̞͈̆̇̍̈̌͊ͅ,ǧ̷̡̟̲̹̩̱͉̮̭͇͚̮̖̟̽̓͊̔̓̕,ḥ̸̨̧̗̮̖̽̂̓̀̍̋͋́̅̃͘͜͝,i̶̡̹͈͎̳̞͙͖̾̂̀͑̀͆̑̓̽̉͐͘͘ͅ,j̵̬̺̭̼̺̫̦͚̬̼͚͙̰̭̐̐ͅ,k̵̘̺̦͉͖̪̪͖͉͊̆̔́̈́̍̃̈́͒̂̑̀̚͜͝,l̶̬̞͎̖͉̹̝͕̝͖̣̉͆,m̵̢͕̫̓̔͑̊̈,ǹ̷̨͍̮̥̹̘͙̗̻̬̬̜̥̮̃̒̈́̽͗̿̍̄̂̏͆͠͝,ŏ̸̡̼̺̫̥̻͈̞̍͆̏̓́͜͝ͅ,p̴̩͙̺̩͓̣͈͖̎ͅ,q̶̡̛̥̫͓̩̫͇̥̋͊̇̄͐̈́̓͠,r̵̡͕͈͚͍͍̼͕̍̀̈́̽̎̍͗̍́̏̚͜͠,s̴̹̀̎̇͗̍͗̾̋̏̈͐͒̕͠͠ͅ,t̸̫̫̤͕̳̻̰̣̭́̌̉͝ͅ,u̷̬̩̰̫͕̘͎̔́̃̄̍͋̓,ṽ̵͇̟̺̣͓̰̭̲̼̻̪̩̰͒̓̿̄̾̔̊͝ͅ,ẃ̸̝̝̰͋͒,x̵̢̝̹̘͖͖̜̩̝͗̽́̑͗͋,y̶͔͗,z̷̛̻̤̯̥̝͎̯͚̹͇͗̆̄̈́̅̎̓̿̎͋́̅̈́̚͜,1̵̡̱̟͇̙͕͎̻̖̌,2̸̨̨̢̛̝̣̝̻̺͖̳̹̦̼̖̩̎̾̈́̄́̊̕͘͝,3̵̧͔̖̪̗̺̺͙̭̮̘̂̀̂̒͂͌͑̈́̏̈̒́͛͜͠,4̴̧̢͙̫͖͕̩̭̞̗̲̞̮̩̌̈́͆͑̏̈́̏̐̇̈́,5̷̧̡̛̭̞͙͓̰͔̞̠̗̫͊̇̐͆̋̀̑͗̇̚͘͝͠͠,6̴̧̡̢̝̼͈͔̙̪͔͉̻͑̔̓͜͝ͅ,7̵̡̰̞̞͙͎͖̪̲̻̮̈́̈̔̃́̀̔̍̌̈́̌̀͒,8̶͙̣̲̟̞̺̗̤̰͓̳̼̽͜,9̴̛̳̟̤̯̤̮̞̩̦͐̎͂̐̏̈́̒̚͜,0̴̛̫̪̯̺̭̻̭͖̲̮͓̋̉̀̑͗̃̌͠ͅ ',
       'Bold Sans Serif':'𝗔,𝗕,𝗖,𝗗,𝗘,𝗙,𝗚,𝗛,𝗜,𝗝,𝗞,𝗟,𝗠,𝗡,𝗢,𝗣,𝗤,𝗥,𝗦,𝗧,𝗨,𝗩,𝗪,𝗫,𝗬,𝗭,𝗮,𝗯,𝗰,𝗱,𝗲,𝗳,𝗴,𝗵,𝗶,𝗷,𝗸,𝗹,𝗺,𝗻,𝗼,𝗽,𝗾,𝗿,𝘀,𝘁,𝘂,𝘃,𝘄,𝘅,𝘆,𝘇,𝟭,𝟮,𝟯,𝟰,𝟱,𝟲,𝟳,𝟴,𝟵,𝟬' ,
       'Monospace Heart':'𝙰,𝙱,𝙲,𝙳,𝙴,𝙵,𝙶,𝙷,𝙸,𝙹,𝙺,𝙻,𝙼,𝙽,𝙾,𝙿,𝚀,𝚁,𝚂,𝚃,𝚄,𝚅,𝚆,𝚇,𝚈,𝚉,𝚊,𝚋,𝚌,𝚍,𝚎,𝚏,𝚐,𝚑,𝚒,𝚓,𝚔,𝚕,𝚖,𝚗,𝚘,𝚙,𝚚,𝚛,𝚜,𝚝,𝚞,𝚟,𝚠,𝚡,𝚢,𝚣,1,2,3,4,5,6,7,8,9,0' ,
       'Dark Bubbles':'🅐,🅑,🅒,🅓,🅔,🅕,🅖,🅗,🅘,🅙,🅚,🅛,🅜,🅝,🅞,🅟,🅠,🅡,🅢,🅣,🅤,🅥,🅦,🅧,🅨,🅩,🅐,🅑,🅒,🅓,🅔,🅕,🅖,🅗,🅘,🅙,🅚,🅛,🅜,🅝,🅞,🅟,🅠,🅡,🅢,🅣,🅤,🅥,🅦,🅧,🅨,🅩,➊,➋,➌,➍,➎,➏,➐,➑,➒,⓿',
       'Wizard sniper':' ǟ,ɮ,ƈ,ɖ,ɛ,ʄ,ɢ,ɦ,ɨ,ʝ,ӄ,ʟ,ʍ,ռ,օ,ք,զ,ʀ,ֆ,ȶ,ʊ,ʋ,ա,Ӽ,ʏ,ʐ,ǟ,ɮ,ƈ,ɖ,ɛ,ʄ,ɢ,ɦ,ɨ,ʝ,ӄ,ʟ,ʍ,ռ,օ,ք,զ,ʀ,ֆ,ȶ,ʊ,ʋ,ա,Ӽ,ʏ,ʐ,1,2,3,4,5,6,7,8,9,0',
       'Fraktur Box':'[𝖆̲̅],[𝖇̲̅],[𝖈̲̅],[𝖉̲̅],[𝖊̲̅],[𝖋̲̅],[𝖌̲̅],[𝖍̲̅],[𝖎̲̅],[𝖏̲̅],[𝖐̲̅],[𝖑̲̅],[𝖒̲̅],[𝖓̲̅],[𝖔̲̅],[𝖕̲̅],[𝖖̲̅],[𝖗̲̅],[𝖘̲̅],[𝖙̲̅],[𝖚̲̅],[𝖛̲̅],[𝖜̲̅],[𝖝̲̅],[𝖞̲̅],[𝖟̲̅],[𝖆̲̅],[𝖇̲̅],[𝖈̲̅],[𝖉̲̅],[𝖊̲̅],[𝖋̲̅],[𝖌̲̅],[𝖍̲̅],[𝖎̲̅],[𝖏̲̅],[𝖐̲̅],[𝖑̲̅],[𝖒̲̅],[𝖓̲̅],[𝖔̲̅],[𝖕̲̅],[𝖖̲̅],[𝖗̲̅],[𝖘̲̅],[𝖙̲̅],[𝖚̲̅],[𝖛̲̅],[𝖜̲̅],[𝖝̲̅],[𝖞̲̅],[𝖟̲̅],[1̲̅],[੨̲̅],[੩̲̅],[੫̲̅],[Ƽ̲̅],[Ϭ̲̅],[Դ̲̅],[੪̲̅],[੧̲̅],[੦̲̅]',
       'Asthetic':"Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,1,2,3,4,5,6,7,8,9,0" ,
       'Italic Gem':'ᗩ,ᗷ,ᑕ,ↁ,ᕮ,Բ,Ꮆ,ᕼ,ᓰ,Ｊ,𐌊,し,Ⲙ,Ɲ,〇,ᖘ,Ⴓ,ᖇ,⟆,Ƭ,ᑌ,⋎,ᗯ,Ⲭ,Ⴤ,Ⲍ,Ꭿ,ᑲ,⊂,ᖙ,∈,⨍,ɢ,Ꮒ,⫯,Ｊ,ⲕ,𝘭,ⲙ,ﬡ,ᗝ,ᖰ,ᖳ,ᖇ,⟆,𝜏,υ,ʋ,ⲱ,ⲭ,Ⴘ,ⲍ,1,2,3,4,5,6,7,8,9,0',
       'Cyrillic':'А,Б,С,Д,Є,F,ɠ,Н,Ї,J,К,Г,Ѫ,Й,Ѳ,P,Ф,Я,$,T,Ц,Ѵ,Ш,Ж,Ч,З,а,в,c,д,ё,f,g,н,ї,j,к,ʅ,ѫ,п,ѳ,p,ф,я,$,т,ц,ѵ,щ,ж,ч,з,1,2,3,4,5,6,7,8,9,0',
       'Cross Math  Serif Italic Bold':'𝑨,𝑩,𝑪,𝑫,𝑬,𝑭,𝑮,𝑯,𝑰,𝑱,𝑲,𝑳,𝑴,𝑵,𝑶,𝑷,𝑸,𝑹,𝑺,𝑻,𝑼,𝑽,𝑾,𝑿,𝒀,𝒁,𝒂,𝒃,𝒄,𝒅,𝒆,𝒇,𝒈,𝒉,𝒊,𝒋,𝒌,𝒍,𝒎,𝒏,𝒐,𝒑,𝒒,𝒓,𝒔,𝒕,𝒖,𝒗,𝒘,𝒙,𝒚,𝒛,1,2,3,4,5,6,7,8,9,0', 
       'Lefthanded Fancy':' α,ɓ,૮,∂,ε,ƒ,ɠ,ɦ,เ,ʝ,ҡ,ℓ,ɱ,ɳ,σ,ρ,φ,૨,ร,ƭ,µ,ѵ,ω,א,ყ,ƶ,α,ɓ,૮,∂,ε,ƒ,ɠ,ɦ,เ,ʝ,ҡ,ℓ,ɱ,ɳ,σ,ρ,φ,૨,ร,ƭ,µ,ѵ,ω,א,ყ,ƶ,1,2,3,4,5,6,7,8,9,0',
       'Japanese Font':'卂,乃,匚,ᗪ,乇,千,Ꮆ,卄,丨,ﾌ,Ҝ,ㄥ,爪,几,ㄖ,卩,Ɋ,尺,丂,ㄒ,ㄩ,ᐯ,山,乂,ㄚ,乙,卂,乃,匚,ᗪ,乇,千,Ꮆ,卄,丨,ﾌ,Ҝ,ㄥ,爪,几,ㄖ,卩,Ɋ,尺,丂,ㄒ,ㄩ,ᐯ,山,乂,ㄚ,乙,˦,Ϩ,Յ,Ϥ,Ƽ,δ,𐒇,ϐ,ƍ,θ', 
       'Flower Times New Roman': '𝕬,𝕭,𝕮,𝕯,𝕰,𝕱,𝕲,𝕳,𝕴,𝕵,𝕶,𝕷,𝕸,𝕹,𝕺,𝕻,𝕼,𝕽,𝕾,𝕿,𝖀,𝖁,𝖂,𝖃,𝖄,𝖅,𝖆,𝖇,𝖈,𝖉,𝖊,𝖋,𝖌,𝖍,𝖎,𝖏,𝖐,𝖑,𝖒,𝖓,𝖔,𝖕,𝖖,𝖗,𝖘,𝖙,𝖚,𝖛,𝖜,𝖝,𝖞,𝖟',
       'Curvy Cryptic ':'ᗩ,ᗷ,ᑢ,ᕲ,ᘿ,ᖴ,ᘜ,ᕼ,ᓰ,ᒚ,K,ᒪ,ᘻ,ᘉ,ᓍ,ᕵ,ᕴ,ᖇ,S,ᖶ,ᑘ,ᐺ,ᘺ,᙭,ᖻ,ᗱ,ᗩ,ᗷ,ᑢ,ᕲ,ᘿ,ᖴ,ᘜ,ᕼ,ᓰ,ᒚ,k,ᒪ,ᘻ,ᘉ,ᓍ,ᕵ,ᕴ,ᖇ,S,ᖶ,ᑘ,ᐺ,ᘺ,᙭,ᖻ,ᗱ,1,2,3,4,5,6,7,8,9,0', 
       'Arabic':' ค,๒,ς,๔,є,Ŧ,ﻮ,ђ,เ,ן,к,l,๓,ภ,๏,ק,ợ,г,ร,t,ย,ש,ฬ,ץ,א,z,ค,๒,ς,๔,є,Ŧ,ﻮ,ђ,เ,ן,к,l,๓,ภ,๏,ק,ợ,г,ร,t,ย,ש,ฬ,ץ,א,z,1,2,3,4,5,6,7,8,9,0',
       'Stylish Bracket ':'⦑A⦒,⦑B⦒,⦑C⦒,⦑D⦒,⦑E⦒,⦑F⦒,⦑G⦒,⦑H⦒,⦑I⦒,⦑J⦒,⦑K⦒,⦑L⦒,⦑M⦒,⦑N⦒,⦑O⦒,⦑P⦒,⦑Q⦒,⦑R⦒,⦑S⦒,⦑T⦒,⦑U⦒,⦑V⦒,⦑W⦒,⦑X⦒,⦑Y⦒,⦑Z⦒,⦑a⦒,⦑b⦒,⦑c⦒,⦑d⦒,⦑e⦒,⦑f⦒,⦑g⦒,⦑h⦒,⦑i⦒,⦑j⦒,⦑k⦒,⦑l⦒,⦑m⦒,⦑n⦒,⦑o⦒,⦑p⦒,⦑q⦒,⦑r⦒,⦑s⦒,⦑t⦒,⦑u⦒,⦑v⦒,⦑w⦒,⦑x⦒,⦑y⦒,⦑z⦒,⦑1⦒,⦑2⦒,⦑3⦒,⦑4⦒,⦑5⦒,⦑6⦒,⦑7⦒,⦑8⦒,⦑9⦒,⦑0⦒',
       'Mirror Text / Flip Text':'A,ઘ,Ɔ,Ⴇ,Ǝ,ᆿ,Ә,H,I,Ⴑ,ﻼ,⅃,M,И,O,Գ,Ϙ,Я,Ƨ,T,V,U,W,X,Y,ƹ,ɒ,d,ɔ,b,ɘ,ʇ,ϱ,ʜ,i,į,ʞ,l,m,n,o,q,p,ɿ,ƨ,Ɉ,u,v,w,x,γ,ƹ,1,ς,Ɛ,μ,ट,მ,٢,8,୧,0',
       'Mysterious Arabic Gem':'ค,๒,ƈ,ɗ,ﻉ,ி,ﻭ,ɦ,ﻝ,ٱ,ᛕ,ɭ,๓,ก,ѻ,ρ,۹,ɼ,ร,ｲ,પ,۷,ฝ,ซ,ץ,չ,ค,๒,ƈ,ɗ,ﻉ,ி,ﻭ,ɦ,ﻝ,ٱ,ᛕ,ɭ,๓,ก,ѻ,ρ,۹,ɼ,ร,ｲ,પ,۷,ฝ,ซ,ץ,չ,1,2,3,4,5,6,7,8,9,0',  
       'Asian Characters':'ﾑ,乃,ᄃ,り,乇,ｷ,ム,ん,ﾉ,ﾌ,ズ,ﾚ,ﾶ,刀,の,ｱ,ゐ,尺,丂,ｲ,ひ,√,W,ﾒ,ﾘ,乙,ﾑ,乃,ᄃ,り,乇,ｷ,ム,ん,ﾉ,ﾌ,ズ,ﾚ,ﾶ,刀,の,ｱ,ゐ,尺,丂,ｲ,ひ,√,W,ﾒ,ﾘ,乙,1,2,3,4,5,6,7,8,9,0',
       'Mono Upper / Small':'ᴀ,ʙ,ᴄ,ᴅ,ᴇ,ꜰ,ɢ,ʜ,ɪ,ᴊ,ᴋ,ʟ,ᴍ,ɴ,ᴏ,ᴘ,Q,ʀ,ꜱ,ᴛ,ᴜ,ᴠ,ᴡ,x,ʏ,ᴢ,ᴀ,ʙ,ᴄ,ᴅ,ᴇ,ꜰ,ɢ,ʜ,ɪ,ᴊ,ᴋ,ʟ,ᴍ,ɴ,ᴏ,ᴘ,Q,ʀ,ꜱ,ᴛ,ᴜ,ᴠ,ᴡ,x,ʏ,ᴢ,1,2,3,4,5,6,7,8,9,0' ,
       'Math Sans Italic':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,1,2,3,4,5,6,7,8,9,0',
       'Math Sans Bold Italic':'𝘼,𝘽,𝘾,𝘿,𝙀,𝙁,𝙂,𝙃,𝙄,𝙅,𝙆,𝙇,𝙈,𝙉,𝙊,𝙋,𝙌,𝙍,𝙎,𝙏,𝙐,𝙑,𝙒,𝙓,𝙔,𝙕,𝙖,𝙗,𝙘,𝙙,𝙚,𝙛,𝙜,𝙝,𝙞,𝙟,𝙠,𝙡,𝙢,𝙣,𝙤,𝙥,𝙦,𝙧,𝙨,𝙩,𝙪,𝙫,𝙬,𝙭,𝙮,𝙯,1,2,3,4,5,6,7,8,9,0',
       'Dark Brackets':'【A】,【B】,【C】,【D】,【E】,【F】,【G】,【H】,【I】,【J】,【K】,【L】,【M】,【N】,【O】,【P】,【Q】,【R】,【S】,【T】,【U】,【V】,【W】,【X】,【Y】,【Z】,【a】,【b】,【c】,【d】,【e】,【f】,【g】,【h】,【i】,【j】,【k】,【l】,【m】,【n】,【o】,【p】,【q】,【r】,【s】,【t】,【u】,【v】,【w】,【x】,【y】,【z】,【1】,【2】,【3】,【4】,【5】,【6】,【7】,【8】,【9】,【0】',
       'Faux Ethiopian':'ል,ጌ,ር,ዕ,ቿ,ቻ,ኗ,ዘ,ጎ,ጋ,ጕ,ረ,ጠ,ክ,ዐ,የ,ዒ,ዪ,ነ,ፕ,ሁ,ሀ,ሠ,ሸ,ሃ,ጊ,ል,ጌ,ር,ዕ,ቿ,ቻ,ኗ,ዘ,ጎ,ጋ,ጕ,ረ,ጠ,ክ,ዐ,የ,ዒ,ዪ,ነ,ፕ,ሁ,ሀ,ሠ,ሸ,ሃ,ጊ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Ancient Gem 2':'ꋫ,ꃃ,ꏸ,ꁕ,ꍟ,ꄘ,ꁍ,ꑛ,ꂑ,ꀭ,ꀗ,꒒,ꁒ,ꁹ,ꆂ,ꉣ,ꁸ,꒓,ꌚ,꓅,ꐇ,ꏝ,ꅐ,ꇓ,ꐟ,ꁴ,ꋫ,ꃃ,ꏸ,ꁕ,ꍟ,ꄘ,ꁍ,ꑛ,ꂑ,ꀭ,ꀗ,꒒,ꁒ,ꁹ,ꆂ,ꉣ,ꁸ,꒓,ꌚ,꓅,ꐇ,ꏝ,ꅐ,ꇓ,ꐟ,ꁴ,1,2,3,4,5,6,7,8,9,0',
       'Math  Serif Italic Bold':'𝑨,𝑩,𝑪,𝑫,𝑬,𝑭,𝑮,𝑯,𝑰,𝑱,𝑲,𝑳,𝑴,𝑵,𝑶,𝑷,𝑸,𝑹,𝑺,𝑻,𝑼,𝑽,𝑾,𝑿,𝒀,𝒁,𝒂,𝒃,𝒄,𝒅,𝒆,𝒇,𝒈,𝒉,𝒊,𝒋,𝒌,𝒍,𝒎,𝒏,𝒐,𝒑,𝒒,𝒓,𝒔,𝒕,𝒖,𝒗,𝒘,𝒙,𝒚,𝒛,1,2,3,4,5,6,7,8,9,0', 
       'Ancient Gem 3':'ꁲ,ꋰ,ꀯ,ꂠ,ꈼ,ꄞ,ꁅ,ꍩ,ꂑ,꒻,ꀗ,꒒,ꂵ,ꋊ,ꂦ,ꉣ,ꁷ,ꌅ,ꌚ,ꋖ,ꐇ,ꀰ,ꅏ,ꇒ,ꐞ,ꁴ,ꁲ,ꋰ,ꀯ,ꂠ,ꈼ,ꄞ,ꁅ,ꍩ,ꂑ,꒻,ꀗ,꒒,ꂵ,ꋊ,ꂦ,ꉣ,ꁷ,ꌅ,ꌚ,ꋖ,ꐇ,ꀰ,ꅏ,ꇒ,ꐞ,ꁴ,1,2,3,4,5,6,7,8,9,0',
       'Strikethrough': 'A̶,B̶,C̶,D̶,E̶,F̶,G̶,H̶,I̶,J̶,K̶,L̶,M̶,N̶,O̶,P̶,Q̶,R̶,S̶,T̶,U̶,V̶,W̶,X̶,Y̶,Z̶,a̶,b̶,c̶,d̶,e̶,f̶,g̶,h̶,i̶,j̶,k̶,l̶,m̶,n̶,o̶,p̶,q̶,r̶,s̶,t̶,u̶,v̶,w̶,x̶,y̶,z̶,1̶,2̶,3̶,4̶,5̶,6̶,7̶,8̶,9̶,0̶',
       'Ancient Gem 4 ':'ꋬ,ꉉ,℃,ꌛ,℮,℉,ꍌ,ꈚ,ꊛ,ꋒ,ꀗ,ꅤ,ꀪ,ꁣ,ꇩ,ꀆ,ꆰ,ꋪ,ꈛ,꓄,ꀀ,℣,ꂸ,ꊩ,ꌦ,ꍈ,ꋬ,ꉉ,℃,ꌛ,℮,℉,ꍌ,ꈚ,ꊛ,ꋒ,ꀗ,ꅤ,ꀪ,ꁣ,ꇩ,ꀆ,ꆰ,ꋪ,ꈛ,꓄,ꀀ,℣,ꂸ,ꊩ,ꌦ,ꍈ,1,2,3,4,5,6,7,8,9,0', 
       'Funky Gem Injection':'α,в,¢,∂,є,ƒ,g,н,ι,נ,к,ℓ,м,η,σ,ρ,q,я,ѕ,т,υ,ν,ω,χ,у,z,α,в,¢,∂,є,ƒ,g,н,ι,נ,к,ℓ,м,η,σ,ρ,q,я,ѕ,т,υ,ν,ω,χ,у,z,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Fancy Curvy Flower':"ᗩ,ᗷ,ᑕ,ᗫ,ꜫ,ፑ,Ԍ,ዙ,ǀ,ᒍ,Қ,ᒷ,ᘻ,Ṇ,Ơ,ᑶ,Ɋ,Ʀ,Տ,Ⲧ,ᑌ,ᕓ,ᙡ,乂,ㄚ,乙,შ,ɓ,ር,Ԃ,Ⲉ,𐍆,ↅ,𐌷,ĺ,ᒎ,Ҡ,し,ᗰ,ᑎ,❍,ᑭ,ᑫ,Ր,Ȿ,Է,ᑌ,Ʋ,ᗯ,Ҳ,ㄚ,乙,ŀ,ᘖ,Ȝ,Ч,ち,꘦,７,ზ,ᑫ,㋨", 
       'Yoda':'ล,в,¢,∂,э,ƒ,φ,ђ,เ,נ,к,ℓ,м,и,๏,ק,ợ,я,ร,†,µ,√,ω,җ,ý,ž,ล,в,¢,∂,э,ƒ,φ,ђ,เ,נ,к,ℓ,м,и,๏,ק,ợ,я,ร,†,µ,√,ω,җ,ý,ž,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Fancy Fractur':"ᗛ,ᗷ,Č,Đ,ℨ,F,Ꮆ,ℌ,Ĭ,ℑ,Ƙ,Ĺ,Ṁ,Ŋ,Ɵ,Ƥ,Q,Ʀ,Ṩ,Ṫ,Ự,Ʋ,ϖ,Ẍ,Ƴ,Ƶ,ᗛ,ᗷ,Č,Đ,ℨ,F,Ꮆ,ℌ,Ĭ,ℑ,Ƙ,Ĺ,Ṁ,Ŋ,Ɵ,Ƥ,Q,Ʀ,Ṩ,Ṫ,Ự,Ʋ,ϖ,Ẍ,Ƴ,Ƶ,1,2,3,4,5,6,7,8,9,0"  ,
       'Hieroglyphs': 'Թ,Յ,Շ,Ժ,ȝ,Բ,Գ,ɧ,ɿ,ʝ,ƙ,ʅ,ʍ,Ռ,Ծ,ρ,φ,Ր,Տ,Ե,Մ,ע,ա,Ճ,Վ,Հ,Թ,Յ,Շ,Ժ,ȝ,Բ,Գ,ɧ,ɿ,ʝ,ƙ,ʅ,ʍ,Ռ,Ծ,ρ,φ,Ր,Տ,Ե,Մ,ע,ա,Ճ,Վ,Հ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Ancient Glyph': '𐌀,𐌁,𐌂,𐌃,𐌄,𐌅,Ᏽ,𐋅,𐌉,Ꮭ,𐌊,𐌋,𐌌,𐌍,Ꝋ,𐌐,𐌒,𐌓,𐌔,𐌕,𐌵,ᕓ,Ꮤ,𐋄,𐌙,Ɀ,𐌀,𐌁,𐌂,𐌃,𐌄,𐌅,Ᏽ,𐋅,𐌉,Ꮭ,𐌊,𐌋,𐌌,𐌍,Ꝋ,𐌐,𐌒,𐌓,𐌔,𐌕,𐌵,ᕓ,Ꮤ,𐋄,𐌙,Ɀ,ᛑ,ᘖ,ᙣ,ᔦ,ᔕ,ᑳ,ᒣ,ზ,ᖗ,Ꝋ',
       'Join Writing':'ą,ც,ƈ,ɖ,ɛ,ʄ,ɠ,ɧ,ı,ʝ,ƙ,Ɩ,ɱ,ŋ,ơ,℘,զ,ཞ,ʂ,ɬ,ų,۷,ῳ,ҳ,ყ,ʑ,ą,ც,ƈ,ɖ,ɛ,ʄ,ɠ,ɧ,ı,ʝ,ƙ,Ɩ,ɱ,ŋ,ơ,℘,զ,ཞ,ʂ,ɬ,ų,۷,ῳ,ҳ,ყ,ʑ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Stylish Gem ': '𐌰,𐌱,ζ,Ɗ,𐌴,𐍆,𐌾,𐌷,𐍊,ʝ,𐌺,𐌋,ꡕ,𐍀,𐍈,Ƥ,ɋ,𐍂,Ⲋ,𐨠,𐍁,ⱱ,𐐎,𑀌,𐌸,Ꙁ,𐌰,𐌱,ζ,Ɗ,𐌴,𐍆,𐌾,𐌷,𐍊,ʝ,𐌺,𐌋,ꡕ,𐍀,𐍈,Ƥ,ɋ,𐍂,Ⲋ,𐨠,𐍁,ⱱ,𐐎,𑀌,𐌸,Ꙁ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
       'Small Above ': 'ᵃ,ᵇ,ᶜ,ᵈ,ᵉ,ᶠ,ᵍ,ʰ,ⁱ,ʲ,ᵏ,ˡ,ᵐ,ⁿ,ᵒ,ᵖ,ᵠ,ʳ,ˢ,ᵗ,ᵘ,ᵛ,ʷ,ˣ,ʸ,ᶻ,ᵃ,ᵇ,ᶜ,ᵈ,ᵉ,ᶠ,ᵍ,ʰ,ⁱ,ʲ,ᵏ,ˡ,ᵐ,ⁿ,ᵒ,ᵖ,ᵠ,ʳ,ˢ,ᵗ,ᵘ,ᵛ,ʷ,ˣ,ʸ,ᶻ,¹,²,³,⁴,⁵,⁶,⁷,⁸,⁹,⁰',
       'Fancy Gem 2 ':'ᗅ,ᙘ,ᑤ,ᗫ,ᙍ,ᖴ,ᘜ,ᕼ,ᓿ,ᒙ,ᖽ,ᐸ,ᒪ,ᙢ,ᘉ,ᓎ,ᕿ,ᕴ,ᖇ,S,ᖶ,ᑗ,ᐻ,ᙎ,᙭,ᖻ,ᙣ,ᗅ,ᙘ,ᑤ,ᗫ,ᙍ,ᖴ,ᘜ,ᕼ,ᓿ,ᒙ,ᖽ,ᐸ,ᒪ,ᙢ,ᘉ,ᓎ,ᕿ,ᕴ,ᖇ,S,ᖶ,ᑗ,ᐻ,ᙎ,᙭,ᖻ,ᙣ,˦,Ϩ,Յ,Ϥ,Ƽ,δ,𐒇,ϐ,ƍ,θ',
       'Weired': '⍲,⌦,⍧,⟄,ℇ,🜅,⅁,ℍ,⟟,⏎,⏧,⎾,⍓,☊,⌾,⍴,ℚ,☈,⎎,⍑,⌰,⍻,⏙,🝍,⍦,☡,⍲,⌦,⍧,⟄,ℇ,🜅,⅁,ℍ,⟟,⏎,⏧,⎾,⍓,☊,⌾,⍴,ℚ,☈,⎎,⍑,⌰,⍻,⏙,🝍,⍦,☡,𝟙,𝟚,𝟛,𝟜,𝟝,𝟞,𝟟,𝟠,𝟡,𝟘',
       'Weird  Fancy': "҉A҉,҉B҉,҉C҉,҉D҉,҉E҉,҉F҉,҉G҉,҉H҉,҉I҉,҉J҉,҉K҉,҉L҉,҉M҉,҉N҉,҉O҉,҉P҉,҉Q҉,҉R҉,҉S҉,҉T҉,҉U҉,҉V҉,҉W҉,҉X҉,҉Y҉,҉Z҉,҉a҉,҉b҉,҉c҉,҉d҉,҉e҉,҉f҉,҉g҉,҉h҉,҉i҉,҉j҉,҉k҉,҉l҉,҉m҉,҉n҉,҉o҉,҉p҉,҉q҉,҉r҉,҉s҉,҉t҉,҉u҉,҉v҉,҉w҉,҉x҉,҉y҉,҉z҉,҉1҉,҉2҉,҉3҉,҉4҉,҉5҉,҉6҉,҉7҉,҉8҉,҉9҉,҉0҉" ,
       'Fancy Small':"ѧ,ɞ,ċ,Ԁ,є,ғ,ɢ,һ,ı,j,ҡ,ʟ,ṃ,ṅ,ȏ,ƿ,q,я,ṡ,ṭ,ȗ,ṿ,ẇ,×,ʏ,ẓ,ѧ,ɞ,ċ,Ԁ,є,ғ,ɢ,һ,ı,j,ҡ,ʟ,ṃ,ṅ,ȏ,ƿ,q,я,ṡ,ṭ,ȗ,ṿ,ẇ,×,ʏ,ẓ,1,2,3,4,5,6,7,8,9,0" ,
       'Zalgo Level 5':'A̶͇̟̪̝̋̑,̷̧͈͑̀̎̅͊B̶̫͋̓̐̕,̶̙͉͍̼̃͗͠Ç̴̢͙̝̈́,̷̛̙̩͇͇̣̀̈́̂̓D̴̦̩̺͖̀̏͋͑͘ͅ,̵̧͖͚̖̙̈́̏̂̉Ề̸͙̻̦͋̚,̵̭̺͙͊͐͋̕͝F̴̨̤̞̼̮̒̇͒̚,̵̘̭̭̍̋̓͋͝ͅG̷̡̤͕̔̈́̈́̐͌͜,̷̜̌̐͂̈H̶̢̦̮͋̊̀͗,̷̦̼̘̽̎̆͒͆ͅͅÎ̸̜̓͗̈́,̸̺̪͔͊͝J̵̜͈̹̩̾͐͛̓̚,̷̢̜̟̟̝͑̾K̶̨̪͓̟̒̈̈́̎͝,̶̢̱̺͙̯̃L̵̖̮̇̿̉͋̽,̴͍̯̖̝̓͌ͅM̶̨̮͈̽̈́͛̚͝,̸̫͉̮̰̔̃N̸̼̅̌,̸̡̛̩͖̠̌̀͂͐O̸̡̒̾̏,̴̭̞̦̪͊̓̉̀͝P̴̛̟̂͗́,̴͖̩͔̖̇Q̷̡̡͕́͑,̵͓͔̘̓̀͑Ŗ̷̰͑͊̈̓,̸̦̠͍̀̈̕Ś̶̜,̶͉̘́̀̂̆͋ͅT̵͕͐̔,̸̗̇̍̓Ự̵͍̖̣͉́̍̉̃,̷̨͍̣̈́̓̓̑͘V̸̦̟͙͓̎͛ͅ,̵̟̘̑̈́̈W̸̳͆̉̊,̵̯̥̹͠X̶̢̝̻̩͒͜,̵̰͕̘̥͖̄̐̈́͂͆Ÿ̸̞͛͝,̵̬̬̠̞̀̌̽͠Z̴͎̑̍̈́,̷̡͚̟̿̾̎ȧ̸̡̪̠̂̐͘͝,̷͍̦̰̽̃̕͝b̷̩̌̅̂͝ͅ,̴̬̲͋͑c̵͉̗͑̏,̶̺͈̹͇̓́͐ḏ̵̦̀͂̓̍͠,̸̬̬̖͉̖́̒̌̈́ė̴̡̗̙̳́̊̆̓,̷̩̰̗̐f̸̮̈́̂̐͝ͅ,̶̖̠͇͊͊g̶̡̖͓̋̐̂,̴͔͆̾̔̕h̴̦͉͎̟͑̉͆,̸̬̬̓̓̀̄͠i̷̮̤̓,̵̙̕j̷̫̼̭̲̅̀̀̔͌,̷̡̛͙͓̝k̸͕̤̯͔̪͋̇̈́̓,̴̱͚̙̗̇̽̄̓l̶̢̼̞̟͔̀̓̇,̵̼̤̎͘m̷̼͖̥̈́̔ͅ,̴̠̺̅͒͠n̷̘̏̿̄͠͝,̸͇͔͒̈o̴̮͎̙͋͑͂,̸̞̝̽̾̽̒ͅṕ̶̦̺̃̚̚,̶̝̖̩͖̈͗̃͌q̴͙̗̹̐̑̍͘͝,̷͉̰̥̱̌r̴̖̺͚̪̹̀,̸̧̙̟̱̯̽͆s̴̟̹̑͜͝,̷̥̠͙̙̊̀t̵̙̝̥̣́̑̂̾,̶̛͚̋̆̽͝ǔ̸͇͌͐̃̉,̷̛̖͝v̴̡̀̄͜ͅ,̸̳̻͖̳̽̋w̴̨̳̚,̴͓͈̜͉̀̈́͌̑ẍ̷͓̟́,̸͗͐͜͝y̴̳͓͓̥̏,̵͈̞̥͉̏͐ẕ̸̧̢̈́̚,̴͙̉1̵̧͓̐̐̅̾,̸̧̻̖̑͌̅2̶͈̙̳̺͒̀͋̏,̷͈͒͛͝3̵̨̪̍̿̈́,̷̝̤̙̹̟́̈̊̕4̵̹͛̓͌̓,̵̡̹̤̗̓͂͌5̷̱̻̬̀,̶̨̡̣͔͂̀6̵̡̧̖͕̪͑́̂͆,̸̭͓̞̀͗͑́̀͜7̷̻̇́̽͠͝,̷̞̪́̊̋́̆8̵̮̹̩̫̓̐͝,̴̨̡̛̦̤́͊͘9̷̢̣̩͌̄̈́̅̒͜,̷͙͖̮̀0̸̛̫̌̈̐̕ ',                            
       
       	
       
       // Add (load) more fonts here
    };


    function loadMoreFonts(outputContainers, inputText) { // function for chnages input into additional fonts only one time when button clicked
       
        const defaultText = inputText.trim() || defaultText; // Use "defaultText" if input is empty
        const remainingFonts = Object.keys(additionalFonts).filter(font => !document.getElementById(`output${font.replace(/\s+/g, '')}`));
    
        const fontsToLoad = remainingFonts.slice(0, 15); // Load ten fonts at a time
    
        fontsToLoad.forEach(fontName => {

            outputContainers.forEach(container => {

                const outputBox = createOutputBox(fontName, container);
    
                const mFontChars = generateFontMapping(additionalFonts[fontName]);
                let convertedText = '';
    
                for (let i = 0; i < defaultText.length; i++) { // Use the default text for loading more fonts
                    const char = defaultText.charAt(i);
                    convertedText += mFontChars[char] || char;
                }
    
                switch(fontName){ 

                    case  'Fancy Curvy Flower'  :            //  for wrraping every word with emoji 
                     outputBox.style.fontFamily = fontName + ', sans-serif';
                     afterlogo=addEmojiToSpaces(convertedText,"❀")
                     outputBox.textContent = afterlogo;
                    break;
                    
                    case  'Flower Times New Roman':            //  for wrraping every word with emoji 
                      outputBox.style.fontFamily = fontName + ', sans-serif';
                      afterlogo=addEmojiToSpaces(convertedText,"🌸")
                      outputBox.textContent = afterlogo;
                    break;

                    case  'Math Sans Italic':            //  for wrraping every word with emoji 
                      outputBox.style.fontFamily = fontName + ', sans-serif';
                      afterlogo=insertEmojiAroundChars(convertedText,"⨳")
                      outputBox.textContent = afterlogo;
                    break;
                    
                    case  'Cross Math  Serif Italic Bold':            //  for wrraping every char with emoji 
                      outputBox.style.fontFamily = fontName + ', sans-serif';
                      afterlogo=insertEmojiAroundChars(convertedText,"✟")
                      outputBox.textContent = afterlogo;
                    break;

                    /*
                    case  '':            //  for wrraping every word with emoji 
                      outputBox.style.fontFamily = fontName + ', sans-serif';
                      afterlogo=insertEmojiAroundChars(convertedText,"⨳")
                      outputBox.textContent = afterlogo;
                    break;
                    */

                    default:
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    outputBox.textContent = convertedText;
               
                }
                
            });
                        
            switch(fontName){ 

                case  'Math Sans Gem'  :            //  for wrraping every with emoji 
                    addSignsToOutput('Math Sans Gem', '▁ ▂ ▄ ▅ ▆ ▇ █ ', '█ ▇ ▆ ▅ ▄ ▂ ▁');     // here add signs to specific font output                
                break;
    
                case  'Funky Gem Injection':            //  for wrraping every word with emoji 
                    addSignsToOutput('Funky Gem Injection', '┣▇▇ ', '▇▇═─ 💦');    
                break;
    
                case  'Wizard sniper':            //  for wrraping every  with emoji 
                    addSignsToOutput('Wizard sniper Font', '▄︻デ', '═══━一');                
                break;
                
                case  'Script Bold Italic Gem':            //  for wrraping every  with emoji 
                    addSignsToOutput('Script Bold Italic Gem', '꧁✬◦°˚°◦.', '.◦°˚°◦✬꧂');                
                break;
    
                case  'Ancient Gem 3':            //  for wrraping every  with emoji 
                    addSignsToOutput('Ancient Gem 3 Font', '一═デ︻', '︻デ═一');     // here add signs to specific font output 
                break;
    
                case  'Monospace Heart':            //  for wrraping every  with emoji 
                    addSignsToOutput('Monospace Heart', '◦•●♡❤', '❤♡●•◦');     // here add signs to specific font output               
                break;
    
                case  'Dark Bubbles':            //  for wrraping every  with emoji 
                    addSignsToOutput('Dark Bubbles', '〜•oO۞', '۞Oo•〜');     // here add signs to specific font output
                break;
    
                /*
                case  '':            //  for wrraping every char with emoji 
                    addSignsToOutput('', '', '');  
                break;
                */
           
            } 
               
        });

        

        if (remainingFonts.length <= 15) {
            loadMoreFontsButton.style.display = 'none'; // Hide the button if there are no more remaining fonts
        }
    
        convertText(); // Update output with the newly loaded fonts
    }
    


    function updateDynamicFonts() {   //  function during run time  input chnage into additional fonts  
       
        for (const fontName in additionalFonts) {

            const outputBox = document.getElementById(`output${fontName.replace(/\s+/g, '')}`);

            if (outputBox) { 
                
                // Check if the element exists
                const mFontChars = generateFontMapping(additionalFonts[fontName]);
                let convertedText = '';


                const inputTextValue = inputText.value.trim() || defaultText; // Use "defaultText" if input is empty

                for (let i = 0; i < inputTextValue.length; i++) {
                    const char = inputTextValue.charAt(i);
                    convertedText += mFontChars[char] || char;
                }

                switch(fontName){  

                    case  'Fancy Curvy Flower'  :            //  for wrraping every word with emoji 
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    afterlogo=addEmojiToSpaces(convertedText,"❀")
                    outputBox.textContent = afterlogo;
                   break;
                   
                   case  'Flower Times New Roman':            //  for wrraping every word with emoji 
                     outputBox.style.fontFamily = fontName + ', sans-serif';
                     afterlogo=addEmojiToSpaces(convertedText,"🌸")
                     outputBox.textContent = afterlogo;
                   break;

                   case  'Math Sans Italic':            //  for wrraping every word with emoji 
                     outputBox.style.fontFamily = fontName + ', sans-serif';
                     afterlogo=insertEmojiAroundChars(convertedText,"⨳")
                     outputBox.textContent = afterlogo;
                   break;
                   
                   case  'Cross Math  Serif Italic Bold':            //  for wrraping every char with emoji 
                     outputBox.style.fontFamily = fontName + ', sans-serif';
                     afterlogo=insertEmojiAroundChars(convertedText,"✟")
                     outputBox.textContent = afterlogo;
                   break;

                   /*
                   case  '':            //  for wrraping every word with emoji 
                     outputBox.style.fontFamily = fontName + ', sans-serif';
                     afterlogo=insertEmojiAroundChars(convertedText,"⨳")
                     outputBox.textContent = afterlogo;
                   break;
                   */

                   default:
                   outputBox.style.fontFamily = fontName + ', sans-serif';
                   outputBox.textContent = convertedText;
                 
                }
                

            }

            switch(fontName){ 

                case  'Math Sans Gem'  :            //  for wrraping every with emoji 
                    addSignsToOutput('Math Sans Gem', '▁ ▂ ▄ ▅ ▆ ▇ █ ', '█ ▇ ▆ ▅ ▄ ▂ ▁');     // here add signs to specific font output                
                break;
    
                case  'Funky Gem Injection':            //  for wrraping every word with emoji 
                    addSignsToOutput('Funky Gem Injection', '┣▇▇ ', '▇▇═─ 💦');    
                break;
    
                case  'Wizard sniper':            //  for wrraping every  with emoji 
                    addSignsToOutput('Wizard sniper Font', '▄︻デ', '═══━一');                
                break;
                
                case  'Script Bold Italic Gem':            //  for wrraping every  with emoji 
                    addSignsToOutput('Script Bold Italic Gem', '꧁✬◦°˚°◦.', '.◦°˚°◦✬꧂');                
                break;
    
                case  'Ancient Gem 3':            //  for wrraping every  with emoji 
                    addSignsToOutput('Ancient Gem 3 Font', '一═デ︻', '︻デ═一');     // here add signs to specific font output 
                break;
    
                case  'Monospace Heart':            //  for wrraping every  with emoji 
                    addSignsToOutput('Monospace Heart', '◦•●♡❤', '❤♡●•◦');     // here add signs to specific font output               
                break;
    
                case  'Dark Bubbles':            //  for wrraping every  with emoji 
                    addSignsToOutput('Dark Bubbles', '〜•oO۞', '۞Oo•〜');     // here add signs to specific font output
                break;
    
                /*
                case  'Cross Math  Serif Italic Bold':            //  for wrraping every char with emoji 
                    addSignsToOutput('', '', '');  
                break;
                */
           
            } 

        }

    }


    function generateFontMapping(fontChars) { // funtion for mapping list of words which change is available  

        const simpleAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        const fontCharsArray = fontChars.split(',');
        const mapping = {};


        for (let i = 0; i < simpleAlphabets.length; i++) {
            mapping[simpleAlphabets[i]] = fontCharsArray[i] || simpleAlphabets[i];
        }


        return mapping;

    }


    function insertEmojiBetweenChars(text, emoji) {

        // Convert the text into an array of characters
        let chars = Array.from(text);
        // Initialize an array to hold the result
        let result = [];
        
        // Loop through each character
        chars.forEach((char, index) => {
            // Add the current character to the result
            result.push(char);
            // Add the emoji if the current character is not the last character, not a space, and there is a next character
            if (index < chars.length - 1 && char !== ' ' && chars[index + 1] !== ' ') {
                result.push(emoji);
            }
        });
        
        // Join the characters with the emoji in between
        return result.join('');

    }
    

    function insertEmojiAroundChars(text, emoji) {
        newline=insertEmojiBetweenChars(text, emoji);
        newline=surroundWordsWith(newline, emoji);
        return newline;
    }     

    
    function addSignsToOutput(fontName, startSign, endSign) {  
        
        // use to add sign around the text
        const outputBox = document.getElementById(`output${fontName.replace(/\s+/g, '')}`);

        if (outputBox) {

            const currentText = outputBox.textContent;
            let newText = "";
            if (startSign && endSign) {
                newText = startSign + currentText + endSign;
            } else if (startSign) {
                newText = startSign + currentText;
            } else if (endSign) {
                newText = currentText + endSign;
            }
            outputBox.textContent = newText;
        } 

    }
   
    
    function addEmojiToSpaces(str, emoji) {
        return str.split(' ').join(emoji);
    }
    

    function SeprateEmojisAroundWord(text, leftEmoji, rightEmoji) {
        // Split the text by spaces to get individual words
        const words = text.split(" ");
      
        // Add left and right emoji to each word
        const modifiedWords = words.map(word => `${leftEmoji}${word}${rightEmoji}`);
      
        // Join the words back into a string with spaces in between
        return modifiedWords.join(" ");
    }


    function addtwoSignsaroundchar (text, sign1, sign2) {
        return Array.from(text).map(char => {
            return char === ' ' ? char : sign1 + char + sign2;
        }).join('');
    }


    function surroundWordsWith(text, sign) { //add signs around text 
        // Split the text into words
        const words = text.split(/\s+/);
    
        // Surround each word with the sign
        const surroundedWords = words.map(word => `${sign}${word}${sign}`);
    
        // Join the surrounded words back into a single string
        return surroundedWords.join(" ");
    }


    

    function reverseText(convertedText) {
        // Convert the string to an array of code points
        let codePoints = Array.from(convertedText);    
        // Reverse the array of code points
        codePoints.reverse();
        // Join the reversed array back into a string
        return codePoints.join('');
    }  


    function changeButtonText(outputBox) {

        const outputButtonId = `outputCopyButton${outputBox.id.replace('output', '')}`;
        const copyButton = document.getElementById(outputButtonId);

        if (copyButton) {
            copyButton.textContent = 'Copied';

            setTimeout(() => {
               copyButton.textContent = 'Copy';
            }, 7000);

        }

    }

    
    const eraseLogo = document.getElementById('eraseLogo');
    const input = document.getElementById('inputText');
    
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
    // custom-script-nodeffer-end

