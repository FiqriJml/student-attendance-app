# 🎓 Student Attendance Web App

A minimal and mobile-first web application to record student attendance for a school. Built using **Next.js (App Router)**, **Supabase**, **Tailwind CSS**, and deployed on **Vercel**.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## ✨ Features

- 📋 Student, Teacher, and Subject Management
- 🧑‍🏫 Associate teachers with subjects and schools
- 🏫 School management (supports multiple schools)
- ✅ Attendance recording
- 📥 Import students, teachers, and subjects from spreadsheets
- 📤 Export attendance records with custom templates
- 📱 Fully mobile-responsive design

## 📦 Folder Structure (Simplified)

```
app/               → App Router pages
  ├─ schools/      → Manage schools
  ├─ students/     → Manage students
  ├─ teachers/     → Manage teachers
  ├─ subjects/     → Manage subjects
  ├─ attendance/   → Record and view attendance
  ├─ export/       → Export attendance records
  ├─ import/       → Import Excel data
components/        → Reusable components (tables, forms, buttons)
lib/               → Supabase client and utility functions
types/             → TypeScript types (Student, Teacher, etc.)
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/student-attendance-app.git
cd student-attendance-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Supabase Schema (Overview)

- `schools` — `id`, `name`, `address`
- `students` — `id`, `name`, `school_id`
- `teachers` — `id`, `name`, `school_id`
- `subjects` — `id`, `name`, `teacher_id`, `school_id`
- `attendance_records` — `id`, `student_id`, `subject_id`, `date`, `status`

## 📤 Export / 📥 Import

- Supports importing lists of students, teachers, and subjects via `.csv` or `.xlsx`
- Export attendance by subject/school/date range with custom Excel template

## 📱 Mobile First

This app is designed with mobile use in mind and works great on smartphones and tablets for easy teacher usage.

## 📄 License

MIT

---

> Made with ❤️ using Next.js, Tailwind CSS, and Supabase.
