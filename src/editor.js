import { getResumeFromStorage, saveResumeToStorage } from "./storage.js";

/**
 * Get the FormData from the resume form and convert it into an Object.
 *
 * @returns {import("./storage").ResumeFormData}
 * */
export const getResumeFormData = () => {
  const resumeForm = document.getElementById("resume-form");
  const formData = new FormData(resumeForm);
  return Object.fromEntries(formData.entries());
};

/**
 * Submit the form and save the resume data to the storage
 *
 * @param {SubmitEvent} e
 */
export const submitResumeForm = (e) => {
  e.preventDefault();

  const formData = getResumeFormData();
  // TODO: do stuff with data...

  saveResumeToStorage(formData);
};

/**
 * Initialize the editor by attaching the submit handler to the form element
 * and populating the form with the resume data from the storage.
 */
export const initializeEditor = () => {
  const resumeForm = document.getElementById("resume-form");

  // Attach the submit handler to the form element
  resumeForm.addEventListener("submit", submitResumeForm);

  // Populate the form with the resume data from the storage by finding
  // corresponding input elements and setting their value to the resume data
  const resumeData = getResumeFromStorage();
  for (const key in resumeData) {
    const input = resumeForm.elements[key];
    if (input) input.value = resumeData[key];
  }
};
