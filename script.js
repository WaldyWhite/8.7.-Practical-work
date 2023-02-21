let minValue;
let maxValue;

minValue = parseInt(document.querySelector('.numberMin').value);
maxValue = parseInt(document.querySelector('.numberMax').value);

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const textNumber = document.querySelector('#textNumber');
const questionMark = document.querySelector('.questionMark')


let answerNumber;
let orderNumber = 0;
let gameRun = true;
let answerChange = 0;
let stringNumber;

const answerList = ['Да это легко! Вы загадали', 'Наверное, это число', 'Дай-ка подумать, это', 'Думаю это число','Запросто, Ваше число','Вы загадали число'];
const answerWin = [`Я всегда угадываю\n\u{1F60E}`, `Я красавчик !\n\u{1F609}`, `Правда, я молодец?\n\u{1F604}`]

orderNumberField.textContent = orderNumber;

answerField.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю.`;

document.querySelector('.savedMin').textContent = document.querySelector('.numberMin').value;
document.querySelector('.savedMax').textContent = document.querySelector('.numberMax').value;


// ---- number to text conversion ----
function intTostring(n){
    let y;
    let minus;
    let x = n;
    
    const numbersUnits = ['один','два','три','четыре','пять', 'шесть', 'семь', 'восемь', 'девять'];
    const numbersDozens = [ 'десять','одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать','девятнадцать'];
    const numbersFromTwenty = ['двадцать','тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят','девяносто'];
    const numbersHundreds = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот', 'тысяча'];
  // ---- checking for a negative number ----
    if( x < 0 ){
      x = x.substr(1);
      minus ='минус';
    } else {
      minus = '';
      x = n;
    }
  
  // ---- convert to text ----
  if (x.length === 1){
    y = (x == 0) ? 'ноль': numbersUnits[x-1];
  
  } else if (x.length === 2 && x[0] < 2 && x[0] != 0){
    y = numbersDozens[x[1]];
  
  } else if (x.length === 2 && x[0] >= 2){
    y = (x[1] == 0) ? numbersFromTwenty[x[0]-2]: `${numbersFromTwenty[x[0]-2]} ${numbersUnits[x[1]-1]}`;
  
  } else if ( x.length === 3 && x[0] != 0 && x[1] == 0 ) {
    y = (x[2]== 0) ? numbersHundreds[x[0]-1]:`${numbersHundreds[x[0]-1]} ${numbersUnits[x[2]-1]}`;
  
  } else if ( x.length === 3 && x[0] != 0 && x[1] < 2 && x[1] != 0){
    y = `${numbersHundreds[x[0]-1]} ${numbersDozens[x[2]]}`;
  
  }  else if ( x.length === 3 && x[0] != 0 && x[1] >= 2){
    y = (x[2] ==0) ? `${numbersHundreds[x[0]-1]} ${numbersFromTwenty[x[1]-2]}`: `${numbersHundreds[x[0]-1]} ${numbersFromTwenty[x[1]-2]} ${numbersUnits[x[2]-1]}`
  
  }
  // ---- character count ----
  return (y.length <= 20)? ` ${minus} ${y}`:` ${n}`;
  }


// ---- returns the default value ----
function returnValues(){
    document.querySelector('.numberMin').value = 0;
    document.querySelector('.numberMax').value = 100;
    document.querySelector('.savedMin').textContent = document.querySelector('.numberMin').value;
    document.querySelector('.savedMax').textContent = document.querySelector('.numberMax').value;
};

// ---- returns value from settings ----
function setValues(){
    minValue = parseInt(document.querySelector('.numberMin').value);
    maxValue = parseInt(document.querySelector('.numberMax').value);
};

// ---- removing EventListenerlisteners from buttons ----
function removeEventListener(){
    document.querySelector('#btnLess').removeEventListener('click', toLess);
    document.querySelector('#btnOver').removeEventListener('click', toOver);
    document.querySelector('#btnEqual').removeEventListener('click', toRight);
};

// ---- Button Start ----
document.querySelector('.btnStart').addEventListener('click', toStart);
function toStart(){
    gameRun = true;
    orderNumber = 1;
    setValues();

    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumberField.textContent = orderNumber;

    answerChange = Math.round(Math.random()*(6-1)+1);

    answerField.textContent = (answerNumber <= 20 && answerNumber >= 0) ? answerList[answerChange-1] : answerField.textContent = answerList[answerChange-1];
    textNumber.textContent = intTostring(String(answerNumber));
    questionMark.textContent = ' ?';
    /// setting EventListenerы from buttons
    document.querySelector('#btnOver').addEventListener('click', toOver);
    document.querySelector('#btnLess').addEventListener('click', toLess);
    document.querySelector('#btnEqual').addEventListener('click', toRight,);
    // removing EventListenerlistener from Start button
    document.querySelector('.btnStart').removeEventListener('click', toStart);

};

// ---- function toSave for button Save ----
document.querySelector('.btnSave').addEventListener('click', function(){

    document.querySelector('.numberMin').value = (parseInt(document.querySelector('.numberMin').value) <= -10000)? -999: document.querySelector('.numberMin').value;
    document.querySelector('.numberMax').value = (parseInt(document.querySelector('.numberMax').value) >= 10000)? 999: document.querySelector('.numberMax').value;
   
    document.querySelector('.savedMin').textContent = document.querySelector('.numberMin').value;
    document.querySelector('.savedMax').textContent = document.querySelector('.numberMax').value;

    setValues();

    gameRun = true;
    orderNumber = 0;
    orderNumberField.textContent = orderNumber;
    answerField.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю.`;
    textNumber.textContent = '';
    questionMark.textContent = '';

    // removing EventListenerlisteners from buttons
    removeEventListener();

    // EventListenerlisteners Start Button
    document.querySelector('.btnStart').addEventListener('click', toStart);

    // checking a variable for NaN
    if (isNaN(minValue) || isNaN(maxValue) ){
        returnValues();
        answerField.textContent = 'Введите пожалуйста число';


    // checking for Min > Max
    } else if(minValue >= maxValue){
        returnValues();
        answerField.textContent = 'Минимальное число больше Максимального или же они равны';
    }
    else {
        answerField.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю.`;
        questionMark.textContent = '';
        textNumber.textContent = ``;
        setValues();
    };

});

// ---- Button Reset ----
document.querySelector('#btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    document.querySelector('.numberMin').value = 0;
    document.querySelector('.numberMax').value = 100;
    gameRun = true;
    orderNumber = 0;
    orderNumberField.textContent = orderNumber;
    answerField.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю.`;
    textNumber.textContent = '';
    questionMark.textContent = '';

    document.querySelector('.savedMin').textContent = document.querySelector('.numberMin').value;
    document.querySelector('.savedMax').textContent = document.querySelector('.numberMax').value;

    // removing EventListenerlisteners from buttons
    removeEventListener();

    // EventListenerlisteners Start Button
    document.querySelector('.btnStart').addEventListener('click', toStart);
});

// ---- function toOver for button Over ----
function toOver() {
    if (gameRun){
        if (minValue === maxValue || minValue > answerNumber || maxValue < answerNumber ){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            textNumber.textContent = '';
            questionMark.textContent = '';
            answerField.textContent = answerPhrase;
            gameRun = false;

        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.textContent = orderNumber;

            answerChange = Math.round(Math.random()*(6-1)+1);

            answerField.textContent = (answerNumber <= 20 && answerNumber >= 0) ? answerList[answerChange-1] : answerField.textContent = answerList[answerChange-1];
            textNumber.textContent = intTostring(String(answerNumber));
            questionMark.textContent = ' ?';
        }
    }
};

// ---- function toLees for Less Button ----
function toLess() {
    if (gameRun){
        if (minValue === maxValue || minValue > answerNumber || maxValue < answerNumber ){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!\n\u{1F914}`  :
                `Я сдаюсь..\n\u{1F92F}`;
            textNumber.textContent = '';
            questionMark.textContent = '';
            answerField.innerText = answerPhrase;
            gameRun = false;

        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.ceil((maxValue + minValue) / 2);
            orderNumber++;
            orderNumberField.textContent = orderNumber;
            answerChange = Math.round(Math.random()*(6-1)+1);

            answerField.textContent = (answerNumber <= 20 && answerNumber >= 0) ? answerList[answerChange-1] : answerField.textContent = answerList[answerChange-1];
            textNumber.textContent = intTostring(String(answerNumber));
            questionMark.textContent = ' ?';
        }
    }
};

// ---- function toRight for Butto Right ----
function toRight(){
    // removing EventListenerlisteners from buttons
    removeEventListener();

    // EventListenerlisteners Start Button
    document.querySelector('.btnStart').addEventListener('click', toStart);
    if (gameRun){
        let changeWinText = Math.round(Math.random()*(3-1)+1);

        answerField.textContent = answerWin[changeWinText-1];
        textNumber.textContent = '';
        questionMark.textContent = '';

        orderNumberField = orderNumber;

        gameRun = false;
        orderNumber = 0;
        orderNumberField.textContent = orderNumber;
    }

};

