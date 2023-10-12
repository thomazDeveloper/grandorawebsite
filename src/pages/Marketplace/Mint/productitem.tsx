import { faTshirt, faPaintBrush, faCog, faHeart } from "@fortawesome/free-solid-svg-icons";

import StatusIcon from "components/statusIcon";
import GrandoItemIcon from "assets/images/svgs/grando.svg";
import ethereumSvg from "assets/images/svgs/ethereum.svg";


const InventorItems = (props: any) => {
    const item = props.item;
    const num = props.num;

    const showClass = {
        contain: "inventory-item w-full shadow-np2 border border-cloudygrey hover:border-iridium border-opacity-50 rounded-b-30 rounded-t-10 cursor-pointer",
        img: "max-w-full h-170 rounded-t-10",
        title: "text-14 font-semibold font-lato leading-20 text-cloudygrey flex items-center",
        link: "",
    };
    let etherStyle = "text-32 text-davygrey flex items-center justify-between ";

    let rareityBtn = <button></button>;
    if (item.rareity < 100)
        rareityBtn = <button className="text-7 w-50p bg-desertStorm text-friarGrey p-2p px-5p rounded-default ml-5p">RARE</button>
    if (item.rareity <= 5)
        rareityBtn = <button className="text-7 bg-texasRose text-white p-2p px-5p rounded-default ml-5p">SUPER RARE</button>


    const clickProduct = () => {
        // alert(item.name);
    };

    return (
        <div
            className={showClass.contain}
            key={num}
            onClick={props.onClick}
        >
            <div className="flex justify-center items-center">
                <img className={showClass.img} src={item.url} alt={item.name} />
            </div>
            <div className="p-15">
                <div className={showClass.title}>
                    <img src={GrandoItemIcon} className="w-12 h-12 mr-3" alt={item.name} />
                    <p className="mr-15 uppercase">Grando item {item.name}</p>
                    {/* {item.rareity == 100 ? '' : item.rareity + '%'} */}
                </div>
                <div className="flex my-4p">
                    <StatusIcon icon={faTshirt} size="15" type="default" />
                    <StatusIcon icon={faPaintBrush} size="15" type="default" />
                    <StatusIcon icon={faCog} size="15" type="default" />
                    {rareityBtn}
                </div>
                <div className={etherStyle}>
                    <div className="flex my-5p">
                        <img src={ethereumSvg} className="mr-10" alt={item.name} />
                        <div className="flex flex-col">
                            <p className="text-12 font-semibold font-lato">{item.price}</p>
                            <p className="text-6 text-cloudygrey font-lato">($2,388.74)</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <StatusIcon icon={faHeart} size="20" type="enable" />
                        <p className="text-10 font-lato">101.k</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default InventorItems;