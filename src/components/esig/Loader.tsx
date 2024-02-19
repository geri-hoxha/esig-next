import Image from "next/image";

interface IProps {
    text?: string;
}

const Loader: React.FC<IProps> = ({ text = 'Process is running...' }) => {
    return (
        <div className="flex items-center">
            <Image
                src="loader.svg"
                alt="loader"
                width={40}
                height={40}
                style={{ width: 40, height: 80 }}
                priority
            />
            <span className="ml-2 font-bold text-esig">{text}</span>
        </div>
    )
}

export default Loader;