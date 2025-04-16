const config = {
    LoginUrl: import.meta.env.VITE_LOGIN_URL?.replace(/"/g, '') || '',
    SignupUrl: import.meta.env.VITE_SIGNUP_URL?.replace(/"/g, '') || '',
    ListUrl: import.meta.env.VITE_LIST_URL?.replace(/"/g, '') || '',
}

export default config;