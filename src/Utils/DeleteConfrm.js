import React from "react";

const ConfirmationDialog = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <p className="mt-2 text-gray-600">{message}</p>
                </div>
                <div className="px-4 py-4 flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
