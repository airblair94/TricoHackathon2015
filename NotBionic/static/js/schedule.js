$(document).ready(function() {
    var schedule = $('#schedule');
    // Create the header information for the table
    schedule.append('<table id=schedule>');
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    schedule.append('<tr>')
    schedule.append('<th>Times</th>')
    for(var i=0;i<days.length;i++){
	schedule.append('<th>'+days[i]+'</th>');
    }
    schedule.append('</tr>');
    var time_counter = 8;
    for(var i=0;i<17;i++) {
	schedule.append('<tr>')
	for(var j=0;j<8;j++) {
	    if (j==0){
		if (i%2 == 0) {
		    schedule.append('<td>'+time_counter.toString()+':00</td>');
		}
		else {
		    schedule.append('<td>'+time_counter.toString()+':30</td>');
		}
	    }
	    else {
		if(i%2 == 0){
		    schedule.append('<td id="'+days[j-1].toString()+'-'+time_counter.toString()+'00"></td>');
		}
		else if(time_counter-1==0){
		    schedule.append('<td id="'+days[j-1].toString()+'-1230"></td>');
		}
		else {
		    // need to subtract 1 from time counter because it is incremented prematurely above
		    schedule.append('<td id="'+days[j-1].toString()+'-'+(time_counter-1).toString()+'30"></td>');
		}
	    }
	    if (time_counter == 12 && i%2 != 0 && j==0) {
		time_counter = 1;
	    }   
	    else if (i%2 != 0 && j==0) {
		time_counter++;
	    }
	}
	schedule.append('</tr>');
    }
    // need this to change the given day information into the same form as the one used for the class labeling
    var days_key = {'M':'Monday','T':'Tuesday','W':'Wednesday','Th':'Thursday','F':'Friday'};
    $.get( "/user_courses/", function( data ) {
	for(var i=0;i<data.schedule.length;i++) {
	    $.get( "/course/"+data.schedule[i]+"/", function( course ) {
		console.log(course)
		var start_time = course.start_times[0];
		var end_time = course.end_times[0];
		var days = course.days;
		var start_hour = 0;
		var start_minute = 0;
		var end_hour = 0;
		var end_minute = 0;
		if(start_time.charAt(0) == "0") {
		    start_hour = parseInt(start_time.charAt(1));
		}
		else {
		    start_hour = parseInt(start_time.substring(0,2));
		}
		var min = parseInt(start_time.charAt(3));
		if(min < 3) {
		    start_minute = "00";
		}
		else{
		    start_minute = '30';
		}
		if(end_time.charAt(0) == "0") {
		    end_hour = parseInt(end_time.charAt(1));
		}
		else {
		    end_hour = parseInt(end_time.substring(0,2));
		}
		var min = parseInt(end_time.charAt(3));
		console.log("course:",course)
		console.log("min",min)
		if(min < 3) {
		    end_minute = "00";
		}
		else{
		    end_minute = '30';
		}
		for(var j=0;j<days.length;j++) {
		    console.log("here!!")
		    var temp_hour = start_hour;
		    var temp_minute = start_minute;
		    var counter = 0;	
		    while(temp_hour != end_hour || temp_minute != end_minute) {
		    console.log("temp_hour:",temp_hour)
		    console.log("end_hour:",end_hour)
		    console.log("temp_minute:",temp_minute)
		    console.log("end_minute:",end_minute)
			$('#'+days_key[days[j]]+'-'+temp_hour+temp_minute).css('background-color','black');
			if(temp_hour == 12 && temp_minute == '30') {
			    temp_hour = 1;
			}
			else if (temp_minute == '30') {
			    temp_hour++;
			}
			if(temp_minute == '30'){
			    temp_minute = '00';
			}
			else {
			    temp_minute = '30'
			}
		    }
		    //$('#'+days_key[days[j]]+'-'+temp_hour+temp_minute).css('background-color','black');
		    
		}
	    }); 
	}
    });
});

