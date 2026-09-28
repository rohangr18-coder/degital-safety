# 🛡️ Digital Safety & Literacy Simulator

**A College Societal Impact Project**  
**Category:** Education, Digital Literacy and Skill Development  
**Theme:** Cyber Safety, Phishing Recognition & Digital Decision-Making

---

## 📌 Executive Summary & Societal Relevance

With the rapid expansion of digital payments (UPI), e-governance, social media, and online educational portals, millions of citizens—particularly college students, youth, rural users, and senior citizens—engage online daily. However, cyber fraud, phishing, lottery schemes, impersonation scams, and deceptive payment tricks have escalated exponentially.

The **Digital Safety & Literacy Simulator** addresses this pressing social challenge through **interactive, experiential learning**. Instead of passive lectures, users are placed in realistic simulated scenarios where they must evaluate threats, make critical choices, and receive immediate educational feedback with red-flag breakdowns.

### 🔒 Strict Software-Only & Privacy Assurance
- **100% Software-Only Simulation:** Does not require any specialized hardware or external devices.
- **No Sensitive Permissions:** Does **not** access real SMS inboxes, WhatsApp conversations, banking portals, emails, or phone contacts.
- **Safe Demonstration Environment:** All messages, phone numbers, sender IDs, and web URLs are completely fictional and simulated.

---

## 🚀 Key Features

1. **Interactive Simulated Interfaces:**
   - **SMS & Messaging:** Realistic mobile SMS messenger with urgent bank KYC notices, lottery prizes, and package fee tricks.
   - **Email Safety:** Webmail interface displaying spear phishing, suspicious attachments (`.pdf.exe`), and macro-enabled documents (`.docm`).
   - **Online Payments & UPI:** Mobile payment collect screens and QR code swaps debunking the myth that "entering a PIN receives money."
   - **Password & Account Security:** 2FA prompt fatigue, rogue public Wi-Fi captive portals, and credential reuse traps.
   - **Privacy & Personal Data:** WhatsApp OTP forwarding tricks, excessive app permission audits, and viral social media quiz traps.
   - **Fake Websites & Links:** Typosquatted e-commerce stores, HTTP unencrypted banking portals, and blind shortened URLs.
   - **Social Media Safety:** Cloned friend emergency money appeals, Telegram task job schemes, and viral government laptop hoaxes.

2. **Scoring & Evaluation Engine:**
   - **Safest Decision:** +10 points
   - **Partially Safe Decision:** +5 points
   - **Unsafe / High Risk Decision:** 0 points
   - Live score chip, accuracy percentage, and safe decisions streak tracking.

3. **In-Depth Answer Feedback:**
   - Visual status banner (Safe / Partially Safe / Danger).
   - "Why" explanation grounded in cybersecurity principles.
   - Red flag checklist highlighting specific warning signs detected in the scenario.
   - Prescribed safe action recommendation.
   - Core digital literacy rule.

4. **"Your Digital Safety Report" Card:**
   - Safety Mastery Tier: *Cyber Guardian 🛡️*, *Digitally Vigilant ⚡*, *Apprentice Defender 🔍*, or *Vulnerable to Threats ⚠️*.
   - Category-wise performance progress bars.
   - **Intelligent Areas to Improve:** Automatically analyzes and diagnoses specific threat vectors where mistakes were made during the session.
   - Print/Save Report Card utility for evaluation records.

5. **"Learn Digital Safety" Curriculum (9 Modules):**
   - Bite-sized lessons with side-by-side **Real vs. Fake** comparison tables.
   - Quick safety checklists.
   - Interactive mini-quizzes on each lesson with real-time feedback.
   - Official reporting helplines: **Dial 1930** (National Cyber Helpline) and **cybercrime.gov.in**.

6. **Dashboard & Gamification:**
   - User profile with progress tracking.
   - Achievement defense badges (*SMS Scout, Phish Buster, UPI Shield, Passkey Pro, Master Guardian*).
   - Local storage persistence and one-click data reset.

7. **Zero-Dependency Architecture:**
   - Built with clean **HTML5, Vanilla CSS3, and ES6 JavaScript**.
   - Built-in sound synthesis via Web Audio API (no external mp3 files required).
   - Seamless dark/light mode toggle.
   - Works immediately out of the box in any web browser without installation.

---

## 📂 Project Architecture

```
digital-safety-simulator/
│
├── index.html              # Main application markup & views
├── README.md               # Project documentation & presentation guide
│
├── css/
│   └── styles.css          # Responsive design system & device mockups
│
└── js/
    ├── app.js              # Application controller, audio synth & routing
    └── data/
        ├── scenarios.js    # 21 realistic simulated scenarios with metadata
        └── lessons.js      # 9 structured digital literacy lessons & quizzes
```

---

## 🛠️ How to Run & Present

### Method 1: Direct File Opening (No Installation Needed)
Simply double-click `index.html` or open it in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Method 2: Local HTTP Server (Optional)
If using Python:
```bash
python -m http.server 8080
```
Then navigate to: `http://localhost:8080`

---

## 🎓 College Viva / Demonstration Flow

For presentation to project guides and evaluators, follow this recommended walkthrough:

1. **Home Page & Privacy Disclaimer:**
   - Show the academic banner and the prominent educational privacy notice certifying that the app is software-only and accesses no real personal data.
   - Highlight the 3 core pillars: *Identify Phishing*, *Protect Personal Information*, *Make Safer Online Decisions*.

2. **Category Selection:**
   - Navigate to **Simulations**. Show the 7 distinct categories.
   - Select **Online Payments** or **SMS & Messaging**.

3. **Simulated Threat Scenario:**
   - Walk the evaluators through the device mockup (e.g. Phone SMS or UPI Collect Request).
   - Point out the fictional scenario and ask: *"Notice how the screen says COLLECT REQUEST for ₹1,500, but the sender claims you must enter your PIN to receive money?"*
   - Select the incorrect option to demonstrate how the app catches mistakes, or select the safest option to show the +10 point reward and the red-flag breakdown.

4. **Digital Safety Report:**
   - Complete the category to generate the **Digital Safety Report**.
   - Show the accuracy percentage, category breakdown, and the automated **"Areas to Improve"** vulnerability diagnosis.
   - Demonstrate the **Print Report Card** feature.

5. **Learn Digital Safety Section:**
   - Show the 9 lessons with side-by-side **Real vs. Fake** comparison tables.
   - Run one of the interactive mini-quizzes to demonstrate learner comprehension testing.

6. **Dashboard:**
   - Show the unlocked badges and lifetime score tracking preserved across browser refreshes via `localStorage`.

---

## 🤝 Adding New Scenarios

To add a new scenario, open `js/data/scenarios.js` and add an object to the `SCENARIOS` array following this clean structure:

```javascript
{
  id: "custom-01",
  category: "sms", // sms, email, payments, password, privacy, websites, social
  categoryName: "SMS & Messaging",
  title: "Scenario Title",
  difficulty: "Beginner", // Beginner, Intermediate, Advanced
  threatType: "Threat Description",
  sender: "Sender Display Name",
  timestamp: "Today, 10:00 AM",
  simulatedType: "sms", // sms, email, payment, browser, app-perm, social
  messageContent: "Simulated message text here...",
  question: "What would you do?",
  options: [
    { id: "opt-a", text: "Action 1", score: 0, type: "unsafe", feedback: "Why unsafe..." },
    { id: "opt-b", text: "Action 2", score: 10, type: "safe", feedback: "Why safe..." }
  ],
  redFlags: ["Flag 1", "Flag 2"],
  safeAction: "Recommended safe protocol...",
  keyTakeaway: "Core rule to remember..."
}
```

---

## 📜 Academic Attribution
- **Project:** Digital Safety & Literacy Simulator
- **Category:** Education, Digital Literacy and Skill Development
- **Guidance Alignment:** National Cyber Crime Reporting Portal (cybercrime.gov.in), Indian Cyber Crime Coordination Centre (I4C), and RBI Cyber Security Guidelines.
