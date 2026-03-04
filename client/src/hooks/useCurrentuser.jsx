import { useEffect } from "react";
import api from "../api/baseapi";

export default function useCurrentuser() {
  useEffect(() => {
    const fetchcurrentuser = async () => {
      try {
        const response = await api.get("/auth/me");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcurrentuser();
  }, []);
}
