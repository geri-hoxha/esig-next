import { Phone, PhoneCall } from "lucide-react";

// Create a new Date object
var currentDate = new Date();

// Get the current year
var currentYear = currentDate.getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="text-center p-3 bg-gray-50 w-full font-medium text-xs md:text-sm text-slate-600">
        <div className="font-bold">ESIG</div>
        <div>{currentYear} &copy; SilverNET Systems</div>
      </div>
    </footer>
  );
};

export default Footer;
