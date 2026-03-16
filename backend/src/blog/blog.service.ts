import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog-schema';
import { Model, Connection } from 'mongoose';
import { BlogDto } from './blog-dto';
import * as mongoose from 'mongoose';
import { Readable } from 'stream';

@Injectable()
export class BlogService {
  private bucket: mongoose.mongo.GridFSBucket;

  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    if (!this.connection.db) {
      throw new Error('MongoDB ulanishi topilmadi!');
    }
    this.bucket = new mongoose.mongo.GridFSBucket(this.connection.db as any, {
      bucketName: 'uploads',
    });
  }

  // 1. Faylni GridFS ga yuklash
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const uploadStream = this.bucket.openUploadStream(filename);
    
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on('finish', () => resolve(filename));
      uploadStream.on('error', reject);
    });
  }

  // 2. Faylni nomi orqali topish
  async findFileByName(filename: string) {
    const files = await this.bucket.find({ filename }).toArray();
    return files[0];
  }

  // 3. Fayl oqimini (stream) olish
  getFileStream(filename: string) {
    return this.bucket.openDownloadStreamByName(filename);
  }

  // 4. Barcha bloglarni olish
  async getAllBlog() {
    return await this.blogModel.find().sort({ createdAt: -1 }).exec();
  }

  // 5. Yangi blog yaratish
  async create(data: any) {
    return await this.blogModel.create(data);
  }

  // 6. Blogni tahrirlash (UPDATE) - SIZDA SHU YETISHMAYOTGAN EDI
  async update(id: string, dto: BlogDto) {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updatedBlog) {
      throw new NotFoundException('Blog topilmadi');
    }
    return updatedBlog;
  }

  // 7. Blogni o'chirish (DELETE)
  async delete(id: string) {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new NotFoundException('Blog topilmadi');
    }
    return deletedBlog;
  }
}