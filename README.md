# WorkSpace

and project management application

### Features

- Projects Overview Page: Utilizes Nextjs components to display a list of projects fetched from a API using React Query. Provides options to view, edit, or delete projects.

- Project Details Page: Navigates to a project details page upon selecting a project. Displays detailed information about the project, including tasks, team members, and recent activities. Implements functionalities to add new tasks and assign team members.

- Task Management: Implements CRUD operations for tasks and utilizes Zustand for state management, including task statuses such as "To Do," "In Progress," and "Done." Incorporates a drag-and-drop feature for changing task statuses.

#### Additionally, the application boasts:

- Landing Page: A visually appealing landing page to welcome users and provide an overview of the application's features.

- Login Screen: A login screen with validations to ensure secure access. Alerts are included to notify users of any errors or successful login attempts.

## Getting Started

### Installation

Clone the project:

```bash
  git clone https://github.com/thekawsarhossain/workSpace.git
```

Go to the project directory:

```bash
  cd workSpace
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run dev
```

### Technologies Used

- NextJs
- React Query
- Zustand
- Tailwind Css
- Ant Design
- Axios
