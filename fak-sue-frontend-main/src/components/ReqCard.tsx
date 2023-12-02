import cardWallpaper from '../assets/food-wallpaper.jpg';
import user from '../assets/user.png';
import { ReqCardProps } from '../types/CardType';

const ReqCard = ({ username, menuName, quantity, moreInfo }: ReqCardProps) => {
    return (
        <div className="relative bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3">
                <div className="bg-black absolute opacity-50 h-full w-full"></div>
                <img
                    className="h-full w-full object-cover object-top"
                    src={cardWallpaper}
                    alt=""
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
                    <div className="grid grid-rows-3 ml-4">
                        <div className="font-bold text-white overflow-hidden text-ellipsis w-full font-kanit">
                            {username}
                        </div>
                        <div className="text-white overflow-hidden text-ellipsis w-full font-kanit">
                            เมนู : {menuName}
                        </div>
                        <div className="text-white font-kanit">
                            จำนวน : {quantity}
                        </div>
                    </div>
                </div>
                <div className="h-44 bg-slate-100 rounded-3xl mt-2 overflow-auto p-2">
                    <p className="text-black">{moreInfo}</p>
                </div>
            </div>
        </div>
    );
};

export default ReqCard;
