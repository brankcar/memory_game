/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * 在页面上显示卡片
 *  - 使用下面提供的“洗牌”方法洗牌
 *  - 遍历每个卡片并创建它的HTML。
 *  - 将每个卡片的HTML添加到页面中
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}*/
var MemoryGame = function(domClass){
	this.default_array = [   			// 默认卡片
		'fa-diamond',
		'fa-paper-plane-o',
		'fa-anchor',
		'fa-bolt',
		'fa-cube',
		'fa-bomb',
		'fa-leaf',
		'fa-bicycle'
	];
	this.card_array = [];			// 卡片列表
	this.match_class = 'card match';  	// 已匹配卡片 className
	this.open_class = 'card open show'; 	// 当前点击打开卡片 className
	this.match_array = []; 			// 已匹配列表
	this.open_array = [];			// 已打开列表
	this.container = document.getElementsByClassName(domClass)[0]; 	// 容器 dom
	this.star = document.getElementsByClassName('stars')[0]			// 星星
	this.starsNumber = 0;			// 星星个数
	this.moves = 0; 				// 步数
};
MemoryGame.prototype = {
	/**
	 * [shuffle 洗牌方法]
	 * @param  {[数组]} array [需要洗牌的数组]
	 * @return {[数组]}       [已完成洗牌的新数组]
	 */
	shuffle: function(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	},
	/**
	 * [init 初始化记忆游戏]
	 */
	init: function(){
		var _this = this;
		_this.card_array = _this.shuffle(_this.default_array.concat(_this.default_array));
		_this.loop(_this.card_array);
		// 重置按钮绑定点击事件，点击后重置游戏
		document.getElementsByClassName('restart')[0].onclick = function(){
			_this.resetGame();
		};
		// 卡片容器绑定点击事件，事件委托
		_this.container.onclick = function(e){
			var _list = this.children;
			if(e.target.nodeName === 'LI' && (e.target.getAttribute('class').indexOf('match') >= 0 || e.target.getAttribute('class').indexOf('open show') >= 0)){
				return;
			}
			if(e.target.nodeName === 'LI' && _this.open_array.length < 2){
				var index = _this.show(e.target, _list);
				var status = _this.addOpenList(index);
				if(typeof status === 'boolean'){
					_this.isMatch(status)
				}
			}
		}
		document.getElementsByClassName('replay-btn')[0].onclick = function(){
			_this.playAgain();
		}
		_this.updataScore();
	},
	/**
	 * [loop 遍历循环dom]
	 * @param  {[数组]} array [需要遍历的卡片列表]
	 */
	loop: function(array){
		var html = '';
	    array.forEach(function(value){
	    	html += '<li class="card">'
		                +'<i class="fa ' + value + '"></i>'
		            +'</li>';
	    });
	    this.container.innerHTML = html;
	},
	/**
	 * [resetGame 重置游戏]
	 */
	resetGame: function(){
		this.card_array = this.shuffle(this.card_array);
		this.loop(this.card_array);
		this.moves = 0;
		this.updataScore();
	},
	/**
	 * [show 显示点击卡片]
	 * @param  {[dom对象]} _this   [需要显示的当前卡片]
	 * @param  {[数组]} allList [当前卡片列表]
	 * @return {[数值]}         [当前卡片的位置下标]
	 */
	show: function(_this, allList){
		if(_this.setAttribute !== this.open_class){
			_this.setAttribute('class',this.open_class);
		}
		for (var i = 0; i < allList.length; i++) { 
			if (allList[i] == _this) { 
				return i;
			}
		}
	},
	/**
	 * [addOpenList 添加到卡片已打开名单]
	 * @param {[数值]} cardId [添加到open_array数组]
	 */
	addOpenList: function(cardId){
		var _list = this.open_array,
			_card_list = this.card_array,
			_children = this.container.children;
		_list.push(cardId);
		if(_list.length === 2){
			return _card_list[_list[0]] === _card_list[_list[1]];
		}
	},
	/**
	 * [isMatch 已打开的卡片是否匹配]
	 * @param  {[布尔值]}  status [判断匹配结果]
	 */
	isMatch: function(status){
		this.moves++;
		var _list = this.open_array,
			_children = this.container.children;
		if(status){
			this.addMatchList();
		}else{
			for(var i = 0; i < _list.length; i++){
				_children[_list[i]].setAttribute('class','card show fail');
			}
			var timer = setTimeout(function(){
				for(var i = 0; i < _list.length; i++){
					_children[_list[i]].setAttribute('class','card out');
				}
				clearTimeout(timer);
				var timer2 = setTimeout(function(){
					for(var i = 0; i < _list.length; i++){
						_children[_list[i]].setAttribute('class','card');
					}
					clearTimeout(timer2);
					_list.splice(0,_list.length);
				},200);
			},400);
		}
		this.updataScore();
	},
	/**
	 * [addMatchList 添加到匹配成功列表]
	 */
	addMatchList: function(){
		var _list = this.open_array,
			_card_list = this.card_array,
			_children = this.container.children;
		for(var i = 0; i < _list.length; i++){
			_children[_list[i]].setAttribute('class',this.match_class);
			this.match_array.push(_children[_list[i]]);
		}
		_list.splice(0,_list.length);
		if(this.match_array.length === this.card_array.length){
			this.gameOver();
		}
	},
	/**
	 * [updataScore 更新得分数据]
	 */
	updataScore: function(){
		var _node = document.getElementsByClassName('moves');
		for(var i = 0; i < _node.length; i++){
			_node[i].innerHTML = this.moves;
		}
		this.starLeval();
	},
	/**
	 * [starLeval 根据步数得分计算本次游戏获得多少颗星星]
	 */
	starLeval: function(){
		var _children = this.star.children,
			count = 0;
		for(var i = 0; i < _children.length; i++){
			if(this.moves <= 14){
				_children[i].childNodes[0].setAttribute('class','fa fa-star');
			}else if(this.moves > 14 && this.moves < 18){
				if(i < 2){
					_children[i].childNodes[0].setAttribute('class','fa fa-star');
				}else{
					_children[i].childNodes[0].setAttribute('class','fa fa-star-o');
				}
			}else{
				if(i === 0){
					_children[i].childNodes[0].setAttribute('class','fa fa-star');
				}else{
					_children[i].childNodes[0].setAttribute('class','fa fa-star-o');
				}
			}
			if(_children[i].childNodes[0].getAttribute('class') === 'fa fa-star'){
				count++;
			}
		}
		this.starsNumber = count;
	},
	/**
	 * [gameOver 游戏结束，弹出分数]
	 */
	gameOver: function(){
		var layer = document.getElementById('layer');
		document.getElementsByClassName('stars-number')[0].innerHTML = this.starsNumber;
		layer.setAttribute('class','modal in');
	},
	/**
	 * [playAgain 重新开始]
	 */
	playAgain: function(){
		var layer = document.getElementById('layer');
		layer.setAttribute('class','modal');
		this.resetGame();
	}
}
MemoryGame.prototype.constructor = MemoryGame;

/*
 * 为卡片设置事件侦听器。如果单击某个卡：
 *  - 显示卡的符号（把这个功能放在你从这个调用的另一个函数中）
 *  - 将该卡添加到“打开名单的列表”中（将此功能放入您从该调用中调用的另一个函数）
 *  - 如果名单已经有另一张卡，看看这两张卡是否匹配。
 *    + 如果卡匹配，锁定卡打开的位置（把这个功能放到另一个你从这个调用的函数）
 *	  + 如果卡片不匹配，从列表中移除卡片并隐藏卡片的符号（把这个功能放到你从这个调用的另一个函数中）。
 *	  + 增加移动计数器并在页面上显示它（把这个功能放在你从这个调用的另一个函数中）
 *	  + 如果所有的卡都匹配了，用最后的分数显示一个消息（把这个功能放到你从这个调用的另一个函数中）
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
