1º API - Na documentação, na sessão "Frame - Atualização de Frame" não tem o "id" do frame no exemplo da requisição; 
2º API - É possível adicionar um novo Todo sem um frame_id ou vazio, deveria retornar erro já que a única forma de consulta-los é via /frames;
3º API - Suponho que com base no 2º, ao remover um Frame que contenha "todos", os mesmos podem ainda estar registrados no banco;