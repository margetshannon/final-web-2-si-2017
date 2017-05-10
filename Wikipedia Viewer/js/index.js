//source code dari Joshua Pelling 

function AnimateRotate(angle) {
	$(".fa-search-plus").unbind("click");
	$(".fa-search-plus").css("cursor", "default");
    // caching the object for performance reasons
    var $elem = $('.search-icon');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    setTimeout(function(){
		 $({deg: 0}).animate({deg: angle}, {
        duration: 1000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
				});
		 }
    	});
		 
		$(":animated").promise().done(function() {
			 //code here
			$( ".search-col" ).animate({
				 right: "+=150",
			  }, 1000, function(){
				
				$(".search-bar-row").fadeIn(1000, function(){
					
					$(".search-bar-col").append("<div class='cancel-btn'><a id='cancel' href='#'>Cancel</a></div>");
					$("#cancel").bind("click", function(){
						cancel();		
						
					});
				});
			});
		});
		 
		 
	 }, 200);
}

function cancel(){
	$("ul").empty();
	$(".search-bar-row").fadeOut(0);
	$(".cancel-btn").remove();
	$(".search-col").remove();
	$(".search-row").css("top", "39%");
	$(".search-bar-row").css("top", "40%");
	$(".search-row").append('<div class="col-md-8 col-md-offset-2 search-col"><div class="search-icon"><i class=" fa fa-search-plus fa-4x"></i></div></div>');
	$(".fa-search-plus").bind("click", function(){
		AnimateRotate(360);
	});
	$(".search-bar").val("");
	$(".fa-search-plus").css("cursor", "pointer");
	
}

function SearchResult(title, snippet){
	this.snippet=snippet;
	this.title=title;
	this.url='';
	this.setUrl = function(url){
		this.url=url;
	}
}

function displayResults(myResults){
	
	for(var i=0; i<myResults.length; i++){
		var headerTag = "<span class='link-header'>"+myResults[i].title+"</span></br>";
		var bodyTag = "<span class='link-body'>..."+myResults[i].snippet+"</span>";
		var final = "<a class='list-group-item' href='"+myResults[i].url+"' target='_blank'>"+headerTag+bodyTag+"</a>";
		$("ul").append(final);
	}
}

$(document).ready(function(){
	var page_top = $(window).scrollTop();
	$(".fa-search-plus").on("click", function(){
		
		AnimateRotate(360);
	});
	

	
	$("#search-submit").submit(function(e){
		e.preventDefault();
		
		$("ul").empty();
		$('.search-bar-row').animate({
			
			top: page_top+50,
		},500);
		$('.search-row').animate({
			top: page_top+50,
		},500, function(){
			
		//$('ul').append("<a class='list-group-item' href=''><span class='link-header'> Hello World</span><span class='link-body'><i class='fa fa-rocket'></i> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</span></a>");
		var query ="https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+$(".search-bar").val()+"&format=json&callback=?";
//$(".test-area").append("<p>"+"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+$(".search-bar").val()+"&format=json</p>");
		$.getJSON(query, function(data){
			//$(".test-area").append("<p>"+data.query.search[0].title+"</p>");
			//$(".test-area").append("<p>WORKING</p>");
			var myResults = [];
			var allTitles = "";
			for(var i=0; i<data.query.search.length; i++){
				var result = new SearchResult(data.query.search[i].title, data.query.search[i].snippet);
				myResults.push(result);
				//$(".test-area").append("<p>Results: "+myResults[i].title+"</p>");
				allTitles += data.query.search[i].title + "|";
			}
			//$(".test-area").append("<p>Results: "+allTitles.substr(0, allTitles.length-1)+"</p>");
			
			var query2 = "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&titles="+allTitles.substr(0, allTitles.length-1)+"&format=json&callback=?";
			
			$.getJSON(query2, function(data2){
				var pages = data2.query.pages;
				var counter = 0;
				
				for (var single in pages) {
					myResults[counter].setUrl(pages[single].fullurl);	
					//$(".test-area").append("<p>A Page: "+myResults[counter].url+"</p>");
					counter++;
					
				}
				//$(".test-area").append("<p>A Page: "+pages+"</p>");
				displayResults(myResults);
				});
			
			});
		});
	
		});
		

});
