# Blueprint: MK TheBoss Name Display

## Overview

This project is an interactive and visually appealing single-page application that displays a list of names as cards in a dynamic, **treemap-style layout**. The cards are sized based on their order in the list, with the first name being the largest and placed at the center. Subsequent cards are placed to densely fill the available space **without any overlap**.

## Features & Design

*   **Framework**: Angular v20+
*   **Architecture**: 100% Standalone Components
*   **State Management**: Angular Signals
*   **Styling**: Modern CSS with `font-family: 'Orbitron'`. Visuals include a dark theme, glowing text effects (`text-shadow`), and smooth animations.
*   **Layout Algorithm**: A central component (`name-display`) calculates and renders the names as cards. The layout is a dynamically generated treemap where card sizes are based on their order. The algorithm places the largest card at the center, then uses a **spiral packing algorithm** to position the remaining cards, ensuring they fill the screen densely and **never overlap**.
*   **Favicon**: The application uses a custom favicon located in the `public` directory.

---

## Directives for the AI Assistant

This section contains rules and guidelines that the AI assistant MUST follow during development.

1.  **Definition of Environments**:
    *   The **"Local Environment"** refers to the live preview panel provided within the IDE (Studio). This is the primary workspace for observing real-time changes.
    *   The URL `https://mk-theboss-49163479-7a351.web.app/` is the **"Staging Environment"**. It represents the live, publicly deployed application for testing purposes and is the target for my `firebase deploy` commands.

2.  **Deployment Scope**:
    *   I, the AI assistant, am only authorized to deploy to the **Staging Environment**.
    *   You, the user, will handle all deployments to the **Production Environment** separately.
