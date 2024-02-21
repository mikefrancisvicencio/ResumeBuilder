class InputLog {
    constructor() {
        this.queryInputLog = [];
        this.queryInputs = [];
    }
    // Method to update the queryInputLog with input values
    updateQueryInputLog() {
        var name = document.getElementById('nameInput').value;
        var phonenum = document.getElementById('phone').value; 
        var email = document.getElementById('email').value; 
        var summaryStatement = document.getElementById('summaryStatement').value;
        var education = document.getElementById('education').value;
        var skills = document.getElementById('skills').value;
    
        // Pushing an object with all input values to the queryInputLog array
        this.queryInputLog.push({
            name: name,
            phone: phonenum, 
            email: email, 
            summaryStatement: summaryStatement,
            education: education,
            skills: skills
        });
    }


//     queryName() {
//         //this.queryInputs = ["Please introduce yourself!", ""];
//     }
//     queryContactInfo() {
//         //this.queryInputs = ["How can recruiters contact you?", ""];
//     }
//     querySummaryStatement() {
//         //this.queryInputs = ["Describe who you are and highlight your values.", ""];
//     }
//     queryExperience() {
//         //this.queryInputs = ["What work related experience have you had?", ""];
//     }
//     queryEducation() {
//         //this.queryInputs = ["What education have you received to prepare you for the role that you are applying for?", ""];
//     }
//     querySkills() {
//         //this.queryInputs = ["What skills do you offer for the team you are applying for?", ""];
//     }
}

class User {
    constructor(name) {
        this.isNewUser = true;
        this.resumes = [];
        this.name = name;
        this.isViewer = false;
    }
    changeName(newName) {
        this.name = newName;
    }
    getName() {
        return this.name;
    }
    getResume() {}
}

class StoredLog {
    constructor() {
        this.Users = [];
        this.resumeIds = [];
    }

    updateUsers() {}
    updateIds() {}
}

class Resume {
    constructor(resumeId, owner) {
        this.resumeId = resumeId;
        this.pdf = null;
        this.comments = [];
        this.allowedViewers = [];
        this.sections = [];
        this.owner = owner;
    }

    jsPDF() {}
    downloadPDF() {}
    operation() {}
    edit() {}
    update() {}
}

class Section {
    constructor(header, content) {
        this.header = header;
        this.content = content;
    }
}

class Comment {
    constructor(user, text) {
        this.User = user;
        this.text = text;
        this.textColor = 'black';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nextButton').addEventListener('click', function() {
        var inputLog = new InputLog();
        inputLog.updateQueryInputLog();
        var newUser = new User();
        newUser.changeName(inputLog.queryInputLog[0].name);
        console.log(inputLog.queryInputLog);
        console.log(newUser.getName());

    });
});




