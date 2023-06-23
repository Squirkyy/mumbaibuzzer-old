import { UserButton, currentUser } from "@clerk/nextjs";

async function Home() {
    const user = await currentUser();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="font-bold">Hey {user?.username}</h1>
            <div>
                <UserButton afterSignOutUrl="/" />
            </div>
        </main>
    );
}

export default Home;
