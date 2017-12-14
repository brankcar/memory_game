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
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 为卡片设置事件侦听器。如果单击某个卡：
 *  - 显示卡的符号（把这个功能放在你从这个调用的另一个函数中）
 *  - 将该卡添加到“打开”卡的*列表中（将此功能放入您从该调用中调用的另一个函数）
 *  - 如果名单已经有另一张卡，看看这两张卡是否匹配。
 *    + 如果卡匹配，锁定卡在打开的位置（把这个功能放到另一个你从这个调用的函数）
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
