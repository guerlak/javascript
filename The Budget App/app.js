var budgetController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        
    };

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }   
    };

    Expense.prototype.getItemPercentage = function(){
        return this.percentage;
    }

    var calculateBudget = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;

        })

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        percentage: -1

    };
         return {

            addItem: function(type, desc, val){
                var newItem, ID;

                if(data.allItems[type].length > 0){
                    ID =  data.allItems[type][data.allItems[type].length - 1].id + 1;
                }else{
                    ID = 0;
                }               

                if(type == 'exp'){
                    newItem = new Expense(ID, desc, val);
                }else{
                    newItem = new Income(ID, desc, val);
                }

                data.allItems[type].push(newItem);
                data.totals[type] += parseInt(newItem.value);
                return newItem;
            },

            deleteItem: function(type, id){
                var ids, index;

                ids = data.allItems[type].map(function(current){
                    return current.id;
                });

                console.log("Id da view: " + id + " e os ids: " + ids);

                index = ids.indexOf(id);

                console.log("Index is: " + index);
        
                if(index !== -1){
                    console.log("deleting Item");
                    data.totals[type] -= data.allItems[type][index].value;
                    data.allItems[type].splice(index, 1);
                    
                }
        
            },

            calculateItemPercentage: function(){

                data.allItems.exp.forEach(function(cur){
                    cur.calcPercentage(data.totals.inc);
                });

            },

            getItemPercentage: function(){

                var allPercentages = data.allItems.exp.map(function(cur){
                    return cur.getItemPercentage();
                })
                return allPercentages;

            },
 
            getData: function(){
                return data;            
            },

            getTotalIncome: function(){
                return data.totals.inc;
            },

            getTotalExpenses: function(){
                return data.totals.exp;
            },

            getTotalFinal: function(){
                return data.totals.inc - data.totals.exp;
            },

            getPercentage: function(){
               
                return Math.round((data.totals.exp / data.totals.inc) * 100);
            }

        }

})();

var uiController = (function () {

    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddBtn: '.add__btn',
        incomeContainer: '.incomes__list',
        expenseContainer: '.expenses__list',
        month: '.budget__title--month',
        totalIncome:'.budget__income--value',
        totalExpenses: '.budget__expenses--value',
        totalFinal: '.budget__value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        itemPercentage: '.item__percentage'
    }

    return {

        getInputs: function () {
            var inputs = {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            }
            return inputs;
        },

        cleardInputs: function(){          
            description: document.querySelector(domStrings.inputDescription).value = "";
            value: document.querySelector(domStrings.inputValue).value= "";
            document.querySelector(domStrings.inputDescription).focus();

            var fields, fieldsArr;
            fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue);

            fieldsArr= Array.prototype.slice.call(fields);
            console.log("Clearing: " +fieldsArr);

            fieldsArr.forEach(function(current, index, array){
                current = "";
            });
           
        },

        getDomStrings: function () {
            return domStrings;
        },

        generateMonth: function(){
            var month = document.querySelector(domStrings.month);
            month.textContent = "march of " + new Date().getFullYear();
            
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            if(type == 'inc'){

                element = domStrings.incomeContainer;
                console.log(element);

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%'+
                        '</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">'+
                        ' <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                        '</div></div></div>';

            }else{

                element = domStrings.expenseContainer;
              
                html = '<div class="item clearfix" id="exp-%id%">'+
                                '<div class="item__description">%description%</div>' +
                                '<div class="right clearfix">' +
                                '<div class="item__value">%value%</div>' +
                                '<div class="item__percentage">%percentage%</div> '+
                                '<div class="item__delete">' +
                                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                                '</div></div></div>';
                }

                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%',obj.value);
                newHtml = newHtml.replace('%percentage%', "0%");
            
                //Setter
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

                this.cleardInputs();

        },

        updateTotal: function(type, totalValue){

            if(type == "inc"){
                document.querySelector(domStrings.totalIncome).textContent = "+ " + totalValue;
            }else{
                document.querySelector(domStrings.totalExpenses).textContent = "- " + totalValue;
            }  
        },

        totalFinal: function(totalFinal){
            document.querySelector(domStrings.totalFinal).textContent = totalFinal;

        },

        updatePercentageBudget: function(percentage){
            document.querySelector(domStrings.percentage).textContent = percentage + "%";
        },

        deleteListItem: function(selectorId){

            var el =  document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },

        displayItemPercentages: function(percentages){

            var fields = document.querySelectorAll(domStrings.itemPercentage); //NODE LIST

            var nodeListFoEach = function(list, callBack){
                for(var i = 0; i < list.length; i++){
                    callBack(list[i], i);
                }
            }

            nodeListFoEach(fields, function(cur, index){
                if(percentages[index] > 0){
                    cur.textContent = percentages[index] + '%';
                }else{
                    cur.textContent = '---';
                }
               
            })
        }
    };

})();



//CONTROLLER


var appController = (function (b, ui) {


    var setupEventListeners = function () {

        document.querySelector(ui.getDomStrings().inputAddBtn).addEventListener('click', crtlAddItem); //callBack (the event listner calls the fn)

        document.addEventListener('keypress', function (e) {
            if (e.keyCode == 13 || e.which == 13) { // which for some browser doest have the keyCode property
                crtlAddItem();
            }

            document.querySelector(ui.getDomStrings().container).addEventListener('click', ctrlDeleteItem);
        });
    };

    var updateView = function(){

        var input = ui.getInputs();
        

        if(input.type == "inc"){
            ui.updateTotal(input.type, b.getTotalIncome());
            ui.totalFinal(b.getTotalFinal());
            ui.updatePercentageBudget(b.getPercentage());

        }else{
            ui.updateTotal(input.type, b.getTotalExpenses());
            ui.totalFinal(b.getTotalFinal());
            ui.updatePercentageBudget(b.getPercentage());
           

        }   
    };

    var updateItensPercentages = function(){

        b.calculateItemPercentage();
        var itemPercentages = b.getItemPercentage();
        ui.displayItemPercentages(itemPercentages);
        console.log("Item percentages " + itemPercentages);

    };

    
    var crtlAddItem = function () {
   
        var input = ui.getInputs();
 
        newItem = b.addItem(input.type, input.description, input.value);       
        ui.addListItem(newItem, input.type);

        total = {
            income: b.getTotalIncome(),
            expense: b.getTotalExpenses()
        }

        updateView();     
        updateItensPercentages();   
    };

    var ctrlDeleteItem = function(event){

        console.log(event.target.parentNode.parentNode.parentNode.parentNode);

        // POUR EVENT DELEGATION //
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        console.log("Item ID is: "+itemID);

        if(itemID){

            var splitedId = itemID.split('-');
            var type = splitedId[0];
            var id = parseInt(splitedId[1]);


            b.deleteItem(type, id);
            ui.deleteListItem(itemID);
            
            ui.totalFinal(b.getTotalFinal());
            ui.updatePercentageBudget(b.getPercentage());

            updateView();
                     
        }
    };

    return {
        init: function () {
            console.log("The app has started...");
            setupEventListeners();
            ui.generateMonth();
        }
    }

})(budgetController, uiController);

appController.init();