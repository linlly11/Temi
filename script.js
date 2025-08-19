const questions = [
  {thai:"หมี", answer:"Bear", options:["Bear","Baer","Beer"]},
  {thai:"จระเข้", answer:"Crocodile", options:["Crocodile","Crocodeie","Crocodiie"]},
  {thai:"วัว", answer:"Cow", options:["Cow","Caw","Cew"]},
  {thai:"นก", answer:"Bird", options:["Bird","Birt","Bart"]},
  {thai:"ไก่", answer:"Chicken", options:["Chicken","Chickan","Chickkn"]},
  {thai:"นกยูง", answer:"Peacock", options:["Peacock","Peacack","Paecock"]},
  {thai:"หมู", answer:"Pig", options:["Pig","Bear","Crocodile"]},
  {thai:"แมวน้ำ", answer:"Seal", options:["Seal","Sela","Seel"]},
  {thai:"วาฬ", answer:"Whale", options:["Whale","Whala","Where"]},
  {thai:"สุนัข", answer:"Dog", options:["Dog","Dag","Dug"]},
  {thai:"กวาง", answer:"Deer", options:["Deer","Dear","Daar"]},
  {thai:"เพนกวิน", answer:"Penguin", options:["Penguin","Pengain","Penaain"]},
  {thai:"หมีขั้วโลก", answer:"Polar Bear", options:["Polar Bear","Bear","Bat"]},
  {thai:"ยุง", answer:"Mosquit", options:["Mosqit","Mosquit","Mosqait"]}, 
  {thai:"แมลงสาบ", answer:"Cockroach", options:["Cockroact","Cockraoct","Cockroach"]},
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion(){
  let q = questions[currentQ];
  questionText.textContent = `ข้อที่ ${currentQ+1}: ${q.thai}`;
  optionsEl.innerHTML = "";
  q.options.sort(()=>Math.random()-0.5).forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
  nextBtn.classList.add("hidden");
  resetTimer();
}

function checkAnswer(answer){
  let correct = questions[currentQ].answer;
  if(answer === correct){
    score++;
  } else {
    score -= 2;
  }
  scoreEl.textContent = score;
  stopTimer();
  nextBtn.classList.remove("hidden");
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function nextQuestion(){
  currentQ++;
  if(currentQ < questions.length){
    loadQuestion();
  } else {
    endGame();
  }
}

function resetTimer(){
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      score -= 2; // หมดเวลา = ผิด
      scoreEl.textContent = score;
      nextBtn.classList.remove("hidden");
      Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    }
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}

function endGame(){
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `<h2>จบเกมแล้ว!</h2><p>คะแนนรวม: ${score}</p>`;
}

nextBtn.onclick = nextQuestion;
loadQuestion();
