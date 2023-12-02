import ExitBtn from '../assets/Delete-Red-X-Button-Transparent.png';
import { Profile } from '../types/ProfileTypes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

type RubFakFormProps = {
    changeRubFakFormVisibility: (visible: boolean) => void;
};

const RubFakForm = ({ changeRubFakFormVisibility }: RubFakFormProps) => {
    const [restaurantName, setRestaurantName] = useState('');
    const [time, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [maxQuantity, setMaxQuantity] = useState(0);

    const [profile, setProfile] = useState<Profile | null>(null);
    const token = Cookies.get('token');
    const profileFetch = async () => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const { data: res } = await axios.get(`/api/User/profile`);
                // return res;
                setProfile(res);
            } catch (err) {
                // logout();
            }
        }
    };

    useEffect(() => {
        profileFetch();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const blogPost = async () => {
            if (token && profile) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${token}`;
                try {
                    await axios.post(`/api/Blog/create`, {
                        topic: restaurantName,
                        content: description,
                        max_order: maxQuantity,
                        time: time
                    });
                } catch (err) {
                    //console.log(err)
                }
            }
        };

        blogPost();

        // Hide the RubFakForm component
        changeRubFakFormVisibility(false);

        // Reset the form inputs
        setRestaurantName('');
        setSelectedTime('');
        setDescription('');
        setMaxQuantity(0);
    };

    return (
        <div className="flex fixed bg-black bg-opacity-70 w-full min-h-screen justify-center z-50">
            <form
                className="relative p-10 self-center flex flex-col gap-3 bg-[#d9d9d9] max-w-2xl w-full rounded-2xl mx-5"
                onSubmit={handleSubmit}>
                <div className="text-2xl bg-green-500 text-center h-fit w-fit p-4 absolute font-kanit font-bold sm:text-4xl text-white text rounded-full -top-8 left-1/2 transform -translate-x-1/2 shadow-md">
                    รับฝากซื้อจ้า
                </div>
                <label
                    htmlFor="restaurantName"
                    className="font-kanit font-medium">
                    ชื่อร้าน
                </label>
                <input
                    type="text"
                    id="restaurantName"
                    value={restaurantName}
                    onChange={(event) => setRestaurantName(event.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"
                />

                <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-4">
                        <label
                            htmlFor="selectedTime"
                            className="font-kanit font-medium">
                            สั่งได้ถึงเวลา
                        </label>
                        <select
                            id="time"
                            value={time}
                            onChange={(event) =>
                                setSelectedTime(event.target.value)
                            }
                            required
                            className=" block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select Time</option>
                            <option value="6:00 AM">6:00 AM</option>
                            <option value="7:00 AM">7:00 AM</option>
                            <option value="8:00 AM">8:00 AM</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:00 PM">4:00 PM</option>
                            <option value="5:00 PM">5:00 PM</option>
                            <option value="6:00 PM">6:00 PM</option>
                            <option value="7:00 PM">7:00 PM</option>
                            <option value="8:00 PM">8:00 PM</option>
                            <option value="9:00 PM">9:00 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                            <option value="11:00 PM">11:00 PM</option>
                        </select>
                    </div>

                    <div className="col-end-9 col-span-3">
                        <label
                            htmlFor="maxQuantity"
                            className="font-kanit font-medium ">
                            จำนวนรับสูงสุด
                        </label>
                        <input
                            type="number"
                            id="maxQuantity"
                            value={maxQuantity}
                            onChange={(event) => {
                                setMaxQuantity(parseInt(event.target.value));
                            }}
                            min={0}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <label htmlFor="description" className="font-kanit font-medium">
                    รายละเอียดเพิ่มเติม
                </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className=" block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400
                                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm col-span-3"></input>

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    Submit
                </button>

                <div className="max-w-[50px] absolute -top-6 -right-6 cursor-pointer">
                    <img
                        src={ExitBtn}
                        alt="#"
                        onClick={() => {
                            changeRubFakFormVisibility(false);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default RubFakForm;
