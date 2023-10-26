import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

export default function EditScreen({ route, navigation }) {
  const { state, editBlogPost } = useContext(Context);
  const id = route.params.id;
  const blogPostId = state.find(
    (blogPostId) => blogPostId.id === route.params.id
  );
  return (
    <BlogPostForm
      isEditable={true}
      initialValues={{ title: blogPostId.title, content: blogPostId.content }}
      onsubmit={(title, content) => { 
        editBlogPost(id, title, content, () => navigation.pop());
      }}
    ></BlogPostForm>
  );
}

const styles = StyleSheet.create({});
