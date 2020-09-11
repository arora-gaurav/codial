
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'studios.grv',
            pass: 'Studios@25'
        }
    },
    google_client_id: "375402340226-uv5i6inou4e34qvb6vk0b7hsn7i71ft3.apps.googleusercontent.com",
    google_client_secret: "saqSQB9VHKJt7eKpartd2_Dq",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name:'production'
}

module.exports = development;