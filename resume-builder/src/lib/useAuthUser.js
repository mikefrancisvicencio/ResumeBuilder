import { useEffect, useState } from "react";

import { auth } from "./firebase";

export const useAuthUser = () => {
  const [user, setUser] = useState();
  // checking if user exists first
  const [isLoading, setIsLoading] = useState(true);

  // then if yes sets user
  // isLoading: currently checking if you're logged in
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return { user, isLoading };
};
