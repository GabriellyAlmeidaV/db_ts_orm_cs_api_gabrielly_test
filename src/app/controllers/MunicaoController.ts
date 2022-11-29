import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Artefato from '../models/Artefato';
import Municao from '../models/Municao';

class MunicaoController {

    async list(req: Request, res: Response){

        const repository = getRepository(Municao);
        //retorna uma lista de objetos contendo os registros de tb_jogador
        const lista = await repository.find();

        //retorna uma lsita de objetos contendos os registros de tb_jogador e mais as vinculações com tb_endereco, caso exista.
        //const lista = await repository.createQueryBuilder('tb_jogador').innerJoinAndSelect("tb_jogador.endereco", "endereco").getMany();

        return res.json(lista);
    }

    async store(req: Request, res: Response){

        const repository = getRepository(Municao);//recupera o repositorio do jogador.

        console.log(req.body);//imprime na saida padrão a mensagem recebida. Isso é apenas para teste...


        const j = repository.create(req.body);//cria a entidade Jogador.

        await repository.save(j);//efetiva a operacao de insert.

        return res.json(j);//retorna o bojeto json no response.
        
    }
    //código fonte referente ao pdf da parte 6.
    async delete(req: Request, res: Response){

        const repository = getRepository(Municao);//recupera o repositorio do jogador.

        const {id} = req.body;//extrai os atributos nickname e endereco do corpo da mensagem.
        
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if(idExists){
        
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar jogador para remover, retorna o codigo 404.
        }
    }

    //código fonte referente ao pdf da parte 6.
    async update(req: Request, res: Response){
    
        const repository = getRepository(Municao);//recupera o repositorio do jogador.
    
        const {id} = req.body;//extrai os atributos nickname e endereco do corpo da mensagem.
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.
       
        
        if(!idExists){
                return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }
       

}

export default new MunicaoController();