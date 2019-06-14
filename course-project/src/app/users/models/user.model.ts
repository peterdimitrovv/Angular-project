export default interface UserInterface {
    id:number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isBlocked: string;
    picture: string;
    isAdmin?: boolean;
} 