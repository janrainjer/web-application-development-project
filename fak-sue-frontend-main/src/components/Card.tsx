import cardWallpaper from '../assets/food-wallpaper.jpg';
import user from '../assets/user.png';
import { CardProps } from '../types/CardType';

const Card = ({
    id,
    getCardInfo,
    remainOfQuantity,
    getIndexOfCard,
    isOrderFull,
    changeFakFormVisibility,
    index,
    restaurantName,
    time,
    description,
    username,
    loginUsername,
    quantity,
    maxQuantity
}: CardProps) => {
    const totalQuantity = quantity;

    const changeIsOrderFull = () => {
        if (totalQuantity >= maxQuantity) {
            isOrderFull(true);
        } else {
            isOrderFull(false);
        }
    };

    return (
        <div className="relative bg-white rounded-3xl shadow-md overflow-hidden h-[18rem]">
            <div className="absolute top-0 left-0 w-full h-1/3">
                <div className="bg-black absolute opacity-50 h-full w-full"></div>
                <img
                    className="h-full w-full object-top object-cover"
                    src={cardWallpaper}
                    alt="#"
                />
            </div>
            <div className="relative z-10 p-3">
                <div className="flex flex-row h-20">
                    <div className="max-w-[80px]">
                        <img
                            src={user}
                            alt="user"
                            className="rounded-full border-2 border-white"
                        />
                    </div>
                    <div className="flex-1 grid grid-rows-3 ml-4">
                        <div className="font-bold text-white overflow-hidden text-ellipsis w-full font-kanit">
                            {username}
                        </div>
                        <div className="text-white overflow-hidden text-ellipsis w-full font-kanit">
                            ร้านค้า : {restaurantName}
                        </div>
                        <div className="text-white font-kanit">
                            หมดเวลาสั่ง : {time}
                        </div>
                    </div>
                    <div className="text-white font-kanit px-5 bg-pink-500 h-fit rounded-full">
                        {totalQuantity} / {maxQuantity}
                    </div>
                </div>
                <div className="h-32 bg-slate-100 rounded-md mt-2 overflow-auto p-2">
                    <p className="text-black">{description}</p>
                </div>
                {username != loginUsername ? (
                    <div className="flex justify-center">
                        <button
                            className="bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
                            onClick={() => {
                                changeFakFormVisibility(true);
                                changeIsOrderFull();
                                getIndexOfCard(index);
                                remainOfQuantity(maxQuantity - totalQuantity);
                                getCardInfo({
                                    username,
                                    restaurantName,
                                    time,
                                    id
                                });
                            }}>
                            ฝากซื้อ
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Card;
