import { useDispatch } from "react-redux";

const Modal = ({name,title}) => {

    const isOpen = useSelector(state => state.modal.activeModals[name]);
    const dispatch = useDispatch();

    if (!isOpen) return null;
    return (
        <div className="justify-center items-center 
                        flex overflow-x-hidden 
                        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
                        bg-neutral-800/70">
            <div className="relative w-fullmd:w-4/6 lg:w-3/6 xl:w-2/5
                 my-6mx-auto h-full lg:h-automd:h-auto">
                <div className="min-h-screen flex items-center justify-center">
                    <form className="bg-white p-8 shadow-md rounded-md w-full max-w-md"
                        onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl font-bold mb-6 flex justify-between">{title}
                            <span className="text-red-800 text-sm cursor-pointer" 
                            onClick={dispatch(closeModal(name))}>X</span></h2>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md w-full
                           hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >submit
                        </button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;