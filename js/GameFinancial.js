var timerValue = 31;
var selectedAnswer;
var typeHelp = {
    PORTAL: 1,
    TWITTER: 2,
    CALL: 3
};
var requestQuestion = false;

let stage = document.querySelector("stage04");
let questionBox = document.querySelector(".question-box");
let lblHeaderQuestion = document.querySelector(".question-box #lblHeaderQuestion");
let TextAns = document.querySelector(".question-box #TextAns");
let respuestas = document.querySelector(".question-box .answers");

let NRespuestas = 0;
let sizeAnswersCorrect;
const sizeQuestiontotal = 25;
let timer;
let timerOn = 0;
// let sizeAnswerIncorrect = sizeQuestionGame - sizeAnswersCorrect;
let listAnswers = document.querySelector(".question-box .answers");

let stars = new Array(sizeQuestiontotal);
let htmlStar = new Array();
let starsFooter = document.getElementsByClassName("stars-footer")[0];
var indices = [];
let i = 0;
let randQuestions;

const quiz = [{
    question: "¿Qué beneficio existe al obtener un crédito?",
    answers: [{
        letter: "A",
        option: "Te permite financiar proyectos o comprar bienes para los cuáles no tienes suficiente dinero.",
        answer: 1
      },
      {
        letter: "B",
        option: "Serás más querido en las entidades financieras.",
        answer: 0
      },
      {
        letter: "C",
        option: "Te da estatus en tu círculo social",
        answer: 0
      },
      {
        letter: "D",
        option: "Te facilita obtener residencia en otro país",
        answer: 0
      },
    ]
  },
  {
    question: "Si recibe un correo electrónico de su entidad financiera con un link adjunto:",
    answers: [{
        letter: "A",
        option: "Guarde el correo como contacto favorito para que lo identifique en su correo",
        answer: 0
      },
      {
        letter: "B",
        option: "Haga click en el link adjunto e ingrese con su usuario y clave",
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
        answer: 0
      },
      {
        letter: "C",
        option: "Es el porcentaje que dispone una persona para poder asumir la deuda o préstamo de acuerdo a los ingresos actuales.",
        answer: 1
      },
      {
        letter: "D",
        option: "Es un curso que se debe aprobar en la Universidad",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué es una tasa de interés?",
    answers: [{
        letter: "A",
        option: "El interés que tiene un usuario de adquirir un préstamo",
        answer: 0
      },
      {
        letter: "B",
        option: "Las consignaciones que una entidad hace a un usuario mensualmente",
        answer: 0
      },
      {
        letter: "C",
        option: "Los certificados financieros emitidos por una entidad",
        answer: 0
      },
      {
        letter: "D",
        option: "Porcentaje de dinero que se paga por un préstamo o crédito.",
        answer: 1
      },
    ]
  },
  {
    question: "Un buen ahorrador es aquel que:",
    answers: [{
        letter: "A",
        option: "No conoce sus gastos ni la periodicidad de estos",
        answer: 0
      },
      {
        letter: "B",
        option: "Una vez recibe sus ingresos mensuales los gasta en dos semanas",
        answer: 0
      },
      {
        letter: "C",
        option: "Siempre pide prestado para sus gatos diarios",
        answer: 0
      },
      {
        letter: "D",
        option: "Evita compras innecesarias, hace mensualmente un presupuesto y organiza sus gastos",
        answer: 1
      },
    ]
  },
  {
    question: "Señale un tip de un buen deudor:",
    answers: [{
        letter: "A",
        option: "No tiene en cuenta su capacidad de pago y sus necesidades",
        answer: 0
      },
      {
        letter: "B",
        option: "Siempre le pide a sus familiares y amigos mensualmente el valor de la cuota para poder atender la obligación",
        answer: 0
      },
      {
        letter: "C",
        option: "Establece una fecha fija para realizar su pago, así no olvida este compromiso ni paga intereses de mora",
        answer: 1
      },
      {
        letter: "D",
        option: "Siempre paga después de la fecha de vencimiento",
        answer: 0
      },
    ]
  },
  {
    question: "¿Quién es la Superintendencia Financiera de Colombia?",
    answers: [{
        letter: "A",
        option: "Una entidad que se dedica a invertir los recursos de diferentes usuarios en bancos y aseguradoras.",
        answer: 0
      },
      {
        letter: "B",
        option: "Una organización dedicada a promover el empleo en los profesionales recién egresados.",
        answer: 0
      },
      {
        letter: "C",
        option: "Una empresa que realiza préstamos estudiantiles.",
        answer: 0
      },
      {
        letter: "D",
        option: "Organismo que realiza la inspección, vigilancia y control sobre las actividades financieras, bursátiles, de aseguradora.",
        answer: 1
      },
    ]
  },
  {
    question: "¿Para qué realizas un presupuesto?",
    answers: [{
        letter: "A",
        option: "Poder endeudarte así no tengas capacidad de pago",
        answer: 0
      },
      {
        letter: "B",
        option: "Identificar en dónde puedes aumentar tus gastos",
        answer: 0
      },
      {
        letter: "C",
        option: "Planear financieramente tu vida económica y controlar tus gastos mensuales.",
        answer: 1
      },
      {
        letter: "D",
        option: "Obtener un descuento en la compra de tu vivienda",
        answer: 0
      },
    ]
  },
  {
    question: "Si le solicitan por medio de mensaje de texto información personal y financiera usted debe:",
    answers: [{
        letter: "A",
        option: "Contestar inmediatamente toda la información que le piden",
        answer: 0
      },
      {
        letter: "B",
        option: "Hacer caso omiso al mensaje y no enviar ningún tipo de información",
        answer: 1
      },
      {
        letter: "C",
        option: "Contestar únicamente con su clave de su cuenta bancaria",
        answer: 0
      },
      {
        letter: "D",
        option: "Nunca solicitan información de esta forma, esto es imposible",
        answer: 0
      },
    ]
  },
  {
    question: "Si debe realizar el pago de su obligación por medio de internet:",
    answers: [{
        letter: "A",
        option: "Debe efectuarlo por medio de un computador público",
        answer: 0
      },
      {
        letter: "B",
        option: "Realícelo en su casa u oficina o donde se asegure que tiene las respectivas medidas de seguridad y protección",
        answer: 1
      },
      {
        letter: "C",
        option: "Si está en un café y necesita pagar el recibo pídale prestado el portátil alguna persona y realice su pago",
        answer: 0
      },
      {
        letter: "D",
        option: "Conéctese en su celular a la página correspondiente por medio de una red de Wifi pública",
        answer: 0
      },
    ]
  },
  {
    question: "Si al momento de realizar su presupuesto, sus gastos superan sus ingresos, usted:",
    answers: [{
        letter: "A",
        option: "Tomar unas largas vacaciones en el exterior",
        answer: 0
      },
      {
        letter: "B",
        option: "Comprar o cambiar su vehículo",
        answer: 0
      },
      {
        letter: "C",
        option: "Solicitar que le aumenten su cupo en la tarjeta de crédito",
        answer: 0
      },
      {
        letter: "D",
        option: "Debe revisar cada gasto y realizar los ajustes en su vida cotidiana",
        answer: 1
      },
    ]
  },
  {
    question: "Durante la etapa de Juventud, es importante que:",
    answers: [{
        letter: "A",
        option: "No ahorre lo que le sobra de su mesada, es un hábito innecesario.",
        answer: 0
      },
      {
        letter: "B",
        option: "Utilice su mesada o los ingresos que tiene para invitar a sus amigos a fiestas.",
        answer: 0
      },
      {
        letter: "C",
        option: "Utilice el cupo de su tarjeta de crédito completamente y pídale a sus padres que paguen su cuota.",
        answer: 0
      },
      {
        letter: "D",
        option: "Administre correctamente las tarjetas de crédito y conozca los riesgos del endeudamiento",
        answer: 1
      },
    ]
  },
  {
    question: "Al tomar un crédito o préstamo la persona deberá:",
    answers: [{
        letter: "A",
        option: "Tener en cuenta las fechas en las cuáles debe pagar el dinero que le fue prestado con la respectiva tasa de interés.",
        answer: 1
      },
      {
        letter: "B",
        option: "Esperar que la entidad se comunique para informarle el valor a pagar",
        answer: 0
      },
      {
        letter: "C",
        option: "Dejar pasar el tiempo para que a la entidad se le olvide ese préstamo",
        answer: 0
      },
      {
        letter: "D",
        option: "Irse del país para que no le sea cobrado el dinero",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué es un CDT?",
    answers: [{
        letter: "A",
        option: "Es un certificado bono regalo",
        answer: 0
      },
      {
        letter: "B",
        option: "Es el extracto de tu cuenta de ahorros.",
        answer: 0
      },
      {
        letter: "C",
        option: "Es una modalidad de inversión, en la cual una persona entrega recursos por un plazo específico y a una tasa de remuneración.",
        answer: 1
      },
      {
        letter: "D",
        option: "Es un documento que te hacen firmar cuando adquieres un crédito.",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué es un mercado de valores?",
    answers: [{
        letter: "A",
        option: "Valores y principios del ser humano",
        answer: 0
      },
      {
        letter: "B",
        option: "Las operaciones de inversión que canalizan el ahorro del público al sector productivo",
        answer: 1
      },
      {
        letter: "C",
        option: "Las tendencias económicas que determinan el valor del dólar",
        answer: 0
      },
      {
        letter: "D",
        option: "Las prácticas de conducta y etiqueta enseñadas en la Urbanidad de Carreño",
        answer: 0
      },
    ]
  },
  {
    question: "Por inversión se entiende que:",
    answers: [{
        letter: "A",
        option: "Es utilizar tus ingresos para la compra de bienes de lujo",
        answer: 0
      },
      {
        letter: "B",
        option: "Es dejar de estudiar e irte comer con tus amigos",
        answer: 0
      },
      {
        letter: "C",
        option: "Es un instrumento financiero utilizado para tomar el dinero que queda como excedente y ponerlo a producir.",
        answer: 1
      },
      {
        letter: "D",
        option: "Es un vehículo utilizado para pedir dinero.",
        answer: 0
      },
    ]
  },
  {
    question: "Algunos instrumentos financieros de inversión son:",
    answers: [{
        letter: "A",
        option: "Cdt´s, fondos de inversión colectiva, títulos valores.",
        answer: 1
      },
      {
        letter: "B",
        option: "Viajes alrededor del mundo",
        answer: 0
      },
      {
        letter: "C",
        option: "Tarjetas de Crédito",
        answer: 0
      },
      {
        letter: "D",
        option: "Créditos de Vivienda",
        answer: 0
      },
    ]
  },
  {
    question: "Indique que aspecto(s) se debe tener en cuenta antes de realizar una inversión:",
    answers: [{
        letter: "A",
        option: "Evalué los riesgos, tenga en cuenta el plazo de la inversión y establezca con anterioridad los gastos, comisiones e impuestos.",
        answer: 1
      },
      {
        letter: "B",
        option: "Nunca tenga en cuenta los riesgos de la inversión, recuerde que estas se presentarán con el paso del tiempo.",
        answer: 0
      },
      {
        letter: "C",
        option: "Una vez efectué la inversión tomé un tiempo para revisar los prospectos y contratos que ha firmado.",
        answer: 0
      },
      {
        letter: "D",
        option: "Realice la inversión en una entidad que no esté vigilada, esto le asegurará un mayor rendimiento",
        answer: 0
      },
    ]
  },
  {
    question: "Un codeudor es:",
    answers: [{
        letter: "A",
        option: "Es la persona que abona a un fondo de pensiones voluntarias",
        answer: 0
      },
      {
        letter: "B",
        option: "Es la persona que solicita un préstamo",
        answer: 0
      },
      {
        letter: "C",
        option: "Es una persona que solicita la entidad financiera para respaldar la deuda que se otorga al solicitante en caso de incumplimiento de pagos.",
        answer: 1
      },
      {
        letter: "D",
        option: "Es la persona que obtiene un crédito para estudiar en una universidad",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué beneficios obtienes al ahorrar?",
    answers: [{
        letter: "A",
        option: "Ninguno ya que tienes la opción de pedir dinero a tus amigos",
        answer: 0
      },
      {
        letter: "B",
        option: "No tienes necesidad de madrugar para ir a trabajar",
        answer: 0
      },
      {
        letter: "C",
        option: "Es un seguro contra gastos contingentes y te permite organizar en tus ingresos y consumos.",
        answer: 1
      },
      {
        letter: "D",
        option: "Solo es una excusa que se inventaron para no gastar el dinero",
        answer: 0
      },
    ]
  },
  {
    question: "¿Qué es el ahorro?",
    answers: [{
        letter: "A",
        option: "Es una parte de los ingresos que destinas a guardar o reservar voluntariamente para tus necesidades futuras o proyectos.",
        answer: 1
      },
      {
        letter: "B",
        option: "Pedir dinero prestado a tus familiares o amigos.",
        answer: 0
      },
      {
        letter: "C",
        option: "Utilizar tu tarjeta de crédito hasta terminar el cupo autorizado",
        answer: 0
      },
      {
        letter: "D",
        option: "Todos los ingresos que recibes debes gastarlos con tus amigos.",
        answer: 0
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
        option: "Es donde existe una reinversión periódica de los intereses",
        answer: 0
      },
      {
        letter: "C",
        option: "Es la tasa que establece una entidad financiera por el dinero que presta",
        answer: 0
      },
      {
        letter: "D",
        option: "Es el valor que debe ser asumido por incumplir el pago de una obligación",
        answer: 1
      },
    ]
  },
  {
    question: "¿Cuál es la mejor forma de realizar un presupuesto?",
    answers: [{
        letter: "A",
        option: "Calcule el valor que le queda de restar los ingresos y sus gastos cada mes, revise si su saldo es negativo o muy inferior.",
        answer: 1
      },
      {
        letter: "B",
        option: "No preocuparse por los gastos que realiza, ya que cuenta con el apoyo de sus amigos y familiares.",
        answer: 0
      },
      {
        letter: "C",
        option: "Revise sus cuentas cada año y haga un balance de sus ingresos y gastos",
        answer: 0
      },
      {
        letter: "D",
        option: "Revise cuáles han sido los gastos una vez se presente iliquidez",
        answer: 0
      },
    ]
  },
];


let countLetter = 0;
function templateAnswers(answer) {
    
    return `
        <li id="idAnswerLabel" data-id="${answer.answer}" class="lblAnswerClass">
            <a href="javascript:void(0)">
                <span id="letterAns">${renderLetters(countLetter)}</span>
                ${answer.option}
            </a>
        </li>
        
    `
}

function renderLetters(letter) {
  countLetter++
  console.log("letra" + letter)
  switch (letter) {
    case 0:
      return `
        A.
      `;
      break;
    case 1:
      return `
        B.
      `;
    break;
    case 2:
      return `
        C.
      `;
    break;
    case 3:
      return `
        D.
        <span id="noCount">${countLetter = 0}</span>
      `;
    break;
    }
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
// function startCount() {
//   if (!timerOn) {
//     timerOn = 1;
//     temporizador();
//   }
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
              quiz.splice(randQuestions, 1);
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
  if(quiz.length == 0) {
    console.log("Puntaje " + score)
    $('#stage04').animate({
      left: "-=100%",
      opacity: "1"
    }, 800);
    $('#stage05').animate({
      left: "-=100%",
      opacity: "1"
    }, 800);
    document.querySelector(".score span").innerHTML = score;
    timerValue = 0;
  }
  else {
    let randNoRepeat = [];
    randQuestions = parseInt(Math.floor(Math.random() * quiz.length));
    console.log(randQuestions);
    // CurrentQuestion++;
    // starsFooter();
    // console.log(CurrentQuestion);


    dataAnswers = quiz[randQuestions].answers;
    console.log(dataAnswers)
    selectedAnswer = false;
    $('#stage04').attr('style','left: 100%; opacity: 0');
    $('#stage04').animate({
      left: "-=100%",
      opacity: "1"
    }, 800);
    // timerValue = 30;
    // respuestas.innerHTML = `${dataAnswers.map(templateAnswers).join("")}`;
    // let cloneBox = questionBox.cloneNode(true);
    // console.log(cloneBox);
    // stage.append(cloneBox);

    dataQuestion = quiz[randQuestions].question;
    lblHeaderQuestion.innerHTML = dataQuestion;

    randNoRepeat.push(quiz[randQuestions])
    console.log(randNoRepeat);
    // quiz.splice(randQuestions, 1);

    console.log(randQuestions)

    let ranAns = [];

    let countAnswers = dataAnswers.length;
    let count = 0;

    while(ranAns.length < countAnswers) {
      // console.log("ite"+n);
      let randIndex = parseInt(Math.floor(Math.random() * countAnswers));
      console.log(randIndex)
      console.log("dataanswers: " + dataAnswers[randIndex].letter);
      let existe = false;
      console.log(ranAns.length)
      for(var i=0; i < ranAns.length; i++){
        if(ranAns[i].letter == dataAnswers[randIndex].letter){
          console.log("ranAns letra: " + ranAns[i]);
          console.log("ranAns "+JSON.stringify(ranAns[i])+"dataAnswers"+JSON.stringify(dataAnswers[randIndex]))
          console.log("ranAns "+JSON.stringify(ranAns[i])+"dataAnswers"+JSON.stringify(dataAnswers[randIndex]))
          existe = true;
          break;
        }
       
      }
      if(!existe) {
        console.log("dataAnswers[randIndex]" + JSON.stringify(dataAnswers[randIndex]))
        ranAns[ranAns.length] = dataAnswers[randIndex]
        console.log(ranAns.length)
      }
      count += 1;
      console.log("while" + count);
      
      // console.log("indice dataAnswers"+dataAnswers.indexOf(dataAnswers[randIndex]));
      // console.log("indice ranAns"+dataAnswers.indexOf(ranAns[randIndex]));
      // console.log(" dataAnswers: " + JSON.stringify(dataAnswers[randIndex]));
      // console.log(" ranAns " + JSON.stringify(ranAns[randIndex]));
      // // dataAnswers.splice(randIndex, 1);
      // console.log(ranAns);
    }
    console.log("ranAns Final" + JSON.stringify(ranAns))

    respuestas.innerHTML = `${ranAns.map(templateAnswers).join("")}`;
    console.log("randQuestions" + randQuestions)
    indexAnswer();
    
    
  }
  
}

$("#btnHelpQuestion").click(function () {

    // var getIdQuestion = $(this).data("id");
    GetHelpFiftyPercent(randQuestions);
    $('#divHelpQuestion').addClass('disable-tool active');
});

let timerAnswer = 5; 
function indexAnswer() {
    // let AnswerClass = document.querySelector(".lblAnswerClass");
    // AnswerClass.forEach(element => {
    // element.addEventListener("click", function( event ) {
    // //  let valueAns = quiz[idAnswerLabel].answers.answer;
  
  let selectAns;
    $( ".lblAnswerClass" ).each(function() {
      
      $(this).on("click", function(e) {
        let idata = $(this).data("id");
        // console.log("id respuesta de pregunta: " + parseInt(idata))
        // console.log("click a each: " + index)
        // console.log("la pregunta es: "+ quiz[indexFull].question + "y la respuesta es"+ JSON.stringify(quiz[indexFull].answers[index]));
        // console.log("La respuesta: " + quiz[indexFull].answers[index].answer );
        $("#loadingRequestAnswer").show();
        $(this).addClass('select');
        selectedAnswer = true;
        selectAns = this;
        setTimeout(function () {
          if(parseInt(idata) === 1) {
            
            console.log(this)
            
            $(selectAns).addClass('correct');
            
            setTimeout(function () {
              userAnswer(1)
              timerValue = 31;
              // location.reload();
              Next();
              $("#loadingRequestAnswer").hide();
              // quiz.splice(randQuestions, 1);
              temporizador();
            }, 2500)
            quiz.splice(randQuestions, 1);
          }
          
          else {
            console.log(this)
            $(selectAns).addClass('wrong');
            setTimeout(function () {
              // userAnswer(1)
              timerValue = 31;
              // location.reload();
              Next();
              $("#loadingRequestAnswer").hide();
              // quiz.splice(randQuestions, 1);
              temporizador();
            }, 2500)
            quiz.splice(randQuestions, 1);
          }
        }, 2500)
      });
    });
}

  
function userAnswer(Ans) {
  if(Ans === 1) {

    score = score + 40;
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
  $(starsFooter).append("<span class='level'>NIVEL <span class='num'>0</span><span>");
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

  $(starsFooter).append("<span class='level'>NIVEL "+i+"</span>");
  
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

function GetHelpFiftyPercent(idQuestion) {
  // $(".lblAnswerClass").hide();

    // console.log("idQuestion" + JSON.stringify(ranAns[idQuestion]))
    let count = 0;
    
    // var getIdAnswerResponse = obj.IDRespuesta;
    //alert(getIdAnswerResponse);
    // parseInt(Math.floor(Math.random() * quiz.length));
    $(".lblAnswerClass").each(function() {
      let answers = $(this).data("id");
        if(answers == 0) {
          while(count <= 1) {
            $(this).hide();
            count++;
            break;
          }
        }
        // else {
        //   $(this).show();
        // }
      
    //     // var getIdAnswer = $(this).attr("data-id");
    //     // var idLabelAnswer = $(this).attr("id");
    //     // if (getIdAnswer == getIdAnswerResponse) {
    //     //     $("#" + idLabelAnswer).show();
    //     // }

    //     parseInt(Math.floor(Math.random() * quiz.length));
    //     if($(this).d)
    });
  }