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
  folders:Folder[];
  isExpanded: boolean;

}

interface FileState {
  folders: Folder[];
  rootFiles: File[];
  openFiles: File[];
  activeFileId: string | null;
}

// Initial state
const initialState: FileState = {
  folders: [],
  openFiles: [],
  rootFiles: [],
  activeFileId: null,
};

const findFolderById = (folders: Folder[], id: string): Folder | null => {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder; // Return the folder if the ID matches
    }
    const foundFolder = findFolderById(folder.folders, id); // Recurse into subfolders
    if (foundFolder) {
      return foundFolder; // Return the found folder
    }
  }
  return null; // Return null if no folder is found
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<{ name: string; parentId?:string }>) => {
      const newFolder = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        files: [],
        folders: [],
        isExpanded: true,
      };
    
      if (action.payload.parentId) {
        // Find the parent folder and add the new folder to its subfolders
        const parentFolder = findFolderById(state.folders, action.payload.parentId);
        if (parentFolder) {
          parentFolder.folders.push(newFolder);
        }
      } else {
        // If no parentId is provided, add to the top level
        state.folders.push(newFolder);
      }
    
    
    },
    toggleFolder: (state, action: PayloadAction<{ id: string }>) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.isExpanded = !folder.isExpanded;
      }
    },
    deleteFolder: (state, action: PayloadAction<{ folderId: string }>) => {
      const deleteRecursively = (folders: Folder[]): Folder[] => { // Explicitly type the folders parameter
        return folders.filter(folder => {
          if (folder.id === action.payload.folderId) {
            return false; // Skip this folder
          }
          folder.folders = deleteRecursively(folder.folders); // Recurse into subfolders
          return true; // Keep this folder
        });
      };
      state.folders = deleteRecursively(state.folders);
    },
    createFile: (state, action: PayloadAction<{ folderId?: string; name: string }>) => {
      const newFile = {
          id: crypto.randomUUID(),
          name: action.payload.name,
          content: "",
      };
  
      if (action.payload.folderId) {
          // Ensure folder exists before adding the file
          const folder = findFolderById(state.folders, action.payload.folderId);
          if (folder) {
              folder.files = folder.files || []; // Ensure files array is initialized
              folder.files.push(newFile);
          } else {
              console.error(`Folder with ID ${action.payload.folderId} not found.`);
          }
      } else {
          state.rootFiles = state.rootFiles || []; // Ensure rootFiles is initialized
          state.rootFiles.push(newFile);
      }
  },
  
  openFile: (state, action: PayloadAction<{ fileId: string }>) => {
    console.log("Redux: Trying to open file:", action.payload.fileId);
  
    // Search in root files
    let file = state.rootFiles.find(f => f.id === action.payload.fileId);
  
    // Search in nested folders
    if (!file) {
      const searchFilesInFolders = (folders: Folder[]): File | undefined => {
        for (const folder of folders) {
          const foundFile = folder.files.find(f => f.id === action.payload.fileId);
          if (foundFile) return foundFile;
          const foundInSubfolder = searchFilesInFolders(folder.folders);
          if (foundInSubfolder) return foundInSubfolder;
        }
        return undefined;
      };
      file = searchFilesInFolders(state.folders);
    }
  
    if (file) {
      console.log("Redux: Found file:", file);
  
      if (!state.openFiles.find(f => f.id === file.id)) {
        state.openFiles.push(file);
        console.log("Redux: Added file to openFiles", state.openFiles);
      }
  
      state.activeFileId = file.id;
      console.log("Redux: Set activeFileId:", state.activeFileId);
    } else {
      console.log("Redux: File not found!");
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
      // Remove from root files
      state.rootFiles = state.rootFiles.filter(file => file.id !== action.payload.fileId);
    
      // Remove from nested folders
      const deleteFileFromFolders = (folders: Folder[]): Folder[] => {
        return folders.map(folder => ({
          ...folder,
          files: folder.files.filter(file => file.id !== action.payload.fileId),
          folders: deleteFileFromFolders(folder.folders), // Recurse into subfolders
        }));
      };
      state.folders = deleteFileFromFolders(state.folders);
    
      // Remove from open files
      state.openFiles = state.openFiles.filter(file => file.id !== action.payload.fileId);
    
      // If the deleted file was active, set a new active file
      if (state.activeFileId === action.payload.fileId) {
        state.activeFileId = state.openFiles.length > 0 ? state.openFiles[0].id : null;
      }
    },
  }
});

export const { createFolder, toggleFolder, createFile, openFile, editFile,deleteFolder,
    setActiveFile,deleteFile,
   closeFile } = fileSlice.actions;
export default fileSlice.reducer;
