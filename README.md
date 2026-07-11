# AdaptiveCare AI

### The Healthcare Interface That Adapts to You in Real Time

AdaptiveCare AI is an adaptive healthcare dashboard designed to personalize the user interface for different healthcare users.

Instead of presenting the same fixed dashboard to everyone, the application changes its **layout density, typography, widget priority, navigation, and accessibility settings** based on the selected user persona and interface preferences.

The current prototype supports four adaptive experiences: **Senior Citizen, Diabetic Patient, Fitness Enthusiast, and Family Caregiver**.

> **Frontend Battle 2026 — Healthcare & Wellness**

---

##  Project Preview

###  Landing Page

The landing page introduces the adaptive healthcare concept and provides access to the onboarding flow or a quick dashboard demo.

<p align="center">
  <img src="images/landing-page.png" alt="AdaptiveCare AI Landing Page" width="950"/>
</p>

---

### 👤 Persona Selection

Users select the profile that best represents how they intend to use the healthcare dashboard.

The selected persona is used to initialize the adaptive interface configuration.

<p align="center">
  <img src="images/persona-selection.png" alt="AdaptiveCare AI Persona Selection" width="700"/>
</p>

---

###  Health Profile Setup

The onboarding form collects basic profile information such as name, age, weight, and blood group.

Form inputs are validated using **React Hook Form** and **Zod** before continuing to the personalized interface.

<p align="center">
  <img src="images/health-profile-setup.png" alt="AdaptiveCare AI Health Profile Setup" width="700"/>
</p>

---

###  Adaptive Dashboard — Senior Mode

Senior Mode prioritizes accessibility and important daily health actions.

The interface highlights emergency access, medication schedules, appointments, and simplified health information.

<p align="center">
  <img src="images/dashboard-senior.png" alt="AdaptiveCare AI Senior Dashboard" width="950"/>
</p>

---

### 🩸 Adaptive Dashboard — Diabetic Mode

Diabetic Mode prioritizes glucose-related information and daily health management.

Health trends, glucose information, and relevant tracking widgets are surfaced more prominently.

<p align="center">
  <img src="images/dashboard-diabetic.png" alt="AdaptiveCare AI Diabetic Dashboard" width="950"/>
</p>

---

### Adaptive Dashboard — Fitness Mode

Fitness Mode uses a more detailed dashboard layout for users who want to view multiple performance metrics.

Activity information, heart-rate-related data, calorie progress, and fitness visualizations are given higher priority.

<p align="center">
  <img src="images/dashboard-fitness.png" alt="AdaptiveCare AI Fitness Dashboard" width="950"/>
</p>

---

### Adaptive Dashboard — Caregiver Mode

Caregiver Mode focuses on health monitoring and oversight.

The dashboard provides a broader view of health information, medication-related data, and alerts relevant to a caregiver workflow.

<p align="center">
  <img src="images/dashboard-caregiver.png" alt="AdaptiveCare AI Caregiver Dashboard" width="950"/>
</p>

---

### ⚙️ Customization Settings

Users can manually customize their interface instead of being restricted to the default persona configuration.

The settings interface supports changes to layout density, text sizing, and interface preferences.

<p align="center">
  <img src="images/customization-settings.png" alt="AdaptiveCare AI Customization Settings" width="950"/>
</p>

---

### 🤖 AI Copilot — Adaptive Interface Assistant

The AdaptiveCare AI Copilot provides a conversational interface for interacting with dashboard controls.

The prototype supports interface-focused commands such as changing persona layouts, adjusting text size, enabling detailed fitness mode, switching themes, and interacting with supported dashboard actions.

<p align="center">
  <img src="images/ai-copilot.png" alt="AdaptiveCare AI Copilot" width="500"/>
</p>

---

### Emergency SOS Interface

The prototype includes a fullscreen Emergency SOS experience designed to make emergency actions visually prominent and easy to access.

> The current implementation demonstrates the emergency interface and interaction flow. It is not connected to a real emergency dispatch service.

<p align="center">
  <img src="images/emergency-sos.png" alt="AdaptiveCare AI Emergency SOS Interface" width="950"/>
</p>

---

###  Responsive Mobile Experience

AdaptiveCare AI includes responsive layouts designed to adjust across desktop and smaller screen sizes.

<p align="center">
  <img src="./images/responsive-mobile.jpeg" alt="AdaptiveCare AI Responsive Mobile Experience" width="350">
</p>
---

##  The Problem

Healthcare users have different goals, abilities, and priorities, but many digital dashboards still rely on a fixed interface structure.

A senior citizen checking medications may need a simple interface with large text and clear actions. A diabetic patient may want glucose-related information to appear first. A fitness user may prefer a denser dashboard with multiple performance metrics. A caregiver may need a broader overview of health information.

Using the same layout for all of these users can create unnecessary complexity.

Some common interface challenges include:

- Dense dashboards that can be difficult to navigate
- Important information competing with less relevant widgets
- Limited typography and layout customization
- Generic navigation for users with different goals
- Emergency actions that may not be visually prioritized
- Interfaces designed around a single type of user

AdaptiveCare AI explores a simple idea:

> **What if the healthcare interface adapted to the user instead of expecting the user to adapt to the interface?**

---

##  The Solution

AdaptiveCare AI is a frontend prototype of an **adaptive healthcare dashboard**.

The application uses a shared component architecture and global application state to render different interface configurations for different user personas.

The adaptive experience can modify:

- Dashboard layout
- Layout density
- Typography scale
- Widget visibility and priority
- Navigation options
- Accessibility preferences
- Theme settings

The goal is not to build four separate healthcare applications.

Instead, AdaptiveCare AI uses **one interface system that can present different experiences based on the active user mode**.

---

## Four Adaptive Persona Modes

###  Senior Citizen Mode

Senior Mode is designed around simplicity and accessibility.

It prioritizes:

- Larger interface elements
- Clear navigation
- Emergency SOS access
- Medication information
- Doctor appointments
- Simplified health summaries

The interface reduces unnecessary visual density and keeps important actions visible.

---

### 🩸 Diabetic Patient Mode

Diabetic Mode focuses on daily health tracking.

It prioritizes:

- Glucose-related information
- Health trend visualization
- Medication tracking
- Daily monitoring widgets
- Relevant health metrics

The dashboard places condition-related information higher in the interface.

---

### ⚡ Fitness Enthusiast Mode

Fitness Mode provides a more information-dense experience.

It prioritizes:

- Fitness metrics
- Activity information
- Heart rate data
- Calorie progress
- Performance visualizations
- Detailed dashboard widgets

This mode is designed for users who prefer seeing multiple metrics at once.

---

### 🛡️ Family Caregiver Mode

Caregiver Mode focuses on monitoring and oversight.

It prioritizes:

- Health overview information
- Medication-related data
- Important alerts
- Care-related dashboard widgets
- Information relevant to monitoring workflows

The interface reorganizes dashboard content around caregiver-focused tasks.

---

## 🧠 How the Adaptive UI Works

AdaptiveCare AI uses a global application context to manage interface preferences and the currently active persona.

```text
                 User Interaction
                        │
                        ▼
              Persona / Preferences
                        │
                        ▼
                AppProvider Context
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
     User Persona   Layout Density   Text Scale
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                Adaptive UI Rules
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
       Layout        Widgets      Typography
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
              Personalized Dashboard
```

The same application components are reused across persona modes.

The active configuration determines how the interface is presented to the user.

---

## 📐 Layout Density Engine

AdaptiveCare AI provides three dashboard density options.

### Simple

Simple mode creates a more spacious interface.

It uses larger spacing and card padding to reduce visual density and make dashboard sections easier to distinguish.

This mode is suitable for users who prefer a cleaner and less crowded interface.

### Balanced

Balanced mode provides a middle ground between spacing and information density.

It is designed for general dashboard usage and keeps important information visible without making the interface feel crowded.

### Detailed

Detailed mode reduces spacing between interface elements and allows more dashboard information to remain visible on the screen.

This mode is useful for users who prefer a data-rich experience.

The selected density affects dashboard spacing and card presentation across supported components.

---

## 🔤 Dynamic Typography Scaling

AdaptiveCare AI uses CSS custom properties with Tailwind CSS theme mappings to support global text scaling.

```css
@theme {
  --text-xs: var(--text-xs-scale, 0.75rem);
  --text-sm: var(--text-sm-scale, 0.875rem);
  --text-base: var(--text-base-scale, 1rem);
  --text-lg: var(--text-lg-scale, 1.125rem);
  --text-xl: var(--text-xl-scale, 1.25rem);
  --text-2xl: var(--text-2xl-scale, 1.5rem);
  --text-3xl: var(--text-3xl-scale, 1.875rem);
  --text-4xl: var(--text-4xl-scale, 2.25rem);
}
```

When the text scale changes, the application applies the corresponding font scale configuration at the root interface level.

Supported scale modes include:

- Small
- Medium
- Large
- Extra Large

Components using the mapped typography variables inherit the updated scale, allowing text sizing to change consistently across the interface.

---

##  Key Features

###  Adaptive Dashboard

Dashboard content and presentation change according to the selected user persona.

###  Adjustable Layout Density

Users can switch between Simple, Balanced, and Detailed dashboard layouts.

###  Dynamic Text Scaling

Typography can be adjusted globally to support different readability preferences.

###  AI Copilot Interface

A conversational assistant interface provides supported commands for adapting dashboard settings and interacting with prototype actions.

###  Command Palette

The keyboard-accessible command palette provides quick access to supported dashboard actions and interface settings.

###  Emergency SOS Experience

A dedicated fullscreen emergency interface makes the SOS workflow visually prominent.

###  Interactive Data Visualizations

Recharts is used to render responsive health and activity visualizations.

### Light and Dark Themes

Users can switch between light and dark interface themes.

### Motion and Interface Transitions

Framer Motion is used for interface transitions and animated interactions.

###  Responsive Design

The interface adapts to desktop and smaller screen layouts.

###  Dashboard Navigation Shortcuts

Supported sidebar shortcuts help users move to relevant dashboard sections.

---

##  Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| Vite | Development and build tooling |
| Tailwind CSS v4 | Utility styling and adaptive interface configuration |
| CSS3 | Custom properties, animations, and interface effects |
| Framer Motion | UI transitions and motion effects |
| Recharts | Responsive dashboard charts |
| React Hook Form | Form state management |
| Zod | Onboarding form validation |
| Context API | Global persona and interface state |
| Lucide React | Interface icons |
| Vercel | Frontend deployment |
| Git & GitHub | Version control and source management |

---

## 📂 Project Architecture

```text
AdaptiveCare-AI/
│
├── images/
│   ├── ai-copilot.png
│   ├── customization-settings.png
│   ├── dashboard-caregiver.png
│   ├── dashboard-diabetic.png
│   ├── dashboard-fitness.png
│   ├── dashboard-senior.png
│   ├── emergency-sos.png
│   ├── health-profile-setup.png
│   ├── landing-page.png
│   ├── persona-selection.png
│   └── responsive-mobile.png
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomChart.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   └── ProgressRing.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── CommandPalette.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── SettingsDrawer.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── widgets/
│   │       ├── GlucoseTracker.jsx
│   │       ├── HeartRateTracker.jsx
│   │       ├── MedicationTracker.jsx
│   │       ├── CaloriesTracker.jsx
│   │       └── ...
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── data/
│   │   └── profiles.json
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Onboarding.jsx
│   │   ├── DashboardPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── index.css
│   └── main.jsx
│
├── README.md
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/Manisha5918/AdaptiveCare-AI.git
```

### Open the Project

```bash
cd AdaptiveCare-AI
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

The exact port may vary if the default Vite port is already in use.

### Application Routes

```text
/              Landing Page
/onboarding    Persona Selection and Health Profile Setup
/dashboard     Adaptive Dashboard
/settings      Interface Settings
```

---

## User Flow

```text
Landing Page
      │
      ▼
Persona Selection
      │
      ▼
Health Profile Setup
      │
      ▼
Interface Personalization
      │
      ▼
Adaptive Dashboard
      │
      ├── Senior Mode
      ├── Diabetic Mode
      ├── Fitness Mode
      └── Caregiver Mode
      │
      ▼
Settings and Manual Customization
```

Users are not permanently restricted to the initial persona configuration.

Supported interface settings can be manually changed through the application.

---

## Possible Applications

The adaptive interface concept demonstrated by AdaptiveCare AI could be explored in applications such as:

- Healthcare dashboards
- Telemedicine platforms
- Senior care applications
- Home healthcare interfaces
- Wellness platforms
- Fitness dashboards
- Caregiver support tools

AdaptiveCare AI is currently a frontend prototype and is not a clinical system.

---

##  Future Roadmap

###  Wearable Device Integration

Connect supported wearable devices or health sensors to display live health data within relevant dashboard widgets.

###  Voice-Based Interface Controls

Allow users to change supported interface settings using voice commands.

For example, a user could request a larger text size or switch to a different dashboard mode.

###  Smarter Personalization Rules

Expand the current persona-based configuration with additional user preferences and interaction patterns.

###  Custom Dashboard Layouts

Allow users to rearrange supported widgets and save their preferred dashboard configuration.

###  Multi-Language Support

Provide localized interface content to make the application usable across different languages.

###  Persistent User Profiles

Store user preferences and dashboard configurations through a backend or cloud-based data layer.

###  Expanded Copilot Commands

Extend the Copilot interface with additional safe dashboard actions and interface customization commands.

---

##  Prototype Disclaimer

AdaptiveCare AI is a **frontend prototype created for a UI-focused project and competition submission**.

The health data displayed in the interface is demonstration data.

The project does not provide medical diagnosis or medical advice, and the Emergency SOS interface is not connected to real emergency dispatch services.

---

##  Developed By

### Manisha G

Built as a submission for **Frontend Battle 2026 — Healthcare & Wellness**.

---

##  Support the Project

If you found the adaptive interface concept interesting, consider starring the repository.
