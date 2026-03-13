import BlogService from "@/service/blog-service";
import ProjectCard from "./components/card";
import { IBlogTypes } from "@/types/blog-types";

const CardPage = async () => {
    const blog = await BlogService.getAllBlog();
    return (
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-300 mx-auto py-10 relative z-10">
            {blog.map((item: IBlogTypes) => (
                <ProjectCard item={item} key={item._id} />
            ))}
        </div>
    );
};

export default CardPage;
