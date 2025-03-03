"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { editFile, closeFile, setActiveFile } from "@/store/fileSlice";

export default function FileEditor() {
  const dispatch = useDispatch();
  const openFiles = useSelector((state: RootState) => state.file.openFiles);
  const activeFileId = useSelector((state: RootState) => state.file.activeFileId);
  const activeFile = openFiles.find(file => file.id === activeFileId);

  if (!openFiles.length) return <div className="flex-1 p-4 text-white">No file open</div>;

  return (
    <div className="flex-1 bg-gray-900 text-white p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-600">
        {openFiles.map(file => (
          <div
            key={file.id}
            className={`p-2 cursor-pointer ${file.id === activeFileId ? "bg-gray-700" : "bg-gray-800"}`}
            onClick={() => dispatch(setActiveFile({ fileId: file.id }))}
          >
            {file.name} 
            <button onClick={() => dispatch(closeFile({ fileId: file.id }))} className="ml-2 text-red-500">×</button>
          </div>
        ))}
      </div>

      {/* File Editor */}
      {activeFile && (
        <textarea
          className="w-full h-[300px] bg-gray-800 text-white p-2 mt-2"
          value={activeFile.content}
          onChange={(e) => dispatch(editFile({ fileId: activeFile.id, content: e.target.value }))}
        />
      )}
    </div>
  );
}
