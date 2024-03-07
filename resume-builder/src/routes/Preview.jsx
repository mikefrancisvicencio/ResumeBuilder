import { useState } from "react";
import NavBar from "../components/NavBar";
import { Button } from "react-bootstrap";
import Resume from "../components/Resume";
import { useNavigate } from "react-router-dom";
import CreateResumeModal from "../components/CreateResumeModal";
import AddCommentsModal from "../components/AddCommentsModal";
import ViewCommentsModal from "../components/ViewCommentsModal";

function Preview() {
  const navigate = useNavigate();
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);
  const [isAddCommentModalShowing, setIsAddCommentModalShowing] =
    useState(false);
  const [isViewCommentModalShowing, setIsViewCommentModalShowing] =
    useState(false);

  return (
    <div className="h-screen overflow-y-scroll">
      <NavBar />

      <div className="background-image ">
        <div className="pt-5 pb-10 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-4">
            <Button onClick={() => navigate("/")}>Go Back</Button>
            {/* edit resume =========== */}
            <Button onClick={() => setIsEditModalShowing(true)}>
              Edit Resume
            </Button>
            <CreateResumeModal
              show={isEditModalShowing}
              handleClose={() => setIsEditModalShowing(false)}
            />
            {/* add comments =========== */}
            <Button onClick={() => setIsAddCommentModalShowing(true)}>
              Add Comment
            </Button>
            <AddCommentsModal
              show={isAddCommentModalShowing}
              handleClose={() => setIsAddCommentModalShowing(false)}
            />
            {/* view comments =========== */}
            <Button onClick={() => setIsViewCommentModalShowing(true)}>
              View Comments
            </Button>
            <ViewCommentsModal
              show={isViewCommentModalShowing}
              handleClose={() => setIsViewCommentModalShowing(false)}
            />
          </div>

          <Resume />
        </div>
      </div>
    </div>
  );
}

export default Preview;
