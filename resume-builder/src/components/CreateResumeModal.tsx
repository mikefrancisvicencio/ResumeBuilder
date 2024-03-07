import { Button, FormLabel, Form, Modal, FormGroup } from "react-bootstrap";
import useResumeStore from "../lib/resumeStore";

function CreateResumeModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const {
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
    setResume,
  } = useResumeStore();

  const handleCreateResume = (e: any) => {
    e.preventDefault();
    const form = e.target;
    setResume({
      name: form.formName.value,
      phone: form.formPhone.value,
      linkedin: form.formLinkedIn.value,
      github: form.formGithhub.value,
      email: form.formEmail.value,
      summaryStatement: form.formIntro.value,
      education: form.formEducation.value,
      skills: form.formSkills.value,
      projects: form.formProjects.value,
      experience: form.formExperience.value,
      certifications: form.formCertifications.value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Please Introduce Yourself</Modal.Title>
        </div>
      </Modal.Header>

      <Form onSubmit={handleCreateResume} className="m-2">
        <Modal.Body className="m-2 flex flex-col gap-4">
          <FormGroup controlId="formName">
            <FormLabel>Name</FormLabel>
            <Form.Control
              type="name"
              placeholder="Enter name"
              defaultValue={name ?? "John Doe"}
            />
          </FormGroup>

          <FormGroup controlId="formPhone">
            <FormLabel>Phone</FormLabel>
            <Form.Control
              type="phone"
              placeholder="(###) ###-####"
              defaultValue={phone ?? "(123) 456-7890"}
            />
          </FormGroup>

          <FormGroup controlId="formEmail">
            <FormLabel>Email</FormLabel>
            <Form.Control
              type="email"
              placeholder="example@uw.edu"
              defaultValue={email ?? "johndoe@uw.edu"}
            />
          </FormGroup>

          <FormGroup controlId="formLinkedIn">
            <FormLabel>LinkedIn</FormLabel>
            <Form.Control
              type="linkedIn"
              placeholder="linkedin.com/in/username"
              defaultValue={linkedin ?? "linkedin.com/in/johndoe"}
            />
          </FormGroup>

          <FormGroup controlId="formGithhub">
            <FormLabel>Github</FormLabel>
            <Form.Control
              type="github"
              placeholder="github.com/username"
              defaultValue={github ?? "github.com/johndoe"}
            />
          </FormGroup>

          <FormGroup controlId="formIntro">
            <FormLabel>Introduction</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="introduction"
              placeholder="(Your First Name) is a talented..."
              defaultValue={
                summaryStatement ??
                "As a passionate programming student, I am adept at learning new technologies and applying them to solve problems. With a strong foundation in programming concepts and languages such as Python, Java, and C++, I am eager to contribute to innovative projects. Seeking opportunities to leverage my skills and enthusiasm to make meaningful contributions."
              }
            />
          </FormGroup>

          <FormGroup controlId="formEducation">
            <FormLabel>Education</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="education"
              placeholder="University, Degree, Graduation Date, GPA, Relevant Courses"
              defaultValue={
                education ??
                "University of Washington Bothell, B.S. in Computer Science Graduated June 2024, GPA: 3.8 Relevant Courses: Web Programming, Database Systems, Software Engineering, Data Structures and Algorithms"
              }
            />
          </FormGroup>

          <FormGroup controlId="formSkills">
            <FormLabel>Skills</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="skills"
              placeholder="List your skills here"
              defaultValue={
                skills ??
                "Programming Languages: HTML, CSS, JavaScript, Python, Java Frameworks/Libraries: React, Node.js, Express.js, Bootstrap Tools: Git, GitHub, Visual Studio Code, MongoDB, MySQ Soft Skills: Team collaboration, problem-solving, communication, time management"
              }
            />
          </FormGroup>

          <FormGroup controlId="formProjects">
            <FormLabel>Projects</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="projects"
              placeholder="List your projects and a brief description here"
              defaultValue={
                projects ??
                "Project 1: Portfolio Website - Developed a personal portfolio website using HTML, CSS, and JavaScript. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur scelerisque sapien sit amet molestie. Phasellus vulputate nibh quis dignissim viverra. Project 2: Todo List App - Created a full-stack todo list application using React, Node.js, Express.js, and MongoDB. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur scelerisque sapien sit amet molestie. Phasellus vulputate nibh quis dignissim viverra. Nullam pellentesque tortor a lorem auctor interdum. Quisque tempor, est eu hendrerit vehicula, felis magna consequat arcu, nec tincidunt nunc nunc nec nunc. Project 3: Data Visualization Dashboard - Designed and implemented a data visualization dashboard using D3.js and React. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur scelerisque sapien sit amet molestie. Phasellus vulputate nibh quis dignissim viverra."
              }
            />
          </FormGroup>

          <FormGroup controlId="formExperience">
            <FormLabel>Experience</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="List your expereience and a brief description here"
              defaultValue={
                experience ??
                "Experience 1: Web Development Intern at XYZ Company - Assisted in developing and maintaining the company's website using HTML, CSS, and JavaScript"
              }
            />
          </FormGroup>

          <FormGroup controlId="formCertifications">
            <FormLabel>Certifications</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="List your projects and a brief description here"
              defaultValue={
                certifications ??
                "Certification 1: Front-End Web Development with React, Coursera Certification 2: JavaScript Algorithms and Data Structures, freeCodeCamp"
              }
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateResumeModal;
