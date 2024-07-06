# 🥷🏽 NinjaSketch

A card app created for perfecting your revisions before your Multiple Choice Exams. This way the students can engage in a more pleasurable experience when Reviewing possible Chapters - Subchapters - Lessons via Questions with multiple-choice variants or even Questions that require self-rating your knowledge. It is a perfect App for medicine students or students who want to outperform the job competition when it comes to assignments tests.

## 📦 Technologies

- `Vite`
- `React.js`
- `TypeScript`
- `React-Router`
- `Redux`
- `React Query`
- `React-Hook-Form`
- `ContextApi`
- `React-Hot-Toast`
- `Context`
- `Supabase`
- `EsLint`
- `TailwindCSS`
- `CSS`

## 🦄 Features



Here's what you can do with MemoCards:

- **Deck Creation**: Working as a box that contains the *Cards*. It is the *Lesson* from a select *Chapter* and *Subchapter* allowing us to stack cards in it and test them. 

- **Cards Creation**: Working as a question and answer holder. It allows us to create questions with multiple-choice answers or even questions with one answer(**Flipping Card**) that require us to review our knowledge to that specific question. 

- **Quiz Creation**: Create your *Quiz*. You can select multiple *Decks* from the ones created. Your *Cards* will appear in your quiz based on the type of the card(with multiple-choice answers or single answer).

- **Set your Recap Plan**: In the *Settings* Panel you can set your *Recap Period* allowing for quiz testing and reminders based on last performances.

- **Dashboard**: Here you can review your performance: *Recap Plan, Overall Stats,Decks Contribution in Quizes and Perfection Scores Evolution*. 

Short Summary: Just create a *Deck*, then create some *Cards*, afterwards you can quiz yourself based on those created previously.


## 👩🏽‍🍳 The Process

I started by rendering a canvas with rough.js to create the base for all the drawings. Then, I focused on drawing on the canvas, allowing users to make lines, rectangles, and other shapes.

Next, I made sure users could move elements around. This was important for adjusting drawings. After that, I added the ability to resize elements to give more control over the shapes.

To make sure mistakes could be fixed, I implemented undo and redo features. I also added freehand drawing for a more natural sketching experience and a text tool to label or note on the canvas.

To navigate larger drawings, I put in pan and zoom tools. With everything functioning, I designed the whole UI to make it user-friendly and appealing.

Finally, I added testing with Cypress and Testing Library. I conducted end-to-end tests on drawing and manipulating text, lines, rectangles, and freehand drawings to make sure everything worked smoothly.

Along the way, while building everything, I took notes on what I've learned so I don't miss out on it. I also documented the behind-the-scenes processes every time a feature was added.

This way, I understood what I've built. The funny thing is, as soon as I started to document what happened behind the scenes and the features I've added, it made me realize that we fully understand something once we've actually taken a step back, thought about it, and documented what we've done. I think this is a good practice to follow when learning something new.

## 📚 What I Learned

During this project, I've picked up important skills and a better understanding of complex ideas, which improved my logical thinking.

### 🧠 `useHistory` Hook:

- **Logical Thinking**: Creating the `useHistory` hook taught me to think about how to manage saving, undoing, and redoing actions. I had to really understand how to track changes and plan out user actions.

### 📏 Coordinates and Measurements:

- **Accuracy**: I've become better at working with shapes and points, like knowing if a point is inside a shape. This required careful measurements.
- **Math Skills**: I used math functions to make sure everything was placed correctly and to calculate distances.

### 🎨 Discovering Rough.js:

- **New Tools**: I found out about Rough.js, which lets me make graphics look hand-drawn. This was a new and exciting tool for me.

### 🔍 Deep Dive into Functions:

- **Complex Functions**: I spent time understanding the `getSvgPathFromStroke` function, which turns drawing movements into smooth paths.

### ✏️ Managing Points and Drawing:

- **Working with Points**: I learned how to collect and use points from drawings, which involved understanding and managing data to reflect what the user does.

### 🎣 React Hooks and Rendering:

- **New Knowledge**: I learned about `useLayoutEffect`, which helps make sure changes are done before the screen updates. This was useful for certain drawing functions.

### 🎡 Advanced Event Handling:

- **User Interaction**: I worked with the wheel event listener, which allowed me to add zooming and panning features. This made the app more interactive and user-friendly.

### 📈 Overall Growth:

Each part of this project helped me understand more about building apps, managing complex information, and improving user experience. It was more than just making a tool. It was about solving problems, learning new things, and improving my skills for future work.

## 💭 How can it be improved?

- Add more colors to the color picker.
- Add more tools like a circle, eraser, and more.
- Add more shapes like triangles, stars, and more.
- Add more keyboard shortcuts to make things faster.
- Add more themes like dark mode, light mode, and more.
- Add more text options like font size, font color, and more.
- Instead of have any in two places, create a type for the rough.js elements.

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` or `yarn` in the project directory to install the required dependencies.
3. Run `npm run start` or `yarn start` to get the project started.
4. Open [http://localhost:5173](http://localhost:5173) (or the address shown in your console) in your web browser to view the app.

## 🍿 Video

https://github.com/mirayatech/NinjaSketch/assets/71933266/6a16c9e5-6380-4317-96e7-d132768f7b40


```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install
```
