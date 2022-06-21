import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment.name) private CommentModel: Model<CommentDocument>
	) {}

  create(data: CreateCommentDto): Promise<CommentDocument> {
    const comment = new this.CommentModel(data)
		return comment.save()
  }

  findAllBookComment(bookid: string): Promise<CommentDocument[]> {
		return this.CommentModel.find({bookId: bookid}).exec()
	}

  findOne(id: string): Promise<CommentDocument> {
		return this.CommentModel.findById(id).exec()
	}

  async update(id: string, data: UpdateCommentDto): Promise<CommentDocument> {
		return this.CommentModel.findOneAndUpdate({ _id: id }, data)
	}

  async delete(id: string): Promise<CommentDocument> {
		return this.CommentModel.findOneAndRemove({ _id: id })
	}
}
