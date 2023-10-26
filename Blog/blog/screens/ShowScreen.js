import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";

export default function ShowScreen({ route }) {
  const { state } = useContext(Context);
  console.log(route.params.id); // tıkladığımız item'in id değerini gördük
  const blogPostId = state.find(
    (blogPostId) => blogPostId.id === route.params.id
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.label}> Başlık</Text>
        <Text style={styles.content}>{blogPostId.title}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>İçerik</Text>
        <Text style={styles.content}>{blogPostId.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: '90%',
  },
  label: {
    fontSize: 25,
  },
  content: {
    fontSize: 18,
  },
});
