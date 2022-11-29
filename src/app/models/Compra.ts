import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import Jogador from '../models/Jogador';
import Itens_Compra from '../models/Itens_Compra'

@Entity('tb_compra')
class Compra {
    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data: Date;

    @Column({type: "decimal", nullable: true, precision: 2 })
    total: number;

    @ManyToOne(type => Jogador)
    @JoinColumn({name: "jogador_nickname", referencedColumnName: "nickname"})
    jogador: Jogador; 

    @OneToMany( () => Itens_Compra, Itens_Compra => Itens_Compra.compra)
    itens: Itens_Compra[];
   
}
export default Compra;