import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/auth/authSlice";

export const saveToken = (token) => {
    localStorage.setItem("access_token", JSON.stringify(token))
}
export const loadToken = (token) => {
    localStorage.getItem("access_token",token);
}

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/"); 
    };

    return { handleLogout };
};
