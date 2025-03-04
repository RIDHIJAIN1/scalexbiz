"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  createFolder,
  toggleFolder,
  createFile,
  openFile,
  deleteFile,
  deleteFolder,
} from "@/store/fileSlice";
import { useState } from "react";
import { FaFolder, FaFile, FaTrash } from "react-icons/fa";

export default function FileExplorer() {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.file.folders || []);
  const rootFiles = useSelector((state: RootState) => state.file.rootFiles || []);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showFolderInput, setShowFolderInput] = useState<{ [key: string]: boolean }>({});
  const [showFileInput, setShowFileInput] = useState<{ [key: string]: boolean }>({});
  const [folderInputs, setFolderInputs] = useState<{ [key: string]: string }>({});
  const [fileInputs, setFileInputs] = useState<{ [key: string]: string }>({});

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleCreateFolder = (parentId?: string) => {
    if (folderInputs[parentId || "root"]) {
      dispatch(createFolder({ name: folderInputs[parentId || "root"], parentId }));
      setFolderInputs((prev) => ({ ...prev, [parentId || "root"]: "" }));
      setShowFolderInput((prev) => ({ ...prev, [parentId || "root"]: false }));
    }
  };

  const handleCreateFile = (folderId?: string) => {
    if (fileInputs[folderId || "root"]) {
      dispatch(createFile({ folderId, name: fileInputs[folderId || "root"] + ".txt" }));
      setFileInputs((prev) => ({ ...prev, [folderId || "root"]: "" }));
      setShowFileInput((prev) => ({ ...prev, [folderId || "root"]: false }));
    }
  };

  const renderFolders = (folderList: any[], level = 0) => {
    return folderList.map((folder) => (
      <div key={folder.id} className={`ml-${level * 2} mt-2`}>
        <div 
          className="flex border-2 justify-between items-center bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600"
          onClick={() => dispatch(toggleFolder({ id: folder.id }))}
        >
          <span>{folder.name}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch(deleteFolder({ folderId: folder.id })); }} 
            className="text-red-400 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>

        {folder.isExpanded && (
          <div className="ml-4">
            <div className="flex space-x-2 mt-2">
              <FaFolder 
                className="text-yellow-400 cursor-pointer"
                onClick={() => setShowFolderInput((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }))}
              />
              <FaFile 
                className="text-blue-400 cursor-pointer"
                onClick={() => setShowFileInput((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }))}
              />
            </div>

            {/* Folder Input */}
            {showFolderInput[folder.id] && (
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="New Folder Name"
                  className="bg-gray-600 p-1 w-full text-white rounded"
                  value={folderInputs[folder.id] || ""}
                  onChange={(e) => setFolderInputs((prev) => ({ ...prev, [folder.id]: e.target.value }))}
                />
                <button onClick={() => handleCreateFolder(folder.id)} className="bg-blue-500 px-2 rounded">+</button>
              </div>
            )}

            {/* File Input */}
            {showFileInput[folder.id] && (
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="New File Name"
                  className="bg-gray-600 p-1 w-full text-white rounded"
                  value={fileInputs[folder.id] || ""}
                  onChange={(e) => setFileInputs((prev) => ({ ...prev, [folder.id]: e.target.value }))}
                />
                <button onClick={() => handleCreateFile(folder.id)} className="bg-green-500 px-2 rounded">+</button>
              </div>
            )}

            {/* Render Nested Folders and Files */}
            {renderFolders(folder.folders, level + 1)}
            {folder.files.map((file) => (
              <div key={file.id} className="ml-4 mt-1 flex justify-between items-center bg-gray-600 p-1 rounded ">
                <span 
                  onClick={() => dispatch(openFile({ fileId: file.id }))} 
                  className="cursor-pointer"
                >
                  {file.name}
                </span>
                <button 
                  onClick={() => dispatch(deleteFile({ fileId: file.id }))} 
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-gray-900 text-white p-4  w-full sm:w-3/4 md:w-1/3 lg:w-1/4  overflow-auto">

      <div className="relative">
        <button onClick={toggleSidebar}></button>
      </div>
      
      <h2 className="text-lg font-bold">File Explorer</h2>

      {/* Root Folder Controls */}
      <div className="flex space-x-2 mt-2">
        <FaFolder 
          className="text-yellow-400 cursor-pointer"
          onClick={() => setShowFolderInput((prev) => ({ ...prev, root: !prev.root }))}
        />
        <FaFile 
          className="text-blue-400 cursor-pointer"
          onClick={() => setShowFileInput((prev) => ({ ...prev, root: !prev.root }))}
        />
      </div>

      {showFolderInput.root && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            placeholder="New Folder Name"
            className="bg-gray-700 p-1 w-full rounded"
            value={folderInputs["root"] || ""}
            onChange={(e) => setFolderInputs((prev) => ({ ...prev, root: e.target.value }))}
          />
          <button onClick={() => handleCreateFolder()} className="bg-blue-500 px-2 rounded">+</button>
        </div>
      )}

      {showFileInput.root && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            placeholder="New File Name"
            className="bg-gray-700 p-1 w-full rounded"
            value={fileInputs["root"] || ""}
            onChange={(e) => setFileInputs((prev) => ({ ...prev, root: e.target.value }))}
          />
          <button onClick={() => handleCreateFile()} className="bg-green-500 px-2 rounded">+</button>
        </div>
      )}

      {/* Render Root Files */}
      <div className="mt-4">
        {rootFiles.map((file) => (
          <div key={file.id} className="mt-1 flex justify-between items-center bg-gray-600 p-1 rounded">
            <span onClick={() => dispatch(openFile({ fileId: file.id }))} className="cursor-pointer">{file.name}</span>
            <button onClick={() => dispatch(deleteFile({ fileId: file.id }))} className="text-red-400 hover:text-red-600">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Render Folders Recursively */}
      <div className="mt-4">{renderFolders(folders)}</div>
    </div>
  );
}
