import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";

import { MdClose } from "react-icons/md";
const Modal = ({name,title, children}) => {

    const isOpen = useSelector(state => state.modal.activeModals[name]);
    const dispatch = useDispatch();

    if (!isOpen) return null;
    return (
        <div className="justify-center items-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 flex justify-between text-fuchsia-900">
                {title}
                <span
                  className="text-red-800 text-sm cursor-pointer"
                  onClick={() => dispatch(closeModal(name))}
                >
                  <MdClose />
                </span>
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Modal;