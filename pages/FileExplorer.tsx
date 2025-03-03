"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { createFolder, toggleFolder, createFile, openFile , deleteFile } from "@/store/fileSlice";
import { useState } from "react";
export default function FileExplorer() {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.file.folders);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const handleCreateFolder = () => {
    if (newFolderName) {
      dispatch(createFolder({ name: newFolderName }));
      setNewFolderName("");
    }
  };
  const handleCreateFile = (folderId: string) => {
    if (newFileName) {
      dispatch(createFile({ folderId, name: newFileName + ".txt" }));
      setNewFileName("");
    }
  };
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold">File Explorer</h2>
      {/* Create Folder */}
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          placeholder="New Folder Name"
          className="bg-gray-700 p-1 w-full"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder} className="bg-blue-500 px-2">+</button>
      </div>
      {/* Folder List */}
      <ul className="mt-4">
        {folders.map(folder => (
          <li key={folder.id} className="mt-2">
            <div className="flex justify-between items-center cursor-pointer bg-gray-700 p-2 rounded" 
              onClick={() => dispatch(toggleFolder({ id: folder.id }))}>
              <span>{folder.isExpanded ? "📂" : "📁"} {folder.name}</span>
            </div>
            {folder.isExpanded && (
              <div className="ml-4">
                {/* Create File */}
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="New File Name"
                    className="bg-gray-600 p-1 w-full"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                  />
                  <button onClick={() => handleCreateFile(folder.id)} className="bg-green-500 px-2">+</button>
                </div>
                {/* File List */}
                <ul>
  {folder.files.map(file => (
    <li key={file.id} className="mt-1 flex justify-between items-center bg-gray-600 p-1 rounded">
      <span onClick={() => dispatch(openFile({ fileId: file.id }))} className="cursor-pointer">
        📝 {file.name}
      </span>
      <button onClick={() => dispatch(deleteFile({ fileId: file.id }))} className="text-red-500">🗑</button>
    </li>
  ))}
</ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}