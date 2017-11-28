$(document).ready(function(){

	var SNAKE = SNAKE || {
		view:{},
		controller:{},
		config:{}
	};

//CONFIG

	(function initConfig(){
		this.$canvas = $("#snakeCanvas");
		this.gameWidth = this.$canvas.width();
		this.gameHeight = this.$canvas.height();
		this.cellWidth = 10;
		this.scoreTextStyle = "15px Verdana";
		this.snakeLength = 5;
		this.speed = 100;
		this.color = {
			background: '#ffffff',
			boardBoarder:'#2c3e50',
			score: "#cccccc",
			snake:{
				fill:"#e67e22",
				border:"#e357ee",
			},
			food: {
				fill:"#160a32",
				border:"#1704ff"
			}
		}
		this.keyCode = {
			UP: '38',
			DOWN:'40',
			LEFT: '37',
			RIGHT: '39',
			P: '80',
			C:'67'
		}
	}).call(SNAKE.config);

//VIEW

	(function initView(config){
		var $canvas = config.$canvas[0],
		context = $canvas.getContext('2d');
		
		var paintCell = function(x, y, color){
			var cell = config.cellWidth;

			context.fillStyle = color;
			context.strokeStyke = color;
			context.fillRect(x*cell, y*cell, cell, cell);
			context.strokeRect(x*cell, y*cell, cell, cell);
		}				

		var paintGameBoard = function(){
			var background = config.color.background;
			var gameWidth = config.gameWidth;
			var gameHeight = config.gameHeight;
			var boardBoarder = config.color.boardBoarder;

			context.fillStyle = background;
			context.fillRect(0, 0, gameWidth , gameHeight);
			context.strokeStyke = boardBoarder;
			context.strokeRect(0, 0, gameWidth, gameHeight);
		}

		var paintSnake = function(snake){
			var snakeColor = config.color.snake.fill;
				for(i in snake){
					var snakeCell = snake[i];
					paintCell(snakeCell.x, snakeCell.y, snakeColor);
				}
			}

		var paintScore = function(score){
				var color = config.color.score;
				var textStyle = config.scoreTextStyle;

				context.font = textStyle;
				context.fillStyle = color;
				context.fillText("Score: "+ score, 5, 30);
		}

		this.refreshView = function(food, snake, score){
			var foodColor = config.color.food.fill;

			paintGameBoard();
			paintSnake(snake);
			paintCell(food.x, food.y, foodColor);
			paintScore(score);
		}
		
	}).call(SNAKE.view, SNAKE.config);

//CONTROLLER 

	(function initController(config, view){
		var food;
		var snake;
		var score;
		var direction;
		var gameLoop;
		var that = this;
		var snakeLength = config.snakeLength;
		
		var createSnake = function(){
			snake = [];
			for(var i = snakeLength -1; i >= 0; i--){
				snake.push({
					x:i,
					y:0
				});
			}
		}

		var createFood = function(){
			var cellWidth = config.cellWidth;
			var gameWidth = config.gameWidth;
			var gameHeigth = config.gameHeight;
			var ramdomX = Math.round(Math.random()* (gameWidth-cellWidth) / cellWidth);
			var ramdomY = Math.round(Math.random()* (gameHeigth-cellWidth) / cellWidth);

			food = {
				x: ramdomX,
				y: ramdomY
			}
		}

		var addKeyEventListener = function(){
			var keyCode = config.keyCode;

			$(document).off('keydown').on('keydown', function(event){
				var pressedKey = event.which;
				if(pressedKey == keyCode.RIGHT && direction != "left"){
					direction = "right";
				}else if(pressedKey == keyCode.LEFT && direction != "right"){
					direction= 'left';
				}else if(pressedKey == keyCode.UP && direction != "down"){
					direction= 'up';
				}else if(pressedKey == keyCode.DOWN && direction != "up"){
					direction= 'down';
				}else if(pressedKey == keyCode.P){
					that.stopLooping();
				}else if(pressedKey == keyCode.C){
					that.startLooping();
				}
			});
		}

		var incrementScore = function(){
				score++;
				if(score == 6){
					checkLevelUp(score);
				}
		}

		var checkBodyCollision = function(head){
			for(i in snake){
				var snakeCell = snake[i]; 
				if(snakeCell.x == head.x && snakeCell.y == head.y){
					return true;
				}
			}
			return false;
		}

		var checkCollision = function(head){
			var leftCollision = head.x == -1;
			var rightCollision = head.x == config.gameWidth/config.cellWidth;
			var bottomCollision = head.y == -1;
			var topCollision = head.y == config.gameHeight/config.cellWidth;

			if(leftCollision || rightCollision || bottomCollision || topCollision || checkBodyCollision(head)){
				throw new Error("You Loose :D");
			}
		}

		var chooseSnakeDirection = function(){
			var head = {
				x: snake[0].x,
				y: snake[0].y
			}
			if(direction == "right"){
				head.x++;
			}else if(direction == "left"){
				head.x--;
			}else if(direction == 'up'){
				head.y--;
			}else if(direction == 'down'){
				head.y++
			}
			return head;
		}

		var moveSnake = function(tail){
			snake.unshift(tail);
		}

		var detectSnakeEatFood = function(head){
			if(head.x == food.x && head.y == food.y){
				var tail = {
					x: head.x,
					y: head.y
				}
					createFood();
					incrementScore();
				}else{
					var tail = snake.pop();
						tail.x = head.x;
						tail.y = head.y;
				}
			return tail;
		}

		var gameRefresh = function(){
			try{
				var newHeadPosition = chooseSnakeDirection();
				checkCollision(newHeadPosition);
				var tail = detectSnakeEatFood(newHeadPosition);
				moveSnake(tail);
				view.refreshView(food, snake, score);
			}catch(e){
				alert(e.message);
				
				SNAKE.init(SNAKE.controller, SNAKE.config, SNAKE.view);
				clearInterval(gameLoop);
			}
		}

		this.initGameDefault = function(){
			var snakeLength = config.snakeLength;
			addKeyEventListener();
			direction = "right";
			score = snakeLength;
			createSnake();
			createFood();
		}

		var checkLevelUp = function(score){
			if(score == 6){
			
			gameLoop = setInterval(gameRefresh, config.speed);
			}
		}

		this.startLooping = function(){
				if(typeof gameLoop != "undefined") {
					console.log("Passando em C");
					console.log("Intervalo gameLoop: " + gameLoop);
					clearInterval(gameLoop);
					
				}
			 gameLoop = setInterval(gameRefresh, config.speed);
			
		}

		this.stopLooping = function(){
				clearInterval(gameLoop);
				gameRefresh();
			
		}
			
	}).call(SNAKE.controller, SNAKE.config, SNAKE.view);

	SNAKE.init = function(controller, config, view){
		controller.initGameDefault();
		controller.startLooping();
	}

	SNAKE.init(SNAKE.controller, SNAKE.config, SNAKE.view);

});