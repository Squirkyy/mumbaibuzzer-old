import type { AppProps } from "next/app";
import "../styles/globals.css";
import SideBar from "../components/SideBar";
import ToggleGame from "../components/ToggleGame";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <main data-theme="night" className="flex flex-row min-h-screen bg-gradient-to-br from-[#2e026d] to-[#15162c]">
                <div className="flex flex-col basis-1/12 m-2">
                    <ToggleGame />
                </div>
                <div className="flex flex-col basis-10/12 items-center justify-center">
                    <Component {...pageProps} />
                </div>
                <SideBar />
            </main>
        </>
    );
}

export default MyApp;
