<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5

@Entity()
export class Skill {

  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Index({ unique: true })
  @Column({ unique: true })
  designation: string;
}
=======
  @Column()
  designation: string;
}
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
