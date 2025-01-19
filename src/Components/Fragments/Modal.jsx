import Button from "../Elements/Button";

const ModalForm = (props) => {
  const { closeModal = false, children } = props;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-950 bg-opacity-50"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-2/3 max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h1 className="text-xl font-semibold mb-4">Tambah Data Guru</h1>
              {children}
              <Button classname="bg-red-500 w-full mt-2" onClick={closeModal}>
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
