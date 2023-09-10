import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import QuestionCard from "../components/questionCard";
import questions from "../assets/data/questions";

export default function Forum() {
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const onChangeSearch = (text) => {
    setSearch(text);
    const filtered = questions.filter((item) =>
      item.question.toLowerCase().includes(text.toLowerCase()) ||
      item.answer.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FORUM</Text>
      <View style={styles.searchbarContainer}>
        <SearchBar
          onChangeText={onChangeSearch}
          placeholder="Are my potatoes dying?"
          value={search}
          showCancel
          placeholderTextColor="#049A10"
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          leftIcon={
            <Image source={require("../assets/images/search.png")} />
          }
          leftIconContainerStyle={styles.leftIconContainerStyle}
        />
        <ScrollView contentContainerStyle={styles.content}>
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              username={question.username}
              date={question.date}
            //   image={question.profile}
              question={question.question}
              answer={question.answer}
            />
          ))}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  bottomSpacing: {
    height: 250,
  },
  header: {
    fontFamily: "Poppins_900Black",
    fontSize: 64,
    color: "#049A10",
    marginTop: 30,
  },
  inputStyle: {
    color: "black",
  },
  searchbar: {
    backgroundColor: "rgba(4, 154, 16, 0.5)",
    marginBottom: 30,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
  },
  inputContainer: {
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});
