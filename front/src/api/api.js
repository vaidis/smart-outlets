import axios from "axios";

const baseUrl = "http://192.168.1.54:5000/api";

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  async (config) => {
    const accessToken = await localStorage.getItem("accessToken");
    console.log(" ---- ---- axios request accessToken", accessToken);
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    console.log(" ---- ---- axios request CONFIG", config);
    return config;
  },
  (error) => {
    console.log(" ---- ---- axios request ERROR");
    Promise.reject(error);
  }
);


//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    // GOT status 2xx
    console.log(" #### #### axios response:", response)
    return response;
  },
  async function (error) {
    console.log(" #### #### axios response ERROR:", error)
    // console.log(" XXX error:", error.response.data)
    // GOT status not 2xx
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");

    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log(" #### #### axios response error retry")
      return axios
        .post(`${baseUrl}/user/refresh`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log(" #### #### Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    console.log(" #### #### axios interceptors response error:", error)
    return Promise.reject(error);
  }
);

//functions to make api calls

const api = {
  login: async (body) => {

    // GET RESPONSE
    var res = await axios.post(`${baseUrl}/user/login`, body)
    .catch(function (error) {
      // ERROR
      const networkError = {
        "type": "network",
        "message": "Network Error. Server not responding"
      }
      const response = error.response ? error.response.data : networkError;
      throw response
    });

    // SUCCESS
    if (res.status === 201) {
      console.log("res.data", res.data)
      // STORE TOKENS
      var { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // STORE USER DATA
      var { id, name, role, dark } = res.data;
      var store = { id, name, role, dark }
      return store;
    }

  },
  refresh: (body) => {
    return axios.post(`${baseUrl}/user/refresh`, body);
  },
  logout: (id) => {
    var refreshToken = localStorage.getItem("refreshToken");
    var  body = {
      "refreshToken": refreshToken,
      "id": id
    }
    console.log(" logout body", body)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return axios.post(`${baseUrl}/user/logout`, body);
  },
  dashboard: () => {
    return axios.get(`${baseUrl}/dashboard`)
    .catch(function (error) {
      console.log(" ---- api error", error)
      throw error
    });
  },
  getOutlet: (path) => {
    return axios.get(`${baseUrl}/outlet/${path}`)
    .catch(function (error) {
      console.log(" ---- api error", error)
      throw error
    });
  },
  postOutlet: (body) => {
    // console.log("axios.postOutlet path:", path)
    console.log("axios.postOutlet body:", body)
    return axios.post(`${baseUrl}/outlet`, body)
    .catch(function (error) {
      console.log(" ---- api error", error)
      throw error
    });
  },
  dark: (body) => {
    // console.log("axios.postOutlet path:", path)
    console.log("axios.dark body:", body)
    return axios.post(`${baseUrl}/user/profile`, body)
    .catch(function (error) {
      console.log(" ---- api error", error)
      throw error
    });
  },
};

export default api;