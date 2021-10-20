var timerValue = 31;
var selectedAnswer = false;
var typeHelp = {
    PORTAL: 1,
    TWITTER: 2,
    CALL: 3
};
var requestQuestion = false;

let lblHeaderQuestion = document.querySelector(".question-box #lblHeaderQuestion");
let TextAns = document.querySelector(".question-box #TextAns");
let respuestas = document.querySelector(".question-box .answers");

let NRespuestas = 0;
let sizeAnswersCorrect;
const sizeQuestiontotal = 25;
let timer;
// let sizeAnswerIncorrect = sizeQuestionGame - sizeAnswersCorrect;
let listAnswers = document.querySelector(".question-box .answers");

let stars = new Array(sizeQuestiontotal);
let htmlStar = new Array();
let starsFooter = document.getElementsByClassName("stars-footer")[0];
var indices = [];
let i = 0;

const quiz = [{
    question: "Indique que aspecto(s) se debe tener en cuenta antes de realizar una inversión:",
    answers: [{
        letter: "A",
        option: "Realice la inversión en una entidad que no esté vigilada, esto le asegurará un mayor rendimiento",
        answer: 0
      },
      {
        letter: "B",
        option: "Evalué los riesgos, tenga en cuenta el plazo de la inversión y establezca con anterioridad los gastos, comisiones e impuestos.",
        answer: 1
      },
      {
        letter: "C",
        option: "Nunca tenga en cuenta los riesgos de la inversión, recuerde que estas se presentarán con el paso del tiempo.",
        answer: 0
      },
      {
        letter: "D",
        option: "Una vez efectué la inversión tome un tiempo para revisar los prospectos y contratos que ha firmado.",
        answer: 0
      },
    ]
  },
  {
    question: "Al tomar un crédito o préstamo la persona deberá:",
    answers: [{
        letter: "A",
        option: "Esperar que la entidad se comunique para informarle el valor a pagar",
        answer: 0
      },
      {
        letter: "B",
        option: "Dejar pasar el tiempo para que a la entidad se le olvide ese préstamo",
        answer: 0
      },
      {
        letter: "C",
        option: "Irse del país para que no le sea cobrado el dinero",
        answer: 0
      },
      {
        letter: "D",
        option: "Tener en cuenta las fechas en las cuáles debe pagar el dinero que le fue prestado con la respectiva tasa de interés",
        answer: 1
      },
    ]
  },
  {
    question: "¿Qué es un interés de mora?",
    answers: [{
        letter: "A",
        option: "Es una aplicación móvil para registrar las diferentes deudas que se posee",
        answer: 0
      },
      {
        letter: "B",
        option: "Es el valor que debe ser asumido por incumplir el pago de una obligación",
        answer: 1
      },
      {
        letter: "C",
        option: "Es donde existe una reinversión periódica de los intereses",
        answer: 0
      },
      {
        letter: "D",
        option: "Es la tasa que establece una entidad financiera por el dinero que presta",
        answer: 0
      },
    ]
  },
  {
    question: "Si recibe un correo electrónico de su entidad financiera con un link adjunto:",
    answers: [{
        letter: "A",
        option: "Haga click en el link adjunto e ingrese con su usuario y clave",
        answer: 0
      },
      {
        letter: "B",
        option: "Guarde el correo como contacto favorito para que lo identifique en su correo",
        answer: 0
      },
      {
        letter: "C",
        option: "No haga click en el link adjunto y elimine de inmediato el mensaje",
        answer: 1
      },
      {
        letter: "D",
        option: "Guarde el correo y lealo más tarde.",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué es el grado de endeudamiento?",
    answers: [{
        letter: "A",
        option: "Es el valor del que debes disponer para poder invertir en una acción.",
        answer: 0
      },
      {
        letter: "B",
        option: "Es la cantidad de dinero que debes tener para tus gastos diarios",
        answer: 1
      },
      {
        letter: "C",
        option: "Es un curso que se debe aprobar en la Universidad",
        answer: 0
      },
      {
        letter: "D",
        option: "Es el porcentaje que dispone una persona para poder asumir la deuda o préstamo de acuerdo a los ingresos actuales.",
        answer: 0
      },
    ]
  },
];



function templateAnswers(answer) {
    return `
        <li id="idAnswerLabel" class="lblAnswerClass">
            <a href="javascript:void(0)">
                <span id="letterAns">${answer.letter}</span>
                <span id="TextAns">${answer.option}</span>
            </a>
        </li>
    `
}

function templateQuestion(question) {
    return `
      <div class="question"><span id="lblHeaderQuestion">${question.question}</span></div>
    `
} 

// function templateStars() {
//   return `
//     <span>
//       <img src="images/star-01.svg">
//     </span>
//   `
// }

let CurrentQuestion = -1;
let dataAnswers;
let dataQuestion;
let score = 0;

let defaultScore = 0;
// let sizeQuestionGame = 0; 




temporizador();

let answerT = 0;
let question = 0;
// while (question <= sizeQuestiontotal){
//   question++; 

//   if (question = 0){
//     Next();
//   }
//   // console.log(question);

// }


// timer = setTimeout('temporizador()', 1000);
function temporizador() {
  
    $(document).ready(function () {
        if (timerValue != 0 && !selectedAnswer) {
            timerValue --;
            // console.log(timerValue);
            // CurrentQuiz();
            if (timerValue > 9) {
                $("#lblTimer").text(timerValue);
            }
            else {
                $("#lblTimer").text("0" + timerValue);
            }
            timer = setTimeout("temporizador()", 1000);
            if(timerValue == 0){

              timerValue = 31;
              Next();
              
            }
        }
       
    });
}

Next();
RenderStars();

function Next() {
  // location.reload();
  
  CurrentQuestion++;
  // starsFooter();
  // console.log(CurrentQuestion);
  dataAnswers = quiz[CurrentQuestion].answers;
  respuestas.innerHTML = `${dataAnswers.map(templateAnswers).join("")}`;
  dataQuestion = quiz[CurrentQuestion].question;
  lblHeaderQuestion.innerHTML = dataQuestion;

  indexAnswer(CurrentQuestion);

  // if (timerValue == 0) {
  //   // NextQuestion();
  //    Next()

  //    timer = setTimeout('temporizador()', 1000);
  //    if (timerValue != 0 && !selectedAnswer) {
  //     timerValue--;
  //     if (timerValue > 9) {
  //       $("#lblTimer").text(timerValue);
  //     }
  //     else {
  //         $("#lblTimer").text("0" + timerValue);
  //     }
  //     timer = setTimeout("temporizador()", 1000);
  //    }
  // }
}

let timerAnswer = 5; 
function indexAnswer(indexFull) {

    console.log(quiz[indexFull].answers)
    // let AnswerClass = document.querySelector(".lblAnswerClass");
    // AnswerClass.forEach(element => {
    // element.addEventListener("click", function( event ) {
    // //  let valueAns = quiz[idAnswerLabel].answers.answer;
    //   console.log("clic");
  let selectAns;
    $( ".lblAnswerClass" ).each(function(index) {
      $(this).on("click", function(e) {
        $(this).addClass('select');
        selectAns = this;
        setTimeout(function () {
          if(quiz[indexFull].answers[index].answer === 1) {
            console.log(this)
            $(selectAns).addClass('correct');
            setTimeout(function () {
              userAnswer(1)
              timerValue = 30;
              Next();
              
            }, 2500)
          }
          else {
            console.log(this)
            $(selectAns).addClass('wrong');
            setTimeout(function () {
              // userAnswer(1)
              timerValue = 30;
              Next();

            }, 2500)
          }

          
        }, 2500)
      });
    });
}

  
function userAnswer(Ans) {
  if(Ans === 1) {

    score = score + 1;
    fillStar();
  }
  else {
    score = score + 0;
  }
}

function RenderStars() {
  for(let i = 0; i <= stars.length; i++) {
    htmlStar.push("<span><img src='images/star-01.svg'></span>")
    starsFooter.innerHTML = htmlStar.join('');
  }
}

function fillStar() {
  var element = "<span><img src='images/star-01.svg'></span>";

  var idx = htmlStar.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = htmlStar.indexOf(element, idx + 1);
  }
  console.log(htmlStar)

  let posicion = indices[0 + i];
  
  if(htmlStar[posicion] === "<span><img src='images/star-01.svg'></span>") {
  	htmlStar[posicion] = "<span><img src='images/star-02.svg'></span>";
    console.log(htmlStar);
    i++;
    starsFooter.innerHTML = htmlStar.join('');
  }
  
  /* switch(htmlStar[posicion]) {
    case '0':
      htmlStar[posicion] = '1';
      
      console.log(htmlStar);
      i++;
      starsFooter.innerHTML = htmlStar.join('');
      htmlStar[posicion + 1];
      break;
     case '1':
       i++;
      console.log(htmlStar);
      break;
  }
   */
  console.log(i);
  console.log(htmlStar.length);
}

// function addStars() {
    

//     var element = "<span><img src='images/star-01.svg'></span>";

//     var idx = htmlStar.indexOf(element);
    
//     while (idx != -1) {
//       console.log(" el indice es" + idx);
//       console.log("hola")
//       indices.push(idx);
//       idx = htmlStar.indexOf(element, idx + 1);
//     }
//     console.log("los indices son" + indices[0])
//     let posicion = indices[0];

//     htmlStar[posicion] = '<span><img src="images/star-02.svg"></span>';
//     starsFooter.innerHTML = htmlStar.join('');
//     console.log(htmlStar);


//     // console.log(n)
//     //   if(htmlStar.indexOf(n) === $('.answer > .emptyStar').hasClass("emptyStar")) {
//     //     htmlStar[n] = "<img class='FillStar' src='images/star-02.svg'>"
//     //   }
//   // $('.stars-footer > span').each(function(e) {
//   //   if(htmlStar[e] === $(this).hasClass("0")) {
//   //     console.log(htmlStar[e])
//   //   }
//   //   // if() {
//   //   //   // console.log()
      
//   //   //   // $(this).replaceWith("<img class='emptyStar' src='images/star-02.svg'>");
//   //   //   // $(starsFooter).removeClass("0").addClass("1");

//   //   // }
//   // })
// }
