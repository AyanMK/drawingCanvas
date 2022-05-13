
function canvas_height_width() {
    canvas.height = window.innerHeight - canvas.offsetTop - 10;
    canvas.width = window.innerWidth - canvas.offsetLeft - 5;
}

window.addEventListener("load",loadFunction); 
window.addEventListener("resize", loadFunction);

function loadFunction(){
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas_height_width();

    var canvasHight = document.querySelector("#canvasHight");
    canvasHight.value = canvas.height;
    canvasHight.addEventListener("input", function () {
        canvas.height = canvasHight.value;
    })
    var canvasWidth = document.querySelector("#canvasWidth");
    canvasWidth.value = canvas.width;
    canvasWidth.addEventListener("input", function () {
        canvas.width = canvasWidth.value;
    })


    var penColor = document.querySelector("#penColor");
    var canvasColor = document.querySelector("#canvasColor");
    
    //Canvas color selection
    canvasColor.addEventListener("input", function () {
        canvas.style.background = canvasColor.value;
    });
    
    //Pen color selection
    penColor.addEventListener("input", function () {
        ctx.strokeStyle = penColor.value;
    });

    //pen thikness
    var penThikness = document.querySelector("#penThiknessValue");
    penThikness.addEventListener("input", function thikness () {
        ctx.lineWidth = penThikness.value;
    })

    //For painting tool
    let painting = false;
    function startPosition() {
        painting = true;
        draw(event);
    }
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(event) {
        if (!painting) return;
        ctx.lineCap = "round";

        X = event.clientX - canvas.offsetLeft;
        Y = event.clientY - canvas.offsetTop;

        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(X, Y);
    }

    //Event Listener for drawing on PC
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    //Event Listener for drawing on Mobile
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", finishedPosition);
    canvas.addEventListener("touchmove", draw);


    //Eraser 
    function startEraser() {
        draw(event);
        ctx.strokeStyle = canvasColor.value;
        ctx.lineWidth = penThikness.value;
        eraserOn.style.background = "skyblue";
        eraserOff.style.background = "white";
    }

    function stopEraser() {
        draw(event);
        ctx.strokeStyle = penColor.value;
        eraserOff.style.background = "skyblue";
        eraserOn.style.background = "white";
    }

    const eraserOff = document.querySelector("#eraserOff");
    const eraserOn = document.querySelector("#eraserOn");
    eraserOff.style.background = "skyblue";

    eraserOn.addEventListener("click", startEraser);
    eraserOff.addEventListener("click", stopEraser);


    //Grid
    function startGrid(){
        gridOn.style.background = "skyblue";
        gridOff.style.background = "white";

        //SMAL UNIT 10px
        //vertical grid line
        ctx.strokeStyle="#98fb98";
        ctx.lineWidth = 1;
        for(var i = 10 ; i <= canvas.width ; i=i+10){
            ctx.moveTo(i,10);
            ctx.lineTo(i,canvas.height);
            ctx.stroke();
        }
        //horizontal grid line
        for(var i = 10 ; i <= canvas.height ; i=i+10){
            ctx.moveTo(10,i);
            ctx.lineTo(canvas.width,i);
            ctx.stroke();
        }

        //MAJOR UNIT 50px
        for(var i = 10 ; i <= canvas.width ; i=i+50){
            ctx.moveTo(i,10);
            ctx.lineTo(i,canvas.height);
            ctx.stroke();
        }
        //horizontal grid line
        for(var i = 10 ; i <= canvas.height ; i=i+50){
            ctx.moveTo(10,i);
            ctx.lineTo(canvas.width,i);
            ctx.stroke();
        }

        ctx.strokeStyle = penColor.value;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = canvasColor.value;
    }

    function stopGrid(){
        gridOn.style.background = "white";
        gridOff.style.background = "skyblue";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = canvasColor.value;
    }

    const gridOn = document.querySelector("#gridOn");
    const gridOff = document.querySelector("#gridOff");
    gridOff.style.background = "skyblue";

    gridOn.addEventListener("click",startGrid);
    gridOff.addEventListener("click",stopGrid);




};