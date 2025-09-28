### 🔧 Project Prompt: College Club Website (CS & Coding Focus)

#### 🎯 **Purpose**

Build a **modern, clean, and fast** website for a **college coding & computer science club**. The site should serve as an informational and interactive hub, featuring blog posts, practicals, question papers, syllabus details, and more — all connected to a backend.

---

### ✨ **Design and UI Requirements**

#### 🎨 **Design Style**

* Minimalistic, clean, and professional.
* Theme: **Black and White** (dark/light toggle preferred).
* Similar aesthetic inspiration: [https://onlinejain.com/](https://onlinejain.com/)
* Font and layout should reflect a **tech/coding-oriented vibe**.

#### 🧩 **UI Components & Libraries**

* Use **ShadCN UI** components throughout.
* Scroll animations and transitions should be powered by **GSAP (GreenSock)**, inspired by the smooth effects in [Zentry](https://zentry.co/).
* Responsive design, mobile-first optimized.

---

### 🏠 **Homepage Structure**

1. **Hero Section / Landing Image Carousel**

   * Showcase 3-5 slides featuring club events, code, projects.
   * Autoplay & swipe support.

2. **Scroll Animations**

   * Animate sections on scroll using **GSAP**.
   * Smooth transitions between sections.

3. **About Section**

   * Brief intro to the club, goals, and vision.

4. **Image Showcase Carousel**

   * Similar to Zentry's implementation.
   * Show club activities, hackathons, workshops.

5. **Navigation to Core Sections**

   * Feature links or cards to the following sections:

     * **Blogs**
     * **Contact**
     * **Discussions**
     * **Practicals**
     * **Question Papers (QPs)**
     * **Syllabus**

---

### 🔧 **Technical Stack**

#### ⚙️ **Frontend**

* **Framework:** Next.js (Static Site Generation preferred)
* **Styling:** Tailwind CSS
* **UI Library:** ShadCN UI
* **Animation Library:** GSAP
* **Image Optimization:** Next/Image

#### 🗃️ **Backend / DB**

* **Database:** PostgreSQL via **Neon DB**
* **ORM:** Prisma
* **File Storage:** Supabase (for uploading and accessing files like PDFs, ZIPs, images)
* **API Routing:** Next.js App Router with API routes for content CRUD operations.

---

### 🧱 **Pages/Sections Overview**

Each of the following pages should be implemented with basic structure and routing in Next.js:

1. **/blogs**

   * Blog articles posted by members.
   * Rich text editor for admin.
   * Markdown or WYSIWYG support.

2. **/contact**

   * Contact form connected to backend (store in DB or email integration).

3. **/discussion**

   * Forum-like section or simple threads/comments section.

4. **/practicals**

   * List and upload option for practical files, PDFs, project links.

5. **/qps**

   * Previous years’ question papers upload & browse.

6. **/syllabus**

   * Subject-wise syllabus view with downloadable files (via Supabase).

---

### 🛠️ **Additional Notes**

* Prioritize performance (static generation, lazy loading).
* Ensure accessibility (a11y practices).
* Include SEO best practices.
* Modular folder structure (`app/` and `components/` directory).

---

### ✅ **Expected Deliverables**

* Complete Next.js project with all routes and components.
* Working backend integration via Prisma with Neon DB.
* Supabase integration for file uploads.
* Clean UI/UX aligned with ShadCN design system.
* Deploy-ready build (e.g., Vercel or Netlify support).