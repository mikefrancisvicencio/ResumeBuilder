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

    generateSections() {
        var sectionsArray = [];
        var inputData = this.queryInputLog[0]; // Assuming you want to use the first set of input data

        sectionsArray.push(new Section("Name", inputData.name));
        sectionsArray.push(new Section("Phone Number", inputData.phone));
        sectionsArray.push(new Section("Email", inputData.email));
        sectionsArray.push(new Section("Summary Statement", inputData.summaryStatement));
        sectionsArray.push(new Section("Education", inputData.education));
        sectionsArray.push(new Section("Skills", inputData.skills));

        return sectionsArray;
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

class StoredLog { //Will be needed when we have a database implementation
    constructor() {
        this.Users = [];
        this.resumeIds = [];
        this.resumes = [];
    }
    updateLog(user, resume) {
        // Check if the user is already in the Users array
        if (!this.Users.some(u => u.name === user.name)) {
            this.Users.push(user);
        }

        // Add the resume to the resumes array
        this.resumes.push(resume);

        // Update the resumeIds array
        this.resumeIds.push(resume.resumeId);
    }
    updateUsers() {}
    updateIds() {}
}

class Resume {
    constructor(owner, sections) {
        this.resumeName;
        this.resumeId = this.resumeIDGenerator();
        this.pdf = null;
        this.comments = [];
        this.allowedViewers = [];
        this.sections = sections;
        this.owner = owner;
    }

    resumeIDGenerator() {
        return Math.floor(10000 + Math.random() * 90000);
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
var dbTemp = new StoredLog;
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nextButton').addEventListener('click', function() {
        var inputLog = new InputLog();
        inputLog.updateQueryInputLog();
        var newUser = new User();
        newUser.changeName(inputLog.queryInputLog[0].name);
        var newResume = new Resume(newUser,inputLog.generateSections());
        dbTemp.updateLog(newUser,newResume);
        //console.log(inputLog.queryInputLog);
        console.log(newUser.getName());
        console.log(newResume.resumeId); // Log the resume ID
        console.log(newResume.sections);  
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateResumeButton').addEventListener('click', function() {
        // Check if there are any resumes in the dbTemp object
        if (dbTemp.resumes.length > 0) {
            // Get the first resume from the dbTemp object
            const firstResume = dbTemp.resumes[0];

            // Use the first resume's sections to generate the resume content
            let resumeContent = '';
            firstResume.sections.forEach(section => {
                resumeContent += `<h4>${section.header}</h4><p>${section.content}</p>`;
            });

            // Display the generated resume
            document.getElementById('resumeContent').innerHTML = resumeContent;
            document.getElementById('resumeDisplayArea').style.display = 'block';
        } else {
            // If there are no resumes in the dbTemp object, display a message
            document.getElementById('resumeContent').textContent = 'No resumes found.';
            document.getElementById('resumeDisplayArea').style.display = 'none';
        }
    });
});

function generateResumePreview(resumeSections) {
    // Get the preview area element
    const previewArea = document.getElementById('resumePreview');

    // Clear any existing content
    previewArea.innerHTML = '';

    // Create and append elements for each section of the resume
    resumeSections.forEach(section => {
        const sectionElement = document.createElement('div');
        sectionElement.classList.add('section');
        sectionElement.innerHTML = `
            <div class="section-header">${section.header}</div>
            <div class="section-content">${section.content}</div>
        `;
        previewArea.appendChild(sectionElement);
    });
}




