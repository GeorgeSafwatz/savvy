import { redirect } from "react-router-dom";

export const loader = () => {
  const uid = localStorage["uid"];
  if (uid) return redirect("/");
  return uid || null;
};
