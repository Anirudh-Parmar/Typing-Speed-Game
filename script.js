const userInput = document.querySelector('#typed-text');
const displayTimer = document.querySelector('#timer');
const targetText = document.querySelector('#target-text');
const raceStartBtn = document.querySelector('#start-btn');
const displayGameResult = document.querySelector('.displayResult')
const Status = document.querySelector('.status')
const ResetBtn = document.querySelector('.reset')

ResetBtn.addEventListener('click',()=>{
  correctWords = 0;
  wrongWords = 0;
  timepassed = 0;
  wordsTyped = 0;
  isTyping = false;

  userInput.value = ''
  userInput.style.color = 'black';

  clearInterval(clock);
  clearTimeout(timer);
  clock = null;
  timer = null;

  displayTimer.innerHTML = 'Time: 0:00';

  Status.innerHTML = '';
  displayGameResult.textContent = '';

  sentNum = Math.floor(Math.random() * sentances.length);
  targetText.textContent = sentances[sentNum];
})

const sentances = ['The bathroom is in the main house and the owners of the sink are embarrassed. Of course, Baltimores money stays in Ohio',
    'I live in a one story, so I will just bite a can of peas. I dont have my own phone, so I will just watch the news. I forgot my flashdrive, so I will just read a phone-book. I want a pie, so I will sleep outside tonight.',
    'I want a rubber-band, because Frank went to the store today. I lost my toe watch, so I will just eat a sauce car.']

    let sentNum= Math.floor(Math.random()*sentances.length)
    
    // initialised timer
    let timer;
    let clock;
    let timepassed = 0;
    let wordsTyped = 0;
    let isTyping = false;
    
    targetText.textContent = sentances[sentNum]
    
    userInput.addEventListener('keypress', handleUserTyping)
    userInput.addEventListener('keyup',handleUserStopsTyping)
    
  

    function handleUserTyping(e){
      
      if (!clock) {
        clock = setInterval(() => {
          timepassed += 1;
          displayTimer.innerHTML = `Time: ${Math.floor(timepassed / 60)}:${timepassed % 60}s`;
        }, 1000);
        isTyping = true;
        
      } 
      
      Status.innerHTML = 'Typing';
      clearTimeout(timer)
    }

    function handleUserStopsTyping(e){
      if (isTyping) {
        timer = setTimeout(() => {
            Status.innerHTML = 'All done typing!';
            calculateWPM();
            clearInterval(clock);
            clock = null;
            isTyping = false;
        }, 1000);
    }
    }

      //Calculate typing speed in words per minute (WPM) and display progresss and accuracy

      function calculateWPM(){
      wordsTyped = userInput.value.trim().split(" ").length

      const WPM = Math.round((wordsTyped/timepassed) * 60 )

      displayGameResult.textContent = `Correctly typed words: ${correctWords} |
  Incorrectly typed words: ${wrongWords} |
  Typing Speed: ${WPM} WPM`;

      }

    // check user input

    
    userInput.addEventListener('input',checkUserInput)


      //Track Progress and Accuracy
      //Track how many characters the user typed correctly vs. incorrectly.
    let correctWords = 0;
    let wrongWords = 0;
    
    function checkUserInput(e){
      let originalSentance = sentances[sentNum]
      let typedText = e.target.value

      correctWords = 0;
      wrongWords = 0; 
    
        
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
      }








  
