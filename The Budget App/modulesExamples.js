var budgetController = (function() {

        var x = 23;
        var add = function(a){
            return x + a;
    }

    return {
        publicTest:  function(b){
            return (add(b));
        }
}

})();

var UIController = (function(){ // IIFE to privacy

    var numberToDisplay = 3000;
    var dividePrivate = function(num){
        return numberToDisplay / num;
    }
    
    return {
        dividePublic: function(n){
            return (dividePrivate(n)); //auto invocation
        }
    }

})();


var controller = (function (budget, ui){

    var z = budget.publicTest(5);

    var ui = UIController.dividePublic(100);

    return {
        console: function(){
            console.log(z);
        }, 

        showDivide: function(){
            console.log(ui)
        }
    }

})(budgetController, UIController);





