const USER_KEY = "tg_user";
const SESSION_KEY = "tg_session";

export type Session = { email: string };

export function signup(email: string, password: string) {
  localStorage.setItem(USER_KEY, JSON.stringify({ email, password }));
}

export function login(email: string, password: string) {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return false;
  try {
    const user = JSON.parse(raw);
    return user?.email === email && user?.password === password;
  } catch {
    return false;
  }
}

export function setSession(email: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
