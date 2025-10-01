interface NoteCardProps {
  title: string;
  preview: string;
  date: string;
}

export const NoteCard = ({ title, preview, date }: NoteCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow cursor-pointer w-[300px] h-[180px] flex flex-col">
      <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-4 mb-4 flex-1">{preview}</p>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-xs text-gray-400">{date}</p>
        <button className="text-xs text-gray-600 hover:text-gray-800 font-medium px-2 py-1 rounded hover:bg-gray-50">View</button>
      </div>
    </div>
  );
};
