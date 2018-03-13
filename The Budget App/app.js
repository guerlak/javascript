var budgetController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

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

            getData: function(){
                return data;            
            },

            getTotalIncome: function(){
                return data.totals.inc;
            },

            getTotalExpenses: function(){
                return data.totals.exp;
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
        totalExpenses: '.budget__expenses--value'

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

        cleandInputs: function(){          
            description: document.querySelector(domStrings.inputDescription).value = "";
            value: document.querySelector(domStrings.inputValue).value= "";
            
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

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%'+
                        '</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">'+
                        ' <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                        '</div></div></div>';

            }else{
                element = domStrings.expenseContainer;
                console.log(element);

                html = '<div class="item clearfix" id="expense-%id%">'+
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
            this.cleandInputs();

        },

        updateTotal: function(type, totalValue){

            if(type == "inc"){
                document.querySelector(domStrings.totalIncome).textContent = "+ " +totalValue;
            }else{
                document.querySelector(domStrings.totalExpenses).textContent = "- " + totalValue;
            }  
        }
    };

})();


var appController = (function (b, ui) {

    var setupEventListeners = function () {

        document.querySelector(ui.getDomStrings().inputAddBtn).addEventListener('click', crtlAddItem); //callBack (the event listner calls the fn)
        document.addEventListener('keypress', function (e) {
            if (e.keyCode == 13 || e.which == 13) { // which for some browser doest have the keyCode property
                crtlAddItem();
            }
        });
    };

    var crtlAddItem = function () {
   
        var input = ui.getInputs();
 
        newItem = b.addItem(input.type, input.description, input.value);       
        ui.addListItem(newItem, input.type);

        total = {
            income: b.getTotalIncome(),
            expense: b.getTotalExpenses()
        }

        if(input.type == "inc"){
            ui.updateTotal(input.type, total.income);
        }else{
            ui.updateTotal(input.type, total.expense);
        }   
    }
    return {
        init: function () {
            console.log("The app has started...");
            setupEventListeners();
            ui.generateMonth();
        }
    }

})(budgetController, uiController);

appController.init();