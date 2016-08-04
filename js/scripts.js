$(document).ready(function(){
    var number = ["0"];
    start(number);
   
});

function evaluate(number){
    var temp = number.join('');
    var temp1 = eval(temp);
    $("#screen").html(temp1);
    number = [""];
    number.push(temp1);
    start(number);
}

function start(number){
    $("#screen").html(number);
    
    $(".regular-btn").click(function(){
       
        if($(this).html()=="="){
           evaluate(number);
        } else{
        $("#screen").html(this.innerHTML);
        number.push($(this).html());
        }
        console.log(number);
    
        
});
}

