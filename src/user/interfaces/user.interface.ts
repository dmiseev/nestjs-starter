interface UserInterface {
    id: number;
    email: string;
    hashedPassword: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    deletedAt?: Date;
}