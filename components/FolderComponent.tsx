"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { createFolder, deleteFolder, toggleFolder } from "@/store/fileSlice";
import { useState } from "react";
import type { Folder } from "@/store/fileSlice";

export default function FolderComponent() {
  const dispatch = useDispatch();
  
  // Access folders from Redux state using RootState
  const folders = useSelector((state: RootState) => state.file.folders);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName) {
      dispatch(createFolder({ name: newFolderName }));
      setNewFolderName("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-lg mb-2">Folders</h2>

      {/* Create Folder Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="New Folder Name"
          className="bg-gray-700 text-white p-2 rounded"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder} className="bg-blue-500 p-2 rounded text-white">
          Create
        </button>
      </div>

      {/* Folder List */}
      <ul className="mt-4">
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </ul>
    </div>
  );
}

// Recursive Folder Item Component
function FolderItem({ folder }: { folder: Folder }) {
  const dispatch = useDispatch();
  const [newSubFolderName, setNewSubFolderName] = useState("");

  const handleCreateSubFolder = () => {
    if (newSubFolderName) {
      dispatch(createFolder({ name: newSubFolderName, parentFolderId: folder.id }));
      setNewSubFolderName("");
    }
  };

  return (
    <li className="mt-2">
      <div 
        className="flex justify-between items-center cursor-pointer bg-gray-700 p-2 rounded"
        onClick={() => dispatch(toggleFolder({ id: folder.id }))}
      >
        <span>{folder.isExpanded ? "📂" : "📁"} {folder.name}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteFolder({ folderId: folder.id }));
          }} 
          className="text-red-500"
        >
          🗑
        </button>
      </div>

      {folder.isExpanded && (
        <div className="ml-4">
          {/* Create Subfolder Input */}
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="New Subfolder Name"
              className="bg-gray-600 p-1 w-full"
              value={newSubFolderName}
              onChange={(e) => setNewSubFolderName(e.target.value)}
            />
            <button onClick={handleCreateSubFolder} className="bg-blue-500 px-2">📁+</button>
          </div>

          {/* Recursive Rendering for Subfolders */}
          {folder.folders.length > 0 && (
            <ul>
              {folder.folders.map((subfolder) => (
                <FolderItem key={subfolder.id} folder={subfolder} />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
