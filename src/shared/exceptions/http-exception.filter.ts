import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        response
            .status(exception.getStatus())
            .json({
                statusCode: exception.getStatus(),
                error: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}