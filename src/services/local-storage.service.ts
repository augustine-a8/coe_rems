class LocalStorage {
  public storeAuthToken(token: string) {
    window.localStorage.setItem("auth-token", token);
  }

  public getAuthToken() {
    return window.localStorage.getItem("auth-token");
  }

  public deleteAuthToken() {
    return window.localStorage.removeItem("auth-token");
  }
}

const localStorage = new LocalStorage();

export default localStorage;
