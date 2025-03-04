import FileEditor from "@/components/FileEditor";
import FileExplorer from "@/pages/FileExplorer";


export default function Home() {
  return (
    <div className="flex h-screen bg-gray-800">
    <FileExplorer />
     <FileEditor/>
  </div>
  );
}
