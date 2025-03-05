# 📂 File Explorer

A **responsive file explorer application** built with **React, Redux, and Tailwind CSS**. This project allows users to **create, open, delete, and manage files and folders** in a nested structure. It features a **hamburger menu** for mobile-friendly navigation.

---

## 🚀 Features

✅ **Create Files and Folders** - Add new files and folders at the root level or inside nested folders.  
✅ **Open Files** - Open files to view or edit their content.  
✅ **Delete Files and Folders** - Remove files and folders from the explorer.  
✅ **Responsive Design** - Works seamlessly on both **desktop** and **mobile devices**.  
✅ **Nested Structure** - Supports **deeply nested** folders and files.  
✅ **Duplicate Name Handling** - Automatically appends _(1), (2), etc._ to duplicate file or folder names.  

---

## 🛠 Technologies Used

- **React** - JavaScript library for building user interfaces.
- **Redux** - State management library for global state handling.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **React Icons** - Library for using icons in React applications.
- **TypeScript** - Typed superset of JavaScript for better development experience.

---

## 📥 Getting Started

Follow these steps to set up the project on your local machine.

### ⚙️ Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### 📌 Installation
#### 1️⃣ Clone the repository:
```bash
git clone https://github.com/RIDHIJAIN1/scalexbiz.git
cd scalexbiz
```
#### 2️⃣ Install dependencies:
```bash
npm install
```
#### 3️⃣ Start the development server:
```bash
npm run dev
```
#### 4️⃣ Open the application:
Visit **[http://localhost:3000](http://localhost:3000)** in your browser to explore the app.

---

## 📂 Project Structure

```
file-explorer/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── store/               # Redux store and slices
│   ├── page.tsx              # Main application component        
│   └── ...                  # Other configuration files
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── ...                      # Other configuration files
```

---

## 🎯 Usage Guide

### 📁 Creating a Folder
1️⃣ Click the **folder icon (📁)** to show the folder input field.  
2️⃣ Enter a name for the folder.  
3️⃣ Click the **➕ button** to create the folder.  

### 📄 Creating a File
1️⃣ Click the **file icon (📄)** to show the file input field.  
2️⃣ Enter a name for the file (e.g., `example.txt`).  
3️⃣ Click the **➕ button** to create the file.  

### 📝 Opening a File
1️⃣ Click on the **file name** to open it.  
2️⃣ The file content will be displayed in the editor.  

### 🗑️ Deleting a File or Folder
1️⃣ Click the **trash icon (🗑️)** next to the file or folder you want to delete.  
2️⃣ The file or folder will be removed from the explorer.  

---

## 🎨 Customization

### ➕ Adding New Features
- Create new components in the `src/components/` directory.
- Update the Redux slice (`src/store/fileSlice.ts`) to handle new actions.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

👩‍💻 **Ridhi Jain**  
📧 Email: [ridhijain7300@gmail.com](mailto:ridhijain7300@gmail.com)  
🌍 GitHub: [RIDHIJAIN1](https://github.com/RIDHIJAIN1)  

🚀 **Enjoy exploring your files!**
