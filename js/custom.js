$(document).ready(function(){
	
	// Declare global variables
	var myQuotes = [
		{
			quote: 'If you set your goals ridiculously high and it\'s a failure, you will fail above everyone else\'s success.',
			author: 'James Cameron'
		},
		{
			quote: 'All men are created equal. Some work harder in preseason.',
			author: 'Emmitt Smith'
		},
		{
			quote: 'The only way to get out of mediocrity is to keep shooting for excellence.',
			author: 'Eric Thomas'
		},
		{
			quote: 'The separation of talent and skill is one of the greatest misunderstood concepts for people who are trying to excel, who have dreams, who want to do things. Talent you have naturally. Skill is only developed by hours and hours and hours of beating on your craft.',
			author: 'Will Smith'
		},
		{
			quote: 'I am a great believer in luck, and I find the harder I work, the more I have of it.',
			author: 'Thomas Jefferson'
		},
		{
			quote: 'All the passion and all the reward lies on the other side of doing the work',
			author: 'Joshua Fields Millburn'
		},
		{
			quote: 'The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty.',
			author: 'Winston Churchill'
		},
		{
			quote: 'Life is 10% what happens to us and 90% how we react to it.',
			author: 'Dennis P. Kimbro'
		},
		{
			quote: 'I can, I will, I must',
			author: 'Eric Thomas'
		},
		{
			quote: 'Winners win, and losers lose!',
			author: 'Eric Thomas'
		},
	]; 
		
	RandomizeQuote(myQuotes);
	
	$('#btn_randomQuote').on('click', function(){
		RandomizeQuote(myQuotes);
	});
	
	/* $('#btn_postToFacebook').on('click', function(){
		alert('got here');
		publishOnFB('testTitle', 'testCaption', 'testMessage'){
			return false;
		};
	}); */
	
});


function RandomizeQuote(myQuotes){
	var rand = Math.floor((Math.random() * myQuotes.length));
	
	// Pulls a random quote from the following source.  If the ajax call fails then a random quote is selected from myQuotes array.
	$.ajax( {
		url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
		success: function(data) {
			var post = data.shift();

			$('#quoteMessage').html(post.content
											.replace('<p>', '<p>&#8220')	// Adds the left quotation mark at the beginning of the quote
											.replace('</p>', '&#8221</p>') // Adds the right quotation mark at the end of the quote
									);
			$('#quoteAuthor').hide().text(post.title.replace(/\W /g, '')).show(2500);
		},
		cache: false,
		error: function(data){
			$('#quoteMessage').html('&#8220' + myQuotes[rand].quote + '&#8221');
			$('#quoteAuthor').hide().text(myQuotes[rand].author).show(2500);
		}
	});
	
};


$('#btn_postToTwitter').on('click', function(e){
	e.preventDefault();
	var tweetText = $('#quoteMessage').text() + '  - ' + $('#quoteAuthor').text();
	
	if(tweetText.length > 140){
		alert("Tweet must be less than 140 characters.");
	} else {
		var link = "http://twitter.com/home?status=" + encodeURIComponent(tweetText);
		window.open(link, "_blank");
	}
});