import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  // catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
  //   const ctx = host.switchToHttp();
  //   const response = ctx.getResponse<Response>();
  //   switch (exception.code) {
  //     case 'P2002':
  //       const status = HttpStatus.CONFLICT;
  //       const message = exception.message.replace(/\n/g, '');
  //       response.status(status).json({
  //         statusCode: status,
  //         message: message,
  //       });
  //       break;
  //     default:
  //       // default 500 error code
  //       super.catch(exception, host);
  //       break;
  //   }
  // }
}
