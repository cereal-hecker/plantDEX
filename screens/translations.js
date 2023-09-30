import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translate from 'translate-google-api';

/*
Use this for translations in every document
import './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';


In Function:
const { t } = useTranslation();

To Chang Language:
i18n.changeLanguage('hi');
*/
/*
Use this for google transalte
import translate from 'translate-google-api';

In Functon:
const [phoneText,  setPhoneText] = useState("Phone Number");
const translatorPhone = () => {
translate("Phone Number",{
    tld: 'com',
    to: 'fr'
}
).then((result) => {
    setPhoneText(result);
})
.catch((error) => alert(error.message));
};
*/

const translationJSON = {
    en:{
        translation:{
            "Phone number" : "Phone number",
            "Log In" : "Log In",
            "Plant Care" : "Plant Care",
            "Welcome!" : "Welcome!",
            "Skip" : "Skip",
            "User" : "User",
            "Expert" : "Expert",
            "Simplify disease diagnosis and crop protection with easy access to plant health records." : "Simplify disease diagnosis and crop protection with easy access to plant health records.",
            "Scan & Detect" : "Scan & Detect",
            "Use AI for quick plant disease detection, ensuring healthier and more abundant harvests." : "Use AI for quick plant disease detection, ensuring healthier and more abundant harvests.",
            "Crop Precision" : "Crop Precision",
            "Customized solutions for plant diseases, optimizing crop yields with precision and personalized care." : "Customized solutions for plant diseases, optimizing crop yields with precision and personalized care.",
            "Email" : "Email",
            "Password" : "Password",
            "Forgot Password?" : "Forgot Password?",
            "Show" : "Show",
            "Hide" : "Hide",
            "Home" : "Home",
            "Forum" : "Forum",
            "Select your crop" : "Select your crop",
            "Permission to access media library is required!" : "Permission to access media library is required!",
            "Permission to access the camera is required!" : "Permission to access the camera is required!",
            "UPLOAD" : "UPLOAD",
            "IMAGE OR VIDEO" : "IMAGE OR VIDEO", 
            "Select File" : "Select File",
            "OR" : "OR",
            "Take a photo" : "Take a photo",
            "Continue" : "Continue",
            "Enter your question" : "Enter your question",
            "Enter description" : "Enter description",
            "Upload Photo" : "Upload Photo",
            "Post Question" : "Post Question",
            "User name":"User name",
            "Update" : "Update",
            "Close":"Close",
            "Logout":"Logout",
            "history" : "history", 
            "No History Available":"No History Available",
            "Something went wrong":"Something went wrong",
            "FORUM":"FORUM"
        }
    },
    hi:{
        translation:{
            "Phone number" : "फ़ोन नंबर",
            "Log In" : "लॉग इन करें",
            "Plant Care" : "पौधे की देखभाल",
            "Welcome!" : "नमस्ते!",
            "Skip" : "छोडना",
            "User" : "उपयोगकर्ता",
            "Expert" : "विशेषज्ञ",
            "Simplify disease diagnosis and crop protection with easy access to plant health records." : "पौधों के स्वास्थ्य रिकॉर्ड तक आसान पहुंच के साथ रोग निदान और फसल सुरक्षा को सरल बनाएं।",
            "Scan & Detect" : "स्कैन करें और पता लगाएं",
            "Use AI for quick plant disease detection, ensuring healthier and more abundant harvests." : "पौधों की बीमारियों का त्वरित पता लगाने, स्वस्थ और अधिक प्रचुर फसल सुनिश्चित करने के लिए एआई का उपयोग करें।",
            "Crop Precision" : "फसल परिशुद्धता",
            "Customized solutions for plant diseases, optimizing crop yields with precision and personalized care." : "पौधों की बीमारियों के लिए अनुकूलित समाधान, सटीक और व्यक्तिगत देखभाल के साथ फसल की पैदावार को अनुकूलित करना।",
            "Email" : "ईमेल",
            "Password" : "पासवर्ड",
            "Forgot Password?" : "पासवर्ड भूल गए?",
            "Show" : "दिखाओ",
            "Hide" : "छिपाना",
            "Home" : "घर",
            "Forum" : "मंच",
            "Select your crop" : "अपनी फसल चुनें",
            "Permission to access media library is required!" : "मीडिया लाइब्रेरी तक पहुँचने की अनुमति आवश्यक है!",
            "Permission to access the camera is required!" : "कैमरे तक पहुँचने की अनुमति आवश्यक है!",
            "UPLOAD" : "अपलोड",
            "IMAGE" : "फोटो", 
            "Select File" : "फ़ाइल का चयन करें",
            "OR" : "या",
            "Take a photo" : "एक तस्वीर लें",
            "Continue" : "आगे बढ़ें",
            "Enter your question" : "अपना प्रश्न दर्ज करें",
            "Enter description" : "विवरण दर्ज करें",
            "Upload Photo" : "फोटो अपलोड करें",
            "Post Question" : "प्रश्न पोस्ट करें",
            "User name":"उपयोगकर्ता नाम",
            "Update" : "अद्यतन",
            "Close":"बंद करना",
            "Logout":"लॉग आउट",
            "History" : "वृत्तांत", 
            "No History Available":"कोई स्टोरी उपलब्ध नहीं है",
            "Something went wrong":"कुछ गलत हो गया",
            "FORUM":"मंच"
        }
    }
}


i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: translationJSON,
    lng: 'en'
})

const staticTranslate = () => {
    
}

const translator = (text, setText, lang) => {
    translate(text,{
        tld: 'com',
        to: lang
    }
    ).then((result) => {
        setText(result);
    })
    .catch((error) => alert(error.message));
    };

export const DynamicTranslator = translator;
export default i18n