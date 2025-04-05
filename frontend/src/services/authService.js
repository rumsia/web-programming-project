const SIGNIN_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
const SIGNUP_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

class AuthService {
  async #makeRequest(url, method, data) {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      throw new Error(result.error || "Algo salió mal");
    }

    return result;
  }

  async SignIn(credentials) {
    const response = await this.#makeRequest(SIGNIN_URL, "POST", credentials);
    return response;
  }

  async SignUp(data) {
    const response = await this.#makeRequest(SIGNUP_URL, "POST", data);
    return response;
  }
}

export default new AuthService();
