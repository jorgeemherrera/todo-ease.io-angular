# EASE.IO TECHNICAL TEST

This is a Angular 18 application that integrates SASS and TypeScript to create a dynamic to-do list. The app allows users to create tasks with proper classification, such as Pending, In Progress, Open, and Completed. Tasks can also include a checklist with an expiration date. Users can filter tasks by their classification for better organization. The application features a modern UI with a toggle for dark and light modes, ensuring a seamless user experience. Additionally, all data is stored locally using IndexedDB, ensuring persistence even when the app is refreshed or accessed offline.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have Node.js (upper than v18) and npm installed on your machine.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: [https://www.npmjs.com/](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jorgeemherrera/todo-ease.io-angular
   ```
2. Navigate to the project directory:

   ```bash
   cd todo-Ease.io-angular
   ```

3. Install dependencies:

   check the version of node with node -v or nvm list 

   ```bash
   nvm use 18 -> use minimum Node.js v18.x.x version
   ```

   Next install dependencies

   ```bash
   npm install
   ```
### Running the App

Run the app in development mode:

   ```bash
   ng serve -o
   Open [http://localhost:4200] on your browser to view the app.
   ```

### Usage

- You can search for tasks by title.
- You can filter tasks by different statuses: Open, Completed, Expired, In Progress.
- In the navbar, you can switch between Light/Dark themes.
- You can create tasks with a title, description, checklist, and due date.
- You can update task statuses from the sidebar.
- You can use commands in the input, such as: DELETE, EDIT, CREATE.
- You can create a task by simply entering the task title.

on your browser to view the app: https://jorgeemherrera.github.io/todo-ease.io-angular/.

### Customization

Feel free to customize the app to suit your needs. You can modify the available items, change, and styles based on your preferences.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

### License

This project is licensed under the MIT License.
