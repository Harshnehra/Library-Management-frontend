const config = {
    LoginUrl: import.meta.env.VITE_LOGIN_URL?.replace(/"/g, '')?.trim() || '',
    SignupUrl: import.meta.env.VITE_SIGNUP_URL?.replace(/"/g, '')?.trim() || '',
    ListUrl: import.meta.env.VITE_LIST_URL?.replace(/"/g, '')?.trim() || '',
}

// Validate URLs
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        console.error(`Missing environment variable for ${key}`);
    }
});

export default config;