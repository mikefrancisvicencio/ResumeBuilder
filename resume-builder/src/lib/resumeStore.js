import { create } from "zustand";

const useResumeStore = create((set) => ({
  name: undefined,
  phone: undefined,
  linkedin: undefined,
  github: undefined,
  email: undefined,
  summaryStatement: undefined,
  education: undefined,
  skills: undefined,
  projects: undefined,
  experience: undefined,
  certifications: undefined,

  resetResume: () =>
    set(() => ({
      name: undefined,
      phone: undefined,
      linkedin: undefined,
      github: undefined,
      email: undefined,
      summaryStatement: undefined,
      education: undefined,
      skills: undefined,
      projects: undefined,
      experience: undefined,
      certifications: undefined,
    })),

  setResume: ({
    name,
    phone,
    linkedin,
    github,
    email,
    summaryStatement,
    education,
    skills,
    projects,
    experience,
    certifications,
  }) =>
    set(() => ({
      name,
      phone,
      linkedin,
      github,
      email,
      summaryStatement,
      education,
      skills,
      projects,
      experience,
      certifications,
    })),
}));

export default useResumeStore;
