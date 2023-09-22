import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import QuestionCard from "../components/questionCard";
import ReplyScreen from "./reply"; // Import the ReplyScreen component
import questions from "../assets/data/questions";
import { auth, firebaseConfig, db } from "./firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Stack = createStackNavigator();

export default function Forum() {
  const [questionReplies, setQuestionReplies] = useState({});
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSendButtonVisible, setSendButtonVisible] = useState(false);
  const rotateValue = new Animated.Value(0); // Initialize the animated value

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
      useNativeDriver: false, // Set useNativeDriver to false
    }).start();

    setSendButtonVisible(!isSendButtonVisible);
  };

  const postQuestion = async () => {
    const newQuestionData = {
      id: filteredQuestions.length + 1, // Use filteredQuestions.length instead of questions.length
      date: serverTimestamp(),
      question: newQuestion,
      answer: "",
    };
    try {
      const docRef = await setDoc(doc(db, "forum", user.uid), newQuestionData);
      alert("Post sent successfully!");
    } catch (e) {
      alert("Error adding post!");
    }
    setFilteredQuestions([...filteredQuestions, newQuestionData]);
    setNewQuestion("");
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 45],
    outputRange: ["0deg", "45deg"],
  });

  const addReplyToQuestion = (questionId, reply) => {
    setQuestionReplies((prevReplies) => ({
      ...prevReplies,
      [questionId]: [...(prevReplies[questionId] || []), reply],
    }));
  };

  const user = auth.currentUser;

  // Place to fuk with starts
  // makePost();
  // console.log(user)
  updateProfile(user, { displayName: "Admin" });

  // Place to fuk with ends
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="QuestionList">
        <Stack.Screen options={{ headerShown: false }} name="QuestionList">
          {(props) => (
            <QuestionListScreen
              {...props}
              questionReplies={questionReplies}
              search={search}
              filteredQuestions={filteredQuestions}
              setSearch={setSearch}
              onChangeSearch={onChangeSearch}
              toggleSendButton={toggleSendButton}
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
              isSendButtonVisible={isSendButtonVisible}
              postQuestion={postQuestion}
              rotate={rotate}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="ReplyScreen">
          {(props) => (
            <ReplyScreen
              {...props}
              questionReplies={questionReplies}
              addReplyToQuestion={addReplyToQuestion}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function QuestionListScreen({
  navigation,
  search,
  filteredQuestions,
  setSearch,
  onChangeSearch,
  toggleSendButton,
  newQuestion,
  setNewQuestion,
  isSendButtonVisible,
  postQuestion,
  rotate,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>FORUM</Text>
      <View style={styles.searchbarContainer}>
        <TextInput
          onChangeText={onChangeSearch}
          placeholder="Are my potatoes dying?"
          value={search}
          placeholderTextColor="#F2F2F2"
          style={styles.searchbar}
        />
        <ScrollView contentContainerStyle={styles.content}>
          {filteredQuestions &&
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                username={question.username}
                date={question.date}
                question={question.question}
                answer={question.answer}
                onCardPress={() =>
                  navigation.navigate("ReplyScreen", {
                    question: question.question,
                  })
                }
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
              style={[styles.plus, { transform: [{ rotate: rotate }] }]}
              source={require("../assets/images/plus.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    width: 320,
    height: 50,
    justifyContent: "center",
    marginTop: "-2%",
    paddingLeft: 20,
    color: "white",
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
