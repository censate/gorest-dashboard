import { apiClient } from "./client";
import type { User, Post, Comment } from "../types";

export const api = {
  // Users
  getUsers: async (page: number, perPage: number) => {
    const response = await apiClient.get<User[]>("/users", {
      params: { page, per_page: perPage },
    });
    return {
      data: response.data,
      pagination: {
        page: Number(response.headers["x-pagination-page"]) || page,
        per_page: Number(response.headers["x-pagination-limit"]) || perPage,
        total: Number(response.headers["x-pagination-total"]) || 0,
        pages: Number(response.headers["x-pagination-pages"]) || 1,
      },
    };
  },

  getUser: async (id: number) => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  getUserPosts: async (userId: number) => {
    const response = await apiClient.get<Post[]>(`/users/${userId}/posts`);
    return response.data;
  },

  // Posts
  getPosts: async (page: number, perPage: number) => {
    const response = await apiClient.get<Post[]>("/posts", {
      params: { page, per_page: perPage },
    });
    return {
      data: response.data,
      pagination: {
        page: Number(response.headers["x-pagination-page"]) || page,
        per_page: Number(response.headers["x-pagination-limit"]) || perPage,
        total: Number(response.headers["x-pagination-total"]) || 0,
        pages: Number(response.headers["x-pagination-pages"]) || 1,
      },
    };
  },

  getPost: async (id: number) => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  getPostComments: async (postId: number) => {
    const response = await apiClient.get<Comment[]>(
      `/posts/${postId}/comments`,
    );
    return response.data;
  },
};
