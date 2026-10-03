import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../services/authInterceptor";

const AuthContext = createContext(null);
const USER_KEY = "dairy_farm_user";
const ACCOUNTS_KEY = "dairy_farm_accounts";

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) ?? null;
    } catch {
      return null;
    }
  });

  function createAccount({ name, email, password, role }) {
    const accounts = readAccounts();
    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const newAccount = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    };

    localStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify([...accounts, newAccount]),
    );

    return {
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
    };
  }

  function checkCredentials({ email, password, role }) {
    const normalizedEmail = email.trim().toLowerCase();
    const account = readAccounts().find(
      (savedAccount) =>
        savedAccount.email === normalizedEmail &&
        savedAccount.password === password &&
        savedAccount.role === role,
    );

    if (!account) {
      throw new Error("Email, password, or account type is incorrect.");
    }

    return {
      name: account.name,
      email: account.email,
      role: account.role,
    };
  }

  function signIn(userData, token = null) {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setAuthToken(token);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, createAccount, checkCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}