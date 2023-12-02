export type Author = {
    id: string | null;
    name: string | null;
    role: string | null;
    student_id: string | null;
    email: string | null;
    profile_image: string | null;
    banned: string | null;
    deleted: string | null;
    username: string;
};

export type Order = {
    id: string | null;
    user: User;
    menu: Menu;
    detail: string;
    quantity: number;
    blogId: string | null;
};

export type User = {
    id: string | null;
    username: string;
    email: null;
    name: string | null;
    student_id: string | null;
    role: string | null;
    profile_image: string | null;
    banned: false;
    deleted: false;
    created_date: string | null;
    updated_date: string | null;
};

export type Menu = {
    id: string;
    restaurant: string;
    foodName: string;
    category: string;
    price: number;
};

export type Blog = {
    blog_id: string;
    author: Author;
    topic: string;
    content: string;
    max_order: number;
    orders: Order[];
    timestamp: string | null;
    hide: boolean;
    deleted: boolean;
    created_date: string | null;
    updated_date: string | null;
    time: string;
};

export type Blogs = {
    blogs: Blog[];
};
