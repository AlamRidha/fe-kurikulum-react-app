import Button from "../Elements/Button";

const ModalForm = (props) => {
  const {
    closeModal = false,
    children,
    title = "Judul Modal",
    closeButton = "Batal",
  } = props;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-opacity-50 bg-gray-950"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <div className="relative w-2/3 max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h1 className="mb-4 text-xl font-semibold">{title}</h1>
              {children}
              <Button classname="w-full mt-2 bg-red-500" onClick={closeModal}>
                {closeButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
