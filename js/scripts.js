$(document).ready(function(){
    
    var stringArr = [];
    var isResult = false;
    $("#screen").html("0");
    
    $(".num-btn").click(function(){
        if(isResult){
            stringArr = [];
            stringArr.push($(this).html());
            isResult = false;
            //alert("New Calculation");
             $("#screen").html(stringArr);
        }
        else{
           // alert("chain");
            stringArr.push($(this).html());
             $("#screen").html(stringArr);
        }
        
    });
    
    $(".op-btn").click(function(){
       //alert("operation");
        stringArr.push($(this).html());
       $("#screen").html(stringArr);
        isResult = false;
       
    });
    
    $(".equal-btn").click(function(){
        var temp = stringArr.join('');
        var result = eval(temp);
        stringArr = temp.split(" ");
        $("#screen").html(result);
        isResult = true;
        stringArr = [];
        stringArr.push(result);
    });
    
    $("#ac-btn").click(function(){
        stringArr = [];
        $("#screen").html("0");
        
    });
    
    $("#ce-btn").click(function(){
        stringArr = [];
        $("#screen").html("0");
        
    });
   
});
   
    
  
   




