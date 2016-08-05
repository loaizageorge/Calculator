$(document).ready(function () {
    var stringArr = [];
    //FLAGS
    var isResult = false; //Used to decide whether to chain or restart depending on whether op or number is pressed(after computation).
    var op_recent = false; //Used to disable op spamming(eg. 3+++)
    var decimal_recent = false; // Used to disable decimal spam(eg. 3...3);
    var isFloat = false;
    
    $("#screen").html("0");
    $(".num-btn").click(function () {
        if (isResult) {
            stringArr = [];
            stringArr.push($(this).html());
            isResult = false;
            //alert("New Calculation");
            $("#screen").html(stringArr);
            
            op_recent = false;
            decimal_recent = false;
            
        }
        else {
            // alert("chain");
            stringArr.push($(this).html());
            $("#screen").html(stringArr);
            
            op_recent = false;
            decimal_recent = false;
        }
    });
    
    $("#decimal-btn").click(function(){
       if(decimal_recent||isFloat){
           return false;
       }
        
        else{
            stringArr.push($(this).html());
            $("#screen").html(stringArr);
            
            op_recent = false;
            decimal_recent = true;
            isFloat = true;
        }
        
    });
    
    $(".op-btn").click(function () {
        //alert("operation");
        if (op_recent ||decimal_recent|| stringArr.length == 0) {
            return false;
        }
        else {
            stringArr.push($(this).html());
            $("#screen").html(stringArr);
            
            isResult = false;
            op_recent = true;
            decimal_recent = false;
            isFloat = false;
        }
    });
    $(".equal-btn").click(function () {
        var temp = stringArr.join('');
        var result = eval(temp);
        stringArr = temp.split(" ");
        $("#screen").html(result);
        stringArr = [];
        stringArr.push(result);
        op_recent = false;
        isResult = true;
        decimal_recent = false;
    });
    $("#ac-btn").click(function () {
        stringArr = [];
        $("#screen").html("0");
        
        op_recent = false;
        isResult = true;
        decimal_recent = false;
    });
    $("#ce-btn").click(function () {
        stringArr = [];
        $("#screen").html("0");
        
        op_recent = false;
        isResult = false;
        decimal_recent = false;
    });
});