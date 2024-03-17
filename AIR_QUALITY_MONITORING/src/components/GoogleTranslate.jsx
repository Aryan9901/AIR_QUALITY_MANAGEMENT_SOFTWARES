import { useEffect } from "react";

function GoogleTranslate() {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
		script.async = true;
		document.body.appendChild(script);

		window.googleTranslateElementInit = () => {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: "en",
					includedLanguages: "en,hi,gu,mr,ta,te,kn,ml,pa,ur,bn,or,as,ne,si,my,sn,mrj,doi,ks",
					layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
				},
				"google_translate_element"
			);
		};

		return () => {
			document.body.removeChild(script);
			delete window.googleTranslateElementInit;
		};
	}, []);

	return <div id="google_translate_element"></div>;
}

export default GoogleTranslate;
