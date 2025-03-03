import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface File {
  id: string;
  name: string;
  content: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
  expanded: boolean;
}

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<string>) => {
      state.folders.push({
        id: crypto.randomUUID(),
        name: action.payload,
        files: [],
        expanded: true,
      });
    },
    toggleFolder: (state, action: PayloadAction<string>) => {
      const folder = state.folders.find((f) => f.id === action.payload);
      if (folder) {
        folder.expanded = !folder.expanded;
      }
    },
  },
});

export const { createFolder, toggleFolder } = folderSlice.actions;
export default folderSlice.reducer;
