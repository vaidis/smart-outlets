export const BASE = "http://192.168.1.54:5000/api"
export const login = `${BASE}/user/login`
export const logout = `${BASE}/user/logout`
export const dashboard = `${BASE}/dashboard`
export const postControl = `${BASE}/postcontrol`
export const getControl = (path) => `${BASE}/getcontrol/${path}`