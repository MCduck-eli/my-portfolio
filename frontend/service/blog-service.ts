import axios from "axios";
import { IBlogTypes } from "@/types/blog-types";

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/blog`;

class BlogServiceClass {
    async getAllBlog(): Promise<IBlogTypes[]> {
        const { data } = await axios.get<IBlogTypes[]>(BASE_URL);
        return data;
    }

    async create(blogData: any) {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("link", blogData.link);

        if (blogData.imageFile) {
            formData.append("image", blogData.imageFile);
        }

        const { data } = await axios.post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    }

    async update(id: string, dto: Partial<IBlogTypes>): Promise<IBlogTypes> {
        const { data } = await axios.put<IBlogTypes>(`${BASE_URL}/${id}`, dto);
        return data;
    }

    async delete(id: string): Promise<any> {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    }
}

const BlogService = new BlogServiceClass();
export default BlogService;
