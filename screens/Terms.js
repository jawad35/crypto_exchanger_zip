import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view"
import { TextInput } from "react-native-gesture-handler";

const PrivacyPolicy  = ({ navigation }) => {
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
         Terms of Service
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
                fontSize: 15 }}>DApps Platform, Inc., and/or its affiliates ("we," "our," or "us") provides its software services through its website located at bitgetpremium.com and related mobile applications and products (collectively the "Services" or "Bitget"). Before using our Services, please read the Terms of Service (the "Terms") carefully, along with any other policies or notices on our website or mobile applications. Agreemenent to Terms By accessing or using any or all of the Services, you expressly acknowledge that (i) you have read and understood these Terms; (ii) you agree to be bound by these Terms; and (iii) you are legally competent to enter into these Terms. If you do not agree to be bound by these Terms or any updates or modifications to these Terms, you may not access or use our Services. WE DO NOT PROVIDE INVESTMENT OR FINANCIAL ADVICE OR CONSULTING SERVICES. WE ARE SOLELY THE PROVDER OF BITGET PREMIUM AND WE DO NOT ADVISE OR MAKE RECOMMENDATIONS ABOUT ENGAGING IN DIGITAL ASSET TRANSACTIONS OR OPERATIONS. DECISIONS TO ENGAGE IN TRANSACTIONS OR PERFORM OPERATIONS INVOLVING DIGITAL ASSETS SHOULD BE TAKEN ON YOUR OWN ACCORD. Privacy Policy for an explanation on how we collect, use and disclose information from our users, please see our privacy policy at http://bitgetpremium.com. You acknowledge and agree that your use of the Services is subject to, and that we can collect, use and/or disclose your information (including any personal data you provide to us) in accordance with our Privacy Policy. Updates to Terms or Service. We reserve the right to update or modify these Terms at any time at our sole discretion. If we do so, we'll let you know by either posting the revised Terms on our website, on our mobile application or through other methods of communication, which we deem reasonable. Such revised Terms as posted will take ffect immediately, unless otherwise indicated. You should regularly check our website to inform yourself of any such changes and decide whether or not to accept the revised version of these Terms. If you continue to use Bitget Premium following any update or modification of the Terms you shall be deemed to have accepted the revised Terms. If you do not agree to the Terms or any update or modification to the Terms, you muse ceae to access or use our Serices. Our Services are evolving over time, we may change or discontinue all or any part of the Services, at any time and without prior notice, and at our sole discertion. Eligibility to be eligible to use Bitget Premium: (i) you must be at least eighteen (18) years old and legally competent to enter into these Terms; (ii) you musat not be a resident of sanctioned jurisdictions according to any trade embargoes, UN Security Council Resolutions ("UNSCR") or HM Treasury's financial sanctions regime; and (iii) you must not be currently the subject of or subject to economic sanctions such as the United Nations Security Council Sanctions List, the list of specially designated nationals maintained by OFAC, the denied persons or entity list of the U.S Department of Commerce or any similar list maintained by any other relevant sactions authority. If you are using our Services on behalf of a legal entity, you further represent and warrant that: (iv) the legal entity is duly authorized by such legal entity to act on its behalf. You can only use our Services if permitted under the laws of your jurisdiction. For the avoidance of doubt, you may not use our Services if you are located in, or a citizen or resident of any state, country, territory or other jurisdiction where your use of our Services would be iliegal or otherwise violate any pplicable laws. Please make sure that these Terms are in compliance with all laws, rules, and regulations that apply to you. You agree that you are only using our Services with legally-obtained funds that rightfullu belong to you. By using Bitget Premium, you represent and warrant that yuou meet all eligibility requirments that we outline in these Terms. We may still refuse to let certain people access or use Bitget Premium, however, and we reserve the right to change our eligibility criteria at any time. Services Trust Market is a non-custodial wallet software, for digital assets such as cryptocurrencies, virtual commodities and NFT's ("Digital Assets"), meaning you are solely in control of and responsible for your Digital Assets and private keys, and accordingly you can authorize transactions from your wallet address. You expressly acknowledge and agree that as Trust Market is a non-custodial wallet software, you are solely responsible for your activity and any risk of loss at all times. Bitget Premium allows you to: 
- generate wallet addresses and associated private keys that you may use to send and receive digital assets;
- browse and access third party decentralized applications "DApp(s)" and third party decentralized exchanges "DEX" through the mobile application's web browser;
- swap/trade digital assets through DApp funcionality made available by third party service provider(s); 
- stake certain digital assets in a third party 'proof of stake' network through staking services "Staking Service"; 
- view digital asset price information made available by third party service provider(s); and 
broadcast Digital Asset Transaction data to various blockchains supported by Bitget Premium without requiring you to download or install the associated blockchain-based software to your local device. 
Wallet Address, Private Key and Backup Capabilities An encrypted backup of certain information associated with your wallet can be stored on eligible dvices. The private key is associated wit hthe wallet address and, together they can be used to authorize the transfer of Digital Assets to and from that wallet address. You are solely responsible for the retention and security of your private key and any mnemonic phrase ("Secret Phrase") associated with your wallet. You must keep your wallet address, Secret Phrase, and private key access information secure. It is very important that you backup your private keys, backup phrases or password. Failure to do so may result in the loss of control of Digital Assets associated with you wallet. You acknowledge and agree that we do not receive or store your wallet password, encrypted private key, unencrypted private key, or Secret Phrase associated with your wallet. You acknowledge and agree that we do not receive or store your wallet password, encrypted private key, unencrypted private key, or Secret Phrase associated with your wallet. We cannot generate a new password for your wallet, if you fail to remember your original password. If you have not safely stored a backup of any wallet address and private key pairs maintained in your wallet, you accept and acknowledge that any Digital Assets you have associated with such wallet address will become inaccessible. Accordingly, we shall have no responsibility or liability whatsoever in the event you are unable to access your wallet for any reason including without limitation your failure to keep your wallet address, Secret Phrase and private key information secure. </Text>
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
