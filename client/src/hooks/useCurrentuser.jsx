import { useEffect } from "react";
import api from "../api/baseapi";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function useCurrentuser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchcurrentuser = async () => {
      try {
        const response = await api.get("/auth/me");
        dispatch(setUserData(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcurrentuser();
  }, []);
}
