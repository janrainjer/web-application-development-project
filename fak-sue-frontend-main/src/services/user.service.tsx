import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export type FormLogin = {
    username: string;
    password: string;
};

export type User = {
    id: string;
    name: string;
    role: string;
    student_id: string;
    email: string;
    profile_image: string;
    banned: boolean;
    deleted: boolean;
};

type FormRegister = {
    username: string;
    name: string;
    student_id: string;
    email: string;
    password: string;
    confirm_password: string;
};

type FormUpdate = {
    name: string;
    profile_image: string;
    student_id: string;
};

export const login = async ({ username, password }: FormLogin) => {
    try {
        const res = await axios.post('/api/Login/login', {
            username,
            password
        });
        const token = res.data;
        if (token) {
            const resolveAfter3Sec = new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );
            toast
                .promise(
                    resolveAfter3Sec,
                    {
                        pending: 'Loading',
                        success: 'Success',
                        error: 'Error'
                    },
                    { position: toast.POSITION.TOP_CENTER }
                )
                .then(() => {
                    setTimeout(() => {
                        Cookies.set('token', token);
                        const win: Window = window;
                        win.location = '/cardspage';
                    }, 1000);
                });
        }
    } catch (err) {
        toast.error('Invalid Credential', {
            position: toast.POSITION.TOP_CENTER
        });
    }
};

export const registerUser = async ({
    username,
    name,
    student_id,
    email,
    password,
    confirm_password
}: FormRegister) => {
    try {
        const res = await axios.post('/api/User/register', {
            username,
            name,
            student_id,
            email,
            password,
            confirm_password
        });
        if (res.status === 200) {
            const resolveAfter3Sec = new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );
            toast
                .promise(
                    resolveAfter3Sec,
                    {
                        pending: 'Loading',
                        success: 'Success',
                        error: 'Error'
                    },
                    { position: toast.POSITION.TOP_CENTER }
                )
                .then(() => {
                    setTimeout(() => {
                        const win: Window = window;
                        win.location = '/login';
                    }, 1000);
                });
        }
    } catch (err) {
        toast.error("Can't Register", {
            position: toast.POSITION.TOP_CENTER
        });
    }
};

export const logout = async () => {
    Cookies.remove('token');
    document.location = '/login';
};

export const getProfile = async () => {
    const token = Cookies.get('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const res = await axios.get(`/api/User/profile`);
            return res.data;
        } catch (err) {
            logout();
        }
    }
};

export const updateProfile = async ({
    name,
    profile_image,
    student_id
}: FormUpdate) => {
    const token = Cookies.get('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const res = await axios.patch(`/api/User/update`, {
                name,
                profile_image,
                student_id
            });

            if (res.status == 200) {
                const resolveAfter3Sec = new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                );
                toast
                    .promise(
                        resolveAfter3Sec,
                        {
                            pending: 'Loading',
                            success: 'Success',
                            error: 'Error'
                        },
                        { position: toast.POSITION.TOP_CENTER }
                    )
                    .then(() => {
                        setTimeout(() => {
                            const win: Window = window;
                            win.location = '/profile';
                        }, 1000);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }
};
