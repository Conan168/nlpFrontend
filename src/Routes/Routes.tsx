import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SystemPage from "../Pages/SystemPage/SystemPage";
import Dispatch from "../Components/Dispatch/Dispatch";
import History from "../Components/History/History";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            {
                path: "system/:functionId",
                element: (
                    <ProtectedRoute>
                        <SystemPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dispatch", element: <Dispatch sender="user" text="Hello" /> },
                    { path: "history", element: <History /> },
                ],
            },
        ],
    },
]);