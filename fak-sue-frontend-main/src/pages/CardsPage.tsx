import Add from '../assets/add.png';
import bell from '../assets/bellicon.png';
import logoutBtn from '../assets/logout-512.png';
import Card from '../components/Card';
import FakForm from '../components/FakForm';
import ReqCard from '../components/ReqCard';
import RubFakForm from '../components/RubFakForm';
import { logout } from '../services/user.service';
import { Blog, Blogs } from '../types/BlogType';
import { cardInfoProps } from '../types/CardType';
import { Profile } from '../types/ProfileTypes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardsPage = () => {
    const [blogsData, setBlogsData] = useState<Blogs>();
    const [profile, setProfile] = useState<Profile | null>(null);
    const token = Cookies.get('token');
    const profileFetch = async () => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const { data: res } = await axios.get(`/api/User/profile`);
                setProfile(res);
            } catch (err) {}
        }
    };
    useEffect(() => {
        profileFetch();
    }, []);

    const blogsFetch = async () => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const { data: res } = await axios.get(`/api/Blog/list`);
                setBlogsData(res);
            } catch (err) {}
        }
    };

    useEffect(() => {
        blogsFetch();
    }, []);

    const [isRubFakFormVisible, setIsRubFakFormVisible] = useState(false);
    const [isFakFormVisible, setIsFakFormVisible] = useState(false);
    const [orderFull, setOrderFull] = useState(false);
    const [indexOfCard, setIndexOfCard] = useState(0);
    const [remain, setRemain] = useState(0);
    const [cardInfo, setCardInfo] = useState<cardInfoProps>();

    const getIndexOfCard = (index: number) => {
        setIndexOfCard(index);
    };

    const changeFakFormVisibility = (visibility: boolean) => {
        setIsFakFormVisible(visibility);
    };

    const changeRubFakFormVisibility = (visibility: boolean) => {
        setIsRubFakFormVisible(visibility);
    };

    const isOrderFull = (allow: boolean) => {
        setOrderFull(allow);
    };

    const remainOfQuantity = (rest: number) => {
        setRemain(rest);
    };

    const getCardInfo = (info: cardInfoProps) => {
        setCardInfo(info);
    };

    const cardsReal =
        blogsData && profile ? (
            <>
                {blogsData.blogs.map((blog: Blog, index: number) => {
                    let quan: number = 0;
                    blog.orders.forEach((order) => {
                        quan += order.quantity;
                    });
                    return (
                        <Card
                            key={blog.blog_id}
                            id={blog.blog_id}
                            getCardInfo={getCardInfo}
                            remainOfQuantity={remainOfQuantity}
                            getIndexOfCard={getIndexOfCard}
                            isOrderFull={isOrderFull}
                            changeFakFormVisibility={changeFakFormVisibility}
                            index={index}
                            restaurantName={blog.topic}
                            time={blog.time}
                            description={blog.content}
                            username={blog.author.username}
                            loginUsername={profile.username}
                            quantity={quan}
                            maxQuantity={blog.max_order}
                        />
                    );
                })}
            </>
        ) : (
            <>Loading...</>
        );
    let reqOrderCount = 0;
    return (
        <>
            <div className="flex gap-4 absolute right-4 top-4">
                {blogsData && profile ? (
                    blogsData.blogs
                        .filter((blog: Blog) => {
                            return blog.author.username == profile.username;
                        })
                        .map((blog: Blog) => {
                            reqOrderCount += blog.orders.length;
                        }) && (
                        <Link to="/yourreq">
                            <div className=" max-w-[50px] right-20 top-5 w-full cursor-pointer hover:-translate-y-1 transition-transform">
                                <img src={bell} alt="#" />
                                {reqOrderCount > 0 && (
                                    <span className="text-white font-kanit font-bold absolute bg-red-700 w-[25px] rounded-full text-center top-1">
                                        {reqOrderCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    )
                ) : (
                    <></>
                )}
                <div className=" max-w-[50px] right-20 top-5 w-full cursor-pointer hover:-translate-y-1 transition-transform">
                    <img src={logoutBtn} onClick={logout} alt="#" />
                </div>
            </div>
            <div className="bg-black bg-opacity-40 text-white m-5 rounded-3xl text-center p-5 font-kanit text-4xl">
                กดฝากได้เลยครับ
            </div>
            <div className="m-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* {cards} */}
                {cardsReal}
            </div>
            <div className="fixed max-w-[5rem] bottom-10 right-10 hover:-translate-y-2 transition-transform cursor-pointer z-40">
                <img
                    src={Add}
                    alt="addBtn"
                    onClick={() => {
                        setIsRubFakFormVisible(true);
                    }}
                />
            </div>

            {isRubFakFormVisible && (
                <RubFakForm
                    changeRubFakFormVisibility={changeRubFakFormVisibility}
                />
            )}

            {isFakFormVisible && (
                <FakForm
                    changeFakFormVisibility={changeFakFormVisibility}
                    orderFull={orderFull}
                    indexOfCard={indexOfCard}
                    remain={remain}
                    cardInfo={cardInfo}
                />
            )}
        </>
    );
};

export default CardsPage;
