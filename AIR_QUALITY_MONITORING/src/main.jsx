import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.createRoot(document.getElementById("root")).render(
	<I18nextProvider i18n={i18n}>
		<App />
	</I18nextProvider>
);
