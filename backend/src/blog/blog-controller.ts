import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './blog-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  getAllBlog() {
    return this.blogService.getAllBlog();
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: any) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @HttpCode(201)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  createBlog(@UploadedFile() file: Express.Multer.File, @Body() dto: BlogDto) {
    const imageUrl = file ? file.filename : '';
    return this.blogService.create({ ...dto, image: imageUrl });
  }

  @HttpCode(200)
  @Patch(':id')
  updateBlog(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
