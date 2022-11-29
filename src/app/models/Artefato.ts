import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, TableInheritance} from 'typeorm';

import Jogador from '../models/Jogador';

@Entity('tb_artefato')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Artefato {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column({type: "decimal" , nullable: true,  precision: 2 })
    peso: number;

    @Column({type: "decimal" , nullable: true,  precision: 2 })
    valor: number;


}