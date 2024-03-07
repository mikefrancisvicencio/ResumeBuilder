import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function GenerateResumeModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const navigate = useNavigate();

  const handleGenerateResume = (e: any) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.formAllowedViewers.value);
    console.log(form.formComment.value);
    navigate("/preview");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Resume is Ready!</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleGenerateResume}>
        <Modal.Body className="m-2 flex flex-col gap-4">
          <FormGroup controlId="formAllowedViewers">
            <FormLabel>Allowed Viewers</FormLabel>
            <Form.Control
              type="text"
              placeholder="Email addresses separated by commas"
            />
          </FormGroup>
          <FormGroup controlId="formComment">
            <FormLabel>Message to Viewers</FormLabel>
            <Form.Control
              type="text"
              placeholder="Please let me know how I can make my resume better"
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="info" onClick={handleClose}>
            Generate
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GenerateResumeModal;
