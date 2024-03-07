import { Button, Modal } from "react-bootstrap";
import useResumeStore from "../lib/resumeStore";
import { useAuthUser } from "../lib/useAuthUser";

function ViewCommentsModal({ show, handleClose }) {
  const { user } = useAuthUser();
  const { comments } = useResumeStore();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-2">
        {comments.length === 0
          ? "No comments"
          : comments.map((comment, i) => (
              <div key={i} className="border rounded-md flex">
                <div className="border-r p-1 px-2 bg-slate-100">
                  {user?.email}
                </div>
                <div className="p-1 px-2 flex items-center">{comment}</div>
              </div>
            ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewCommentsModal;
