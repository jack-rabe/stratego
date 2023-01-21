export default function Footer() {
    return (
        <footer className="flex justify-around footer p-6  bg-neutral fixed bottom-0">
            <span className="font-bold text-lg">Stratego</span>
            <span className="block">
                Made by{' '}
                <a
                    href="https://github.com/jack-rabe"
                    className="link link-hover font-bold"
                >
                    Jack
                </a>{' '}
                and{' '}
                <a
                    href="https://github.com/MetalRain682237"
                    className="link link-hover font-bold"
                >
                    MetalRain682237
                </a>
            </span>
        </footer>
    );
}
