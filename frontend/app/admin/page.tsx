"use client";
import React, { useEffect, useState } from "react";
import BlogService from "@/service/blog-service";
import { IBlogTypes } from "@/types/blog-types";

export default function AdminPanel() {
    const [blogs, setBlogs] = useState<IBlogTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<IBlogTypes | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        link: "",
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await BlogService.getAllBlog();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Yuklashda xato:", error);
        } finally {
            setLoading(false);
        }
    };

    // DELETE FUNKSIYASI
    const handleDelete = async (id: string) => {
        if (!confirm("Rostdan ham ushbu blogni o'chirmoqchimisiz?")) return;
        try {
            await BlogService.delete(id);
            alert("Muvaffaqiyatli o'chirildi!");
            fetchBlogs();
        } catch (error) {
            alert("O'chirishda xatolik!");
        }
    };

    // SUBMIT (CREATE & UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = { ...formData, imageFile };

        try {
            if (editingBlog) {
                await BlogService.update(editingBlog._id, dataToSend);
                alert("Yangilandi!");
            } else {
                await BlogService.create(dataToSend);
                alert("Qo'shildi!");
            }
            closeModal();
            fetchBlogs();
        } catch (err) {
            alert("Xatolik yuz berdi!");
        }
    };

    const openEditModal = (blog: IBlogTypes) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            description: blog.description,
            image: blog.image,
            link: blog.link,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setImageFile(null);
        setFormData({ title: "", description: "", image: "", link: "" });
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl font-bold text-green-500 italic">
                        Admin Panel
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-bold transition"
                    >
                        + Yangi Blog
                    </button>
                </header>

                {loading ? (
                    <div className="text-center py-10 text-gray-400">
                        Yuklanmoqda...
                    </div>
                ) : (
                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                                <tr>
                                    <th className="p-4">Sarlavha</th>
                                    <th className="p-4">Rasm URL</th>
                                    <th className="p-4 text-right">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="border-b border-gray-800 hover:bg-gray-800/40"
                                    >
                                        <td className="p-4 font-medium">
                                            {blog.title}
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs truncate max-w-[150px]">
                                            {blog.image}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() =>
                                                    openEditModal(blog)
                                                }
                                                className="text-blue-400 hover:text-blue-300 mr-4 font-semibold"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(blog._id)
                                                }
                                                className="text-red-500 hover:text-red-400 font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-md flex flex-col gap-4"
                        >
                            <h2 className="text-xl font-bold text-green-500 mb-2">
                                {editingBlog
                                    ? "Blogni tahrirlash"
                                    : "Yangi blog qo'shish"}
                            </h2>

                            {/* Sarlavha */}
                            <input
                                className="bg-black border border-gray-700 p-3 rounded-lg outline-none focus:border-green-500 text-white"
                                type="text"
                                placeholder="Sarlavha"
                                value={formData.title}
                                required
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                            />

                            <textarea
                                className="bg-black border border-gray-700 p-3 rounded-lg outline-none focus:border-green-500 text-white"
                                placeholder="Tavsif"
                                value={formData.description}
                                required
                                rows={3}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />

                            {/* Rasm URL (Agar link orqali bo'lsa) */}
                            <input
                                className="bg-black border border-gray-700 p-3 rounded-lg outline-none focus:border-green-500 text-white"
                                type="text"
                                placeholder="Rasm URL (https://...)"
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="bg-black border border-gray-700 p-3 rounded-lg outline-none focus:border-green-500 text-white"
                                type="text"
                                placeholder="Loyiha linki (URL)"
                                value={formData.link}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        link: e.target.value,
                                    })
                                }
                            />

                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500 ml-1">
                                    Yoki rasm faylini tanlang:
                                </label>
                                <input
                                    className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImageFile(
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                />
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 p-3 rounded-lg font-bold hover:bg-green-700 transition"
                                >
                                    Saqlash
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 bg-gray-700 p-3 rounded-lg font-bold hover:bg-gray-600 transition"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
