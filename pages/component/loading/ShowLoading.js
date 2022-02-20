import { useLayoutContext } from "../context/LayourContext";
import Lottie from "react-lottie";
import animationData from "../../lotties/test";

export default function ShowLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const { modalError, isLoading } = useLayoutContext();

    function showLoading() {
        let htmlLoading;
        if (isLoading) {
          htmlLoading = <div className="bg-stone-200/50 items-center z-10 w-full h-full flex fixed place-content-center content-center justify-center">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        } else {
          htmlLoading = "";
        }
        return htmlLoading;
      }

    return (
      <>
      {showLoading()}
      </>
    )
  }