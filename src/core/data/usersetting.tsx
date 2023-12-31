import { socialItemProps, userInfoProps } from "../interfaces/userinfo";
import { faTwitter, faDiscord, faFacebook, faInstagram, faTelegram, faYoutube } from "@fortawesome/free-brands-svg-icons";

export const userSocials: socialItemProps[] = [
    {
        icon: faTwitter,
        name: 'twitter',
        detail: 'enter your twitter handle',
    },
    {
        icon: faDiscord,
        name: 'Discord',
        detail: 'enter your twitter handle',
    },
    {
        icon: faFacebook,
        name: 'Facebook',
        detail: 'enter your twitter handle',
    },
    {
        icon: faInstagram,
        name: 'Instragram',
        detail: 'enter your twitter handle',
    },
    {
        icon: faTelegram,
        name: 'Telegram',
        detail: 'enter your twitter handle',
    },
    {
        icon: faYoutube,
        name: 'Youtube',
        detail: 'enter your twitter handle',
    }
];

export const currentUser: userInfoProps = {
    name: 'iamppookk',
    email: '@iamppookk',
    about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.',
    socials: [
        {icon:faTwitter, type:'twitter', id:''}, {icon:faDiscord, type:'discord', id:''}, {icon:faFacebook, type:'facebook', id:''}, {icon:faInstagram, type:'instagram', id:''}
    ],
    wallet_ether: 0.69,
    wallet_grando: 0.69,
    wallet_address: '0xefvf15687956323adde632gr98562dajjh5684hloipbnhytdy81',
    inventory_game: [],
    inventory_product: [],
    inventory_creation: [],
    inventory_nft: []
};