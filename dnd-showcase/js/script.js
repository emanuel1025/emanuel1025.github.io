
var savThrowsDict = {
	"STR" : 'Strength',
	'DEX' : 'Dexterity',
	'CON' : 'Constitution',
	'CHA' : 'Charisma',
	'WIS' : 'Wisdom',
	'INT' : 'Intelligence'
}

$(document).ready(function () {
	$.ajax({
        url: "https://www.dnd5eapi.co/api/classes/",
        crossDomain: true,
        data: {},
        success: function (response) {
            
            $('#noResult').css('display', 'hidden');
            if (response.count && response.results && response.results.length) {
            	
            	var className = window.location.search.substring(7, window.location.search.length);
            	
            	if (className) {
            		for (var i = 0; i < response.results.length; i++) {
            			if (response.results[i].name == className) {
            				$.ajax({
						        url: response.results[i].url,
						        crossDomain: true,
						        data: {},
						        success: function (classData) {

									$('#bImage').css('background-image', "url('images/classes/" + classData.name + ".jpg')");
									$('#bImage').css('background-size', 'cover');
									$('#className').text(classData.name);

									insertDataRow('Hit Die', '1d' + classData.hit_die);

									var proficiencies = [];

									if (classData.proficiencies) {
										for (j = 0; j < classData.proficiencies.length; j++) {
											proficiencies.push(classData.proficiencies[j].name);
										}

										insertDataRow('Proficiencies', proficiencies.join(', '));
									}


									var toolsList = {
										amnt: 0,
										choices: []
									};
									var profChoiceList = {
										amnt: 0,
										choices: []
									};

									if (classData.proficiency_choices) {
										for (j = 0; j < classData.proficiency_choices.length; j++) {
											// proficiencies.push(classData.proficiency_choices[j].name);

											if (classData.proficiency_choices[j].type == 'choice') {
												for (k = 0; k < classData.proficiency_choices[j].from.length; k++) {
													classData.proficiency_choices[j].from[k].from.forEach(function(item) {
														toolsList.choices.push(item.name);
													})
												}

												toolsList.amnt += classData.proficiency_choices[j].choose;

											}
											if (classData.proficiency_choices[j].type == "proficiencies") {
												for (k = 0; k < classData.proficiency_choices[j].from.length; k++) {

													var textToAdd = classData.proficiency_choices[j].from[k].name;

													if (textToAdd.indexOf('Skill: ') >= 0)
														profChoiceList.choices.push(textToAdd.split('Skill: ')[1]);
													else
														profChoiceList.choices.push(textToAdd);
												}

												profChoiceList.amnt += classData.proficiency_choices[j].choose;
											}
										}

										if (toolsList.choices && toolsList.choices.length)
											insertDataRow('Tools', 'Choose ' + toolsList.amnt + ' from ' + toolsList.choices.join(', '));
										if (profChoiceList.choices && profChoiceList.choices.length)
											insertDataRow('Skills', 'Choose ' + profChoiceList.amnt + ' from ' + profChoiceList.choices.join(', '));
									}

									if (classData.saving_throws) {

										var savThrows = [];
										classData.saving_throws.forEach(function(save) {
											savThrows.push(savThrowsDict[save.name]);
										})

										insertDataRow('Saving Throw Proficiencies', savThrows.join(', '));
									}

									if (classData.subclasses) {
										var subClasses = [];

										classData.subclasses.forEach(function(classN){
											subClasses.push(classN.name);
										})

										insertDataRow('Subclasses', subClasses.join(', '));
									}
						        },
						        error: function (xhr, status) {
						            alert("error");
						        }
						    });

            			}
            		}
            	}

            }
            else 
            	$('#noResult').css('display', 'block');
        },
        error: function (xhr, status) {
            alert("error");
        }
    });
});


var viewClass = function(className) {
	console.log(className, window.location);
	window.location.href = "class.html?class=" + className;
}

var insertDataRow = function(header, desc) {
	$('#dataContainer').append('<div><h2>' + header + '</h2><p>' + desc + '</p></div>');
}



