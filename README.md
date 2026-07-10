# AdaptiveCare AI
> **"The healthcare interface that adapts to you in real-time."**
>
> Submission for **Build The Next Big UI** / **Frontend Battle 2026**
> **Category**: Healthcare & Wellness Accessibility
> **Design Theme**: Next-Gen Cyber-Health SaaS

---

## 🚀 1. The Vision & Problem Statement
Traditional digital health portals force every user into a single, static layout template. However, a user's health profile, cognitive bandwidth, physical dexterity, and medical goals are never static.

**AdaptiveCare AI** addresses these core interface limitations:
* **Cognitive Congestion**: Elderly patients get overwhelmed by complex, multi-layered dashboards, resulting in search anxiety.
* **Chronic Management Friction**: Chronic patients (e.g., diabetics) struggle to quickly log daily inputs (blood sugar, insulin checks) when mixed with general wellness logs.
* **Data Deprivation**: Athletes are forced to dig through deep menus to compile wearable sensor graphs, active calories, and heart rate zones during workouts.
* **Caregiver Supervision Fatigue**: Caregivers manage prescriptions for multiple family members inside interfaces designed only for single-user accounts.
* **Emergency Action Latency**: Standard health portals require multiple clicks to trigger safety services, costing critical seconds.

---

## 🎨 2. The Solution: Real-Time Adaptive UI Architecture
**AdaptiveCare AI** introduces a dynamic **Adaptive UI Canvas Engine** that shifts grid distributions, typography scales, layout gaps, and active widget sets in real-time according to the selected user profile, layout density settings, and font scales.

```
                  ┌──────────────────────────────┐
                  │      AppProvider Context     │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
 ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
 │ User Profile │        │ Layout Gap   │        │ Global Text  │
 │ (4 Persona   │        │ & Paddings   │        │ Sizing Scale │
 │  Modes)      │        │ (Simple,     │        │ (Small to    │
 └──────────────┘        │  Balanced,   │        │  XL Scale)   │
                         │  Detailed)   │        └──────────────┘
                         └──────────────┘
```

### The Four Persona Modes:
1. **Senior Citizen Mode (👵)**
   * **Focus**: Large click targets, simplified vital readouts, contrasting text, and a prominent Emergency SOS Trigger.
   * **Default Settings**: Simple density, high-contrast, Large/XL accessibility font scaling.
2. **Diabetic Patient Mode (🩸)**
   * **Focus**: Prioritizes live blood glucose graphs, meal carb planners, and prescription checklist timelines.
   * **Default Settings**: Balanced density, interactive charts.
3. **Fitness Enthusiast Mode (⚡)**
   * **Focus**: High-density athletic telemetry, cardiac zone trackers, active calorie burn progress, and milestone trophy cabinet.
   * **Default Settings**: Detailed density, multi-variable charts.
4. **Family Caregiver Mode (🛡️)**
   * **Focus**: Multi-person vitals overview grid, shared prescription checklist tracking, and active caregiver alerts.
   * **Default Settings**: Balanced layout density, high visibility alerts.

---

## ⚙️ 3. Layout Density & Sizing Engine

Unlike static dashboards, MorphUI's settings panel dynamically restructures the CSS variables and layout models globally in real-time:

### 🧩 A. Layout Density
* **Simple Mode**: Opens up the dashboard workspace layout. Sets spacing gaps to `gap-10` and GlassCard padding to `p-8 sm:p-10`. Sets card corners to `rounded-[28px]` for a highly accessible layout.
* **Balanced Mode**: The default state. Uses standard gaps (`gap-6 md:gap-8`), card padding (`p-6 sm:p-7`), and rounding (`rounded-[24px]`).
* **Detailed Mode**: Restructures the canvas for clinical precision. Drops grid gaps to `gap-4` and card padding to `p-4 sm:p-5` with `rounded-[20px]` borders. This pulls secondary items above the fold, allowing users to fit more information on screen.

### 🔍 B. Global Text Sizing & Accessibility Scale
Rather than using static Tailwind font sizes, MorphUI uses **Tailwind v4 `@theme` mappings** tied to CSS custom properties:
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
When a user selects a text scale, the context sets the corresponding scale class (`font-scale-small`, `font-scale-medium`, `font-scale-large`, or `font-scale-extra-large`) directly to `document.documentElement` (`html` tag).
All child components inherit these scale variables, adjusting font sizing across all pages (Dashboard, Settings, Sidebar, Command Palette) instantly.

---

## ✨ 4. High-Fidelity UI Features & 3D Parallax

* **3D Interactive Cascade Stage (Hero Section)**: A 3D mockup dashboard that tracks user mouse positions. Clicking profile tabs morphs the mockup cards in 3D perspective to match Senior, Diabetic, or Fitness presets.
* **Telemetry HUD diagnostics**: High-performance dashboard cards featuring live SVG diagnostics:
  * ECG rhythm waveforms for Compile Latency.
  * Spline connections for Loggers Online.
  * Concentric progress trackers for AI Precision.
* **Conversational Onboarding (Zod & React Hook Form)**: A custom diagnostics form that gathers demographic metrics (Name, Age, Weight, Blood Group) and automatically compiles the initial health profile.
* **Ctrl+K Command Palette**: A keyboard-accessible overlay that lets users switch profiles, toggle dark theme, log vitals, and trigger SOS alerts dynamically.
* **Tactile Jump-Scroll Highlights**: Clicking sidebar vital shortcuts smooth-scrolls the dashboard to the target widget and triggers a glowing border flash using custom CSS keyframe animations.
* **Fullscreen Emergency SOS Interface**: Toggling SOS triggers a fullscreen warning card with a glowing pulsing warning icon, displaying coordinates and safety telemetry while alerting emergency dispatchers.

---

## 🛠️ 5. Technical Stack

* **Frontend Framework**: `React.js` (JavaScript ES6+, Vite build tools)
* **Theme & Utility Styling**: `Tailwind CSS v4` + `Vanilla CSS3` (custom variables, keyframe animations, grid overlays, glassmorphism filters)
* **Animation Library**: `Framer Motion` (3D springs, layout transformations, exit/enter animations)
* **Data Visualization**: `Recharts` (Area and Line charts with responsive containers)
* **Forms & Validation**: `React Hook Form` & `Zod` (schema validation engine)
* **Default Theme**: Default system-wide Dark Mode.

---

## 📂 6. Project Architecture

```
AdaptiveCare AI/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomChart.jsx        # Wrapper for responsive Recharts
│   │   │   ├── GlassCard.jsx          # Interactive 3D glass card wrapper
│   │   │   └── ProgressRing.jsx       # SVG concentric progress ring
│   │   ├── layout/
│   │   │   ├── AIAssistant.jsx        # Sidebar copilot interface
│   │   │   ├── CommandPalette.jsx     # Cmd+K prompt selector
│   │   │   ├── Header.jsx             # Top bar actions
│   │   │   ├── SettingsDrawer.jsx     # Quick layout settings overlay
│   │   │   └── Sidebar.jsx            # Multi-profile navigator
│   │   └── widgets/
│   │       ├── GlucoseTracker.jsx     # Blood glucose spline logger
│   │       ├── HeartRateTracker.jsx   # ECG heartbeat tracker
│   │       ├── MedicationTracker.jsx  # Prescription checkbox grid
│   │       ├── CaloriesTracker.jsx    # Concentric active calorie progress
│   │       └── ...                    # (WeeklySummary, FamilyOverview, etc.)
│   ├── context/
│   │   └── AppContext.jsx             # Global state provider
│   ├── data/
│   │   └── profiles.json              # Mock database configuration
│   ├── pages/
│   │   ├── LandingPage.jsx            # Parallax SaaS Landing Page
│   │   ├── Onboarding.jsx             # Zod validation diagnostic wizard
│   │   ├── DashboardPage.jsx          # Morphing dashboard workspace grid
│   │   └── SettingsPage.jsx           # Global system preferences
│   ├── index.css                      # Tailwind v4 theme styling rules
│   └── main.jsx                       # Entrypoint
```

---

## 🚀 7. Installation & Getting Started

### Prerequisites:
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Setup Instructions:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/AdaptiveCare-AI.git
   cd adaptiveCare-ai
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Open the link in your browser:
   * **Landing Page**: `http://localhost:5174/`
   * **Onboarding**: `http://localhost:5174/onboarding`
   * **Dashboard**: `http://localhost:5174/dashboard`
   * **Settings**: `http://localhost:5174/settings`

---

## 🔮 8. Future Roadmap

* **Biometric IoT Integrations**: Sync with wearable sensors (smart bands, CGMs) to automatically shift layouts (e.g. triggering Diabetic Crisis layout if glucose drops below 70 mg/dL).
* **AI Voice-Driven Layout Shifts**: Integrate voice commands so the interface reconfigures verbally (e.g. saying *"I'm going for a run"* shifts the UI into the Fitness HUD layout).
* **Dynamic Grid Saving**: Allow users to drag and drop custom layouts and persist the customized grid layout coordinates inside local storage.
