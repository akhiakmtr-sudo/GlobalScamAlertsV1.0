
import { Role } from './types';

export const NAV_LINKS = {
    PUBLIC: [
        { name: 'About Us', path: '#/about' },
        { name: 'Vision & Mission', path: '#/vision' },
        { name: 'Scam List', path: '#/' },
        { name: 'Verified Agencies', path: '#/verified-agencies' },
        { name: 'Contact Us', path: '#/contact' },
    ],
    AUTH: [
        { name: 'Login', path: '#/login' },
        { name: 'Sign Up', path: '#/signup' },
    ],
    USER: [
        { name: 'Report a Scam', path: '#/report-scam' },
    ],
    ADMIN: [
        { name: 'Admin Dashboard', path: '#/admin' },
    ]
};

export const ROLES = {
    ADMIN: Role.ADMIN,
    USER: Role.USER
};
