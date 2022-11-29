import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import Partida from '../models/Partida';
import Objetivo from '../models/Objetivo';
import { Modo } from './Modo';

@Entity('tb_round')
class Round {

    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column("varchar", { length: 2 })
    numero: number;

    @Column('date', {nullable: true})
    fim: Date;
    
    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    inicio: Date;

    
    
    @ManyToOne(type => Partida)
    @JoinColumn({name: "partida_id", referencedColumnName: "id"})
    partida: Partida;   

    @ManyToMany(() => Objetivo)
    @JoinTable({name : "tb_round_objetivo", joinColumn: {name:"round_id", referencedColumnName: "id"}, inverseJoinColumn: {name: "objetivo_id", referencedColumnName: "id"}})
    objetivos: Objetivo[];


    @Column({
        type: "enum",
        enum: Modo,
      })
      modo: Modo;
}
export default Round;