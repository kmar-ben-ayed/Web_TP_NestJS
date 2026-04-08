import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  username: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, cv => cv.user)
  cvs: Cv[];
}
