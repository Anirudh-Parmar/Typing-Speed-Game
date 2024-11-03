# This is a Typing Speed Game
Its a game which can help you find out how fast can you type.
This UI friendly game is built on top of basic Html, css and js.

## My learning's 
whenever you build a project of anytype, you must have a step-by-step outline to help you get started.
here is my step by step outline :
1. basic structure (html,css,js setup)
2. Display a Random Sentence
3. Timer Logic
4. Check User Input
5. Track Progress and Accuracy
6. Restart Option

So as i begin step 1 and 2 were easy for me to figure out and do it. Real thinking started on step 3 : timer logic which involved the first step, Add a timer that starts when the user begins typing and stops when they finish typing. So what i thought was if i have some value in the input box thats when the user begins typing and with some if else i thought i figured it out , but no i tried multiple times but the timer was just not working , i realised its not the value in the input box that identifies that the user begins typing it just identifies that there is some value but no indication of user acutally typing so i did a google search and came across a website which showcased how to check if user is typing or not . I leant we need to use event listener "keypress" and "keyup" on the input box to know when user types. I got the code , i understood it and then copied it to vscode I also learnt that you can initialize a variable in js without specifically mentions its datatype , you can define it later i learnt when to initialize like this : if the variable will track the state of your app or To manage asynchronous tasks such as API calls where timing matters, understood the use of setTimeout to show a message all done typing after a sec of user stops typing.Doing this gives me the user status but the real work was to get the timer started . So for that i initialized a variable just like the code for finding user status.  I tried using setInterval ,  initialized seconds outside the function and tried to add 1 every interval of 1 sec and display the time but it seem to crashing all the time , the clock seems to start after typing 3-4 words (late), as i type fast/ more words the clock goes totally insane multiple time intervals running, clock doesn't pause when i'm not typing.
So the clock kept on messing around , i thought of this issue why , what and how is this happening then i came to realize that the logic was right but i was trying to mix up sec and min , after taking some action steps from gpt i created a variable globally to track the total time elapsed and incremented by 1 on each 1 sec interval and when displaying time i convert those numbers to min and seconds.
Again another issue persist clock not working , the issue: Start the Timer Only Once on Typing , Start clock only the first time the user types (e.g., on keydown or the first keypress). Avoid resetting it with each key press. Very imp check start the timer only when the user types that too only for once so it doesn't resets with each key press causing mutiple instances of time had to do a if check : if clock isn't already running then start the clock else don't plus some add ons that when user stops typing set the clock to null so it restarts properly if typing resumes. Still the clock doesn't runs until end so i left it there to handle it later and moved onto the next step.
Step 4 check user input how to do it , i tried the normal way took the orginal sentance and looped over it and check if original sentance[i] === input.value and if that happens color the input.value to green else red this didn't worked although i was on the right track i tried different times but the result was the same not working so i went to gpt and conveyed the problem there came to know that i need to use event listener "input" on the input box why ? because an input event listener allows you to check each change incrementally, making the code cleaner, more efficient, and responsive to the user’s real-time typing and then the logic was just same but even there i was messing up some stuff like iterate over originalSentance.length instead of typedText.length why? because typedtext.length will give us current user input value and check it straight with the ogSentance but if i try to do the opposite what i'll be doing is checking ogSentace againt typedText which is yet not typed fulled or completed basically something which doesn't exist which will not let the code work we can conclude that Iterating over typedText.length instead of originalSentance.length allows us to check only the characters the user has typed so far, next mistake ogSent[i] againt overall typed text , typedtext[i] against ogSent[i] ans : ogSent[i] === typedtext[i] each word should match, why use userinput but not typedtext to change the color of  Ans : Using userInput to change the color directly targets the HTML input field where the user types, making it straightforward to apply styling (like color) to the entire text within the input box ans something i didn't thought of because i havent tested yet If user deletes characters, reset color back to default so just used a if check if user.lenght === 0 then user.style.color = black. finally the user check step is completed
Now second last step Track progress and accuracy : check no. of correct words and incorrect words . easy just initialize correct and incorrect words variable with 0 and if typedtext and ogsent match then incremenet correct by 1 else increment wrong by 1  and display correct words and incorrect words. Time to add the main feature WPM but before that gotta fix some previous errors like in timer : initialized 2 more variables isTyping = false (state management) and wordstyped = 0 for wpm .  added istyping in func. where the user begins typing where istyping = true and when user stops typing all that code will run only when istyping = false , and boom just adding this state management the timer started to work perfectly fine the issue was Original Code:
User types 'H'   → Timer starts → User releases key → Timer stops  ❌
User types 'e'   → Timer starts → User releases key → Timer stops  ❌
User types 'l'   → Timer starts → User releases key → Timer stops  ❌
(Timer keeps resetting)

Fixed Code with isTyping:
User types 'H'   → isTyping = true → Timer starts     ✅
User types 'e'   → Timer continues                    ✅
User types 'l'   → Timer continues                    ✅
[1 second pause] → Timer stops, isTyping = false      ✅
(Timer runs continuously until actual pause in typing)
isTyping acts as a state manager - it tells us if we're currently in a typing session

Not exactly. Let me explain how the `if (isTyping)` condition works:

```javascript
// When you start typing:
function handleUserTyping(e) {
    if (!clock) {
        clock = setInterval(() => {
            timepassed += 1;
            displayTimer.innerHTML = `Time: ${formatTime(timepassed)}`;
        }, 1000);
        isTyping = true;  // 👈 Here isTyping is set to TRUE when typing starts
    }
}

// When you stop typing:
function handleUserStopsTyping(e) {
    if (isTyping) {       // 👈 This means "if isTyping is TRUE"
        timer = setTimeout(() => {
            Status.innerHTML = 'All done typing!';
            calculateWPM();
            clearInterval(clock);
            clock = null;
            isTyping = false;  // 👈 Only set to FALSE after the 1-second delay
        }, 1000);
    }
}
```

Let's break it down step by step:

1. When you START typing:
   - `isTyping` becomes `true`
   - Timer starts running

2. When you PAUSE typing:
   - If `isTyping` is `true` (meaning we were just typing)
   - Wait 1 second
   - If no more typing happens in that 1 second:
     - Show "All done typing"
     - Calculate WPM
     - Stop the timer
     - Set `isTyping` to `false`

3. If you start typing again within that 1 second:
   - The timeout is cleared (by `clearTimeout(timer)` in handleUserTyping)
   - Timer continues running
   - `isTyping` stays `true`

So `if (isTyping)` means:
- "Only run this code if we are currently in an active typing session"
- NOT "only run if we're not typing"

Visual Timeline:
```
Start typing "Hello"
│
├─► isTyping = true
│   Timer starts
│
Stop typing for 0.5 seconds
│
├─► isTyping is still true
│   Timer still running
│
Start typing again
│
├─► isTyping still true
│   Timer continues
│
Stop typing for 1+ second
│
├─► After 1 second:
    ├─► Show "All done"
    ├─► Calculate WPM
    ├─► Stop timer
    └─► isTyping = false
```

This prevents the timer from stopping and starting with every keypress, making it work more like a real typing test timer.

Now , as correct and incorrect words are global variables i now create a function calculate WPM to calculate wpm and diplay correct , incorrect words and wpm all at once for that just got the wordstyped by user.value.trim().split(" ").length and acc to the formula for wpm = words typed / timepassed * 60 so thats exactly i did const wpm = wordstyped / timepassed (a global variable) * 60 and display it all. Final step 6 reset btn , so created a button and got it in js and added event listener click to it which on click , resets everything all the states and initialized values back to zero or false , empty the userinput.value and set the color back to black , clear the interval of clock , clearTimeout of timer , set the clock to null , timer to null, display time back to 0 sec ,  status and result to empty string , call a new sentance .
This concludes my project and all the learnings i've had from building this.

Let me extract the key learning points from your typing speed game project experience.



Key Learnings from my Typing Speed Game Project:

1. Project Planning
   - Having a step-by-step outline is crucial before starting any project
   - Breaking down complex features into smaller, manageable tasks helps with implementation

2. Event Handling
   - `keypress` and `keyup` events are needed to accurately detect user typing
   - The `input` event listener is better for checking text changes incrementally
   - Different events serve different purposes and choosing the right one is important

3. State Management
   - Using state variables (like `isTyping`) helps manage application behavior
   - Initialize variables globally when they need to track app state or manage timing
   - State management prevents issues like multiple timer instances

4. Timer Implementation
   - `setInterval` needs careful handling to avoid multiple instances
   - Converting raw seconds to minutes/seconds format requires separate logic
   - Timer should only start once when typing begins, not reset with each keypress

5. String Comparison
   - When comparing typed text with original text:
   - Iterate over the typed text length, not the original text length
   - Compare characters one by one for accurate matching
   - Reset styling when user deletes characters

6. Performance & Logic Flow
   - State management is crucial for managing asynchronous operations
   - Use `setTimeout` for delayed actions (like showing "done typing" message)
   - Clear intervals and timeouts when resetting to prevent memory leaks

7. Variables and Initialization
   - Variables can be initialized without specifying data type in JavaScript
   - Global variables are useful for tracking overall application state
   - Proper initialization and reset of variables is crucial for app reliability

8. Debugging Approach
   - When features don't work, break down the problem step by step
   - Google and external resources can help solve specific implementation challenges
   - Testing edge cases (like text deletion) is important

 
