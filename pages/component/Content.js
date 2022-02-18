import { useAppContext } from "./context/AppContext";

export default function Content({ children }) {

  const { modalError, isShowError } = useAppContext();

  function showErrorModal() {
      let htmlError;
      if(modalError) {
        htmlError = <div class="fixed bottom-0 bg-red-100 border div-error border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">Something seriously bad happened.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
    </div>
      } else {
        htmlError = ""
      }
      return htmlError;
  }
    return (
        <>
            {showErrorModal()}
            <div className="mx-28 mt-8">
                <h2 className="font-semibold text-2xl text-white truncate pr-20 px-6 ">My Sport</h2>
                <h2 className="font-semibold text-xs text-zinc-400 truncate pr-20 px-6 ">All available contract</h2>
                {children}
            </div>
        </>
    )
}