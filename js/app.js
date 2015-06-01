'use strict';

//global variables
var categories = [];

//console.log(projects);

function getCategories(){
	projects.forEach(function(project){
		var cat  = project.category;
		//not exist yet
		if (categories.indexOf(cat) == -1){
			categories.push(cat);	
		}
	});
	console.log(categories);
	compileAndDisplayTemplate("#categories-template", "#categories-location", categories);
	
	//compileAndDisplayTemplate("#projects-template", "#javascript", projects);
}

//covert projects to categories format
function getProjectsByCategory(){
	var javascript = [];
	var php = [];
	var wordpress = [];

	//clone categories
	var newCat = categories.slice();
	//create new array for each category
	for(var i=0; i < newCat.length; i++){
		var s =  newCat[i];
		newCat[s] = [];
	}

	projects.forEach(function(project){
		var cat  = project.category;	
		newCat[cat].push(project);
	});
	
	for(var i=0; i < newCat.length; i++){
		compileAndDisplayTemplate("#projects-template", "#"+newCat[i], newCat[newCat[i]]);		
	}
}

function compileAndDisplayTemplate(templateId, locationId, data){
	//console.log("templating..");
	var source = $(templateId).html();
	var template = Handlebars.compile(source);
	var html = template(data);
	//console.log(data);
	$(locationId).append(html);
}

function changeIframeContent(e){
	console.log(this);
	e.preventDefault();
	var href = $(this).attr('href');
	$('iframe').prop('src', href);
	//return false;
}


$(function() {
	getCategories();
	getProjectsByCategory();
	


	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	//listen to click event on anchor tag
	//change iframe
	$("ul.collapse").on('click', 'a', changeIframeContent);
});
