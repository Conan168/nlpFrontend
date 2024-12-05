import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User"
import { useNavigate } from "react-router";
import { loginAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";

type UserContextType = {
    user: UserProfile | null;
    access_token: string | null;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [access_token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const access_token = localStorage.getItem("access_token");
        if (user && access_token) {
            setUser(JSON.parse(user));
            setToken(access_token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
        }
        setIsReady(true);
    }, []);

    /*
    const registerUser = async (
      email: string,
      username: string,
      password: string
    ) => {
      await registerAPI(email, username, password)
        .then((res) => {
          if (res) {
            localStorage.setItem("token", res?.data.token);
            const userObj = {
              userName: res?.data.userName,
              email: res?.data.email,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res?.data.token!);
            setUser(userObj!);
            toast.success("Login Success!");
            navigate("/search");
          }
        })
        .catch((e) => toast.warning("Server error occured"));
    };
    */

    const loginUser = async (username: string, password: string) => {
        try {
            const res = await loginAPI(username, password)
            if (res) {
                localStorage.setItem("access_token", res?.data.access_token);
                const userObj = {
                    username: res?.data.username,
                    Auth: res?.data.Auth,

                    //email: res?.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.access_token!);
                setUser(userObj!);
                toast.success("Login Success!");
                navigate("/system/${aapl}");
            }
        } catch (e) {
            toast.warning("Server error occured")
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, access_token, logout, isLoggedIn }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);