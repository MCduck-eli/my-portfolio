"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IBlogTypes } from "@/types/blog-types";
import BlogService from "@/service/blog-service";

export default function AdminPanel() {
    const [blogs, setBlogs] = useState<IBlogTypes[]>([]);
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
        try {
            const data = await BlogService.getAllBlog();
            console.log("Bazadan kelgan bloglar soni:", data.length);
            setBlogs([...data]);
        } catch (error) {
            console.error("Bloglarni yuklashda xato:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Rostdan ham ushbu blogni o'chirmoqchimisiz?")) return;

        try {
            await BlogService.delete(id);
            alert("Muvaffaqiyatli o'chirildi!");
            setTimeout(() => fetchBlogs(), 500);
        } catch (error) {
            console.error("O'chirishda xatolik:", error);
            alert("O'chirishda xatolik yuz berdi");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            imageFile: imageFile,
        };

        try {
            if (editingBlog) {
                await BlogService.update(editingBlog._id, dataToSend);
                alert("Blog muvaffaqiyatli yangilandi!");
            } else {
                await BlogService.create(dataToSend);
                alert("Yangi blog muvaffaqiyatli qo'shildi!");
            }
            closeModal();
            fetchBlogs();
        } catch (err: any) {
            console.error("XATO TAFSILOTI:", err.response?.data || err.message);
            alert(
                "Xatolik yuz berdi! Backend (CORS) sozlamalarini tekshiring.",
            );
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
        <AdminWrapper>
            <header>
                <h1>Admin Panel</h1>
                <button
                    className="add-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Yangi Blog
                </button>
            </header>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sarlavha</th>
                            <th>Rasm URL</th>
                            <th>Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td className="img-cell">
                                        {blog.image.substring(0, 40)}...
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            onClick={() => openEditModal(blog)}
                                            className="edit-btn"
                                        >
                                            Tahrirlash
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(blog._id)
                                            }
                                            className="del-btn"
                                        >
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} style={{ textAlign: "center" }}>
                                    Bloglar topilmadi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <h2>
                            {editingBlog ? "Tahrirlash" : "Yangi Blog Qo'shish"}
                        </h2>
                        <input
                            type="text"
                            placeholder="Sarlavha"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                        <textarea
                            placeholder="Tavsif"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            required
                            rows={4}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                            }}
                        >
                            <label
                                style={{ fontSize: "12px", color: "#03a9f4" }}
                            >
                                Kompuyuterdan rasm yuklash:
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImageFile(e.target.files[0]);
                                    }
                                }}
                                required={!editingBlog}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Yoki Rasm URL manzili"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    image: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Link (Manba)"
                            value={formData.link}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    link: e.target.value,
                                })
                            }
                        />
                        <div className="modal-actions">
                            <button type="submit" className="save-btn">
                                Saqlash
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={closeModal}
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminWrapper>
    );
}

const AdminWrapper = styled.div`
    padding: 40px;
    background: #0f0f0f;
    min-height: 100vh;
    color: #fff;
    font-family: sans-serif;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        border-bottom: 1px solid #333;
        padding-bottom: 20px;
    }

    .add-btn {
        background: linear-gradient(315deg, #03a9f4, #ff0058);
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
        &:hover {
            opacity: 0.8;
            transform: translateY(-2px);
        }
    }

    .table-container {
        background: #1a1a1a;
        border-radius: 12px;
        overflow-x: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        th,
        td {
            padding: 18px;
            text-align: left;
            border-bottom: 1px solid #333;
        }
        th {
            background: #222;
            color: #aaa;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
        }
    }

    .img-cell {
        color: #666;
        font-size: 13px;
    }

    .edit-btn {
        background: #ffc107;
        margin-right: 10px;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }
    .del-btn {
        background: #ff0058;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }

    .modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        form {
            background: #1a1a1a;
            padding: 40px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            max-width: 500px;
            border: 1px solid #333;

            h2 {
                margin-top: 0;
                color: #03a9f4;
            }

            input,
            textarea {
                background: #0f0f0f;
                border: 1px solid #333;
                color: white;
                padding: 12px;
                border-radius: 8px;
                width: 100%;
                outline: none;
                &:focus {
                    border-color: #03a9f4;
                }
            }
        }
    }

    .modal-actions {
        display: flex;
        gap: 15px;
        margin-top: 10px;

        button {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            border: none;
        }
        .save-btn {
            background: #03a9f4;
            color: white;
        }
        .cancel-btn {
            background: #333;
            color: white;
        }
    }
`;
