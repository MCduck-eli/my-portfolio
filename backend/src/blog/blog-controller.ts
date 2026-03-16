import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  getAllBlog() {
    return this.blogService.getAllBlog();
  }

  @HttpCode(201)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createBlog(
    @UploadedFile() file: Express.Multer.File, 
    @Body() dto: any, 
    @Req() req: Request
  ) {
    let imageUrl = '';
    if (file) {
      const filename = await this.blogService.uploadFile(file);
      const protocol = req.protocol;
      const host = req.get('host');
      imageUrl = `${protocol}://${host}/api/blog/image/${filename}`;
    }
    return this.blogService.create({ ...dto, image: imageUrl });
  }

  @Get('image/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.blogService.findFileByName(filename);
    if (!file) return res.status(404).json({ message: 'Rasm topilmadi' });

    const readstream = this.blogService.getFileStream(filename);
    readstream.pipe(res);
  }

  @HttpCode(200)
  @Patch(':id')
  updateBlog(@Param('id') id: string, @Body() dto: any) {
    return this.blogService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}