import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../main";
import { useDispatch } from "react-redux";
import { setUser } from "../context/userSlice";

export const useUserFn = () => {
  const action = useDispatch();
  const login = async (userData: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const { displayName, getIdToken, uid } = data.user;
    const authToken = await getIdToken();
    action(
      setUser({ displayName: displayName as string, uid, auth: authToken })
    );
  };
  const signup = async (userData: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    const data = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    await updateProfile(data.user, { displayName: userData.displayName });
    const { displayName, getIdToken, uid } = data.user;
    const authToken = await getIdToken();
    action(
      setUser({ displayName: displayName as string, uid, auth: authToken })
    );
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("uid");
  };

  const authChange = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const authToken = await user.getIdToken(true);
        const displayName = user.displayName;
        !localStorage.getItem("uid") && localStorage.setItem("uid", uid);
        action(
          setUser({ auth: authToken, uid, displayName: displayName as string })
        );
      } else if (!user) {
        localStorage.removeItem("uid");
        action(setUser({ auth: "", uid: "", displayName: "" }));
      }
    });
  };
  return {
    login,
    signup,
    logout,
    authChange,
  };
};
