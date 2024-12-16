import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { debugLog, logger } from './shared/logger';

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');


async function bootstrap() {
  let app = null;
  const server = express();
  app = await NestFactory.create(AppModule,
    new ExpressAdapter(server));

  const options = new DocumentBuilder()
    .setTitle('Weather Stations APIs')
    .setDescription('Weather Stations APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Bearer *schedule*',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'JWT',
    )
    .addSecurityRequirements('JWT')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup('docs', app, document);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(helmet());
  app.enableCors(
    {
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      origin: true
      // origin: getAllowedOrigins(),
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.SECRET_SET_COOKIE || 'secret'));

  await app.init();
  http.createServer(server).listen(process.env.PORT || 3000);
  debugLog(`Application is running on: ${process.env.PORT || 3000}`);
}

bootstrap();

export const writeSwaggerJson = (path: string, document: any) => {
  fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
};
