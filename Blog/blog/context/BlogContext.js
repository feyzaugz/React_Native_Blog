import React, { useState, useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 999999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogpost":
      return action.payload;
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async (title, content, callBack) => {
    await jsonServer.post("/blogposts" , {title, content})
    // dispatch({ type: "add_blogpost", payload: { title, content } });
    if (callBack) {
      callBack(); // sayfa yönlendirmesi için kullandık
    }
  }; //callBack
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callBack) => {

    await jsonServer.put(`/blogposts/${id}`, {title, content})

    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callBack) {
      callBack(); // sayfa yönlendirmesi için kullandık
    }
  }; //callBack
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogpost", payload: response.data });
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    //id olduğu için string olmayacak
    await jsonServer.delete(`/blogposts/${id} `) ;
    dispatch({ type: "delete_blogpost", payload: id });
  }; //callBack
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
); //bunu dışarıya açtık

// Kısacası, bu kod, bir bağlam oluşturur ve bu bağlamı paylaşılabilir hale getiren bir bileşen sağlar.
// Bu bağlam, belirli verileri uygulama içinde iletmek ve erişmek için kullanılabilir.
// BlogProvider bileşeni, bu bağlamı kullanmak isteyen diğer bileşenleri sarmalamak için kullanılabilir.
// Bu sarmalama işlemi sayesinde iç bileşenler, bu bağlamdaki verilere erişebilir.
