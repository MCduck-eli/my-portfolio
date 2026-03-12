import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  link: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
