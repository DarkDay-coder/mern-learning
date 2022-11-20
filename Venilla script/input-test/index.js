let students =[]
let student = {
    name: "",
    marks: null,
    result: "",
    percentage: null
}
const userInput = () => {
    const name = prompt("Enter Student Name: ");
    let mark = validateMarks(Number(prompt("Enter total marks obtained: "))); 
    let pf;
    

    let percent = mark / 500 * 100;
    if(percent<40){
        pf = "fail"
    } else {
        pf = "pass"
    }
    let div = checkDivision(percent);
    
    student = {
        ...div,
        name: name,
        marks: mark,
        result: pf,
        percentage: percent,
    }

    students.push(student);
    console.log(students)
    let html = "";

    for(let i = 0; i<students.length; i++){
        html += "<tr>"
        html += "<td>"+(i + 1) +"</td>"
        html += "<td>"+ students[i].name +"</td>"
        html += "<td>"+ students[i].marks+"</td>"
        html += "<td>"+ students[i].Division+"</td>"
        html += "<td>"+ students[i].result + "</td>"
        html += "<td>"+ students[i].percentage +"</td>"
        html += "</tr>"
    }
    document.getElementById('content').innerHTML = html;
}

const checkDivision = (percent) => {
    let result = {};
    if(percent>80){
        result = {
            Division: "Distinction"
        }
    } else if(percent>=60 && percent<80){
        result = {
            Division: "First Division"
        }
    }else if(percent>=50 && percent<60){
        result = {
            Division: "second division"
        }
    } else if(percent>=40 && percent<50){
        result = {
            Division: "third divison"
        }
    } else {
        result = {
            Division: "sorry! you failed the exam."
        }
    }
    return result;
}

const validateMarks = (marks) => {
    if(marks<=0 || marks>500){
        marks = Number(prompt("Please re-enter the marks(your marks can't be less than 0 or grater than 500)"))
        validateMarks(marks)
    } else{
        return marks;
    }
}


