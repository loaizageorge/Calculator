$(document).ready(function () {
    var expression = [];
    var num_of_digits = []; //Used in CE click to get rid of an entire number rather than a digit
    var countDigits = 0;
    //FLAGS
    var isResult = false; //Used to decide whether to chain or restart depending on whether op or number is pressed(after computation).
    var op_recent = false; //Used to disable op spamming(eg. 3+++)
    var decimal_recent = false; // Used to disable decimal spam(eg. 3...3);
    var isFloat = false;
    var buildingNumber = false;
    $("#screen").html("0");
    $(".num-btn").click(function () {
        if (isResult) {
            expression = [];
            num_of_digits = [];
            countDigits = 0;
            expression.push($(this).html());
            $("#screen").html(expression);
            countDigits++;
            isResult = false;
            op_recent = false;
            decimal_recent = false;
            buildingNumber = true;
        }
        else {
            // alert("chain");
            if (!overflowCheck(num_of_digits, countDigits)) {
                expression.push($(this).html());
                $("#screen").html(expression);
                countDigits++;
                op_recent = false;
                decimal_recent = false;
                buildingNumber = true;
            }
        }
    });
    $("#decimal-btn").click(function () {
        if (decimal_recent || isFloat) {
            return false;
        }
        else {
            expression.push($(this).html());
            $("#screen").html(expression);
            countDigits++;
            op_recent = false;
            decimal_recent = true;
            isFloat = true;
            buildingNumber = true;
        }
    });
    $(".op-btn").click(function () {
        //alert("operation");
        if (op_recent || decimal_recent || expression.length == 0) {
            return false;
        }
        else {
            expression.push($(this).html());
            $("#screen").html(expression);
            isResult = false;
            op_recent = true;
            decimal_recent = false;
            isFloat = false;
            //Store amount of digits in prev number and also a 1 to delete operators in CE click.
            num_of_digits.push(countDigits);
            countDigits = 0;
            num_of_digits.push(1);
            buildingNumber = false;
        }
    });
    $(".equal-btn").click(function () {
        var temp = expression.join('');
        var result = eval(temp);
        countDigits = result.toString().length;
        expression = [];
        expression.push(result);
        num_of_digits = [];
        if (!overflowCheck(num_of_digits, countDigits)) {
            $("#screen").html(result);
            op_recent = false;
            isResult = true;
            decimal_recent = false;
            buildingNumber = true;
        }
    });
    $("#ac-btn").click(function () {
        expression = [];
        num_of_digits = [];
        countDigits = 0;
        $("#screen").html("0");
        op_recent = false;
        isResult = true;
        decimal_recent = false;
    });
    $("#ce-btn").click(function () {
        if (num_of_digits.length == 1 || num_of_digits.length == 0) {
            expression = [];
            $("#screen").html("0");
            op_recent = false;
            isResult = false;
            decimal_recent = false;
            num_of_digits = [];
            isFloat = false;
            countDigits = 0;
        }
        else {
            if (buildingNumber) {
                num_of_digits.push(countDigits);
                countDigits = 0;
                buildingNumber = false;
                decimal_recent = false;
            }
            var amount_to_delete = num_of_digits.pop();
            var position = expression.length - amount_to_delete;
            expression.splice(position, amount_to_delete);
            $("#screen").html(expression);
            buildingNumber = false;
            op_recent = false;
            decimal_recent = false;
        }
    });
});

function overflowCheck(num_of_digits, count) {
    if (num_of_digits.length == 0) {
        var length = count;
        if (length >= 12) {
            $('#ac-btn').trigger('click');
            $("#screen").html("OVERFLOW");
            return true;
        }
    }
    else {
        var temp = num_of_digits.reduce(function (a, b) {
            return a + b;
        });
        var length = temp;
        if (length >= 12) {
            $('#ac-btn').trigger('click');
            $("#screen").html("OVERFLOW");
            return true;
        }
    }
}