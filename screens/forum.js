import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { SearchBar } from "react-native-elements";
import QuestionCard from "../components/questionCard";
import questions from "../assets/data/questions";

export default function Forum() {
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSendButtonVisible, setSendButtonVisible] = useState(false);
  const rotateValue = useState(new Animated.Value(0))[0];
  

  const onChangeSearch = (text) => {
    setSearch(text);
    const filtered = questions.filter(
      (item) =>
        item.question.toLowerCase().includes(text.toLowerCase()) ||
        item.answer.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  const toggleSendButton = () => {
    let targetValue = !isSendButtonVisible ? 45 : 0;
    
    Animated.timing(rotateValue, {
      toValue: targetValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,  // Updated to true
    }).start();

    setSendButtonVisible(!isSendButtonVisible);
};

  const postQuestion = () => {
    const currentDate = new Date().toLocaleDateString();
    const newQuestionData = {
      id: questions.length + 1,
      username: "Your Username",
      date: currentDate,
      question: newQuestion,
      answer: "",
    };

    setFilteredQuestions([...filteredQuestions, newQuestionData]);
    setNewQuestion("");
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 45],
    outputRange: ["0deg", "45deg"],
});

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FORUM</Text>
      <View style={styles.searchbarContainer}>
        <SearchBar
          onChangeText={onChangeSearch}
          placeholder="Are my potatoes dying?"
          value={search}
          showCancel
          placeholderTextColor="#F2F2F2"
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          searchIcon={{ size: 30, color: "#049A10" }}
        />
        <ScrollView contentContainerStyle={styles.content}>
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              username={question.username}
              date={question.date}
              question={question.question}
              answer={question.answer}
            />
          ))}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
      <View style={styles.centeredContent}>
        {isSendButtonVisible && (
          <TextInput
            style={styles.newQuestionInput}
            placeholder="Ask a question"
            placeholderTextColor="#F2F2F2"
            value={newQuestion}
            onChangeText={(text) => setNewQuestion(text)}
          />
        )}
        <View style={styles.buttonContainer}>
          {isSendButtonVisible && (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={postQuestion}
              disabled={newQuestion.trim() === ""}
            >
              <Image
                style={styles.send}
                source={require("../assets/images/send.png")}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.plusButton}
            onPress={toggleSendButton}
          >
            <Animated.Image
    style={[
      styles.plus,
      { transform: [{ rotate: rotate }] },
    ]}
    source={require("../assets/images/plus.png")}
/>
          </TouchableOpacity>
        </View>
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
    marginTop: "4%",
  },
  inputStyle: {
    color: "white",
  },
  searchbar: {
    backgroundColor: "rgba(4, 154, 16, 0.5)",
    marginBottom: "4%",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
    width: 362,
    height: 50,
    justifyContent: "center",
    marginTop: "-2%",
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
  centeredContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "0.5%",
    right: "0%",
    gap: 10,
  },
  newQuestionInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#75C07C",
    color: "white",
  },
  plusButton: {
    backgroundColor: "#049A10",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    width: 35,
    height: 35,
  },
  send: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#049A10",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
  },
  quesinput: {
    color: "white",
  },
});
