import {app, setup} from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection} from "typeorm"

describe("persistence test", () => {

    afterAll(async () => {
        await getConnection().close()
    });

    beforeAll(async () => {
        await setup()
    });


    it('teste /itens_compras/list e /itens_compras/delete', async () => {
        var agent = supertest(app);
        const postList = await agent.get('/itens_compras');
        
        expect(postList.statusCode).toEqual(200);

        if (postList.body.length > 0){


        for(const e of postList.body){
           
            const data = { "id" : e.id };
            console.log("Encontrou o itenscompra: ");
            console.log(data);
            
            const postDelete = await agent.delete('/itens_compras').send(data);
            
            console.log("Removeu o itenscompra: ");
            console.log(data);

            expect(postDelete.statusCode).toEqual(204);
        }
        }else{
            const data = { "nome" : "ItensCompras de testes", "bla" :"ble" };
            const postCreate = await agent.post('/itens_compras').send(data);
            
            console.log("Cadastrou o itenscompra: ");
            console.log(postCreate);

            expect(postCreate.statusCode).toEqual(200);
        }

    });


    it('teste /compras/list e /compras/delete', async () => {
        var agent = supertest(app);
        const ret = await agent.get('/compras');
        expect(ret.statusCode).toEqual(200);

        if (ret.body.length > 0){
            console.log(`Encontrou ${ret.body.length} compras cadastradas.`);
            
            for(const c of ret.body){
            
                const data = { "id" : c.id };
                console.log(`Removendo a compra ${data.id}.`);
                const postDeleteCompra = await agent.delete('/compras').send(data);
                expect(postDeleteCompra.statusCode).toEqual(204);
                
            }
        }else{
            console.log("Não encontrou compras cadastradas, cadastrando nova compra.");

            const postCreateCompra = await agent.post('/itens_compras').send({"quantidade": 1, "valor": 11});

            expect(postCreateCompra.statusCode).toEqual(200);

            const postFindCompra = await agent.get('/compras').send({"quantidade" : 2, "valor": 12});

            expect(postFindCompra.statusCode).toEqual(200);

            //console.log(postFindEndereco.body);
            const data = {"itens" : postFindCompra.body[0]
                        };

            const postCreateJogador = await agent.post('/compras').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        }
        });
});