import { Phone, PhoneCall } from "lucide-react";

// Create a new Date object
var currentDate = new Date();

// Get the current year
var currentYear = currentDate.getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50">
      <div className="text-center p-3 w-full font-medium text-xs md:text-sm text-slate-600">
        <div>Esig</div>
        <div>{currentYear} Prodhuar nga ESIG SH.A.</div>
      </div>
    </footer>
  );
};

export default Footer;
