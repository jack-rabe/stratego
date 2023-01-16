export default function Footer() {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <p className="left-10">Stratego</p>
            <p className="block right-10 absolute">
                Made by{' '}
                <a
                    href="https://github.com/jack-rabe"
                    className="link link-hover"
                >
                    Jack
                </a>{' '}
                and{' '}
                <a
                    href="https://github.com/MetalRain682237"
                    className="link link-hover"
                >
                    MetalRain682237
                </a>
            </p>
        </footer>
    );
}
