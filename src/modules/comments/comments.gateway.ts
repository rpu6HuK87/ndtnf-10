import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable, pipe } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { CommentDocument } from './schemas/comment.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway()
export class BookCommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private CommentsService: CommentsService) {}

  @WebSocketServer() ws: Server;

  afterInit(server: Server) {
    console.log('WS Started!');
  }

  handleConnection(client: Socket) {
    console.log(`Подключился клиент: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Отклчился клиент: ${client.id}`);
  }

  @SubscribeMessage('add-comment')
  addComment(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket
  ): any {
		console.log('add-comment', data)
    this.CommentsService.create(data as CreateCommentDto);
    this.ws.emit('new-comment', { data });
  }

  @SubscribeMessage('all-comments')
  getAllComments(
    @MessageBody() bookID: unknown,
    @ConnectedSocket() client: Socket
  ): Observable<WsResponse<CommentDocument[]>> {
    const data = this.CommentsService.findAllBookComment(bookID as string);
    return from(data).pipe(
      map((data) => ({ event: 'all-comments', data }))
    );
  }
}