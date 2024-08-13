import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { Login, Home, Root, Report, AllStaff } from "./pages";
import { AuthProvider } from "./auth/AuthContext";
import { ApolloWrapper } from "./api";
import { ProtectedRoute } from "./components";
import { store } from "./redux/store";
import { AppContextProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "report",
        element: (
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-staff",
        element: (
          <ProtectedRoute>
            <AllStaff />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <ApolloWrapper>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ApolloWrapper>
      </AppContextProvider>
    </AuthProvider>
  );
}
