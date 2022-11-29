import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Jogador from '../models/Jogador';
import Round from './Round';

@Entity('tb_partida')
class Partida {

    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column('date', {nullable: true})
    fim: Date;
    
    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    inicio: Date;

    
    
    @ManyToOne(type => Jogador)
    @JoinColumn({name: "jogador_nickname", referencedColumnName: "nickname"})
    jogador: Jogador;  

    @OneToMany( () => Round, round => round.partida)
    rounds: Round[];
}
export default Partida;