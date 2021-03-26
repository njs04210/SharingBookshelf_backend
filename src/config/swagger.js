const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    components: {},
    info: {
      title: '아이북쉐어(iBookShare) API',
      version: '1.0.0',
      description: '아이북쉐어(iBookShare) 어플리케이션을 위한 API 문서입니다.',
      contact: {
        name: '난리났네난리났어',
        url:
          'https://www.notion.so/ibookshare/iBookShare-7e3884abbb984b22b3508edcbc4e32d1',
        email: 'njs04210@naver.com',
      },
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  apis: ['src/routes/*.js', 'src/config/swagger/*'],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
