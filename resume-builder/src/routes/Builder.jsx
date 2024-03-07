import { useState } from "react";
import CreateResumeModal from "../components/CreateResumeModal";
import GenerateResumeModal from "../components/GenerateResumeModal";

import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import useResumeStore from "../lib/resumeStore";

function Builder() {
  const { name } = useResumeStore();

  const [isCreateResumeModalShowing, setIsCreateResumeModalShowing] =
    useState(false);
  const [isGenerateResumeModalShowing, setIsGenerateResumeModalShowing] =
    useState(false);

  return (
    <div className="h-screen overflow-hidden">
      <NavBar />

      <div className="background-image h-full overflow-y-auto">
        <div className=" mt-5 flex gap-4 items-center justify-center">
          {/* create resume =========== */}
          <Button onClick={() => setIsCreateResumeModalShowing(true)}>
            Create Resume
          </Button>
          <CreateResumeModal
            show={isCreateResumeModalShowing}
            handleClose={() => setIsCreateResumeModalShowing(false)}
          />

          {/* generate resume =========== */}
          <Button
            onClick={() => setIsGenerateResumeModalShowing(true)}
            disabled={!name}
          >
            {name ? "Generate Resume" : "Create a resume first..."}
          </Button>
          <GenerateResumeModal
            show={isGenerateResumeModalShowing}
            handleClose={() => setIsGenerateResumeModalShowing(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Builder;
