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
    
    // initialised timer
    let timer;
    let clock;
    let timepassed = 0;
    
    targetText.textContent = sentances[sentNum]
    
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
    
    function checkUserInput(e){
      let originalSentance = sentances[sentNum]
      let typedText = e.target.value
      let correctWords = 0;
      let wrongWords = 0;
      //Track Progress and Accuracy
      //Track how many characters the user typed correctly vs. incorrectly.
        
        for (let i = 0; i < typedText.length; i++) {
  
          if (typedText[i] === originalSentance[i]) {
            userInput.style.color = 'green';
            correctWords +=1
          }else{
            userInput.style.color = 'red';
            wrongWords +=1
          }
        }
        
       

         if (typedText.length === 0) {
         userInput.style.color = 'black';
         }
         displayGameResult.textContent = `
         Correctly typed words: ${correctWords}
         Incorrectly typed words: ${wrongWords}
         WPM: ${}
         `
      }

      //Calculate typing speed in words per minute (WPM).







  
