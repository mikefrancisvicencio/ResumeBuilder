/**
 * @typedef {Object} ResumeFormData
 * @property {string | undefined} nameInput
 * @property {string | undefined} phone
 * @property {string | undefined} linkedin
 * @property {string | undefined} github
 * @property {string | undefined} email
 * @property {string | undefined} summaryStatement
 * @property {string | undefined} education
 * @property {string | undefined} skills
 * @property {string | undefined} projects
 * @property {string | undefined} experience
 * @property {string | undefined} certifications
 */

/** @return {ResumeFormData | undefined} */
export const getResumeFromStorage = () => {
  const content = localStorage.getItem("current-resume");
  return content != null ? JSON.parse(content) : undefined;
};

export const resetResumeFromStorage = () =>
  localStorage.removeItem("current-resume");

export const saveResumeToStorage = (resume) =>
  localStorage.setItem("current-resume", JSON.stringify(resume));
