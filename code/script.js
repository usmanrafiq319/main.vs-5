document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById("inputText");
    const outputContainers = document.querySelectorAll('.output-container');
    const loadMoreFontsButton = document.getElementById('loadMoreFonts');
    const defaultText = 'Welcome in FontsGem Text World';



          document.getElementById('inputText').addEventListener('paste', function(event) {
    event.preventDefault(); // Prevent the default paste behavior

    // Get the pasted text from the clipboard
    var clipboardData = (event.clipboardData || window.clipboardData).getData('text');
    
    // Normalize the pasted text by removing newlines and multiple spaces
    var normalizedText = clipboardData.replace(/\s+/g, ' '); // Replace newlines and multiple spaces with a single space
    
    // Insert the normalized text at the current cursor position
    var input = event.target;
    var start = input.selectionStart;
    var end = input.selectionEnd;
    input.value = input.value.substring(0, start) + normalizedText + input.value.substring(end);
    
    // Set the cursor position to the end of the pasted text
    input.setSelectionRange(start + normalizedText.length, start + normalizedText.length);

    // Manually trigger the input event to ensure other functions recognize the updated value
    var event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
});

// Prevent the Enter key from creating a new line
document.getElementById('inputText').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

          
          
      // Function to detect if the user is on a mobile phone or tablet
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Get the input box element
const inputBox = document.getElementById('inputText');

// Auto-focus the input box only if not on a mobile device or tablet
if (!isMobile()) {
    inputBox.focus();

    // Ensure the input box stays focused if the user clicks outside of it
    document.addEventListener('click', () => {
        inputBox.focus();
    });
}




    // default runing text
    const generateRunningPlaceholder = (text) => (() => text.slice(0, index++) + (index <= text.length ? "|" : ""));
    const placeholderText = "Enter your text here and see the magic below ⬇ ";
    const inputTextforplaceholder = document.getElementById('inputText');
    const runningPlaceholder = generateRunningPlaceholder(placeholderText);
    let index = 0, animationInterval = setInterval(() => {
        inputTextforplaceholder.setAttribute('placeholder', runningPlaceholder());
        if (index > placeholderText.length) clearInterval(animationInterval);
    }, 60);


    // Call convertText function on page load
    convertText();


   

    // Add input event listener
    inputText.addEventListener("input", () => {
        convertText();
        
    });
             
             
                
   
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
        document.body.appendChild(notification);
    
        // Remove the notification after 71 seconds (matching CSS animation duration)
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
   //     outputButton.style.border = '15px solid rgba(255, 255, 255)';
        outputBox.style.color = '#FF4500';
        outputBox.style.paddingTop = '21px';
        outputBox.style.paddingLeft = '21px';
        outputButton.style.boxShadow = '0 0 0px 0px #808080';
    });

    outputBox.addEventListener('mouseout', () => {
        outputButton.style.backgroundColor = 'rgb(255, 255, 255)';
        outputButton.style.color = '#808080';
  //      outputButton.style.border = '15px solid rgba(255, 69, 0, 0)';
        outputButton.style.boxShadow = 'inset 0 0 2px 1px #808080';
        outputBox.style.color = 'Black';
        outputBox.style.paddingTop = '20px';
        outputBox.style.paddingLeft = '20px';
    });

    outputButton.addEventListener('mouseover', () => {
        outputButton.style.backgroundColor = '#FF4500';
        outputButton.style.color = 'white';
  //      outputButton.style.border = '15px solid rgba(255, 255,255)';
        outputButton.style.boxShadow = '0 0 0px 0px #808080';
        outputBox.style.color = '#FF4500';
        outputBox.style.paddingTop = '21px';
        outputBox.style.paddingLeft = '21px';
    });

    outputButton.addEventListener('mouseout', () => {
        outputButton.style.backgroundColor = 'rgb(255, 255, 255)';
        outputButton.style.color = '#808080';
   //     outputButton.style.border = '15px solid rgba(255, 69, 0, 0)';
        outputButton.style.boxShadow = 'inset 0 0 2px 1px #808080';
        outputBox.style.color = 'Black';
        outputBox.style.paddingTop = '20px';
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
           
            'Math Sans Italic':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,1,2,3,4,5,6,7,8,9,0',
            'Sans Serif Bold Italic':'𝘼,𝘽,𝘾,𝘿,𝙀,𝙁,𝙂,𝙃,𝙄,𝙅,𝙆,𝙇,𝙈,𝙉,𝙊,𝙋,𝙌,𝙍,𝙎,𝙏,𝙐,𝙑,𝙒,𝙓,𝙔,𝙕,𝙖,𝙗,𝙘,𝙙,𝙚,𝙛,𝙜,𝙝,𝙞,𝙟,𝙠,𝙡,𝙢,𝙣,𝙤,𝙥,𝙦,𝙧,𝙨,𝙩,𝙪,𝙫,𝙬,𝙭,𝙮,𝙯,1,2,3,4,5,6,7,8,9,0',
            'Math Serif Italic Bold':'𝑨,𝑩,𝑪,𝑫,𝑬,𝑭,𝑮,𝑯,𝑰,𝑱,𝑲,𝑳,𝑴,𝑵,𝑶,𝑷,𝑸,𝑹,𝑺,𝑻,𝑼,𝑽,𝑾,𝑿,𝒀,𝒁,𝒂,𝒃,𝒄,𝒅,𝒆,𝒇,𝒈,𝒉,𝒊,𝒋,𝒌,𝒍,𝒎,𝒏,𝒐,𝒑,𝒒,𝒓,𝒔,𝒕,𝒖,𝒗,𝒘,𝒙,𝒚,𝒛,1,2,3,4,5,6,7,8,9,0',
            'Fancy Script Italic':'𝒜,ℬ,𝒞,𝒟,ℰ,ℱ,𝒢,ℋ,ℐ,𝒥,𝒦,ℒ,ℳ,𝒩,𝒪,𝒫,𝒬,ℛ,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,ℯ,𝒻,ℊ,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,ℴ,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0',
            'Script Italic':'𝒜,𝐵,𝒞,𝒟,𝐸,𝐹,𝒢,𝐻,𝐼,𝒥,𝒦,𝐿,𝑀,𝒩,𝒪,𝒫,𝒬,𝑅,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,𝑒,𝒻,𝑔,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,𝑜,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0' ,
            'Script Bold Italic':'𝓐,𝓑,𝓒,𝓓,𝓔,𝓕,𝓖,𝓗,𝓘,𝓙,𝓚,𝓛,𝓜,𝓝,𝓞,𝓟,𝓠,𝓡,𝓢,𝓣,𝓤,𝓥,𝓦,𝓧,𝓨,𝓩,𝓪,𝓫,𝓬,𝓭,𝓮,𝓯,𝓰,𝓱,𝓲,𝓳,𝓴,𝓵,𝓶,𝓷,𝓸,𝓹,𝓺,𝓻,𝓼,𝓽,𝓾,𝓿,𝔀,𝔁,𝔂,𝔃,1,2,3,4,5,6,7,8,9,0',
            'Math Sans Italic Reverse':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,1,2,3,4,5,6,7,8,9,0',
            'Upper Case Italic':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡',  
            'Lower Case Italic':'𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻',
            'Math Sans Italic Letter Case':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,1,2,3,4,5,6,7,8,9,0',
            'Fancy Script Italic Bracket':'𝒜,ℬ,𝒞,𝒟,ℰ,ℱ,𝒢,ℋ,ℐ,𝒥,𝒦,ℒ,ℳ,𝒩,𝒪,𝒫,𝒬,ℛ,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,ℯ,𝒻,ℊ,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,ℴ,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0',
            'Sans Serif Italic Boxed':'[𝘈̲̅],[𝘉̲̅],[𝘊̲̅],[𝘋̲̅],[𝘌̲̅],[𝘍̲̅],[𝘎̲̅],[𝘏̲̅],[𝘐̲̅],[𝘑̲̅],[𝘒̲̅],[𝘓̲̅],[𝘔̲̅],[𝘕̲̅],[𝘖̲̅],[𝘗̲̅],[𝘘̲̅],[𝘙̲̅],[𝘚̲̅],[𝘛̲̅],[𝘜̲̅],[𝘝̲̅],[𝘞̲̅],[𝘟̲̅],[𝘠̲̅],[𝘡̲̅],[𝘢̲̅],[𝘣̲̅],[𝘤̲̅],[𝘥̲̅],[𝘦̲̅],[𝘧̲̅],[𝘨̲̅],[𝘩̲̅],[𝘪̲̅],[𝘫̲̅],[𝘬̲̅],[𝘭̲̅],[𝘮̲̅],[𝘯̲̅],[𝘰̲̅],[𝘱̲̅],[𝘲̲̅],[𝘳̲̅],[𝘴̲̅],[𝘵̲̅],[𝘶̲̅],[𝘷̲̅],[𝘸̲̅],[𝘹̲̅],[𝘺̲̅],[𝘻̲̅],[1̲̅],[2̲̅],[3̲̅],[4̲̅],[5̲̅],[6̲̅],[7̲̅],[8̲̅],[9̲̅],[0̲̅]',
            'Sans Serif Italic Zalgo':'̸̧͐𝘈̸̪̓,̴̧͐𝘉̴͍͝,̶̹̿𝘊̷̢̈́,̶̺̋𝘋̷̢̋,̴̚ͅ𝘌̷̣̈́,̴͚̆𝘍̸͉̎,̷̯͗𝘎̸̨̋,̴̧̓𝘏̷̡͒,̴̡̃𝘐̶̦͝,̵̠͛𝘑̵̼͊,̷̰̃𝘒̸̡͛,̴̤̊𝘓̸̨͋,̷̥̚𝘔̴̺̓,̵̆ͅ𝘕̵̘̀,̶͙̌𝘖̶̭͑,̴̜̾𝘗̴̬͑,̷́ͅ𝘘̵̳̄,̷̗͆𝘙̶͚̌,̸̨̍𝘚̸̖̄,̸̲̒𝘛̷̩̑,̷͂ͅ𝘜̶̯͗,̴̡̅𝘝̷̭̒,̵̭̀𝘞̷̝̾,̶̯̎𝘟̸̢̂,̸̧͒𝘠̵̔͜,̶̯̅𝘡̴͈̿,̵̟̈𝘢̶̩̋,̵̢̈𝘣̸̎͜,̴̲́𝘤̵̱̋,̵̫͛𝘥̷̨͝,̶̦̏𝘦̴̘͠,̵͖̕𝘧̷̺̑,̷̧̛𝘨̴͉̐,̵̣̓𝘩̸͉̚,̴͖̈́𝘪̶̢̊,̵̼̃𝘫̵͍̃,̵͕͝𝘬̶̣̂,̶̡̋𝘭̸̨̋,̷̯͝𝘮̴̱̌,̵̮͋𝘯̴͉̿,̷̨̿𝘰̸̹͐,̴̳̚𝘱̸̻̋,̷͎́𝘲̸͉͐,̷͉̋𝘳̶̳́,̴͋͜𝘴̴͈͐,̷̳͗𝘵̸͗͜,̴̧̏𝘶̸͓́,̶̘͂𝘷̷͔́,̶͔̉𝘸̷̺̉,̶̮̆𝘹̵̥̎,̸͖̀𝘺̸̝̋,̴̮̂𝘻̶̂͜,̷͕́1̷͚̇,̵͐ͅ2̴̬͑,̵̟̐3̴̡̒,̸̹̚4̸̢̛,̶̧̈́5̵̗̄,̸̃ͅ6̴̼̽,̸͕̐7̴̹̾,̸̥̈́8̴̼͛,̴̩̅9̴͔̊,̵̝͋0̵',         
            'Math Sans Italic Gem 1':'𝘈,𝘉,𝘊,𝘋,𝘌,𝘍,𝘎,𝘏,𝘐,𝘑,𝘒,𝘓,𝘔,𝘕,𝘖,𝘗,𝘘,𝘙,𝘚,𝘛,𝘜,𝘝,𝘞,𝘟,𝘠,𝘡,𝘢,𝘣,𝘤,𝘥,𝘦,𝘧,𝘨,𝘩,𝘪,𝘫,𝘬,𝘭,𝘮,𝘯,𝘰,𝘱,𝘲,𝘳,𝘴,𝘵,𝘶,𝘷,𝘸,𝘹,𝘺,𝘻,1,2,3,4,5,6,7,8,9,0',

            // Add more fonts here
        };


        for (const fontName in fonts) {

            const outputBox = createOutputBox(fontName, outputContainers[0]);
            const mFontChars = generateFontMapping(fonts[fontName]);
            let convertedText = '';
            let newdefulttext=capitalizeWords(defaultText);

            if (inputTextValue === defaultText || inputTextValue === newdefulttext) {

                switch (fontName) {

                    case 'Math Sans Italic Letter Case':  
                        inputTextValue = capitalizeWords(inputTextValue);
                    break;

                    default:
                    inputTextValue = defaultText; 
                       
                }

            } else {

                switch (fontName) {

                    case 'Fancy Script Italic':  
                        inputTextValue = capitalizeWords(inputTextValue);
                    break;

                    default:
                    inputTextValue = inputText.value.trim(); // Ensure inputText is correctly defined
                    
                }
            }
            

            for (let i = 0; i < inputTextValue.length; i++) { //compare input string to fonts element's mapping then genrate result
            
                const char = inputTextValue.charAt(i);
                convertedText += mFontChars[char] || char;

            }
            
            switch(fontName){  

                case  'Math Sans Italic Reverse':            //  for wrraping every word with emoji 
                  outputBox.style.fontFamily = fontName + ', sans-serif';
                  convertedText=reverseText (convertedText)
                  outputBox.textContent = convertedText;
                break;

                case  'Fancy Script Italic Gem':            //  for wrraping every word with emoji 
                  outputBox.style.fontFamily = fontName + ', sans-serif';
                  convertedText=surroundWordsWith(convertedText,"❀")
                  outputBox.textContent = convertedText;
                break;

                case  'Math Sans Italic Gem 1':            // Script Bold Italic Reverse for wrraping every word with emoji 
                  outputBox.style.fontFamily = fontName + ', sans-serif';
                  convertedText=addtwoSignsaroundchar(convertedText,"﴾","﴿")
                  outputBox.textContent = convertedText;
                break;
                
                case  'Fairytale Font': 
                 outputBox.style.fontFamily = fontName + ', sans-serif';
                 convertedText =insertEmojiBetweenChars(convertedText, "🖤") 
                 outputBox.textContent =convertedText;
                break;

                case  'Fancy Script Italic Bracket': 
                 outputBox.style.fontFamily = fontName + ', sans-serif';
                 convertedText =addtwoSignsaroundchar(convertedText,"⦑","⦒") 
                 outputBox.textContent =convertedText;
                break;
               
                default:
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    outputBox.textContent = convertedText;
                
             
            }
          
            

        }

       
            

        index--;
        
        addSignsToOutput('Fancy Script Heart','◦•●♡🖤 ',' 🖤♡●•◦') //    gns to specific font output
           
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

    
    function capitalizeWords(text) {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    

    function addtwoSignsaroundchar (text, sign1, sign2) {
        return Array.from(text).map(char => {
            return char === ' ' ? char : sign1 + char + sign2;
        }).join('');
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

    
    function addSignsToOutput(fontName, startSign, endSign) {   // use to add sign around the text
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
            }, 70000);
        }
    }



    function surroundWordsWith(text, sign) { //add signs around text 
        // Split the text into words
        const words = text.split(/\s+/);
    
        // Surround each word with the sign
        const surroundedWords = words.map(word => `${sign}${word}${sign}`);
    
        // Join the surrounded words back into a single string
        return surroundedWords.join(" ");
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
