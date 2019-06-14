import JoinedUserInterface from './joinedUser.model';

export default interface CourseInterface {
    id: number;
    title: string;
    description: string;
    rating: number;
    picture: string;
    joinedUsers?: JoinedUserInterface[];
}
