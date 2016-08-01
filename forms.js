//initializing global variables for use in the appendDom and the 'deleting' function
var salaries = 0;
var monthly = 0;
var saved = 0;
// initialize a new variable as an empty object
var values = {};
$(document).ready(function() {
    //sets the default values of number and salary to " " (First name and Last name didn't seem to need this to work)
    document.getElementById("employeenumber").value = " ";
    document.getElementById("employeesalary").value = " ";
    var array = [];
    $('#employeeinfo').on('submit', function(event) {
        //Prevents the page from uploading data to the server and clearing the fields
        event.preventDefault();
        //Switches the focus back to First Name to promote additional inputs
        $("#employeefirstname").focus();
        // convert the form inputs into an array
        var fields = $('#employeeinfo').serializeArray();
        // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
        fields.forEach(function(element, index, array) {
            // review index notation vs. dot notation on objects
            // here, dot notation wouldn't work
            values[element.name] = element.value;
        });
        if (isNaN(values.employeefirstname) == true && values.employeefirstname != " ") {
            if (isNaN(values.employeelastname) == true && values.employeelastname != " ") {
                if (isNaN(values.employeenumber) == false && values.employeenumber != " ") {
                    if (isNaN(values.employeetitle) == true && values.employeetitle != " ") {
                        if (isNaN(values.employeesalary) == false && values.employeesalary != " ") {
                            // clear out inputs
                            $('#employeeinfo').find('input[type=text]').val('');
                            // append to DOM
                            appendDom(values);
                            //resets the default values ofnumber and salary
                            document.getElementById("employeenumber").value = " ";
                            document.getElementById("employeesalary").value = " ";
                            $("div.person").on('mouseover', 500, function() {
                                $(this).stop().animate({
                                    marginLeft: 100,
                                    marginRight: 100
                                });
                            });
                            $("div.person").on('mouseleave', 500, function() {
                                $(this).stop().animate({
                                    marginLeft: 0,
                                    marginRight: 0
                                });
                            });

                        } else {
                            alert("Please enter Valid Salary Amount");
                            //switches focus to the field that is causing the issue
                            $("#employeesalary").focus();
                        }
                    } else {
                        alert("Please enter Valid Employee Title");
                        //switches focus to the field that is causing the issue
                        $("#employeetitle").focus();
                    }
                } else {
                    alert("Please enter Valid Employee Number");
                    //switches focus to the field that is causing the issue
                    $("#employeenumber").focus();
                }
            } else {
                alert("Please enter Valid Last Name");
                //switches focus to the field that is causing the issue
                $("#employeelastname").focus();
            }
        } else {
            alert("Please enter Valid First Name");
            //switches focus to the field that is causing the issue
            $("#employeefirstname").focus();
        }
    });

    function appendDom(empInfo) {
        $('#container').append('<div class="person"></div>');
        var employeeArray = [];
        //Selects the slot where the new .person will go
        var $el = $('#container').children().last();
        //Selects the Area to replace the Monthly total
        var $appThis = $('#monTotals').children('p');
        //Increases the Global Salary
        salaries += parseInt(empInfo.employeesalary);
        //Sets the Global Monthly
        monthly = (salaries / 12);
        //Turns Monthly into a string with 2 decimal points
        monthly = monthly.toFixed(2);
        //pushes all info relating to the person to employeeArray
        employeeArray.push(empInfo.employeefirstname, empInfo.employeelastname, empInfo.employeenumber, empInfo.employeetitle, empInfo.employeesalary);
        //Adds this line of text to be displayed in our dynamically created .person
        $el.append('<p>' + "Employee Name: " + employeeArray[0] + " " + employeeArray[1] + " Employee Number: #" + employeeArray[2] + " " + "Employee Title: " + employeeArray[3] + " " + " Employee Salary: $" + employeeArray[4] + '<p>');
        //replaces the line of text with the monthly total with the current totals
        $appThis.replaceWith('<p>' + "The Monthly Total is: $" + (monthly) + '</p>');
        //creates a delete button for each .person
        $el.append('<button class="delete">Delete</button>');
        //Setting up the actions to take when the delete button is clicked
        $("#container").off().on("click", ".delete", function() {
            //Actually removes the field the .person was residing in
            $(this).remove(".person");
            //Fade out effect applied
            $(this).parent().fadeOut(100, function() {
                var val = "";
                //converts the output from our first $el.append and converts it into a single string
                val = ($(this).children("p").text());
                //this searches the new string for something that matches Employee Salary and returns it's index #
                var first = val.search("Employee Salary");
                //This will return the index of the last character
                var second = val.length;
                //redeclares the variable because this function wasn't able to operate with it being Global (?)
                var $appThis = $('#monTotals').children('p');
                //Searches through the text and finds the section that is the yearly salary
                saved = val.substring((first + 18), (second));
                //subtracts the deleted salary from the Global salary
                salaries -= saved;
                //Corrects the Monthly total to reflect the missing Salary
                monthly = salaries / 12;
                //Converts to string with 2 decimal points
                monthly = monthly.toFixed(2);
                //replaces our Previous showing monthly with the corrected one
                $appThis.replaceWith('<p>' + "The Monthly Total is: $" + (monthly) + '</p>');
                //Switches the focus to promote new input
                $("#employeefirstname").focus();
            });
        });
    };
});
