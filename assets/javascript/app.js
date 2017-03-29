$(document).ready(function(){

var movies = ["Aladdin","Mulan","The Little Mermaid","Hercules"];

function displayGifs() {
	$("#disneyMoviesDisplay").empty();
	var movie = $(this).attr("data-disney");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		for(var i = 0; i < results.length; i++){
			var gifDiv = $("<div class='gifContainer'>");
			var disneyGif = $("<img>");
			var disneyGifRating = results[i].rating;
			var ratingDisplay = $("<p class='rating'>").text("RATING:" + " " + disneyGifRating);

			disneyGif.attr("src", results[i].images.original_still.url);
			disneyGif.attr("data-still", results[i].images.original_still.url);
			disneyGif.attr("data-animate", results[i].images.original.url);
			disneyGif.attr("data-state", "still");
			disneyGif.addClass("animateDisneyGif");

			gifDiv.prepend(ratingDisplay);
			gifDiv.prepend(disneyGif);
			$("#disneyMoviesDisplay").prepend(gifDiv);
		}
	})
}

function animateGifs() {

	var state = $(this).attr("data-state");

	if(state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

function createButton() {
	$("#buttonDisplay").empty();

	for(var i = 0; i < movies.length; i++){
		var newButton = $("<button>");
		newButton.attr("data-disney", movies[i]);
		newButton.addClass("gifButton btn btn-custom round");
		newButton.text(movies[i]);
		$("#buttonDisplay").append(newButton);
	}
}
createButton();

$("#add-movie").on("click", function(event) {
	event.preventDefault();

	var userMovie = $("#disneyMovie").val().trim();
	movies.push(userMovie);
	createButton();
})

$(document).on("click", ".gifButton", displayGifs).on("click", "#reset", createButton);
$(document).on("mouseover", ".animateDisneyGif", animateGifs).on("mouseleave", ".animateDisneyGif", animateGifs);

});