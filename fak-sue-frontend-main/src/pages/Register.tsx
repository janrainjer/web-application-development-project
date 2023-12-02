import { registerUser } from '../services/user.service';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().required(),
    username: yup.string().required(),
    student_id: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required()
});
type FormData = yup.InferType<typeof schema>;

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match');
            return;
        }
        await registerUser({ ...data });
    };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center h-fit">
            <div className="bg-white shadow-md px-5 lg:flex-row mx-10 sm:mx-24 py-8 rounded-3xl w-full max-w-3xl mt-20">
                <h1 className=" text-5xl font-bold mb-5">
                    FAK <br /> SUE
                </h1>
                <form
                    action="#"
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-y-2 sm:grid-cols-4 sm:gap-y-10 sm:gap-x-4 max-w-4xl sm:mx-20 items-center">
                        <label
                            htmlFor="email"
                            className="block text-md font-extrabold text-black font-kanit">
                            Email
                        </label>
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            autoComplete="email"
                            placeholder="abc@gmail.com"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />
                        <label
                            htmlFor="fname"
                            className="block text-md font-extrabold text-black font-kanit">
                            Username
                        </label>
                        <input
                            id="username"
                            {...register('username')}
                            type="text"
                            placeholder="abc"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />
                        <label
                            htmlFor="student_id"
                            className="block text-md font-extrabold text-black font-kanit">
                            รหัสนักศึกษา
                        </label>
                        <input
                            id="student_id"
                            {...register('student_id')}
                            placeholder="99999999"
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />
                        <label
                            htmlFor="fname"
                            className="block text-md font-extrabold text-black font-kanit">
                            ชื่อ-นามสกุล
                        </label>
                        <input
                            id="name"
                            {...register('name')}
                            type="text"
                            placeholder="abc def"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />
                        <label
                            htmlFor="password"
                            className="block text-md font-extrabold text-black font-kanit">
                            Password
                        </label>
                        <input
                            id="password"
                            {...register('password')}
                            type="password"
                            autoComplete="current-password"
                            placeholder="************"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />

                        <label
                            htmlFor="confirmPassword"
                            className="block text-md font-extrabold text-black font-kanit">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            {...register('confirm_password')}
                            type="password"
                            placeholder="************"
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-1/2 flex justify-center py-2 px-4 border border-transparent
                                              rounded-full shadow-sm text-sm font-medium text-white bg-[#68174a] hover:bg-blue-700
                                              focus:outline self-center mt-10">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
