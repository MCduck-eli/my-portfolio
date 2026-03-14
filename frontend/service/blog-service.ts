import axios from "axios";
import { IBlogTypes } from "@/types/blog-types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/blog`
    : "https://my-portfolio-ha9d.onrender.com/api/blog";

class BlogServiceClass {
    async getAllBlog(): Promise<IBlogTypes[]> {
        try {
            const response = await axios.get(
                `${BASE_URL}?t=${new Date().getTime()}`,
                {
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                },
            );
            // Ma'lumot strukturasini tekshirish
            if (Array.isArray(response.data)) return response.data;
            if (response.data && Array.isArray(response.data.data))
                return response.data.data;
            return [];
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return [];
        }
    }

    async create(blogData: any) {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("link", blogData.link);

        if (blogData.imageFile) {
            formData.append("image", blogData.imageFile);
        } else if (blogData.image) {
            formData.append("image", blogData.image);
        }

        const { data } = await axios.post(BASE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    }

    async update(id: string, blogData: any): Promise<IBlogTypes> {
        const formData = new FormData();
        if (blogData.title) formData.append("title", blogData.title);
        if (blogData.description)
            formData.append("description", blogData.description);
        if (blogData.link) formData.append("link", blogData.link);

        if (blogData.imageFile) {
            formData.append("image", blogData.imageFile);
        } else if (blogData.image) {
            formData.append("image", blogData.image);
        }

        const { data } = await axios.patch<IBlogTypes>(
            `${BASE_URL}/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        return data;
    }

    async delete(id: string): Promise<any> {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    }
}

const BlogService = new BlogServiceClass();
export default BlogService;
