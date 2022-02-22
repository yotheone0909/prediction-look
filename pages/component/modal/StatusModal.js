import { useLayoutContext } from "../context/LayourContext";

export default function StatusModal() {

    const { modalError } = useLayoutContext();

    function showErrorModal() {
        let htmlError;
        if (modalError) {
            htmlError = <div className="flex z-10 w-full place-content-center content-center justify-center fixed bottom-0 rounded mb-10" role="alert">
                <div className="w-1/4 justify-self-auto">
                    <div className="flex p-5 rounded-lg shadow bg-white">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h2 className="font-semibold text-red-800">Something went wrong</h2>
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
        </>
    )
}