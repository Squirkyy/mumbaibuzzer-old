import type { AppProps } from "next/app";
import "../styles/globals.css";
import SideBar from "../components/SideBar";
import ToggleGame from "../components/ToggleGame";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <>
            <main
                data-theme="night"
                className="flex min-h-screen flex-row bg-gradient-to-br from-[#2e026d] to-[#15162c]"
            >
                <div className="m-2 flex basis-1/12 flex-col">
                    {router.pathname == "/game/commander" && <ToggleGame />}
                </div>
                <div className="flex basis-10/12 flex-col items-center justify-center">
                    <Component {...pageProps} />
                </div>
                <SideBar />
            </main>
        </>
    );
}

export default MyApp;
