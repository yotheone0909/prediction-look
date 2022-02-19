import { useLayoutContext } from "./context/LayourContext";

export default function Content({ children }) {

  const { modalError } = useLayoutContext();

  function showErrorModal() {
    let htmlError;
    if (modalError) {
      htmlError = <div class="flex z-10 w-full place-content-center content-center justify-center fixed bottom-0 rounded mb-10" role="alert">
        <div class="w-1/4 justify-self-auto">
          <div class="flex p-5 rounded-lg shadow bg-white">
            <div>
              <svg class="w-6 h-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" /></svg>
            </div>
            <div class="ml-3">
              <h2 class="font-semibold text-gray-800">Success Alert Title</h2>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum impedit ipsam nam quam! Ab accusamus aperiam distinctio doloribus, praesentium quasi reprehenderit soluta unde?</p>
            </div>
          </div>
        </div>
      </div>
    } else {
      htmlError = ""
    }
    return htmlError;
  }

  return (
    <>
      {showErrorModal()}
      <div className="mx-28 mt-8 mb-28">
        <h2 className="font-semibold text-2xl text-white truncate pr-20 px-6 ">My Sport</h2>
        <h2 className="font-semibold text-xs text-zinc-400 truncate pr-20 px-6 ">All available contract</h2>
        {children}
      </div>
    </>
  )
}