import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
	const [fetchedMessage, setFetchedMessage] = useState("");

	const authCtx = useContext(AuthContext);
	const token = authCtx.token;

	useEffect(() => {
		axios
			.get(
				`https://react-native-course-0127-default-rtdb.firebaseio.com/data/messages.json?auth=${token}`
			)
			.then((response) => {
				setFetchedMessage(response.data);
			})
			.catch((err) => {
				console.log("error =>", err);
			});
	}, []);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{fetchedMessage}</Text>
		</View>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
