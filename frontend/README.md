# Penwise Journalling App

<div align="center">

```bash
    This React Native Expo app enables user authentication for signup and login, 
    facilitates management of journal entries including creation, editing, 
    and deletion with categorization options (e.g., Personal, Work, Travel),
    The app also offers a summary view of entries by selected periods, categories
    and allows users to update their username and password settings.
```
</div>

## Table of Contents

- [Prerequisites](#prerequisites)
- [App Installation and Running in Development Mode](#app-installation-and-running-in-development-mode)
- [Building the Application](#building-the-application)
- [Tests](#tests)
- [Project Directory Structure](#project-directory-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)



## Prerequisites

Before setting up the project, ensure you have the following installed.
These are necessary for installing dependencies and running scripts specified
in the `package.json` for the React Native Expo app.

| Binaries      | Version    |
| ------------- | ---------- |
| Node.js       | >= 18.9.1  |
| npm           | >= 9.2.0   |
| Expo CLI      | >= 6.3.10  |
| TypeScript    | >= 4.0.0   |


## App Installation and Running in Development Mode

1. Clone the repository:

```sh
    git clone https://github.com/james-mumo/PenWise-Journaling-App.git
```

2. Navigate to the project directory:

```sh
    cd frontend
```

3. Setup Env Variables:

```sh
    # create a .env file and add the following variable:
    BASE_URL = <backend_url>

    # Due to a bug in react-native version "0.74.2" loading env varibales on complie time
    # kindly do as follows:
    - navigate to `"/context/GlobalProvider.js"`
    - find the `BASE_URL` variable and replace the value with your backend server url
```

4. Install dependencies:

```sh
    npm install
```


5. Run the app in development mode:

```sh
    # Start the Expo Development Server 
    npx expo start

    # Ensure your Android device is connected via USB debugging
    npx expo start --android

    # Ensure your iOS device is connected via USB or open in simulator
    npx expo start --ios

    # To run on a device with the Expo-Go app ensure the device running
    # Expo-Go app is in the same network as your machine, then scan the qr code and hit {r} to refresh whenever you make changes.

```

## Building the Application

```bash

    # For building an Android APK:
    npx expo build:android

    # For building an iOS IPA file:
    npx expo build:ios

```


## Tests 

```bash
    # for eslint testing run:
    npx expo lint

    # for jest testing
    npm test

```




## Project Directory Structure

```bash
/frontend
├── app
│   ├── (auth)
│   │   ├── html.tsx
│   │   ├── _layout.tsx
│   │   └── search
│   ├── (tabs)
│   │   ├── not-found.jsx
│   │   └── index.tsx
│   └── index.tsx
├── assets
│   ├── adaptive-icon.png
│   ├── fonts
│   ├── icons
│   ├── splash.png
│   ├── favicon.png
│   └── icon.png
├── components
│   ├── AddCategoryModal.jsx
│   ├── CategoryCard.jsx
│   ├── CustomButton.jsx
│   ├── EmptyState.jsx
│   ├── FormContentField.jsx
│   ├── FormField.jsx
│   ├── InfoBox.jsx
│   ├── JournalEntryCard.jsx
│   ├── JournalEntryModal.jsx
│   ├── Loader.jsx
│   ├── SearchInput.jsx
│   └── index.js
├── constants
│   ├── icons.js
│   ├── images.js
│   └── index.js
├── context
│   └── GlobalProvider.js
├── hooks
│   ├── useCategories.jsx
│   ├── useColorScheme.web.ts
│   ├── useColorScheme.ts
│   ├── useDateTime.jsx
│   ├── useDateFormatter.ts
│   └── useThemeColor.ts
├── lib
│   ├── appwrite.js
│   └── useAppwrite.js
└── scripts
    └── reset-project.js
├── README.md
├── babel.config.js
├── expo-env.d.ts
├── tailwind.config.js
├── app.json
├── package-lock.json
├── tsconfig.json
├── twindConfig.js
├── package.json


```

## Technologies Used

```bash
    - Expo
    - @react-native-async-storage/async-storage
    - @react-native-community/datetimepicker
    - @react-native-picker/picker
    - @react-navigation/bottom-tabs
    - @react-navigation/native
    - axios
    - expo-document-picker
    - expo-linking
    - nativewind
    - react-native-animatable
    - react-native-appwrite
    - react-native-reanimated
    - react-navigation
    - @types/jest
    - tailwindcss
    - typescript
```




## Contribution

    ```bash

        Feel free to submit issues, fork the repository, and send pull requests!
        This project is a take-home assignment that I am working on independently.
        However, if you are interested in the application, you are welcome to fork
        the repository and contribute to making it better as per your wish.

    ```






---

---
