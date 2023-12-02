export type cardInfoProps = {
    username: string;
    restaurantName: string;
    time: string;
    id: string;
};

export type CardProps = {
    id: string;
    getCardInfo: (info: cardInfoProps) => void;
    remainOfQuantity: (rest: number) => void;
    getIndexOfCard: (index: number) => void;
    isOrderFull: (allow: boolean) => void;
    changeFakFormVisibility: (visible: boolean) => void;
    index: number;
    restaurantName: string;
    time: string;
    description: string;
    username: string;
    loginUsername: string;
    quantity: number;
    maxQuantity: number;
};

export type ReqCardProps = {
    username: string;
    // owner: string;
    menuName: string;
    quantity: number;
    moreInfo: string;
};
