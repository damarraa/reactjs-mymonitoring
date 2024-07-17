import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const UserTable = ({
  users,
  openEditModal,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-6">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-white text-neutral-700">
          <tr>
            <th className=" text-sm font-medium tracking-wider text-left text-gray-500 text-center">
              No.
            </th>
            <th className=" text-sm font-medium tracking-wider text-left text-gray-500 text-center">
              Nama
            </th>
            <th className=" text-sm font-medium tracking-wider text-left text-gray-500 text-center">
              Email
            </th>
            <th className=" text-sm font-medium tracking-wider text-left text-gray-500 text-center">
              Role
            </th>
            <th className=" text-sm font-medium tracking-wider text-left text-gray-500 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {(currentPage - 1) * 10 + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {user.roles}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => openEditModal(user)}
                >
                  <FaEdit className="h-4 w-4 mr-1 text-sky-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 font-medium text-sm text-gray-700 flex items-center"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack className="mr-1" />Previous
        </button>
        <span className="px-4 py-2 font-medium text-sm text-gray-700 justify-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 font-medium text-sm text-gray-700 flex items-center"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next <IoIosArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
