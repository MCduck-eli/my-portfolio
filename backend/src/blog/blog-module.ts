import { Module } from '@nestjs/common';
import { BlogController } from './blog-controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
