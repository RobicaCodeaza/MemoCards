# 🎴 MemoCards - [Link](https://memo-cards-psi.vercel.app)

A card app created for perfecting your revisions before your Multiple Choice Exams. This way the students can engage in a more pleasurable experience when Reviewing possible Chapters - Subchapters - Lessons via Questions with multiple-choice variants or even Questions that require self-rating your knowledge. It is a perfect App for medicine students or students who want to outperform the job competition when it comes to assignments tests.



## ❇️ Technologies

- `Vite`
- `React.js`
- `TypeScript`
- `React-Router`
- `Redux ToolKit`
- `React Query`
- `React-Hook-Form`
- `ContextApi`
- `React-Hot-Toast`
- `Context`
- `Date-Fns`
- `Recharts`
- `Supabase`
- `EsLint`
- `TailwindCSS`
- `ShadCn`
- `CSS`
- `React-Icons`



## 💎 Features

Here's what you can do with MemoCards:

- **Deck Creation**: Working as a box that contains the *Cards*. It is the *Lesson* from a select *Chapter* and *Subchapter* allowing us to stack cards in it and test them. 

- **Cards Creation**: Working as a question and answer holder. It allows us to create questions with multiple-choice answers or even questions with one answer(**Flipping Card**) that require us to review our knowledge to that specific question. 

- **Quiz Creation**: Create your *Quiz*. You can select multiple *Decks* from the ones created. Your *Cards* will appear in your quiz based on the type of the card(with multiple-choice answers or single answer).

- **Set your Recap Plan**: In the *Settings* Panel you can set your *Recap Period* allowing for quiz testing and reminders based on last performances.

- **Dashboard**: Here you can review your performance: *Recap Plan, Overall Stats, Decks' Contribution in Quizes and Perfection Scores Evolution*. 

Short Summary: Just create a *Deck*, then create some *Cards*, afterwards you can quiz yourself based on those created previously.


  
## 🧑‍🍳 The Process

The project represents a special request from my girlfriend  to prepare for the medical exams. 
I developed it following a User Story structure, then I defined the main features of the app, afterwards I thought about the Routing and necessary Tech Stack to bring her idea and my personal touch to life.

Along the way, while building everything, I took notes on what I've learned so I don't miss out on it. I also documented the behind-the-scenes processes every time a feature was added.

This way, I understood what I've built. The funny thing is, as soon as I started to document what happened behind the scenes and the features I've added, it made me realize that we fully understand something once we've actually taken a step back, thought about it, and documented what we've done. I think this is a good practice to follow when learning something new.



## 📚 What I Learned

During this project, I've picked up important skills and a better understanding of complex ideas, which improved my logical thinking.

### ❔ React Query :

- Using an efficient, functional and clean way of interacting with the database while maintaining abstraction and respecting an opinionated way of programming.

### 👤 User Management and User's Data:

- Managed every user's data via login and ensured every interaction with the app had its signature based on its unique ID.
- Thus Cards, Decks, Quizzes and Settings are associated with every logged user.

### 🇫 Discovering React-Hook-Form:

- Easy management of the forms having access to default values served in conjunction with the data coming from supabase via React Query.

### 🔍 Deep Dive into Redux:

- Redux provided easy management of the state required for the creation of complex Quizzes as in our needed case.

### ✏️ SQL editor and PostgreSQL:

- Supabase Provides a CLI for JavaScript but sometimes updating Arrays inside a Row needed a personal touch and help from our friend SQL.

### 🪝 React Custom Hooks and TypeScript Practices:

- TypeScript allowed to catch errors early in production while working with defined data provided by Supabase dataTypes. Defining custom hooks(ex: usage of local storage) represented a good principle of DRY.

### 🏰 UI Component Library and Reusable Components

### 📈 Overall Growth:

Each part of this project helped me understand more about building apps, managing complex information, and improving user experience. It was more than just making a tool. It was about solving problems, learning new things, and improving my skills for future work.



## 💡 How can it be improved?

- Add Code Related Questions
- Add AI integration that:
  -> Creates Questions and Answers based on Pdf
- Add other Dashboard Statistics
- Other Open Source Ideas(A


## 🏃 Running the Project

To run the project in your local environment, follow these steps:

```bash
# Clone the repository
git clone https://github.com/RobicaCodeaza/MemoCards.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install

# Run the project
npm run dev

```
 Open [http://localhost:5173](http://localhost:5173) (or the address shown in your console) in your web browser to view the app.


## 🍿 Video

To be Added

