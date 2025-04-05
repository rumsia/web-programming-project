import { useState } from "react";
import { AuthContext } from "./authContext";
import authService from "../../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await authService.SignIn(credentials);
      setUser(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await authService.SignUp(data);
      setUser(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signIn, signUp, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
