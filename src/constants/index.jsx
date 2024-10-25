import { FaCar, FaMobileAlt, FaTshirt } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { RiComputerLine, RiMotorbikeFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export const categoriesData = [
    {
        item: "CARS",
        postIcon: <FaCar />
    },
    {
        item: "PROPERTIES",
        postIcon: <BsBuildings />
    },
    {
        item: "MOBILES",
        postIcon: <FaMobileAlt />
    },
    {
        item: "JOBS",
        postIcon: <PiSuitcaseSimple />
    },
    {
        item: "BIKES",
        postIcon: <RiMotorbikeFill />
    },
    {
        item: "ELECTRONICS & APPLIANCES",
        postIcon: <RiComputerLine />
    },
    {
        item: "COMMERCIAL VEHICLES & SPARES",
        postIcon: <TbTruckDelivery />,
    },
    {
        item:"FASHION",
        postIcon: <FaTshirt />
    }

]