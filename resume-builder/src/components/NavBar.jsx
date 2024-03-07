import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuthUser } from "../lib/useAuthUser";

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      navigate("/login");
      console.log("Logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-between px-8 py-2 bg-yellow-800"
    >
      <div className="text-white">
        CoffeeMaker:
        <span className="text-white font-bold"> Welcome {user?.email}</span>
      </div>
      <Button variant="light" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default NavBar;
