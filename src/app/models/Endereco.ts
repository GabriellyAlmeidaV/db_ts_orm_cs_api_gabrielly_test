import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity('tb_endereco')
class Endereco {
    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column("varchar", { length: 8 })
    cep: string;

    @Column("varchar", { length: 100, nullable: true })
    complemento: string;
}
export default Endereco;