<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity()
export class Cv {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

<<<<<<< HEAD
  @Index({ unique: true })
  @Column({ unique: true })
  cin: string;

  @Index()
=======
  @Column()
  cin: string;

>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(() => User, user => user.cvs)
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
<<<<<<< HEAD
}
=======
}
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
