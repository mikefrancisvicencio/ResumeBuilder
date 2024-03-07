import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import useResumeStore from "../lib/resumeStore";

function AddCommentsModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const { addComment } = useResumeStore();

  const handleAddComment = (e: any) => {
    e.preventDefault();
    if (!e.target.formComment.value) return;
    addComment(e.target.formComment.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAddComment}>
        <Modal.Body>
          <FormGroup controlId="formComment">
            <FormLabel>Comment</FormLabel>
            <Form.Control type="text" placeholder="It looks good!" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" type="submit" onClick={handleClose}>
            Save Comment
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddCommentsModal;
