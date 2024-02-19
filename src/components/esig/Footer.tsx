import { Phone, PhoneCall } from "lucide-react";

// Create a new Date object
var currentDate = new Date();

// Get the current year
var currentYear = currentDate.getFullYear();


const Footer: React.FC = () => {
    return (
        <footer className="border-t">
            <div className="text-center p-7 w-full font-semibold">
                <div className="grid grid-cols-3 gap-4">
                    <div></div>
                    <div className="flex flex-col cursor-pointer hover:scale-110 transition ">
                        <div>Esig</div>
                        <div> {currentYear} Prodhuar nga ESIG SH.A.</div>
                    </div>
                    <div className="flex flex-col cursor-pointer hover:scale-110 transition m-auto"><div>Suport:</div> <div className="flex items-center gap-x-2"> <PhoneCall size={18} /> 067 58 35 032</div></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;