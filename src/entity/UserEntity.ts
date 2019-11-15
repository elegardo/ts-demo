import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'email' })
    email!: string;
}
