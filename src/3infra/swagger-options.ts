import { SwaggerOptions } from "swagger-ui-express";
const swaggerConfig: SwaggerOptions = {
 definition: {
   openapi: '3.0.0',
   info: {
     title: 'API de Cursos de Graduação e Campus da Faculdade',
     version: '1.0.0',
     description: 'Documentação da API de Cursos de Graduação e Campus da Faculdade' ,
   },
   tags: [
     {
       name: 'cursos',
       description: 'Operações relacionadas aos cursos de graduação' ,
     },
     {
      name: 'campus',
      description: 'Operações relacionadas aos campus da faculdade' ,
    },
   ],
   servers: [
       {
         url: '/api',
         description: 'URL base para a API',
       },
   ],
   components: {
       securitySchemes: {
           ApiKeyAuth:      
               {
                   type: "apiKey",
                   in: "header",    
                   name: "api-key"
               }
       }
   },
   security:
   [{ ApiKeyAuth: []} ]
  
 },
 apis: ['./src/**/*.ts'], // Caminho para seus arquivos TS
}

export default swaggerConfig;