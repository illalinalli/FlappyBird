var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");//вид игры - 2D
var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта

bird.src = "img/bird.png"; // Указание нужного изображения
bg.src = "img/bg.png"; // Аналогично
fg.src = "img/fg.png"; // Аналогично
pipeUp.src = "img/pipeUp.png"; // Аналогично
pipeBottom.src = "img/pipeBottom.png"; // Аналогично

// Звуковые файлы
var fly = new Audio(); // Создание аудио объекта
var score_audio = new Audio(); // Создание аудио объекта

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 110;//отступ между двумя блоками

//При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 30;//чтобы птичка взлетала
    fly.play();//проигрывается звук
}

//создание блоков
var pipe = [];
//создаём один объект в массиве
pipe[0] = {
    x: cvs.width,
    y: 0
}

//счёт
var score = 0;

//позиция птички
var xPos = 10;
var yPos = 150;

//переменная для гравитации
var grav = 1;

function draw() {
    ctx.drawImage(bg, 0, 0);
    //отрисовка блоков
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    
    pipe[i].x--;//движение блоков

    if(pipe[i].x == 125){
        pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        })
    }

    //столкновение птички и блока
    if(xPos + bird.width >= pipe[i].x 
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height 
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height){
                location.reload();//Перезагрузка игры. Т.е. заново
            }

    //количество очков
    if(pipe[i].x ==5){
        score++;
        score_audio.play();//проигрывается звук
    }
 }
    

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    
    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
   
pipeBottom.onload = draw;


   draw(); // Вызов функции из вне