export type Profile = {
    id: string;
    name: string | null;
    role: string | null;
    student_id: string | null;
    email: string | null;
    profile_image: string | null;
    banned: boolean | null;
    deleted: boolean | null;
    username: string;
};
