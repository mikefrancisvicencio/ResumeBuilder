/**
 * ============================= CLASS DEFS ================================
 * =========================================================================
 */
class InputLog {
  constructor() {
    this.queryInputLog = [];
    console.log("InputLog created:", this);
  }

  updateQueryInputLog() {
    const fields = [
      "nameInput",
      "phone",
      "linkedin",
      "github",
      "email",
      "summaryStatement",
      "education",
      "skills",
      "projects",
      "experience",
      "certifications",
    ];
    const inputData = {};
    fields.forEach(
      (field) => (inputData[field] = document.getElementById(field).value)
    );
    this.queryInputLog.push(inputData);
    console.log("InputLog updated:", this.queryInputLog);
  }

  generateSections() {
    const inputData = this.queryInputLog[0];
    return Object.keys(inputData).map((key, index) => {
      const header = index < 5 ? "" : this.formatHeader(key);
      return new Section(header, `<div class="${key}">${inputData[key]}</div>`);
    });
  }

  formatHeader(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
}

class User {
  constructor(name) {
    this.isNewUser = true;
    this.resumes = [];
    this.name = name;
    this.isViewer = false;
    console.log("User created:", this);
  }

  changeName(newName) {
    this.name = newName;
    console.log("User name changed:", this.name);
  }

  getName() {
    return this.name;
  }
}

class StoredLog {
  constructor() {
    this.Users = [];
    this.resumeIds = [];
    this.resumes = [];
    console.log("StoredLog created:", this);
  }

  updateLog(user, resume) {
    if (!this.Users.some((u) => u.name === user.name)) {
      this.Users.push(user);
    }
    this.resumes.push(resume);
    this.resumeIds.push(resume.resumeId);
    console.log("StoredLog updated:", this);
  }
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
    console.log("Resume created:", this);
  }

  resumeIDGenerator() {
    return Math.floor(10000 + Math.random() * 90000);
  }
}

class Section {
  constructor(header, content) {
    this.header = header;
    this.content = content;
    console.log("Section created:", this);
  }

  generateHTML() {
    return this.header
      ? // <h4>${this.header}</h4> <hr> <p>${this.content}</p>
        `<h4>${this.header}</h4> <p>${this.content}</p>`
      : `<div>${this.content}</div>`;
  }
}

class Comment {
  constructor(user, text) {
    this.User = user;
    this.text = text;
    this.textColor = "black";
    console.log("Comment created:", this);
  }
}

/**
 * =========================== INITIAL SETUP ===============================
 * =========================================================================
 */

const dbTemp = new StoredLog();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nextButton").addEventListener("click", () => {
    const inputLog = new InputLog();
    inputLog.updateQueryInputLog();
    const newUser = new User(inputLog.queryInputLog[0].nameInput);
    const newResume = new Resume(newUser, inputLog.generateSections());
    dbTemp.updateLog(newUser, newResume);
    console.log("New user and resume created:", newUser, newResume);
  });

  /**
   * =========================== MAIN BUTTONS  ==============================
   * =========================================================================
   */
  // main --> generate resume
  function generateResumePreview(resumeSections, resumeComments) {
    const previewArea = document.getElementById("resumeContent");
    const commentArea = document.getElementById("commentDisplayArea");
    previewArea.innerHTML = "";
    commentArea.innerHTML = "";
    resumeSections.forEach((section) => {
      previewArea.innerHTML += section.generateHTML();
    });
    if (resumeComments.length > 0) {
      const commentsHTML = resumeComments
        .map(
          (comment) =>
            `<p><strong>${comment.User.getName()}:</strong> ${comment.text}</p>`
        )
        .join("");
      commentArea.innerHTML = `<div class="section"><h4>Comments:</h4>${commentsHTML}</div> <span class="close" onclick="closeCommentDisplay()">&times;</span>
    `;
      commentArea.style.display = "block";
    } else {
      commentArea.style.display = "none";
    }
  }

  // main --> view comments
  document
    .getElementById("viewCommentsButton")
    .addEventListener("click", () => {
      if (dbTemp.resumes.length > 0) {
        const firstResume = dbTemp.resumes[0];
        const commentText =
          document.getElementById("comments").value ||
          "Please let me know how I can make my resume better";
        const newComment = new Comment(
          new User(firstResume.owner.name),
          commentText
        );
        firstResume.comments.push(newComment);
        generateResumePreview(firstResume.sections, firstResume.comments);
        console.log("Added comment to resume:", newComment);
      } else {
        alert("Need to save a resume first!");
      }
    });

  // sub --> generate --> allowed viewers pg
  document.getElementById("subGenerateButton").addEventListener("click", () => {
    if (dbTemp.resumes.length > 0) {
      const latestResume = dbTemp.resumes[dbTemp.resumes.length - 1];
      const currentUser = new User(latestResume.owner.name);
      dbTemp.Users.push(currentUser);
      dbTemp.resumeIds.push(latestResume.resumeId);
      dbTemp.resumes.push(latestResume);

      // get allowed viewers from input field and add them to resume
      const allowedViewersInput = document.getElementById(
        "allowedViewersInput"
      ).value;
      const allowedViewers = allowedViewersInput
        .split(",")
        .map((viewer) => viewer.trim());
      latestResume.allowedViewers.push(...allowedViewers);

      generateResumePreview(latestResume.sections, latestResume.comments);
      document.getElementById("resumeDisplayArea").style.display = "block";
      console.log("Generated resume:", latestResume);
    } else {
      // if no resume saved, then pop up saying save resume
      // first when trying to generate a resume
      alert("Need to save a resume first!");
      document.getElementById("resumeContent").textContent =
        "No resumes found.";
      document.getElementById("resumeDisplayArea").style.display = "none";
    }
  });

  // sub --> generate --> within resume display --> add comments
  document
    .getElementById("addCommentToResumeButton")
    .addEventListener("click", () => {
      if (dbTemp.resumes.length > 0) {
        const firstResume = dbTemp.resumes[0];
        const commentText = prompt("Enter your comment:");
        if (commentText) {
          const newComment = new Comment(
            new User(firstResume.owner.name),
            commentText
          );
          firstResume.comments.push(newComment);
          generateResumePreview(firstResume.sections, firstResume.comments);
          console.log("Added comment to resume:", newComment);
        }
      }
    });

  // sub --> generate --> within resume display --> edit sections
  document
    .getElementById("editSectionsButton")
    .addEventListener("click", () => {
      if (dbTemp.resumes.length > 0) {
        const firstResume = dbTemp.resumes[0];
        openEditModal(firstResume.sections, firstResume.resumeId);
      }
    });

  // sub --> generate --> within resume display --> download PDF
  const downloadButton = document.getElementById("downloadPdfButton");
  if (downloadButton) {
    downloadButton.addEventListener("click", downloadPDF);
  } else {
    console.error("Download PDF button not found.");
  }
});

/**
 * =========================== EDIT SECTION  ===============================
 * =========================================================================
 */
// generate --> resume display --> edit
let currentEditingResumeId = null;

function openEditModal(resumeSections, resumeId) {
  currentEditingResumeId = resumeId;
  const modal = document.getElementById("editModal");
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = "";
  resumeSections.forEach((section, index) => {
    const editableContent = extractTextContent(section.content);
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("modal-section");
    sectionDiv.innerHTML =
      index < 5
        ? `<div class="non-editable-content">${editableContent}</div>`
        : `<label>${section.header}</label><textarea id="edit-${section.header}" rows="4" cols="50">${editableContent}</textarea>`;
    modalContent.appendChild(sectionDiv);
  });
  modal.style.display = "block";
  attachModalEventHandlers();
}

function extractTextContent(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function attachModalEventHandlers() {
  const saveButton = document.getElementById("saveButton");
  if (saveButton) {
    saveButton.removeEventListener("click", saveModalChanges);
    saveButton.addEventListener("click", saveModalChanges);
  }
}

// SAVE CHANGES ==============================================================
function saveModalChanges() {
  const editingResume = dbTemp.resumes.find(
    (resume) => resume.resumeId === currentEditingResumeId
  );
  if (editingResume) {
    editingResume.sections.forEach((section, index) => {
      if (index >= 5) {
        const editedContentElement = document.getElementById(
          `edit-${section.header}`
        );
        if (editedContentElement) {
          const className = section.content.match(/class="([^"]+)"/)[1];
          section.content = `<div class="${className}">${editedContentElement.value}</div>`;
        }
      }
    });
    generateResumePreview(editingResume.sections, editingResume.comments);
  }
  document.getElementById("editModal").style.display = "none";
  currentEditingResumeId = null;
}

// CLOSING  ==========================================================
function closeResumeDisplay() {
  document.getElementById("resumeDisplayArea").style.display = "none";
}

function closeEditDisplay() {
  document.getElementById("editModal").style.display = "none";
}

function closeCommentDisplay() {
  document.getElementById("commentDisplayArea").style.display = "none";
}

/**
 * ============================= ADD ROASTER ===============================
 * =========================================================================
 */
// generate --> resume display --> add roaster
// Event listener for opening Add Roaster modal
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addRoasterButton").addEventListener("click", () => {
    document.getElementById("addRoasterModal").style.display = "block";
  });

  // Event listener for closing Add Roaster modal
  document
    .querySelector("#addRoasterModal .close")
    .addEventListener("click", function () {
      document.getElementById("addRoasterModal").style.display = "none";
    });

  // Event listener for saving roaster
  document
    .getElementById("saveRoasterButton")
    .addEventListener("click", function () {
      var roasterName = document.getElementById("roasterNameInput").value;
      if (roasterName) {
        // Assuming you want to add roaster to first resume
        if (dbTemp.resumes.length > 0) {
          const firstResume = dbTemp.resumes[0];
          firstResume.allowedViewers.push(roasterName);
          console.log(`Added roaster: ${roasterName}`);
          // Update resume preview to display new roaster
          generateResumePreview(firstResume.sections, firstResume.comments);
        }
      }
      // Clear input field and close modal
      document.getElementById("roasterNameInput").value = "";
      document.getElementById("addRoasterModal").style.display = "none";
    });
});

/**
 * =========================== PDF GENERATING ==============================
 * =========================================================================
 */
function downloadPDF() {
  const jsPDF = window.jspdf.jsPDF;
  const resumeDisplayArea = document.getElementById("resumeDisplayArea");
  resumeDisplayArea.style.display = "block";
  html2canvas(resumeDisplayArea, {
    onclone: (clonedDoc) => {
      clonedDoc
        .querySelectorAll(
          "#downloadPdfButton, #addCommentToResumeButton, #addRoasterButton, #editSectionsButton, #closeResumeButton"
        )
        .forEach((elem) => (elem.style.display = "none"));
    },
    scale: window.devicePixelRatio,
    windowWidth: resumeDisplayArea.scrollWidth,
    windowHeight: resumeDisplayArea.scrollHeight,
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });
      // calculate scaling to fit canvas image within 8.5 x 11 inches
      const imgWidth = 8.5;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
      resumeDisplayArea.style.display = "none";
    })
    .catch((error) => {
      console.error("Error generating PDF: ", error);
    });
}