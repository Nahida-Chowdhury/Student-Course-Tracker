# Student Course Tracker

A simple web application to track student courses using a form and a table. Users can add, edit, and delete courses. The data is stored locally in the browser's `localStorage`.

## Features

- Add new courses via a form.
- Display all courses in a table.
- Edit and delete existing courses.
- Data persistence using `localStorage`.
- Responsive design using Tailwind CSS.

## Technologies Used

- HTML5
- CSS (Tailwind CSS)
- JavaScript (Vanilla)
- LocalStorage for data persistence

## Project Structure
- index.html # Home page with navigation
- form.html # Course tracking form page
- table.html # Courses table page
- script.js # JavaScript for handling form submission, table display, edit, delete

## How to Use

1. **Open `form.html` in a browser:**

   - Fill out the course tracking form.
   - Click "Add Course" to save the course.
   - The course will be stored in `localStorage`.

2. **View all courses:**

   - Open `table.html` in the browser.
   - All saved courses will be listed in the table.
   - Use **Edit** to modify any course.
   - Use **Delete** to remove a course.

3. **Editing courses:**

   - Click **Edit** on a course row.
   - Update fields inline.
   - Click **Save** to save changes or **Cancel** to discard.

