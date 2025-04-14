document.addEventListener('DOMContentLoaded', ()=>{

    const startBtn= document.getElementById("start-btn");
    const nextBtn= document.getElementById("next-btn");
    const restartBtn= document.getElementById("restart-btn");
    const questionContainer= document.getElementById("question-container");
    const questionText= document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay= document.getElementById("score");

    const questions = [
        {
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
          marks:1,
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
          marks:2,
        },
        {
          question: "Who wrote 'To Kill a Mockingbird'?",
          choices: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"],
          answer: "Harper Lee",
          marks:3,
        },
        // {
        //   question: "What is the largest ocean on Earth?",
        //   choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        //   answer: "Pacific Ocean",
        //   marks:3,
        // },
        // {
        //   question: "Which element has the chemical symbol 'O'?",
        //   choices: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        //   answer: "Oxygen",
        //   marks:4,
        // },
        // {
        //   question: "What year did World War II end?",
        //   choices: ["1945", "1918", "1939", "1965"],
        //   answer: "1945",
        //   marks:5,
        // },
      ];

      let currentQuestionIndex =0;
      let score = 0;
      let total = 0;

       startBtn.addEventListener('click', startQuiz)

       nextBtn.addEventListener('click',()=>{
            currentQuestionIndex++;
            if(currentQuestionIndex< questions.length){
                showQuestion();
            }else{
                showResult();
            }
       })

       restartBtn.addEventListener('click', ()=>{
        currentQuestionIndex =0;
        score=0;
        total=0;
        resultContainer.classList.add("hidden");
        startQuiz()
       })

       function  startQuiz(){
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();

       }

       

       function showQuestion(){
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = ""
        questions[currentQuestionIndex].choices.forEach(choice =>{
            const li = document.createElement('li')
            li.textContent = choice
            li.addEventListener('click', () => selectAnswer(choice));
            li.classList.add('choice-item');
            choicesList.appendChild(li);
        })
       }

       function selectAnswer(choice){
            const correctAnswer = questions[currentQuestionIndex].answer;
            if(choice === correctAnswer){
                score = score + questions[currentQuestionIndex].marks;
            }
            nextBtn.classList.remove('hidden');

            const listItems = choicesList.querySelectorAll('li');
            
            listItems.forEach(li => {
            li.style.pointerEvents = 'none'; // Disable further clicks
            
            if (li.textContent === correctAnswer) {
                li.classList.add('correct');
            } else if (li.textContent === choice) {
                li.classList.add('wrong');
            }
        });
       }
       function totalmarks(){
          total= questions.reduce((total,question)=> total + question.marks,0);
          return total;
        }

       function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent =` ${score} out of ${totalmarks()}`;
       }
       
})