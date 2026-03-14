import { Book } from "@/types";
import { Select } from "antd";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { FiDelete } from "react-icons/fi";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { WiDust } from "react-icons/wi";

export default function BookRow({
  book,
  onDelete,
  onEdit,
  onStatusChange,
}: {
  book: Book;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
  onStatusChange: (book: Book, status: string) => void;
}) {
  const bookStatusColor =
    book.status === "completed"
      ? "bg-green-600"
      : book.status === "reading"
        ? "bg-blue-500"
        : "bg-(--primary)";

  return (
    <div className="group grid shadow-sm grid-cols-12 items-center gap-4 rounded p-5 transition-all bg-white">
      <div className={"col-span-12 md:col-span-2 w-full h-full" + bookStatusColor}>
        <p
          className={`text-base text-white uppercase font-semibold ${bookStatusColor} px-4 py-2 rounded inline-block mt-2`}
        >
          {book.status}
        </p>
      </div>

      <div className="flex-1 min-w-0 col-span-12 md:col-span-9">
        <h3 className=" text-gray-600 truncate text-sm">
        <span className="font-semibold text-2xl">{book.title}</span>
        </h3>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          Author: {book.author}
        </p>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          Created: {moment(book.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        {book.tags.length > 0 && (
          <div className="flex gap-2 mt-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-[#f5f5f7] text-[#86868b] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 col-span-12 md:col-span-1">
        <button
          onClick={() => onEdit(book)}
          className="text-sm text-(--primary) hover:cursor-pointer transition-colors font-medium"
        >
          <BiEdit title="Edit" fontSize={24} />
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="text-sm text-red-500 hover:cursor-pointer transition-colors font-medium"
        >
          <MdDelete title="Delete" fontSize={24} />
        </button>
      </div>
    </div>
  );
}
