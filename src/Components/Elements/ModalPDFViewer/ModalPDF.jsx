const ModalPDFViewer = ({ isOpen, onClose, fileUrl }) => {
  if (!isOpen) return null;

  const apiBaseUrl = import.meta.env.VITE_API_URL || "";
  const fullFileUrl = `${apiBaseUrl}/uploads/${fileUrl}`;

  console.log("Attempting to load PDF from:", fullFileUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-11/12 max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Dokumen Kurikulum</h3>
          <button
            onClick={onClose}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            Tutup
          </button>
        </div>

        {/* PDF Viewer with error handling */}
        <div className="w-full h-[80vh] border border-gray-300">
          <iframe
            src={fullFileUrl}
            title="PDF Viewer"
            className="w-full h-full"
            onError={(e) => {
              console.error("Error loading PDF:", e);
            }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ModalPDFViewer;
