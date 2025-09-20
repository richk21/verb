import { useSelector } from "react-redux";
import "./App.css";
import { selectPosts } from "./redux/user/userSelectors";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/AppRoutes";

export function App() {
  const data = useSelector(selectPosts);

  useEffect(() => {
    console.log("data from redux", data);
  }, [data]);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
