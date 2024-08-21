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
        }, 7000);
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
         
           'Fancy Script Italic':'𝒜,ℬ,𝒞,𝒟,ℰ,ℱ,𝒢,ℋ,ℐ,𝒥,𝒦,ℒ,ℳ,𝒩,𝒪,𝒫,𝒬,ℛ,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,ℯ,𝒻,ℊ,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,ℴ,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0',
           'Script Bold Italic Font':'𝓐,𝓑,𝓒,𝓓,𝓔,𝓕,𝓖,𝓗,𝓘,𝓙,𝓚,𝓛,𝓜,𝓝,𝓞,𝓟,𝓠,𝓡,𝓢,𝓣,𝓤,𝓥,𝓦,𝓧,𝓨,𝓩,𝓪,𝓫,𝓬,𝓭,𝓮,𝓯,𝓰,𝓱,𝓲,𝓳,𝓴,𝓵,𝓶,𝓷,𝓸,𝓹,𝓺,𝓻,𝓼,𝓽,𝓾,𝓿,𝔀,𝔁,𝔂,𝔃,1,2,3,4,5,6,7,8,9,0',   
           'Fraktur Bold Font  or  Blackboard Bold':'𝕬,𝕭,𝕮,𝕯,𝕰,𝕱,𝕲,𝕳,𝕴,𝕵,𝕶,𝕷,𝕸,𝕹,𝕺,𝕻,𝕼,𝕽,𝕾,𝕿,𝖀,𝖁,𝖂,𝖃,𝖄,𝖅,𝖆,𝖇,𝖈,𝖉,𝖊,𝖋,𝖌,𝖍,𝖎,𝖏,𝖐,𝖑,𝖒,𝖓,𝖔,𝖕,𝖖,𝖗,𝖘,𝖙,𝖚,𝖛,𝖜,𝖝,𝖞,𝖟,1,2,3,4,5,6,7,8,9,0' ,
           'Curvy Font':'ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,ᗩ,ᗷ,ᑕ,ᗪ,E,ᖴ,G,ᕼ,I,ᒍ,K,ᒪ,ᗰ,ᑎ,O,ᑭ,ᑫ,ᖇ,ᔕ,T,ᑌ,ᐯ,ᗯ,᙭,Y,ᘔ,౹,੨,੩,੫,Ƽ,Ϭ,Դ,੪,੧,੦' ,
           'Script  Italic Font':'𝒜,𝐵,𝒞,𝒟,𝐸,𝐹,𝒢,𝐻,𝐼,𝒥,𝒦,𝐿,𝑀,𝒩,𝒪,𝒫,𝒬,𝑅,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,𝑒,𝒻,𝑔,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,𝑜,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0' ,
           'Fancy Asthetic Font':"Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,Ꭿ,Ᏸ,Ꮸ,Ꭰ,Ꭼ,Ꮀ,Ꮆ,Ꮋ,Ꭸ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꮎ,Ꮲ,Ꮕ,Ꮢ,Ꮥ,Ꮏ,Ꮼ,Ꮙ,Ꮿ,Ꮂ,Ꮍ,Ꮓ,1,2,3,4,5,6,7,8,9,0" ,
           'Monospace Font':'𝙰,𝙱,𝙲,𝙳,𝙴,𝙵,𝙶,𝙷,𝙸,𝙹,𝙺,𝙻,𝙼,𝙽,𝙾,𝙿,𝚀,𝚁,𝚂,𝚃,𝚄,𝚅,𝚆,𝚇,𝚈,𝚉,𝚊,𝚋,𝚌,𝚍,𝚎,𝚏,𝚐,𝚑,𝚒,𝚓,𝚔,𝚕,𝚖,𝚗,𝚘,𝚙,𝚚,𝚛,𝚜,𝚝,𝚞,𝚟,𝚠,𝚡,𝚢,𝚣,1,2,3,4,5,6,7,8,9,0' ,
           'Mathematical Fraktur Font':"𝔄,𝔅,ℭ,𝔇,𝔈,𝔉,𝔊,ℌ,ℑ,𝔍,𝔎,𝔏,𝔐,𝔑,𝔒,𝔓,𝔔,ℜ,𝔖,𝔗,𝔘,𝔙,𝔚,𝔛,𝔜,ℨ,𝔞,𝔟,𝔠,𝔡,𝔢,𝔣,𝔤,𝔥,𝔦,𝔧,𝔨,𝔩,𝔪,𝔫,𝔬,𝔭,𝔮,𝔯,𝔰,𝔱,𝔲,𝔳,𝔴,𝔵,𝔶,𝔷,1,2,3,4,5,6,7,8,9,0",
           'Fairytale Font':'Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,Ꮧ,Ᏸ,ፈ,Ꮄ,Ꮛ,Ꭶ,Ꮆ,Ꮒ,Ꭵ,Ꮰ,Ꮶ,Ꮭ,Ꮇ,Ꮑ,Ꭷ,Ꭾ,Ꭴ,Ꮢ,Ꮥ,Ꮦ,Ꮼ,Ꮙ,Ꮗ,ጀ,Ꭹ,ፚ,1,2,3,4,5,6,7,8,9,0',
           'Yatagan Font':'ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,ค,๖,¢,໓,ē,f,ງ,h,¡,ว,k,l,๓,ຖ,໐,p,๑,r,Ş,t,น,ง,ຟ,x,ฯ,ຊ,1,2,3,4,5,6,7,8,9,0',
           'Script Bold Italic Reverse':'𝓐,𝓑,𝓒,𝓓,𝓔,𝓕,𝓖,𝓗,𝓘,𝓙,𝓚,𝓛,𝓜,𝓝,𝓞,𝓟,𝓠,𝓡,𝓢,𝓣,𝓤,𝓥,𝓦,𝓧,𝓨,𝓩,𝓪,𝓫,𝓬,𝓭,𝓮,𝓯,𝓰,𝓱,𝓲,𝓳,𝓴,𝓵,𝓶,𝓷,𝓸,𝓹,𝓺,𝓻,𝓼,𝓽,𝓾,𝓿,𝔀,𝔁,𝔂,𝔃,1,2,3,4,5,6,7,8,9,0',
           'Fancy Ancient  2 Font':'ꋫ,ꃲ,ꉓ,ꃸ,ꑾ,ꄘ,ꁅ,ꃄ,꒐,꒑,ꀗ,꒒,ꂵ,ꁹ,ꄱ,ꉣ,ꋟ,ꋪ,ꇘ,꓅,ꌇ,꒦,ꅏ,ꋋ,ꌥ,꒗,ꋫ,ꃲ,ꉓ,ꃸ,ꑾ,ꄘ,ꁅ,ꃄ,꒐,꒑,ꀗ,꒒,ꂵ,ꁹ,ꄱ,ꉣ,ꋟ,ꋪ,ꇘ,꓅,ꌇ,꒦,ꅏ,ꋋ,ꌥ,꒗,1,2,3,4,5,6,7,8,9,0',
           'Fancy Script Italic Gem':'𝒜,ℬ,𝒞,𝒟,ℰ,ℱ,𝒢,ℋ,ℐ,𝒥,𝒦,ℒ,ℳ,𝒩,𝒪,𝒫,𝒬,ℛ,𝒮,𝒯,𝒰,𝒱,𝒲,𝒳,𝒴,𝒵,𝒶,𝒷,𝒸,𝒹,ℯ,𝒻,ℊ,𝒽,𝒾,𝒿,𝓀,𝓁,𝓂,𝓃,ℴ,𝓅,𝓆,𝓇,𝓈,𝓉,𝓊,𝓋,𝓌,𝓍,𝓎,𝓏,1,2,3,4,5,6,7,8,9,0',
           'Wizard Font':' ǟ,ɮ,ƈ,ɖ,ɛ,ʄ,ɢ,ɦ,ɨ,ʝ,ӄ,ʟ,ʍ,ռ,օ,ք,զ,ʀ,ֆ,ȶ,ʊ,ʋ,ա,Ӽ,ʏ,ʐ,ǟ,ɮ,ƈ,ɖ,ɛ,ʄ,ɢ,ɦ,ɨ,ʝ,ӄ,ʟ,ʍ,ռ,օ,ք,զ,ʀ,ֆ,ȶ,ʊ,ʋ,ա,Ӽ,ʏ,ʐ,1,2,3,4,5,6,7,8,9,0',
           'Lefthanded Fancy Font':' α,ɓ,૮,∂,ε,ƒ,ɠ,ɦ,เ,ʝ,ҡ,ℓ,ɱ,ɳ,σ,ρ,φ,૨,ร,ƭ,µ,ѵ,ω,א,ყ,ƶ,α,ɓ,૮,∂,ε,ƒ,ɠ,ɦ,เ,ʝ,ҡ,ℓ,ɱ,ɳ,σ,ρ,φ,૨,ร,ƭ,µ,ѵ,ω,א,ყ,ƶ,1,2,3,4,5,6,7,8,9,0',
           'Japanese Font':'卂,乃,匚,ᗪ,乇,千,Ꮆ,卄,丨,ﾌ,Ҝ,ㄥ,爪,几,ㄖ,卩,Ɋ,尺,丂,ㄒ,ㄩ,ᐯ,山,乂,ㄚ,乙,卂,乃,匚,ᗪ,乇,千,Ꮆ,卄,丨,ﾌ,Ҝ,ㄥ,爪,几,ㄖ,卩,Ɋ,尺,丂,ㄒ,ㄩ,ᐯ,山,乂,ㄚ,乙,˦,Ϩ,Յ,Ϥ,Ƽ,δ,𐒇,ϐ,ƍ,θ', 
           'Faux Ethiopian Font':'ል,ጌ,ር,ዕ,ቿ,ቻ,ኗ,ዘ,ጎ,ጋ,ጕ,ረ,ጠ,ክ,ዐ,የ,ዒ,ዪ,ነ,ፕ,ሁ,ሀ,ሠ,ሸ,ሃ,ጊ,ል,ጌ,ር,ዕ,ቿ,ቻ,ኗ,ዘ,ጎ,ጋ,ጕ,ረ,ጠ,ክ,ዐ,የ,ዒ,ዪ,ነ,ፕ,ሁ,ሀ,ሠ,ሸ,ሃ,ጊ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
           'Yoda Font ':'ล,в,¢,∂,э,ƒ,φ,ђ,เ,נ,к,ℓ,м,и,๏,ק,ợ,я,ร,†,µ,√,ω,җ,ý,ž,ล,в,¢,∂,э,ƒ,φ,ђ,เ,נ,к,ℓ,м,и,๏,ק,ợ,я,ร,†,µ,√,ω,җ,ý,ž,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
           'Hieroglyphs Font': 'Թ,Յ,Շ,Ժ,ȝ,Բ,Գ,ɧ,ɿ,ʝ,ƙ,ʅ,ʍ,Ռ,Ծ,ρ,φ,Ր,Տ,Ե,Մ,ע,ա,Ճ,Վ,Հ,Թ,Յ,Շ,Ժ,ȝ,Բ,Գ,ɧ,ɿ,ʝ,ƙ,ʅ,ʍ,Ռ,Ծ,ρ,φ,Ր,Տ,Ե,Մ,ע,ա,Ճ,Վ,Հ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
           'Ancient Glyph Font': '𐌀,𐌁,𐌂,𐌃,𐌄,𐌅,Ᏽ,𐋅,𐌉,Ꮭ,𐌊,𐌋,𐌌,𐌍,Ꝋ,𐌐,𐌒,𐌓,𐌔,𐌕,𐌵,ᕓ,Ꮤ,𐋄,𐌙,Ɀ,𐌀,𐌁,𐌂,𐌃,𐌄,𐌅,Ᏽ,𐋅,𐌉,Ꮭ,𐌊,𐌋,𐌌,𐌍,Ꝋ,𐌐,𐌒,𐌓,𐌔,𐌕,𐌵,ᕓ,Ꮤ,𐋄,𐌙,Ɀ,ᛑ,ᘖ,ᙣ,ᔦ,ᔕ,ᑳ,ᒣ,ზ,ᖗ,Ꝋ',
           'Join Writing Font ':'ą,ც,ƈ,ɖ,ɛ,ʄ,ɠ,ɧ,ı,ʝ,ƙ,Ɩ,ɱ,ŋ,ơ,℘,զ,ཞ,ʂ,ɬ,ų,۷,ῳ,ҳ,ყ,ʑ,ą,ც,ƈ,ɖ,ɛ,ʄ,ɠ,ɧ,ı,ʝ,ƙ,Ɩ,ɱ,ŋ,ơ,℘,զ,ཞ,ʂ,ɬ,ų,۷,ῳ,ҳ,ყ,ʑ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
           'Stylish Gem Font': '𐌰,𐌱,ζ,Ɗ,𐌴,𐍆,𐌾,𐌷,𐍊,ʝ,𐌺,𐌋,ꡕ,𐍀,𐍈,Ƥ,ɋ,𐍂,Ⲋ,𐨠,𐍁,ⱱ,𐐎,𑀌,𐌸,Ꙁ,𐌰,𐌱,ζ,Ɗ,𐌴,𐍆,𐌾,𐌷,𐍊,ʝ,𐌺,𐌋,ꡕ,𐍀,𐍈,Ƥ,ɋ,𐍂,Ⲋ,𐨠,𐍁,ⱱ,𐐎,𑀌,𐌸,Ꙁ,⥑,ջ,ჳ,ʮ,ҕ,ϭ,⁊,ზ,𝚐,○',
              
            // Add more fonts here
        };


        for (const fontName in fonts) {

            const outputBox = createOutputBox(fontName, outputContainers[0]);
            const mFontChars = generateFontMapping(fonts[fontName]);
            let convertedText = '';
            let newdefulttext=capitalizeWords(defaultText);

            if (inputTextValue === defaultText || inputTextValue === newdefulttext) {

                switch (fontName) {

                    case 'Fancy Script Italic':  
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

                case  'Fancy Script Italic Gem':            //  for wrraping every word with emoji 
                  outputBox.style.fontFamily = fontName + ', sans-serif';
                  convertedText=surroundWordsWith(convertedText,"❀")
                  outputBox.textContent = convertedText;
                break;

                case  'Curvy Font':            // Script Bold Italic Reverse for wrraping every word with emoji 
                  outputBox.style.fontFamily = fontName + ', sans-serif';
                  convertedText=surroundWordsWith(convertedText,"🌸")
                  outputBox.textContent = convertedText;
                break;
                
                case  'Fairytale Font': 
                 outputBox.style.fontFamily = fontName + ', sans-serif';
                 convertedText =insertEmojiBetweenChars(convertedText, "🖤") 
                 outputBox.textContent =convertedText;
                break;

                case  'Script Bold Italic Reverse': 
                 outputBox.style.fontFamily = fontName + ', sans-serif';
                 convertedText =reverseText(convertedText) 
                 outputBox.textContent =convertedText;
                break;
               
                default:
                    outputBox.style.fontFamily = fontName + ', sans-serif';
                    outputBox.textContent = convertedText;
                
             
            }
          
            

        }

       
            

        index--;
        addSignsToOutput('','')
        // addSignsToOutput('Fraktur Bold Font  or  Blackboard Bold','','') //    gns to specific font output
           
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
            }, 7000);
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
