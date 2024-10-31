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
    userInput.addEventListener('keypress', handleUserTyping)
    userInput.addEventListener('keyup',handleUserStopsTyping)

    function handleUserTyping(e){
      clearInterval(timer)
      Status.innerHTML = 'Typing'
    }

    function handleUserStopsTyping(e){
      clearTimeout(timer)
      timer = setTimeout(() => {
        Status.innerHTML = 'All done typing!'
      }, 1000);
    }


  let correctText = '';
  function typingCheck(){
    let wrongText = '';
     if(userInput.value){
      for (let i = 0; i < sentances[sentNum].length; i++) {
         const originalText = sentances[sentNum]
         const typedText = userInput.value 
         if (originalText[i] === typedText) {
          correctText += typedText
          targetText.style.background = 'green'
        }else{
          wrongText += typedText
          targetText.style.background = 'red'
        }
      }
      }
  }

  typingCheck() ? typingCheck(): typingSpeed()


  function typingSpeed(){
   let score = userInput.value / 5 

   let WPM = score / timePassed

   displayGameResult.textContent = correctText

  }

  
