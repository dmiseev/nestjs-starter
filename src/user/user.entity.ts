import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('users_email_deleted_sequence', ['email', 'deletedAt'], {unique: true})
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'email', type: 'varchar', length: 64, nullable: false})
    email: string;

    @Column({name: 'password', type: 'varchar', length: 60, nullable: false})
    password: string;

    @Column({name: 'first_name', type: 'varchar', length: 64, nullable: false})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar', length: 64, nullable: false})
    lastName: string;

    @Column({name: 'created_at', type: 'timestamp', nullable: false})
    createdAt: Date;

    @Column({name: 'deleted_at', type: 'timestamp', nullable: true})
    deletedAt?: Date;

    constructor(email: string, password: string, firstName: string, lastName: string, createdAt: Date) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {User}
     */
    static register(email: string, password: string, firstName: string, lastName: string): User {
        return new User(email, password, firstName, lastName, new Date());
    }

    public remove() {
        this.deletedAt = new Date();
    }
}