/**
 * Digital Safety & Literacy Simulator
 * College Societal Project: Education, Digital Literacy and Skill Development
 * 
 * Simulated Scenarios Dataset
 * Note: All scenarios, phone numbers, email addresses, and URLs are 100% SIMULATED and fictional.
 * No real personal data or external APIs are used.
 */

const SCENARIOS = [
  // ==========================================
  // CATEGORY 1: SMS & MESSAGING
  // ==========================================
  {
    id: "sms-01",
    category: "sms",
    categoryName: "SMS & Messaging",
    title: "The Surprise Festive Lottery Prize",
    difficulty: "Beginner",
    threatType: "Lottery Scam / Advance Fee Phishing",
    sender: "Unknown Number (+91 98210-94812)",
    timestamp: "Today, 11:42 AM",
    simulatedType: "sms",
    messageContent: `CONGRATULATIONS! Your mobile number has won ₹50,000 cash in the National Festive Lucky Draw! 

Claim your prize immediately by clicking https://lottery-claim-now.xyz/win50k before 11:59 PM today or your reward will be cancelled!`,
    question: "You received this unexpected SMS on your phone. What would you do?",
    options: [
      {
        id: "opt-a",
        text: "Click the link immediately so you don't miss the 11:59 PM deadline.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous choice! Clicking unexpected links can install spyware, steal credentials, or lead to phishing pages asking for upfront processing fees."
      },
      {
        id: "opt-b",
        text: "Reply to the SMS asking them to transfer the money to your bank account directly.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Replying confirms your number is active and encourages scammers to ask for your account number, OTP, or advance processing charges."
      },
      {
        id: "opt-c",
        text: "Ignore the link, do not reply, and block/report the sender as spam.",
        score: 10,
        type: "safe",
        feedback: "Excellent decision! You cannot win a lottery you never entered. Legitimate organizations do not distribute massive cash prizes via random SMS with suspicious links."
      },
      {
        id: "opt-d",
        text: "Forward the message to your family and friends to see if anyone else won.",
        score: 5,
        type: "partial",
        feedback: "Partially cautious, but risky. Forwarding unverified scam messages spreads misinformation and puts less tech-savvy family members at risk."
      }
    ],
    redFlags: [
      "You never participated or purchased a ticket for this 'National Festive Lucky Draw'.",
      "Artificial urgency created ('before 11:59 PM today or reward cancelled').",
      "Suspicious top-level domain (.xyz instead of official government/registered entity).",
      "Sent from a random personal 10-digit mobile number, not a registered corporate sender ID."
    ],
    safeAction: "Never click links in unexpected prize messages. Delete the SMS and use your phone's built-in 'Report as Spam & Block' feature.",
    keyTakeaway: "Golden Rule of Lotteries: If you didn't enter a contest or buy a ticket, you NEVER won a prize."
  },

  {
    id: "sms-02",
    category: "sms",
    categoryName: "SMS & Messaging",
    title: "Urgent Bank KYC Account Suspension Alert",
    difficulty: "Intermediate",
    threatType: "Smishing (SMS Phishing) / Credential Harvesting",
    sender: "VK-HDFCBK-ALERT",
    timestamp: "Yesterday, 04:15 PM",
    simulatedType: "sms",
    messageContent: `Dear Customer, Your NetBanking access has been BLOCKED due to incomplete PAN & Aadhaar KYC. 

Update immediately within 24 hours to prevent permanent account suspension: https://hdfc-kyc-update.online/auth`,
    question: "This message appears to come from a major bank. What is your safest course of action?",
    options: [
      {
        id: "opt-a",
        text: "Open the bank's official mobile banking app independently or visit the bookmarked official website to check your KYC status.",
        score: 10,
        type: "safe",
        feedback: "Spot on! Always use independent, verified channels (official app or verified branch). Banks never ask you to update KYC via external non-official web links in an SMS."
      },
      {
        id: "opt-b",
        text: "Click the link and quickly submit your PAN and Aadhaar details to avoid account deactivation.",
        score: 0,
        type: "unsafe",
        feedback: "High risk! The link leads to a cloned phishing site designed to steal your NetBanking password, PAN, and identity details."
      },
      {
        id: "opt-c",
        text: "Call the phone number or reply asking for an extension on the 24-hour deadline.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Engaging with scammers allows them to use social engineering voice tricks (vishing) to persuade you to reveal your OTP."
      },
      {
        id: "opt-d",
        text: "Wait 24 hours to see if your NetBanking actually stops working before doing anything.",
        score: 5,
        type: "partial",
        feedback: "Safe from theft, but passive. If you have any genuine doubts regarding your bank account, checking via your official app or branch hotline is best."
      }
    ],
    redFlags: [
      "Threat of immediate negative consequences ('account blocked', '24 hours deadline').",
      "Fake domain 'hdfc-kyc-update.online' instead of the authentic bank domain (e.g., hdfcbank.com).",
      "Banks and RBI guidelines explicitly state that KYC updates are NEVER performed via SMS third-party links."
    ],
    safeAction: "Ignore SMS links. Open your official banking app directly, check the profile section, or visit your local branch in person.",
    keyTakeaway: "Banks never send SMS links asking you to submit login credentials, PAN, or OTP."
  },

  {
    id: "sms-03",
    category: "sms",
    categoryName: "SMS & Messaging",
    title: "The ₹5 Failed Courier Delivery Reschedule",
    difficulty: "Intermediate",
    threatType: "Micro-Payment Scam / Credit Card Skimming",
    sender: "IndiaSpeed-Post",
    timestamp: "Today, 09:20 AM",
    simulatedType: "sms",
    messageContent: `Package #IN-889211 delivery failed: Incorrect house address provided. 

A nominal redelivery fee of ₹5 is required to update address and re-dispatch: http://speed-post-address-update.top/pay`,
    question: "You do receive frequent online packages. How should you respond to this message?",
    options: [
      {
        id: "opt-a",
        text: "Pay the ₹5 right away since ₹5 is too small to be a scam.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous trap! The ₹5 fee is bait. Once you enter your debit/credit card number and CVV on their fake payment portal, scammers capture your card details and drain larger amounts."
      },
      {
        id: "opt-b",
        text: "Check your actual e-commerce apps (Amazon, Flipkart, India Post portal) for real tracking status using the order ID.",
        score: 10,
        type: "safe",
        feedback: "Perfect response! Genuine delivery services track packages directly inside their official app. Postal services do not collect ₹5 redelivery fees via random web links."
      },
      {
        id: "opt-c",
        text: "Share the link with the delivery boy who visited your building yesterday.",
        score: 5,
        type: "partial",
        feedback: "Not directly harmful to your money, but unnecessary and confuses local delivery workers."
      },
      {
        id: "opt-d",
        text: "Click the link but only enter UPI details instead of card details.",
        score: 0,
        type: "unsafe",
        feedback: "Still dangerous! Fake portals can trigger unauthorized UPI AutoPay mandates or collect requests that debit thousands instead of ₹5."
      }
    ],
    redFlags: [
      "Micro-payment bait (using tiny amounts like ₹5 or ₹10 to lower your suspicion).",
      "Insecure HTTP protocol instead of HTTPS.",
      "Generic tracking number without mentioning the item or the specific shopping platform.",
      "Suspicious '.top' domain extension."
    ],
    safeAction: "Log into the specific shopping app where you placed orders. Track packages only through official order dashboards.",
    keyTakeaway: "Scammers use nominal fees (₹5 or ₹10) to lure victims into typing sensitive credit/debit card numbers on fraudulent payment gateways."
  },

  // ==========================================
  // CATEGORY 2: EMAIL SAFETY
  // ==========================================
  {
    id: "email-01",
    category: "email",
    categoryName: "Email Safety",
    title: "Prestigious Merit Scholarship with Attachment",
    difficulty: "Intermediate",
    threatType: "Malicious Attachment (.exe Trojan) / Spear Phishing",
    sender: "Scholarship Council <awards@univ-global-grant.org>",
    timestamp: "Sep 28, 10:14 AM",
    simulatedType: "email",
    messageContent: `From: "Academic Grant Board" <awards@univ-global-grant.org>
To: student@college.edu
Subject: URGENT: Merit Scholarship Award of ₹1,50,000 Approved!

Dear Student,
We are pleased to inform you that your academic record has been approved for the National Higher Education Grant of ₹1,50,000. 

To disburse funds directly to your college fee account, you MUST review and sign the attached digital claim form today.

Attachment: [📎 Scholarship_Agreement_Form.pdf.exe  (2.4 MB)]

Please open the attachment on a Windows PC to finalize your award.`,
    question: "Notice the file attachment 'Scholarship_Agreement_Form.pdf.exe'. What is the safest action?",
    options: [
      {
        id: "opt-a",
        text: "Download and double-click the attachment immediately so you don't lose the scholarship.",
        score: 0,
        type: "unsafe",
        feedback: "Severe danger! The file ends with '.exe' (executable software), disguised with a fake '.pdf' name. Opening it executes malware or ransomware on your computer."
      },
      {
        id: "opt-b",
        text: "Do NOT open the file. Report the email as phishing to your college IT admin and delete it.",
        score: 10,
        type: "safe",
        feedback: "Brilliant catch! Files with double extensions like 'name.pdf.exe' are classic malware tricks. Genuine organizations send documents as actual PDFs or ask you to log into a student portal."
      },
      {
        id: "opt-c",
        text: "Forward the email to your friends so they can apply for the grant too.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous! Forwarding malware spreads the infection across your college network."
      },
      {
        id: "opt-d",
        text: "Open the file on your mobile phone instead since it said 'open on Windows PC'.",
        score: 5,
        type: "partial",
        feedback: "While a Windows .exe might not run on Android/iOS, testing unknown suspicious files on any device is unsafe practice."
      }
    ],
    redFlags: [
      "Double extension trick: 'filename.pdf.exe' masks an executable program as a document.",
      "Unsolicited grant for a scholarship you never applied for.",
      "High emotional appeal (free ₹1,50,000) combined with urgent deadline.",
      "Email domain 'univ-global-grant.org' is not affiliated with your official college or government portal."
    ],
    safeAction: "Never run attachments ending in .exe, .scr, .vbs, or .bat. Verify scholarship notices directly with your college academic office.",
    keyTakeaway: "Always inspect the true file extension of attachments. Scammers hide malware behind names like 'Contract.pdf.exe'."
  },

  {
    id: "email-02",
    category: "email",
    categoryName: "Email Safety",
    title: "Urgent Google Account Suspicious Login Alert",
    difficulty: "Intermediate",
    threatType: "Lookalike Domain Phishing / Credential Theft",
    sender: "Google Security Team <no-reply@accounts-google-security-notice.com>",
    timestamp: "Sep 27, 08:05 PM",
    simulatedType: "email",
    messageContent: `From: Google Account Alerts <no-reply@accounts-google-security-notice.com>
To: user@gmail.com
Subject: Critical Alert: Unauthorized sign-in attempt detected from Moscow, Russia

Someone just tried to access your Google Account from Chrome on Windows (Location: Moscow, Russia).

If this was NOT you, reset your password immediately to secure your photos, emails, and files:

[ 🔴 RESET PASSWORD NOW ]
(Links to: http://accounts-google-security-notice.com/login-reset)

Google Security Team`,
    question: "You see this urgent security notification. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Click 'RESET PASSWORD NOW' immediately to stop the Russian hacker.",
        score: 0,
        type: "unsafe",
        feedback: "High danger! The link leads to a fake login page that steals your real password. Look closely at the domain: 'accounts-google-security-notice.com' is NOT 'google.com'."
      },
      {
        id: "opt-b",
        text: "Do not click the button. Open a new browser tab, go directly to myaccount.google.com, and check Recent Security Activity.",
        score: 10,
        type: "safe",
        feedback: "Outstanding digital literacy! When you receive a security alert, ALWAYS navigate independently to your account security dashboard rather than clicking email links."
      },
      {
        id: "opt-c",
        text: "Reply to the email with your current password to prove you are the real owner.",
        score: 0,
        type: "unsafe",
        feedback: "Catastrophic error! Never reply with passwords. Legitimate providers never ask for your password via email."
      },
      {
        id: "opt-d",
        text: "Delete your Google account immediately to protect your data.",
        score: 0,
        type: "unsafe",
        feedback: "Unnecessary and extreme panic reaction. Panicking is exactly what social engineering attacks aim to provoke."
      }
    ],
    redFlags: [
      "Spoofed domain: 'accounts-google-security-notice.com' is a lookalike domain created to deceive.",
      "Induces panic and fear ('unauthorized sign-in from Moscow, Russia').",
      "Directs you to an external HTTP link rather than the official https://myaccount.google.com."
    ],
    safeAction: "Close the email. Type 'myaccount.google.com' directly into your browser URL bar to review authentic security notifications.",
    keyTakeaway: "Never click password reset buttons in security alert emails. Always navigate to the official account settings manually."
  },

  {
    id: "email-03",
    category: "email",
    categoryName: "Email Safety",
    title: "Unpaid Invoice with 'Enable Macros' Request",
    difficulty: "Advanced",
    threatType: "Malicious Office Macro / Word Document Payload",
    sender: "National Utility Billing <billing@fast-utility-billings.co>",
    timestamp: "Sep 26, 02:45 PM",
    simulatedType: "email",
    messageContent: `From: Billing Operations <billing@fast-utility-billings.co>
Subject: Final Notice: Overdue Bill #INV-99214 - Disconnection Scheduled

Attached is your overdue invoice summary.

Attachment: [📄 Invoice_Summary_Sep2024.docm]

NOTE: Due to security encryption, when opening in MS Word, click "Enable Editing" and then "Enable Macros/Content" at the top yellow bar to view invoice details.`,
    question: "The email instructs you to open a '.docm' file and click 'Enable Macros'. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Open the file and enable macros as requested so you can read the bill.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous! Macros are automated scripts. Enabling macros in documents from unknown sources is the #1 way ransomware and banking trojans infect computers."
      },
      {
        id: "opt-b",
        text: "Do NOT enable macros under any circumstance. Delete the email and verify your utility bill on the official provider app.",
        score: 10,
        type: "safe",
        feedback: "Exemplary safety! Genuine utility bills are sent as standard PDF files, never macro-enabled Word documents (.docm) requiring script execution."
      },
      {
        id: "opt-c",
        text: "Forward the document to your accounting professor to inspect the macros.",
        score: 5,
        type: "partial",
        feedback: "Safer than enabling it yourself, but sending malicious files across email systems can trigger institutional security quarantines."
      },
      {
        id: "opt-d",
        text: "Reply to the email asking for a discount on the overdue bill.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! It's a fake invoice. Replying exposes you to further targeted phishing."
      }
    ],
    redFlags: [
      "File format is '.docm' (Word Macro-Enabled Document), not a standard PDF.",
      "Explicit instructions urging you to bypass Word security alerts ('Enable Macros').",
      "Vague vendor name without mentioning your specific consumer account number."
    ],
    safeAction: "Keep Office macros disabled by default. Genuine bills come as viewable PDFs, never interactive script-enabled documents.",
    keyTakeaway: "Legitimate organizations NEVER ask you to 'Enable Macros' in Microsoft Word to read a bill or document."
  },

  // ==========================================
  // CATEGORY 3: ONLINE PAYMENTS & UPI SAFETY
  // ==========================================
  {
    id: "pay-01",
    category: "payments",
    categoryName: "Online Payments",
    title: "The 'Enter UPI PIN to Receive Money' Scam",
    difficulty: "Beginner",
    threatType: "UPI Collect Request Fraud / Reverse Payment Trick",
    sender: "Online Buyer (OLX / Marketplace)",
    timestamp: "Today, 02:10 PM",
    simulatedType: "payment",
    messageContent: `SIMULATED UPI PAYMENT APP SCREEN:

[ COLLECT REQUEST ]
From: Buyer_Rahul99 (rahul.buyer88@okaxis)
Amount: ₹1,500
Remark: "Payment for your study table"

[ DECLINE ]     [ PAY ₹1,500 ]

Alert Pop-up:
"Enter 4 or 6 digit UPI PIN to proceed"`
,
    question: "You listed a study table for ₹1,500. The buyer claims: 'I sent you the money, approve it and enter your UPI PIN to receive ₹1,500'. What will happen if you enter your PIN?",
    options: [
      {
        id: "opt-a",
        text: "₹1,500 will be instantly credited to your bank account.",
        score: 0,
        type: "unsafe",
        feedback: "Completely wrong! You NEVER enter your UPI PIN to receive money. Entering your PIN authorizes a DEBIT. ₹1,500 will be STOLEN from your bank account!"
      },
      {
        id: "opt-b",
        text: "Decline the request immediately! You never enter a UPI PIN to receive money.",
        score: 10,
        type: "safe",
        feedback: "100% Correct! This is one of the most widespread scams in digital payments. You only enter your UPI PIN when SENDING money, checking balance, or making purchases — NEVER to receive funds."
      },
      {
        id: "opt-c",
        text: "Enter an incorrect PIN first just to see if the app accepts it.",
        score: 5,
        type: "partial",
        feedback: "Cautious intuition, but unnecessarily risky. Just hit 'Decline' and block the scammer."
      },
      {
        id: "opt-d",
        text: "Share your debit card CVV number with the buyer instead.",
        score: 0,
        type: "unsafe",
        feedback: "Catastrophic mistake! Never share your CVV or card numbers with strangers."
      }
    ],
    redFlags: [
      "The screen clearly says 'PAY ₹1,500' and 'COLLECT REQUEST', not 'CREDIT'.",
      "The buyer claims entering a UPI PIN is required to 'receive' money — this is physically impossible in UPI architecture.",
      "The prompt is asking for authorization to debit your account."
    ],
    safeAction: "Tap DECLINE immediately. Report the UPI ID within your payment app as fraud.",
    keyTakeaway: "GOLDEN UPI RULE: Entering UPI PIN ALWAYS deducts money from your account. You NEVER need a PIN to receive payments."
  },

  {
    id: "pay-02",
    category: "payments",
    categoryName: "Online Payments",
    title: "The Clumsy Paper QR Code Sticker at a Store",
    difficulty: "Intermediate",
    threatType: "QR Code Tampering (Quishing) / Physical Redirect",
    sender: "Physical Storefront Scan",
    timestamp: "Today, 06:30 PM",
    simulatedType: "payment",
    messageContent: `SIMULATED SCANNER RESULT:

You are at "Shree Krishna Grocery Store". 
You scan the standee QR code, but notice a glossy paper sticker was pasted OVER the original shop code.

Scan Destination:
Beneficiary: "Deepak Personal Wallet (deepak7734@paytm)"
Merchant Name: "NOT A REGISTERED MERCHANT"
Amount: Enter amount`,
    question: "You want to pay ₹240 for groceries. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Proceed with the payment anyway because all QR codes work the same.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Fraudsters paste rogue QR stickers over shop standees. Your ₹240 goes into a criminal's wallet, not the shopkeeper, and the shopkeeper will still ask you to pay."
      },
      {
        id: "opt-b",
        text: "Stop! Alert the shopkeeper that their QR standee has a tampered sticker, and confirm their official merchant name/QR.",
        score: 10,
        type: "safe",
        feedback: "Superb vigilance! Always verify the beneficiary name on the screen before entering your PIN. Alerting the merchant protects you and other shoppers."
      },
      {
        id: "opt-c",
        text: "Tear the sticker off immediately without telling anyone.",
        score: 5,
        type: "partial",
        feedback: "Good intention, but it is always better to involve the store owner first so they can check security camera footage."
      },
      {
        id: "opt-d",
        text: "Pay half the amount to test if the shopkeeper receives it.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! You are willingly giving money to a scammer."
      }
    ],
    redFlags: [
      "Physical paper sticker crudely pasted over the genuine printed standee.",
      "Beneficiary displays an unknown personal name instead of 'Shree Krishna Grocery Store'.",
      "Missing verified business badge."
    ],
    safeAction: "Always check the name displayed on your UPI confirmation screen before typing your PIN. It must match the merchant's business name.",
    keyTakeaway: "Always check the merchant name shown on your payment screen before entering your PIN."
  },

  {
    id: "pay-03",
    category: "payments",
    categoryName: "Online Payments",
    title: "Fake Customer Care 'Screen Sharing' Refund Trap",
    difficulty: "Advanced",
    threatType: "Remote Access Trojan (AnyDesk / TeamViewer) / Vishing",
    sender: "Toll-Free Helpline (Found on Google Search)",
    timestamp: "Yesterday, 03:00 PM",
    simulatedType: "payment",
    messageContent: `PHONE CALL DIALOGUE:

You had a ₹400 failed transaction on a food delivery app. You Googled the helpline and called the first number you saw.

Executive: "Sir, your ₹400 refund is pending in the server. To release it immediately, please open Google Play Store and install the 'AnyDesk Remote Support' app. 
Then read out the 9-digit code displayed on your screen so our server can sync your refund."`,
    question: "The executive wants you to install 'AnyDesk' or 'RustDesk' to process a refund. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Install AnyDesk and read the 9-digit code so the customer care agent can help.",
        score: 0,
        type: "unsafe",
        feedback: "Extreme danger! AnyDesk is a remote desktop tool. Giving them the code gives the scammer COMPLETE control over your phone screen, allowing them to view your SMS, OTPs, and bank apps!"
      },
      {
        id: "opt-b",
        text: "Hang up immediately! Never install screen-sharing apps on the advice of unknown callers.",
        score: 10,
        type: "safe",
        feedback: "Lifesaving decision! Legitimate companies NEVER require screen sharing or remote access apps (AnyDesk, TeamViewer, QuickSupport) to issue refunds."
      },
      {
        id: "opt-c",
        text: "Install the app but hide your banking apps in a secret folder.",
        score: 0,
        type: "unsafe",
        feedback: "Ineffective! Remote access grants view and control of the entire active screen. They will still see your incoming OTP notifications."
      },
      {
        id: "opt-d",
        text: "Ask them to send the refund through a postal money order instead.",
        score: 5,
        type: "partial",
        feedback: "Avoids losing money right now, but speaking with scammers keeps you on their active target list. Disconnect and report."
      }
    ],
    redFlags: [
      "Customer care number obtained from random Google search results (scammers often manipulate Google Maps / SEO listings).",
      "Request to download remote screen-sharing software (AnyDesk, TeamViewer).",
      "Claiming a refund requires technical access to your personal mobile handset."
    ],
    safeAction: "Never install remote access software for 'support'. Only raise issues through the official in-app support chat inside your food/e-commerce app.",
    keyTakeaway: "No genuine bank or e-commerce company will EVER ask you to install AnyDesk or TeamViewer for a refund."
  },

  // ==========================================
  // CATEGORY 4: PASSWORD & ACCOUNT SECURITY
  // ==========================================
  {
    id: "pass-01",
    category: "password",
    categoryName: "Password & Account Security",
    title: "The Convenient 'Single Password for Everything'",
    difficulty: "Beginner",
    threatType: "Credential Stuffing / Password Reuse Vulnerability",
    sender: "New Mobile Gaming App Sign-up",
    timestamp: "Today, 05:00 PM",
    simulatedType: "app-perm",
    messageContent: `ACCOUNT CREATION: "Retro Arcade Online"

Enter Email: rahul.student@college.edu
Create Password: [ •••••••••••• ]

Your current habit: You use "Rahul@12345" for your Gmail, Instagram, NetBanking, and now this game.`,
    question: "Is it safe to reuse 'Rahul@12345' on this new third-party gaming website?",
    options: [
      {
        id: "opt-a",
        text: "Yes, it is easy to remember and has special characters, so it is safe.",
        score: 0,
        type: "unsafe",
        feedback: "Critical risk! If this small gaming website gets hacked (data breach), attackers obtain your email and password. They will immediately test it on Gmail and your bank accounts ('credential stuffing')."
      },
      {
        id: "opt-b",
        text: "No! Use a unique strong password (or a password manager generated passphrase) specifically for this service.",
        score: 10,
        type: "safe",
        feedback: "Excellent practice! Every online account must have a unique password. That way, a breach in one insignificant website never compromises your email or banking."
      },
      {
        id: "opt-c",
        text: "Use '12345678' because it's only a casual game.",
        score: 0,
        type: "unsafe",
        feedback: "Terrible idea! Simple predictable passwords can be brute-forced in milliseconds by bots."
      },
      {
        id: "opt-d",
        text: "Write your passwords in your WhatsApp status notes.",
        score: 0,
        type: "unsafe",
        feedback: "Severe privacy disaster! Never publish or store unencrypted passwords in public or shared notes."
      }
    ],
    redFlags: [
      "Password reuse across critical (banking/email) and non-critical (gaming) services.",
      "Predictable pattern: Name + @ + basic numbers.",
      "Single point of failure: One breach leaks everything."
    ],
    safeAction: "Use distinct passphrases for every platform. Consider using an encrypted password manager.",
    keyTakeaway: "Never reuse the same password across multiple websites. If one site is breached, all your accounts are compromised."
  },

  {
    id: "pass-02",
    category: "password",
    categoryName: "Password & Account Security",
    title: "Unexpected 2FA Prompt at 2:00 AM",
    difficulty: "Intermediate",
    threatType: "MFA Fatigue / Push Bombing / Account Takeover Attempt",
    sender: "Device Security System Notification",
    timestamp: "Today, 02:14 AM",
    simulatedType: "app-perm",
    messageContent: `SYSTEM PROMPT (Google Authenticator Alert):

"Is it you trying to sign in?
Device: Windows PC
Location: Frankfurt, Germany
Time: 02:14 AM

Tap matching number to verify:
[ 19 ]   [ 42 ]   [ 88 ]

Or select: [ NO, IT'S NOT ME ]"`,
    question: "You are in India, awake studying. You did NOT attempt to log in. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Tap the number 42 to dismiss the annoying pop-up so you can continue studying.",
        score: 0,
        type: "unsafe",
        feedback: "Disastrous! Tapping the number approves the hacker's login! Attackers who know your password trigger these prompts hoping you'll click by mistake ('MFA Fatigue')."
      },
      {
        id: "opt-b",
        text: "Tap 'NO, IT'S NOT ME', deny the request, and immediately change your account password.",
        score: 10,
        type: "safe",
        feedback: "Perfect reaction! Denying the prompt blocks the hacker. Since the prompt appeared, the attacker ALREADY has your primary password, so changing it immediately is mandatory."
      },
      {
        id: "opt-c",
        text: "Ignore it and wait for it to disappear on its own.",
        score: 5,
        type: "partial",
        feedback: "Prevents immediate access, but leaves you vulnerable. The attacker still knows your password and will try again or find another bypass."
      },
      {
        id: "opt-d",
        text: "Turn off two-factor authentication so prompts stop bothering you.",
        score: 0,
        type: "unsafe",
        feedback: "Disabling 2FA removes the only safety shield protecting your account from total takeover."
      }
    ],
    redFlags: [
      "Login attempt originating from a foreign country/device you do not own.",
      "Unsolicited authentication prompt when you were not logging in.",
      "Indicates your master password has already been compromised."
    ],
    safeAction: "Deny the prompt immediately. Go to account settings from your own device, log out all active sessions, and reset your password.",
    keyTakeaway: "If you receive an authentication prompt you didn't initiate, someone knows your password. Deny the prompt and change your password immediately."
  },

  {
    id: "pass-03",
    category: "password",
    categoryName: "Password & Account Security",
    title: "Free Airport Wi-Fi 'Login with Google Password' Trap",
    difficulty: "Intermediate",
    threatType: "Rogue Wi-Fi Access Point / Evil Twin Attack",
    sender: "Public Wi-Fi Captive Portal",
    timestamp: "Today, 11:30 AM",
    simulatedType: "browser",
    messageContent: `BROWSER CAPTIVE PORTAL:

Wi-Fi Connected: "FREE_AIRPORT_SUPERFAST_WIFI"

"To unlock 1 hour of complimentary high-speed internet, authenticate your identity:

Enter your Google / Gmail Address: [                    ]
Enter your Gmail Password:          [                    ]

[ CONNECT TO INTERNET ]"`
,
    question: "A public Wi-Fi network asks for your Gmail password to give you free internet. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Enter your real Gmail password because Google logins are standard across the web.",
        score: 0,
        type: "unsafe",
        feedback: "High danger! This is a rogue 'Evil Twin' hotspot. Legitimate public Wi-Fi networks may ask for a phone number for an SMS OTP, but NEVER your personal email account password!"
      },
      {
        id: "opt-b",
        text: "Disconnect immediately! Never enter account passwords into Wi-Fi captive portals.",
        score: 10,
        type: "safe",
        feedback: "Spot on! Public Wi-Fi portals that demand private email/social passwords are rogue hotspots set up by cybercriminals to steal credentials in transit."
      },
      {
        id: "opt-c",
        text: "Type in a fake password like '123456' to see if the Wi-Fi unlocks.",
        score: 5,
        type: "partial",
        feedback: "Safe from personal theft, but still leaves you connected to an untrusted, unencrypted network that can monitor your unencrypted browsing."
      },
      {
        id: "opt-d",
        text: "Share the Wi-Fi password with other passengers sitting nearby.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! You are spreading a malicious network trap to others."
      }
    ],
    redFlags: [
      "Open, unencrypted Wi-Fi network without standard security.",
      "Demands your private Google account password on an unverified web form.",
      "Captive portal page is running on an unverified IP address."
    ],
    safeAction: "Disconnect from the network. Use your personal mobile data hotspot instead, especially when accessing sensitive apps.",
    keyTakeaway: "Public Wi-Fi should NEVER require your private email or social media passwords to grant internet access."
  },

  // ==========================================
  // CATEGORY 5: PRIVACY & PERSONAL INFORMATION
  // ==========================================
  {
    id: "priv-01",
    category: "privacy",
    categoryName: "Privacy & Personal Information",
    title: "Friend Asking for 'Accidentally Sent' OTP on WhatsApp",
    difficulty: "Beginner",
    threatType: "WhatsApp Account Takeover / Social Engineering",
    sender: "Friend 'Neha' (via WhatsApp)",
    timestamp: "Today, 07:15 PM",
    simulatedType: "sms",
    messageContent: `WHATSAPP CHAT:

Neha: "Hey! Urgent please help me! 😭 I was resetting my online portal and accidentally typed your phone number instead of mine. 

A 6-digit WhatsApp verification code was just sent to your SMS. Can you please forward that code to me right now? It will expire in 2 minutes!"

Incoming SMS Notification:
"Your WhatsApp account code is: 739-104. DO NOT share this code with anyone."`,
    question: "Your friend's account is asking for the 6-digit code you just received. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Quickly reply with '739-104' to help your friend before the 2-minute timer ends.",
        score: 0,
        type: "unsafe",
        feedback: "Disastrous! Your friend's account was already hijacked! The scammer is trying to log into YOUR WhatsApp on their device. Giving them the code hands over your account instantly!"
      },
      {
        id: "opt-b",
        text: "NEVER share the OTP! Call Neha directly via a standard cellular voice call to inform her that her account is compromised.",
        score: 10,
        type: "safe",
        feedback: "Outstanding safety awareness! The SMS explicitly warned: 'DO NOT share this code with anyone'. Scammers use compromised accounts of friends to build false trust."
      },
      {
        id: "opt-c",
        text: "Change the last digit of the code and send it.",
        score: 5,
        type: "partial",
        feedback: "Protects your account, but fails to alert your real friend that an impostor is impersonating them."
      },
      {
        id: "opt-d",
        text: "Delete your own WhatsApp app from your phone.",
        score: 0,
        type: "unsafe",
        feedback: "Panic reaction that doesn't solve the issue. All you need to do is keep the OTP private."
      }
    ],
    redFlags: [
      "The incoming SMS clearly states 'Your WhatsApp account code. DO NOT share with anyone'.",
      "Plausible excuse ('accidentally typed your phone number') combined with high urgency ('2 minutes').",
      "One-time passwords cannot be 'accidentally' routed to an unrelated phone number."
    ],
    safeAction: "Never share OTPs with anyone — not friends, family, bank officials, or police. Call your friend on their real phone number to warn them.",
    keyTakeaway: "OTP stands for One-Time Password. Sharing an OTP is exactly like handing over the keys to your digital identity."
  },

  {
    id: "priv-02",
    category: "privacy",
    categoryName: "Privacy & Personal Information",
    title: "Simple Flashlight App Requesting Sensitive Permissions",
    difficulty: "Intermediate",
    threatType: "Permission Abuse / Spyware Data Harvesting",
    sender: "App Installation Dialog: 'Super Torch 2024'",
    timestamp: "Today, 01:20 PM",
    simulatedType: "app-perm",
    messageContent: `APP PERMISSION REQUEST:

"Super Bright LED Torch Pro" wants access to:

🔴 Read Contacts & Call Logs
🔴 Access Precise Location (Always in background)
🔴 Record Audio / Microphone
🔴 Read & Send SMS Messages
⚪ Camera (Flashlight control)

[ ALLOW ALL ]        [ DENY ]`
,
    question: "A basic flashlight utility app requests access to your contacts, SMS, and microphone. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Click 'ALLOW ALL' because modern apps need permissions to function properly.",
        score: 0,
        type: "unsafe",
        feedback: "Severe privacy invasion! A flashlight app only needs camera flash access. Access to SMS, contacts, and audio turns your phone into an active spyware listening station."
      },
      {
        id: "opt-b",
        text: "Deny permissions and uninstall the app immediately. Use your phone's built-in quick settings flashlight.",
        score: 10,
        type: "safe",
        feedback: "Top tier decision! Smartphones already come with built-in torch toggles that require zero external permissions. Apps demanding irrelevant permissions are often spyware or adware."
      },
      {
        id: "opt-c",
        text: "Allow permissions only while using the app.",
        score: 5,
        type: "partial",
        feedback: "Better than background access, but still exposes your private contact list and SMS messages whenever the flashlight is switched on."
      },
      {
        id: "opt-d",
        text: "Pay for the premium version to make permissions disappear.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Paying untrusted developers gives them your credit card details on top of your private data."
      }
    ],
    redFlags: [
      "Total mismatch between app function (turning on LED light) and permissions requested (SMS, Contacts, Audio).",
      "Access to SMS allows apps to intercept your two-factor authentication codes.",
      "Redundant utility: Almost all operating systems provide a native built-in torch toggle."
    ],
    safeAction: "Follow the principle of least privilege. If an app requests permissions unrelated to its core purpose, deny and uninstall it.",
    keyTakeaway: "Always question app permissions. A flashlight app has zero legitimate need for your SMS, contacts, or location."
  },

  {
    id: "priv-03",
    category: "privacy",
    categoryName: "Privacy & Personal Information",
    title: "Viral 'Find Your Superhero Name' Social Media Quiz",
    difficulty: "Beginner",
    threatType: "Social Engineering / OSINT Security Question Harvesting",
    sender: "Viral Facebook / Instagram Public Post",
    timestamp: "Yesterday, 09:00 PM",
    simulatedType: "social",
    messageContent: `VIRAL SOCIAL MEDIA GRAPHIC:

🦸 What is YOUR Superhero Secret Identity? 🦸
Drop your answer in the comments below! 👇

• First name of your mother's maiden name
• Name of your very first childhood pet
• Street / Colony where you grew up

Example: "Sharma Fluffy MG Road" = Captain Fluffy! 💥`,
    question: "This fun quiz is trending on social media. What is the hidden risk?",
    options: [
      {
        id: "opt-a",
        text: "There is no risk; it is just a harmless game to share with friends.",
        score: 0,
        type: "unsafe",
        feedback: "High risk! Mother's maiden name, childhood pet, and childhood street are the exact default security questions used by banks, email providers, and portals to reset forgotten passwords!"
      },
      {
        id: "opt-b",
        text: "Do NOT post your real answers. These quizzes are designed to harvest security question answers.",
        score: 10,
        type: "safe",
        feedback: "Brilliant digital literacy! Cybercriminals create viral quizzes to scrape answers to common security recovery questions, enabling unauthorized account resets."
      },
      {
        id: "opt-c",
        text: "Post the answers but delete the comment after 10 minutes.",
        score: 5,
        type: "partial",
        feedback: "Automated scraping bots archive social media comments in real-time. Deleting later does not guarantee safety."
      },
      {
        id: "opt-d",
        text: "Comment with your credit card number instead.",
        score: 0,
        type: "unsafe",
        feedback: "Direct financial disaster! Never share financial details publicly."
      }
    ],
    redFlags: [
      "Specifically collects common knowledge-based authentication answers (mother's maiden name, pet name, street).",
      "Public post visible to anyone on the internet, including automated scrapers.",
      "Appeals to vanity, nostalgia, and fun to bypass your privacy guard."
    ],
    safeAction: "Never reveal personal identity markers or answers to security questions on public forums or viral games.",
    keyTakeaway: "Viral social media quizzes often trick users into publicly revealing the answers to their account recovery security questions."
  },

  // ==========================================
  // CATEGORY 6: FAKE WEBSITES & LINKS
  // ==========================================
  {
    id: "web-01",
    category: "websites",
    categoryName: "Fake Websites & Links",
    title: "The 90% Off Flagship Smartphone Diwali Sale",
    difficulty: "Intermediate",
    threatType: "Typosquatting / Fake E-Commerce Store",
    sender: "Sponsored Search Ad / Social Ad",
    timestamp: "Today, 12:15 PM",
    simulatedType: "browser",
    messageContent: `SIMULATED BROWSER WINDOW:

URL Bar: 🔒 https://www.amaz0n-diwali-mega-deals.shop/products/iphone15
[ Green Padlock Icon Visible ]

Webpage Content:
"DIWALI BLOWOUT SALE!
Apple iPhone 15 Pro Max (256 GB) - Brand New Sealed
Regular Price: ₹1,34,000  
TODAY ONLY: ₹2,999 (98% OFF)

⚠️ Only 2 units remaining at this price!
⏳ Deal expires in: 04:32 minutes
*Prepaid UPI / Credit Card only (No COD)*

[ BUY NOW FOR ₹2,999 ]"`
,
    question: "The website has a secure HTTPS padlock and an unbelievable price. Should you buy it?",
    options: [
      {
        id: "opt-a",
        text: "Yes! It has HTTPS (the lock icon), which means the website is 100% verified and legitimate.",
        score: 0,
        type: "unsafe",
        feedback: "Huge misconception! HTTPS only means your connection to the server is encrypted. It does NOT mean the business is honest. Anyone, including scammers, can get a free SSL padlock in 2 minutes!"
      },
      {
        id: "opt-b",
        text: "Do NOT buy! The URL is typosquatted ('amaz0n' with a zero, '.shop' domain), and ₹2,999 for a ₹1.3 lakh phone is a classic scam.",
        score: 10,
        type: "safe",
        feedback: "Expert observation! Look closely: 'amaz0n' contains the digit 0 instead of the letter 'o', and the domain is 'amaz0n-diwali-mega-deals.shop'. You would lose your money and receive nothing."
      },
      {
        id: "opt-c",
        text: "Ask customer service on their live chat if it is authentic before paying.",
        score: 5,
        type: "partial",
        feedback: "Scammers run their own live chat widgets and will easily assure you the fake deal is real."
      },
      {
        id: "opt-d",
        text: "Buy 10 phones to resell them at full price.",
        score: 0,
        type: "unsafe",
        feedback: "Greed trap! Multiplying your order only increases your financial loss tenfold."
      }
    ],
    redFlags: [
      "Typosquatting: 'amaz0n' uses a zero instead of the letter 'o'.",
      "Absurd discount (98% off brand new luxury electronics does not exist).",
      "Artificial high-pressure countdown timer ('expires in 4 minutes').",
      "Refusal of Cash on Delivery (COD) — forces upfront irreversible payment."
    ],
    safeAction: "Always verify the primary domain name. Shop directly by typing verified addresses (like amazon.in or flipkart.com) into your browser bar.",
    keyTakeaway: "HTTPS / Padlock does NOT mean safe! It only encrypts traffic. Scammers can easily have padlocks on fake websites."
  },

  {
    id: "web-02",
    category: "websites",
    categoryName: "Fake Websites & Links",
    title: "The Insecure 'Not Secure' Lookalike Banking Portal",
    difficulty: "Advanced",
    threatType: "Unencrypted Phishing Portal / Man-in-the-Middle Risk",
    sender: "Search Engine Sponsored Result",
    timestamp: "Today, 10:45 AM",
    simulatedType: "browser",
    messageContent: `SIMULATED BROWSER WINDOW:

URL Bar: ⚠️ Not Secure | http://onlinesbi.netbanking-portal-login.cc/auth
[ Red Warning: Your connection to this site is not secure ]

Webpage Content:
"State Bank NetBanking Login
Enter User ID:      [                   ]
Enter Password:     [                   ]
Enter ATM Card PIN: [                   ]

[ LOGIN TO ACCOUNT ]"`
,
    question: "You want to log into your bank. You see the screen above. What are the major red flags?",
    options: [
      {
        id: "opt-a",
        text: "Everything looks fine, as long as the bank's color scheme and logo match.",
        score: 0,
        type: "unsafe",
        feedback: "Extreme danger! Logos and colors are effortless to copy. This site uses HTTP (unencrypted), has a suspicious '.cc' domain, and asks for your ATM PIN!"
      },
      {
        id: "opt-b",
        text: "Close the page immediately. It is an unencrypted HTTP phishing site, uses a fake domain, and banks NEVER ask for your ATM PIN on web logins.",
        score: 10,
        type: "safe",
        feedback: "Magnificent analysis! 1) Real banks always use HTTPS. 2) The domain 'netbanking-portal-login.cc' is fake. 3) ATM PINs are strictly for physical ATMs and POS machines, never website logins."
      },
      {
        id: "opt-c",
        text: "Enter your username and password, but leave the ATM PIN blank.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Giving them your username and password already allows them to breach your account."
      },
      {
        id: "opt-d",
        text: "Bookmark the page so you can check back when the connection becomes secure.",
        score: 5,
        type: "partial",
        feedback: "Safe for now, but keeping bookmarked phishing links risks accidental future logins."
      }
    ],
    redFlags: [
      "Insecure connection: Uses HTTP instead of HTTPS, with browser 'Not Secure' alert.",
      "Unauthorized domain: Uses a '.cc' TLD instead of the official 'onlinesbi.sbi'.",
      "Demands your ATM Card PIN on a website login form — banks never request ATM PIN online."
    ],
    safeAction: "Never input banking credentials on unencrypted or unfamiliar URLs. Type the bank's official address manually or use official banking apps.",
    keyTakeaway: "Banks never ask for your 4-digit ATM PIN on an internet banking login webpage."
  },

  {
    id: "web-03",
    category: "websites",
    categoryName: "Fake Websites & Links",
    title: "The Obscure Shortened URL on Social Media",
    difficulty: "Beginner",
    threatType: "Blind Shortened URL / Drive-by Download Risk",
    sender: "Social Media Post Comment",
    timestamp: "Yesterday, 04:30 PM",
    simulatedType: "browser",
    messageContent: `COMMENT ON POPULAR POST:

"🚨 Shocking leaked paper! Download official exam answer key before the board deletes it!! 

Link: http://bit.ly/3x9_board_leak_key

Hurry, already downloaded by 5,000 students!"`,
    question: "How should you treat obscure shortened links like 'bit.ly/3x9_board_leak_key'?",
    options: [
      {
        id: "opt-a",
        text: "Click it right away on your computer to verify if the leak is genuine.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous! Shortened URLs hide the true destination website. They frequently redirect to drive-by malware downloads, illicit content, or credential harvesters."
      },
      {
        id: "opt-b",
        text: "Do not click directly. If needed, use a URL expander tool (or check official exam boards) to preview the real destination safely.",
        score: 10,
        type: "safe",
        feedback: "Flawless protocol! Short links obscure dangerous destinations. Using URL expanders (like CheckShortURL) or sticking to official education portals prevents attacks."
      },
      {
        id: "opt-c",
        text: "Forward the link to your class group to ask if someone can test it.",
        score: 0,
        type: "unsafe",
        feedback: "Irresponsible! This spreads potential malware or exam malpractice rumors to fellow students."
      },
      {
        id: "opt-d",
        text: "Click it only using private/incognito browsing mode.",
        score: 5,
        type: "partial",
        feedback: "Incognito mode only prevents saving local history; it DOES NOT protect you against downloading malware or visiting phishing traps."
      }
    ],
    redFlags: [
      "URL shortener hides the authentic destination domain.",
      "Sensationalist hook ('shocking leaked paper') designed to bypass critical thinking.",
      "Unofficial source commenting on public forums."
    ],
    safeAction: "Never blindly click shortened URLs from strangers. Rely only on official institutional boards for academic notifications.",
    keyTakeaway: "Shortened links (bit.ly, tinyurl) mask the true destination. Never click blind short links from unverified sources."
  },

  // ==========================================
  // CATEGORY 7: SOCIAL MEDIA SAFETY
  // ==========================================
  {
    id: "soc-01",
    category: "social",
    categoryName: "Social Media Safety",
    title: "The Cloned Friend Emergency Hospital Money Appeal",
    difficulty: "Intermediate",
    threatType: "Account Cloning / Impersonation Scam",
    sender: "Instagram DM: @rahul_sharma_official_2",
    timestamp: "Today, 08:30 PM",
    simulatedType: "social",
    messageContent: `INSTAGRAM DIRECT MESSAGE:

Account: @rahul_sharma_official_2 (Profile picture is your classmate Rahul)
Followers: 12 | Following: 40 | Bio: "New backup account"

"Bro are you free?? It's an emergency!! 🏥 
My mom is in the emergency hospital and my UPI daily limit is exhausted. Can you please send ₹4,000 to this hospital QR code urgently? 

I will return it tomorrow morning first thing! Please don't call me right now, doctors aren't allowing phones inside ICU!"`,
    question: "This message comes from a profile with your friend Rahul's photo. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Transfer the ₹4,000 immediately because helping a friend in a medical emergency is important.",
        score: 0,
        type: "unsafe",
        feedback: "Heartbreaking trap! This is a cloned profile (note the username has '_2' and only 12 followers). Scammers steal photos and plead for medical emergency money, demanding you don't call."
      },
      {
        id: "opt-b",
        text: "Do NOT transfer money. Call Rahul directly on his known personal phone number to verify his safety.",
        score: 10,
        type: "safe",
        feedback: "Heroic vigilance! When asked for money by friends on social media, ALWAYS verify via a direct phone call or in person. Scammers explicitly say 'don't call' to stop you from confirming."
      },
      {
        id: "opt-c",
        text: "Ask for a photo of the hospital bill on Instagram DM.",
        score: 5,
        type: "partial",
        feedback: "Cautious, but scammers easily forge generic fake medical receipts downloaded from Google."
      },
      {
        id: "opt-d",
        text: "Transfer ₹500 just in case it is real.",
        score: 0,
        type: "unsafe",
        feedback: "Unsafe! Any money sent to the scammer's QR code is permanently gone."
      }
    ],
    redFlags: [
      "Cloned account handle with additions like '_official_2' and very few followers.",
      "High emotional blackmail: 'Mom in emergency hospital'.",
      "Explicitly instructs you NOT to call them ('doctors not allowing phone in ICU').",
      "Demands direct unverified QR code transfer."
    ],
    safeAction: "Always verify unexpected financial requests by calling the person directly on their established phone number.",
    keyTakeaway: "If a friend on social media asks for emergency money and tells you 'don't call me', it is almost certainly a cloned impersonator."
  },

  {
    id: "soc-02",
    category: "social",
    categoryName: "Social Media Safety",
    title: "The ₹5,000/Day 'Like YouTube Videos' Telegram Job",
    difficulty: "Beginner",
    threatType: "Task Scam / Advance Fee Employment Fraud",
    sender: "Telegram Message from 'HR Priya - Global Media'",
    timestamp: "Today, 11:00 AM",
    simulatedType: "social",
    messageContent: `TELEGRAM MESSAGE:

From: Priya_HR_Recruiter (Global Marketing Ltd)

"Hello dear! We have flexible Part-Time Work from Home openings for students! 🎓

Task: Just like 3 YouTube videos and screenshot them.
Salary: ₹1,500 to ₹5,000 per day!

We just credited ₹150 demo reward to your wallet! To unlock your full salary tasks, deposit a refundable security fee of ₹1,000 to our VIP task portal."`,
    question: "A recruiter offers thousands of rupees daily for liking videos, but asks for a ₹1,000 deposit. What is this?",
    options: [
      {
        id: "opt-a",
        text: "A legitimate high-paying digital marketing job for students.",
        score: 0,
        type: "unsafe",
        feedback: "Dangerous trap! This is the infamous 'YouTube Like / Task Scam'. They pay a tiny initial amount (₹150) to build trust, then demand thousands in 'refundable deposits' and vanish with your money."
      },
      {
        id: "opt-b",
        text: "A classic employment task scam! Real employers pay you for work; they never demand registration fees or security deposits.",
        score: 10,
        type: "safe",
        feedback: "Brilliant assessment! Legitimate companies never recruit for high salaries via unsolicited Telegram messages or require job seekers to pay money to work."
      },
      {
        id: "opt-c",
        text: "Pay the ₹1,000 since they already gave you ₹150 as proof.",
        score: 0,
        type: "unsafe",
        feedback: "Falling right into their trap! That ₹150 was bait to steal ₹1,000 (and later ₹10,000+)."
      },
      {
        id: "opt-d",
        text: "Quit college to do this full-time.",
        score: 0,
        type: "unsafe",
        feedback: "Severe life mistake! Never abandon education for digital scam promises."
      }
    ],
    redFlags: [
      "Unsolicited recruitment via Telegram/WhatsApp for absurdly easy tasks.",
      "Unrealistic compensation (₹5,000/day for liking videos).",
      "Demands an advance payment/deposit to unlock tasks.",
      "Small initial payout is calculated psychological bait."
    ],
    safeAction: "Block and report the user. Remember: Any job that requires YOU to pay money upfront to get hired is a scam.",
    keyTakeaway: "Real jobs pay YOU for your work. Any job that asks you to pay money to start working is 100% a scam."
  },

  {
    id: "soc-03",
    category: "social",
    categoryName: "Social Media Safety",
    title: "Viral WhatsApp Forward: Free Government Laptops",
    difficulty: "Beginner",
    threatType: "Hoax Viral Chain / Identity Harvesting Scheme",
    sender: "Forwarded Many Times WhatsApp Group",
    timestamp: "Yesterday, 07:00 PM",
    simulatedType: "social",
    messageContent: `WHATSAPP FORWARD:

*➡️ Forwarded many times*

"🇮🇳 GOVT OF INDIA SCHEME 2024:
Ministry of Education is distributing FREE HP Laptops + 1 Year Free 5G Internet to all college students! 💻

Register with your College Roll No & Aadhaar at:
http://gov-free-laptop-yojana.xyz/apply

*Note: After registering, forward this message to 5 WhatsApp groups to activate your collection token!*"`
,
    question: "This message is forwarded across multiple student WhatsApp groups. What should you do?",
    options: [
      {
        id: "opt-a",
        text: "Fill in your Aadhaar number and immediately forward it to 5 groups so you don't miss the free laptop.",
        score: 0,
        type: "unsafe",
        feedback: "Severe danger! You surrender your Aadhaar identity to data brokers, and by forwarding, you help scammers deceive fellow students."
      },
      {
        id: "opt-b",
        text: "Do NOT share or register. Official government schemes are published on authentic .gov.in or .nic.in portals, never on random .xyz domains requiring viral forwards.",
        score: 10,
        type: "safe",
        feedback: "Outstanding critical thinking! Government initiatives never require users to 'forward to 5 WhatsApp groups' to activate benefits, and all genuine central/state portals end strictly in '.gov.in'."
      },
      {
        id: "opt-c",
        text: "Forward it to your professors to ask if they received their laptops.",
        score: 5,
        type: "partial",
        feedback: "Better than registering your Aadhaar, but still spreads unverified spam in academic forums."
      },
      {
        id: "opt-d",
        text: "Register with a fake name and fake Aadhaar to test if a laptop arrives at your doorstep.",
        score: 5,
        type: "partial",
        feedback: "Wastes your time and generates ad revenue for scam website operators."
      }
    ],
    redFlags: [
      "'Forwarded many times' tag indicates viral unverified chain content.",
      "Condition to forward to 5 groups is the hallmark of clickbait spam schemes.",
      "Fake domain ending in '.xyz' instead of authentic '.gov.in'.",
      "Solicits sensitive personal identification (Aadhaar number)."
    ],
    safeAction: "Check official Press Information Bureau (PIB Fact Check: @PIBFactCheck) or official ministry portals (.gov.in) to verify government announcements.",
    keyTakeaway: "Government welfare programs are published exclusively on '.gov.in' websites and NEVER require sharing messages on WhatsApp."
  }
];

// Helper to get category metadata
const CATEGORIES = [
  {
    id: "sms",
    name: "SMS & Messaging",
    icon: "💬",
    description: "Learn to spot fake lottery alerts, delivery fees, and bank suspension messages.",
    color: "#2563eb",
    scenariosCount: 3
  },
  {
    id: "email",
    name: "Email Safety",
    icon: "✉️",
    description: "Identify lookalike sender domains, malicious .exe attachments, and macro traps.",
    color: "#7c3aed",
    scenariosCount: 3
  },
  {
    id: "payments",
    name: "Online Payments & UPI",
    icon: "💳",
    description: "Understand UPI PIN mechanics, QR sticker swaps, and fake customer care vishing.",
    color: "#059669",
    scenariosCount: 3
  },
  {
    id: "password",
    name: "Password & Account Security",
    icon: "🔐",
    description: "Master password uniqueness, MFA prompt fatigue, and rogue public Wi-Fi risks.",
    color: "#d97706",
    scenariosCount: 3
  },
  {
    id: "privacy",
    name: "Privacy & Personal Information",
    icon: "🛡️",
    description: "Safeguard OTPs, detect excessive app permissions, and avoid social quiz traps.",
    color: "#dc2626",
    scenariosCount: 3
  },
  {
    id: "websites",
    name: "Fake Websites & Links",
    icon: "🌐",
    description: "Spot typosquatted URLs, debunk the SSL padlock myth, and decode short links.",
    color: "#0284c7",
    scenariosCount: 3
  },
  {
    id: "social",
    name: "Social Media Safety",
    icon: "👥",
    description: "Detect cloned accounts, fake Telegram task jobs, and viral WhatsApp hoaxes.",
    color: "#e11d48",
    scenariosCount: 3
  }
];
