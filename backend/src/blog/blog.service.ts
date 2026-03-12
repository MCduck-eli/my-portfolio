import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog-schema';
import { Model } from 'mongoose';
import { BlogDto } from './blog-dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllBlog() {
    return await this.blogModel.find().exec();
  }

  async create(data: any) {
    return await this.blogModel.create(data);
  }

  async update(id: string, dto: BlogDto) {
    return await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
