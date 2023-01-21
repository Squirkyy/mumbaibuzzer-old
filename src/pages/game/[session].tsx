import { useRouter } from 'next/router';

function session() {
    const router = useRouter();
    const { session } = router.query;
    return (
        <div>
            <h1>Game</h1>
        </div>
    )
}

export default session; 