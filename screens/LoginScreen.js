import { useContext, useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const authCtx = useContext(AuthContext);

	const loginUserHandler = async ({ email, password }) => {
		setIsAuthenticating(true);
		try {
			const token = await loginUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Could not log you in. Please check your credentials or try again later!"
			);
			setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay message={"Loggin you in..."} />;
	}

	return <AuthContent isLogin={true} onAuthenticate={loginUserHandler} />;
}

export default LoginScreen;
