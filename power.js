class InputLog {
    constructor() {
        this.queryInputLog = [];
        this.queryInputs = [];
    }
    // Method to update the queryInputLog with input values
    updateQueryInputLog() {
        var name = document.getElementById('nameInput').value;
        var phone = document.getElementById('phone').value;
        var linkedin = document.getElementById('linkedin').value;
        var github = document.getElementById('github').value;
        var email = document.getElementById('email').value;
        var summaryStatement = document.getElementById('summaryStatement').value;
        var education = document.getElementById('education').value;
        var skills = document.getElementById('skills').value;
        var projects = document.getElementById('projects').value;
        var experience = document.getElementById('experience').value;
        var certifications = document.getElementById('certifications').value;

        // Pushing an object with all input values to the queryInputLog array
        this.queryInputLog.push({
            name: name,
            phone: phone,
            linkedin: linkedin,
            github: github,
            email: email,
            summaryStatement: summaryStatement,
            education: education,
            skills: skills,
            projects: projects,
            experience: experience,
            certifications: certifications
        });
    }

    generateSections() {
        var sectionsArray = [];
        var inputData = this.queryInputLog[0]; // Assuming you want to use the first set of input data
        sectionsArray.push(new Section("", `<div class="name">${inputData.name}</div>`));
        sectionsArray.push(new Section("", `<div class="phone">${inputData.phone}</div>`));
        sectionsArray.push(new Section("", `<div class="linkedIn">${inputData.linkedin}</div>`));
        sectionsArray.push(new Section("", `<div class="github">${inputData.github}</div>`));
        sectionsArray.push(new Section("", `<div class="email">${inputData.email}</div>`));
        sectionsArray.push(new Section("", `<div class="summary">${inputData.summaryStatement}</div>`));
        sectionsArray.push(new Section("Your Education", `<div class="education">${inputData.education}</div>`));
        sectionsArray.push(new Section("Your Skills", `<div class="skills">${inputData.skills}</div>`));
        sectionsArray.push(new Section("Projects", `<div class="projects">${inputData.projects}</div>`));
        sectionsArray.push(new Section("Experience", `<div class="experience">${inputData.experience}</div>`));
        sectionsArray.push(new Section("Certifications", `<div class="certifications">${inputData.certifications}</div>`));
        return sectionsArray;
    }
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
var dbTemp = new StoredLog;

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

    generateHTML() {
        // If header is empty, return only content wrapped in a div
        if (this.header === "") {
            return `<div>${this.content}</div>`;
        } else {
            // If header is not empty, return header and content
            return `<h4>${this.header}</h4><p>${this.content}</p>`;
        }
    }
}


class Comment {
    constructor(user, text) {
        this.User = user;
        this.text = text;
        this.textColor = 'black';
    }
}


//Event listener for next button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nextButton').addEventListener('click', function() {
        var inputLog = new InputLog();
        inputLog.updateQueryInputLog();
        var newUser = new User();
        newUser.changeName(inputLog.queryInputLog[0].name);
        var newResume = new Resume(newUser,inputLog.generateSections());
        dbTemp.updateLog(newUser,newResume);
        console.log(newUser.getName());
        console.log(newResume.resumeId);
        console.log(newResume.sections);  
    });
});

//Event Listener for Generate Resume Button
// Event Listener for Generate Resume Button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateResumeButton').addEventListener('click', function() {
        // Check if inputLog has any entries
        if (dbTemp.resumes.length > 0) {
            const latestInputLog = dbTemp.resumes[dbTemp.resumes.length - 1];

            // Push the User's name into the dbTemp's Users array
            const currentUser = new User(latestInputLog.sections[0].content); // Assuming first section is name
            dbTemp.Users.push(currentUser);

            // Push the Resume's resumeId into the dbTemp's resumeIds array
            dbTemp.resumeIds.push(latestInputLog.resumeId);

            // Push the resume object into the dbTemp's resumes array
            dbTemp.resumes.push(latestInputLog);

            // Now generate the resume preview
            generateResumePreview(latestInputLog.sections, latestInputLog.comments);
            document.getElementById('resumeDisplayArea').style.display = 'block';
        } else {
            document.getElementById('resumeContent').textContent = 'No resumes found.';
            document.getElementById('resumeDisplayArea').style.display = 'none';
        }
    });
});

// ...

// Assuming we have a method that handles the creation of a new resume
function createNewResume() {
    var inputLog = new InputLog();
    inputLog.updateQueryInputLog();
    var newUser = new User(inputLog.queryInputLog[0].name); // Assuming the first input log is the name
    var newResume = new Resume(newUser, inputLog.generateSections());

    // Now update dbTemp with the new resume details
    dbTemp.updateLog(newUser, newResume);

    console.log(newUser.getName());
    console.log(newResume.resumeId);
    console.log(newResume.sections);
}

//Event Listener for Add Comment Button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addCommentButton').addEventListener('click', function() {
        if (dbTemp.resumes.length > 0) {
            const firstResume = dbTemp.resumes[0];
            const commentText = document.getElementById('comments').value || "Please let me know how I can make my resume better";
            const newComment = new Comment(new User(firstResume.owner.name), commentText);
            firstResume.comments.push(newComment);
            generateResumePreview(firstResume.sections, firstResume.comments);
        }
    });
});

//Event Listener for Add Comment to Resume Button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addCommentToResumeButton').addEventListener('click', function() {
        if (dbTemp.resumes.length > 0) {
            const firstResume = dbTemp.resumes[0];
            const commentText = prompt("Enter your comment:");
            if (commentText) {
                const newComment = new Comment(new User(firstResume.owner.name), commentText);
                firstResume.comments.push(newComment);
                generateResumePreview(firstResume.sections, firstResume.comments);
            }
        }
    });
});

function generateResumePreview(resumeSections, resumeComments) {
    const previewArea = document.getElementById('resumeContent');
    const commentArea = document.getElementById('commentDisplayArea');

    // Clear existing content
    previewArea.innerHTML = '';
    commentArea.innerHTML = '';

    // Generate sections
    resumeSections.forEach(section => {
        const sectionHTML = section.generateHTML();
        previewArea.innerHTML += sectionHTML;
    });

    // Generate comments
    if (resumeComments.length > 0) {
        const commentsSection = document.createElement('div');
        commentsSection.classList.add('section');
        commentsSection.innerHTML = '<h4>Comments:</h4>';
        resumeComments.forEach(comment => {
            commentsSection.innerHTML += `<p><strong>${comment.User.getName()}:</strong> ${comment.text}</p>`;
        });
        commentArea.appendChild(commentsSection);
        commentArea.style.display = 'block'; // Ensure the comment area is visible
    } else {
        commentArea.style.display = 'none'; // Hide the comment area if there are no comments
    }
}

// add a function that handles Download pdf exactly how it is displayed on the document page
function downloadPDF() {
    const jsPDF = window.jspdf.jsPDF;

    // First, we ensure that the resume content is visible for html2canvas
    const resumeDisplayArea = document.getElementById('resumeDisplayArea');
    resumeDisplayArea.style.display = 'block';

    // Use html2canvas to capture the content, excluding buttons
    html2canvas(resumeDisplayArea, {
        onclone: function(clonedDoc) {
            // Exclude elements you don't want to render in the PDF
            const excludeElements = clonedDoc.querySelectorAll('#downloadPdfButton, #addCommentToResumeButton, #addRoasterButton, #editSectionsButton');
            excludeElements.forEach(elem => elem.style.display = 'none');
        },
        scale: window.devicePixelRatio, // Use device pixel ratio for better resolution
        windowWidth: resumeDisplayArea.scrollWidth,
        windowHeight: resumeDisplayArea.scrollHeight,
        x: 0,
        y: window.pageYOffset,
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('resume.pdf');

        // Hide the display area again if necessary
        resumeDisplayArea.style.display = 'none';
    }).catch(error => {
        console.error('Error generating PDF: ', error);
    });
}

// Event listener for downloadPdfButton
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadPdfButton');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadPDF);
    } else {
        // Log if the button is not found
        console.error("Download PDF button not found.");
    }
});

//Event Listener for Edit Sections Button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('editSectionsButton').addEventListener('click', function() {
        if (dbTemp.resumes.length > 0) {
            const firstResume = dbTemp.resumes[0];
            openEditModal(firstResume.sections, firstResume.resumeId);
        }
    });
});

// Global variable to store the currently editing resume's ID
var currentEditingResumeId = null;

// Modified openEditModal function to accept resumeId
function openEditModal(resumeSections, resumeId) {
    currentEditingResumeId = resumeId; // Store the resumeId for later use

    const modal = document.getElementById('editModal');
    const modalContent = document.getElementById('modalContent');

    // Clear previous content
    modalContent.innerHTML = '';

    // Populate the modal with current resume sections for editing
    resumeSections.forEach(section => {
        const editableContent = extractTextContent(section.content); // Function to extract only text

        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('modal-section');
        sectionDiv.innerHTML = `
            <label>${section.header}</label>
            <textarea id="edit-${section.header}" rows="4" cols="50">${editableContent}</textarea>
        `;
        modalContent.appendChild(sectionDiv);
    });

    // Display the modal
    modal.style.display = 'block';

    // Attach event handlers for modal interactions
    attachModalEventHandlers();
}

function extractTextContent(htmlString) {
    // Create a new div element and set its innerHTML to the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    // Return the text content of the div, effectively stripping out the HTML tags
    return tempDiv.textContent || tempDiv.innerText || "";
}

function attachModalEventHandlers() {
    // Close modal when the close button or outside the modal is clicked
    const closeButton = document.querySelector('.close');
    const modal = document.getElementById('editModal');
    window.onclick = function(event) {
        if (event.target == modal || event.target == closeButton) {
            modal.style.display = 'none';
        }
    };

    // Save button click event
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.removeEventListener('click', saveModalChanges); // Remove previous event listener if exists
        saveButton.addEventListener('click', saveModalChanges);
    }
}

function saveModalChanges() {
    // Find the resume with the matching resumeId in dbTemp
    const editingResume = dbTemp.resumes.find(resume => resume.resumeId === currentEditingResumeId);

    if (editingResume) {
        editingResume.sections.forEach(section => {
            const editedContentElement = document.getElementById(`edit-${section.header}`);
            if (editedContentElement) {
                // Update the section content with the new value, wrapping it in a div again
                section.content = `<div class="${section.header.toLowerCase()}">${editedContentElement.value}</div>`;
            }
        });

        // Re-generate the resume preview with the edited sections
        generateResumePreview(editingResume.sections, editingResume.comments);
    }

    // Close the modal
    document.getElementById('editModal').style.display = 'none';

    // Clear the currentEditingResumeId
    currentEditingResumeId = null;
}

function saveEditedSections(resumeSections) {
    resumeSections.forEach(section => {
        const sectionElement = document.getElementById(`edit-${section.header}`);
        if (sectionElement) {
            section.content = sectionElement.value;
        }
    });

    // Generate the preview with the edited sections
    generateResumePreview(resumeSections, []);
}




