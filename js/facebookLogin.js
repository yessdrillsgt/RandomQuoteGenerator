window.fbAsyncInit = function() {
	// init the FB JS SDK
	FB.init({
		appId      : '402895426756197',                    			// App ID from the app dashboard
		status     : true,                                 			// Check Facebook Login status
		version    : 'v2.7'
	});

	
	$('#btn_postToFacebook').on('click', function(){
		var quote = $('#quoteMessage').text() + '  - ' + $('#quoteAuthor').text();
		var path = window.location.href;
		
		FB.ui({
			method: 	'share',
			href: 		path,
			quote:		quote,
			hashtag:	'#justinThomasQuoteGenerator',
		}, function(response){});
		
	});
};

// Load the SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

