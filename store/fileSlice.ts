import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define file & folder structure
interface File {
  id: string;
  name: string;
  content: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
  isExpanded: boolean;
}

interface FileState {
  folders: Folder[];
  openFiles: File[];
  activeFileId: string | null;
}

// Initial state
const initialState: FileState = {
  folders: [],
  openFiles: [],
  activeFileId: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<{ name: string }>) => {
      state.folders.push({
        id: crypto.randomUUID(),
        name: action.payload.name,
        files: [],
        isExpanded: true,
      });
    },
    toggleFolder: (state, action: PayloadAction<{ id: string }>) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.isExpanded = !folder.isExpanded;
      }
    },
    createFile: (state, action: PayloadAction<{ folderId: string; name: string }>) => {
      const folder = state.folders.find((f) => f.id === action.payload.folderId);
      if (folder) {
        folder.files.push({
          id: crypto.randomUUID(),
          name: action.payload.name,
          content: "",
        });
      }
    },
    openFile: (state, action: PayloadAction<{ fileId: string }>) => {
      const file = state.folders.flatMap(f => f.files).find(f => f.id === action.payload.fileId);
      if (file) {
        if (!state.openFiles.find(f => f.id === file.id)) {
          state.openFiles.push(file);
        }
        state.activeFileId = file.id;
      }
    },
    editFile(state, action: PayloadAction<{ fileId: string; content: string }>) {
        const file = state.openFiles.find(f => f.id === action.payload.fileId);
        if (file) {
          file.content = action.payload.content;
        }
      },
      setActiveFile(state, action: PayloadAction<{ fileId: string }>) {
        state.activeFileId = action.payload.fileId;
      },
    closeFile: (state, action: PayloadAction<{ fileId: string }>) => {
      state.openFiles = state.openFiles.filter(f => f.id !== action.payload.fileId);
      if (state.activeFileId === action.payload.fileId) {
        state.activeFileId = state.openFiles.length > 0 ? state.openFiles[0].id : null;
      }
    },
    deleteFile: (state, action: PayloadAction<{ fileId: string }>) => {
        // Remove the file from all folders
        state.folders.forEach(folder => {
          folder.files = folder.files.filter(file => file.id !== action.payload.fileId);
        });
      
        // Remove the file from open files
        state.openFiles = state.openFiles.filter(file => file.id !== action.payload.fileId);
      
        // If the deleted file was active, set a new active file
        if (state.activeFileId === action.payload.fileId) {
          state.activeFileId = state.openFiles.length > 0 ? state.openFiles[0].id : null;
        }
      }
  }
});

export const { createFolder, toggleFolder, createFile, openFile, editFile,
    setActiveFile,deleteFile,
   closeFile } = fileSlice.actions;
export default fileSlice.reducer;
