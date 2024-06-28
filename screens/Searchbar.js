import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view"
import { TextInput } from "react-native-gesture-handler";

const Searchbar  = ({ navigation }) => {
  return (
    <SafeAreaView 
    style={{
      backgroundColor: "white",
      height: "100%"
    }}>
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: "white",
        height: "100%"
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="black"
            onPress={() => navigation.goBack("")}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingTop: 3
            }}
          >
         Privacy Policy
          </Text>
        </View>
        <View style={{
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 10
        }}>
            <Text style={{
                color: "black",
                fontSize: 15}}>This Privacy Notice outlines the plicies and procedures of DApps Platform, Inc. ("we,""our," or "us") concerning the collection, use, and disclosure of your information on www.bitgetpremium.com and related mobile applications and products we offer (referred to as the "Services" or "BitGetPremium" 

                Overview Protecting your privacy and personal data is of utmost importance to us. This 
                Privacy Notice explains how we handle your personal informamation through Bitget Premium. 
                We are comitted to safeguarding your data and do not share it with third parties except for the purpose
                of providing our Services, complying with legal requirements, enhancing Bitget Premium, protecting our rights, or faciliating a business transfer. We are not a faceless corporation, but developers striving 
                to deliver an exceptional product. If you have any questions or conencerns about this policy, please contact us at: support@bitgetpremium.com 
                
                Acceptance of this Policy: By using Bitget Premium, including downloading our mobile applications or visiting our website, you agree to the use, disclosure, and procedures outlined in this Privacy Policy. 
                
                Types of Personal Information We Collect: We make every effort to minmize the amount of personal information we collect from Bitget Premium users. We may collect your contact information, such as your phone number or email address (depending on how you contact us), when you reach out to us for support, report a bug or error related to Bitget Premium, or interact with us through social media. When you use our Services, we process public wallet addresses that you generate through Bitget Premium. 
                
                Sharing of Personal Data with Third Parties: We value our users' information and do not sell personal data to third parties. However, we may transfer personal data to our service providers or third parties to support Trust Market's operations, as certain features rely on third-party products and services ("Third Party Services"). These providers only access specific personal information, such as your public wallet addresses, to perform their functions and we are boud by our agreements to process it only as permitted by data protection laws. 
                
                In the event of business transfers or acquisitions, user information, including personal information, my be transferred as part of the assets. Additionally, if Trust Makret undergoes a change of control, your personal information could be one of the assets transferred. We may share non-personally identifiable information publicly and with partners like publishers, advertisers, developers, or right holders. 
                
                How We Use Collected Information: We primarily use the limited information we collect to enhance Bitget Premium. We do not rent, trade, or sell your personal information, except as outlined in this policy. Some ways we may use your personal information include: 
                
                - Contacting you when necessary 
                - Responding to your comments, questions or bug reports related to Bitget Premium
                - Providing you with additional information 
                - Sending you information and marketing materials about services and products available through Trust Market. 
                - Training our team members 
                - Other internal business purposes 
                
                Data Securit: We are comitted to protecting your information according to applicable laws and our data privacy policies. While we have selected third-party vendors to help safeguard your Personal Information, such as Coinbase, Shapeshift, and Changelly, who operate on the Ethereum network, we do not control these third parties and therefore cannot gurantee complete security. We employ encryption protocols and software during data transimission, maintain physical, electronic and procedural safeguards, and secure connetions with industry-standartd transport layer security. 
                However, no system is entirely immune to events like hardware or software failures or unauthorized access. 
                
                Children: Bitget Premium is not inteded for children, and users must be at least eighteen (18) years old to use our services. We do not knowingly collect information from children under the age of 13. If you are a parent or guardian and believe your minor child has used Trust Market, please contact us at: support@bitgetpremium.com, and we will assist accordingly. 
                
                Your Rights Regarding Personal Data Processing You have the right to: 
                - Request access to the personal information we process about you 
                - Request rectification of your personal data if it is incorrect or incomplete
                - Object to the processing of your personal data
                - Request erasure of your personal data under certain conditions. 
                - Request restriction of the processing of your personal data under specific circumstances. 
                
                Please note that we do not sell your personal data.
                
                Data Retention: Even if you delete your wallet or addresses from the Bitget Premium mobile application, uninstall Bitget Premium mobile applications, or request information deletion, we may retain some data to maintain Bitget Premium or comply with applicable laws and regulations. Wallet addresses created through the Bitget Premium application cannot be deleted from the Ethereum Blockchain. 
                
                Conditions of Use, Notices, Changes, and Updates to Privacy Notice. Your use of Bitget Premium and any privacy disputes are subject to this Privacy Notice and our Terms of Use. 
                We reserve the right to update and revise this Privacy Notice as needed. We occasionally review this notice to ensure it complies with applicable laws and aligns with changes in our business. If we revise this Privacy Notice, we will update the 'Effective Date' at the top of this page and notify you as appropriate. 
                Please review this Privacy Notice periodically to stay informed about any changes. 
                
                Questions: If you have any questions or concerns about this Privacy Notice or Bitget Premium's privacy practices, please contact us at support@bitgetpremium.com</Text>
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Searchbar;
