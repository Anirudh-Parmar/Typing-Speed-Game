const userInput = document.querySelector('#typed-text');
const displayTimer = document.querySelector('#timer');
const targetText = document.querySelector('#target-text');
const raceStartBtn = document.querySelector('#start-btn');
const displayGameResult = document.querySelector('.displayResult')
const Status = document.querySelector('.status')

const sentances = ['The bathroom is in the main house and the owners of the sink are embarrassed. Of course, Baltimores money stays in Ohio',
    'I live in a one story, so I will just bite a can of peas. I dont have my own phone, so I will just watch the news. I forgot my flashdrive, so I will just read a phone-book. I want a pie, so I will sleep outside tonight.',
    'I want a rubber-band, because Frank went to the store today. I lost my toe watch, so I will just eat a sauce car.']

    let sentNum= Math.floor(Math.random()*(2+1))+1
    targetText.textContent = sentances[sentNum]


    


    // initialised timer
    let timer;
    let clock;
    let timepassed = 0;

    userInput.addEventListener('keypress', handleUserTyping)
    userInput.addEventListener('keyup',handleUserStopsTyping)

    function handleUserTyping(e){

      if (!clock) {
        clock = setInterval(() => {
          timepassed += 1;
          displayTimer.innerHTML = `Time: ${Math.floor(timepassed / 60)}:${timepassed % 60}s`;
        }, 1000);
    
        
      } 
      
      Status.innerHTML = 'Typing';
      clearTimeout(timer)
    }

    function handleUserStopsTyping(e){
      clearInterval(clock)
      clock =  null ;

      timer = setTimeout(() => {
        Status.innerHTML = 'All done typing!'
      }, 1000);
    }

    // check user input

    userInput.addEventListener('input',checkUserInput)

    // why not iterate over ogSent.length , why over typedtext.lenght
    //Ans: Iterating over typedText.length instead of originalSentance.length allows us to check only the characters the user has typed so far

    function checkUserInput(e){
      let originalSentance = sentances[sentNum]
      let typedText = e.target.value; 
        
        for (let i = 0; i < typedText.length; i++) {
          // DRY same mistake : ogSent[i] againt overall typed text , typedtext[i] against ogSent[i]
          if (typedText[i] === originalSentance[i]) {
            userInput.style.color = 'green';
            //why use userinput but not typedtext to change the color of
            //Ans : Using userInput to change the color directly targets the HTML input field where the user types, making it straightforward to apply styling (like color) to the entire text within the input box.
          }else{
            userInput.style.color = 'red';
           break;  // Stop checking further characters , if there's a mismatch
           // why bother using break at all
           //Ans: Using break in this context can be helpful to stop further checks once an incorrect character is detected
          }
        }

        //never even thought about this case
         // If user deletes characters, reset color back to default (e.g., black)
         if (typedText.length === 0) {
         userInput.style.color = 'black';
         }

      
      }





  
