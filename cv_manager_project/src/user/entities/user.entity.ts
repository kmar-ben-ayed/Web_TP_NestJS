<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
import { Cv } from '../../cv/entities/cv.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Index({ unique: true })
  @Column({ unique: true })
  username: string;

  @Index({ unique: true })
  @Column({ unique: true })
=======
  @Column()
  username: string;

  @Column()
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, cv => cv.user)
  cvs: Cv[];
<<<<<<< HEAD
}
=======
}
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
