$(document).ready(function() {

	//===================
	//EXPANSION HANDLERS
	//===================
	$(document).on('click', '.tweet', function(){
		$(this).parents('.thread').toggleClass("expand");
	});
	$(document).on('click', '.compose textarea', function(){
		$(this).parents('.compose').toggleClass("expand");
	});

	//=================
	//MAKE TEMPLATES
	//=================
 	var makeThread = function(message) {
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		return template({
			'tweet': makeTweet(message),
			'compose': makeCompose()
		});
	}
 	var makeCompose = function() {
		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);
		return template();
	}
	var makeTweet = function(message) {
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);
		return template({
			'handle': '@SethHowell',
			'profile_pic': 'images/Seth.png',
			'message': message
		});
	}

	//====================
	//COMPOSE NEW TWEET
	//===================
	$('header form').on('submit', function(event){
		event.preventDefault();
		var message = $('form textarea').val();
		if(message.length > 0){
			var threadHTML = makeThread(message);
			$('.tweets').prepend(threadHTML);
			$('form textarea').val('');
			$(this).parents('.compose').toggleClass("expand");
		}
	});

	//=================
	//COMPOSE REPLY
	//=================
	$('.tweets').on('submit', 'form', function(event){
		event.preventDefault();
		var message = $(this).parents('.compose').find('textarea').val();
		if(message.length > 0){
			var tweetHTML = makeTweet(message);
			$(this).parents('.replies').prepend(tweetHTML);
			$('form textarea').val('');
			$(this).parents('.compose').toggleClass("expand");
		}
	});

});