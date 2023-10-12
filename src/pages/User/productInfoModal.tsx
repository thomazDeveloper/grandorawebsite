import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import contracts from 'config/constants/constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTshirt, faPaintBrush, faCog, faHeart, faShoppingBag, faEye } from '@fortawesome/free-solid-svg-icons';
import { NftProductsProps, NFTItemProps } from '../../core/interfaces/pages';

import StatusIcon from "../../components/statusIcon";
import DropTab from '../../components/DropTab';
import GrandoItemIcon from "../../assets/images/svgs/grando.svg";
import ethereumSvg from "../../assets/images/svgs/ethereum.svg";
import useAllNFT from "hooks/useAllNFT";
import { useDispatch } from 'core/store/store';
import { storeNftItem } from 'core/store/reducers/nft';
import Popup from 'components/signin/Popup';
const ProductInfoModal = (props: any) => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { onBurnNFT } = useAllNFT();
  const [show,setShow]=useState(false);
  const [content,setContent]=useState("");
  const item: NFTItemProps = props.item;

  const onBurn = () => {

    if (item.id !== undefined && item.supply) {

      onBurnNFT(item.id, Number(item.supply))
        .then(tx => {
          console.log(tx)
          if (tx.status === true) {
            props.onHide();
            setShow(true)
            setContent("Transaction successed")
          }
        })
        .catch(err => {
          console.log(err);
          alert('Transaction failed')
        })
    }
  }

  const onMint = () => {
    dispatch(storeNftItem(item));
    navigate(`/mint/inventor/detail`);
  }

  return (
    <>
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className='p-10 pt-20 flex justify-end'>
        <FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={props.onHide}></FontAwesomeIcon>
      </div>
      <Modal.Body className='flex pt-0 pb-20 font-Rajdhani'>
        <div className='mx-15'>
          <img src={item.url} className='w-400 h-400 rounded-10 border' alt={item.name} />
          <div className=" flex justify-center my-10p">
            <button
              className="uppercase px-25p mx-13p h-30 rounded-4 bg-davygrey text-white text-14 font-semibold"
              onClick={() => onBurn()}
            >
              Burn item
            </button>
            <button
              className="uppercase px-25p h-30 rounded-4 bg-texasRose text-white text-14 font-semibold"
              onClick={onMint}
            >
              Mint item test
            </button>
          </div>
        </div>
        <div className="w-485 mx-15 text-davygrey h-400 overflow-auto">
          <div className="text-25 font-semibold font-lato leading-20 text-cloudygrey flex items-center">
            <img src={GrandoItemIcon} className="w-28 h-28 mr-3" alt={item.name} />
            <p className="mr-15 uppercase">{item.name}</p>
            {/* {item.rareity == 100 ? '' : item.rareity + '%'} */}
          </div>
          <div className="flex my-4p justify-between items-center">
            <div className="flex">
              <StatusIcon icon={faTshirt} size="15" type="default" />
              <StatusIcon icon={faPaintBrush} size="15" type="default" />
              <StatusIcon icon={faCog} size="15" type="default" />
            </div>
            <div className="flex my-5p">
              <img src={ethereumSvg} className="mr-10" alt={item.name} />
              <div className="flex flex-col">
                <p className="text-12 font-semibold">{item.price}</p>
                <p className="text-6 text-cloudygrey">($2,388.74)</p>
              </div>
            </div>
          </div>
          <DropTab title="DESCRIPTION" active>
            <p className='text-davygrey whitespace-normal'>{item.description}</p>
          </DropTab>
          <DropTab title="detail" active>
            <p className="font-semibold">Contact Address</p>
            <p>{contracts.NFT.address}</p>
            <p className="font-semibold">Token ID</p>
            <p>{item.id}</p>
            <p className="font-semibold">Token Standard</p>
            <p>ERC-1155</p>
            <p className="font-semibold">Blockchain</p>
            <p>Binance Chain</p>
          </DropTab>
        </div>
      </Modal.Body>
    </Modal>
    <Popup show={show} onHide={() => setShow(false)}>
      <div className="text-center">
      <p className='text-center text-Rose text-36 text-texasRose font-Rajdhani'>{content}</p>
      <button className="uppercase px-25p mb-3 mx-13p h-30 rounded-4 bg-davygrey text-white text-14 font-semibold" onClick={()=>navigate(0)}>OK</button>
      </div>
    </Popup>
    </>
  );
}

export default ProductInfoModal;