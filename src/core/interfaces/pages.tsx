export interface MenuItemProps {
    content?: string;
    url: string;
    icon?: any;
}

export interface SocialLinkItemProps {
    url: string;
    icon?: any;
}

export interface LandingItemProps {
    icon?: any;
    title: string;
    content: string;
}

export interface SlideItemProps {
    img: string;
    title: string;
    date: string;
    info: string;
    content: string;
}

export interface TrendSlideItemProps {
    img: string;
    title: string;
    rareity: number;
    creator: string;
    price: number;
}

export interface RoadmapItemProps {
    step: string;
    date: string;
    active: boolean;
    description: string[];
}

export interface NftProductsProps {
    img: string;
    title: string;
    rareity: number;
    creator: string;
    price: number;
}

export interface BlogProps {
    img: string;
    title: string;
    date: string;
    creator: string;
    detail: string;
    category: string;
}

export interface GameItemProps {
    img: string;
    title: string;
    loverate: number;
    playrate: number;
}

interface ProductDownProps {
    download: number;
    genre: string;
    serverSize: number;
}
export interface ProductSlideProps {
    img: string;
    creator: string;
    title: string;
    servers: ProductDownProps;
    description: string[];
    detail: string[];
}

export interface ProductCategoryProps {
    type: string;
    index: number;
}

export interface ProductTypeProps {
    name: string;
    count: number;
}

export interface AllPCategoryProps {
    img: any;
    name: string;
}


export interface NFTItemProps {
    id?: string;
    name?: string;
    preview?: string;
    url?: string;
    externalLink?: string;
    type?: string;
    description?: string;
    price?: string;
    supply?: string;
    maxSupply?: string,
    collection?: string;
    tokenType?: boolean,
    artist?: string;
    creater?: string;
    owner?: string;
    createdAt?: number;
    stats?: boolean,
    unlock?: boolean,
    sensitive?: boolean,
    properties?: string,
    level?: string
}

export interface CartList {
    item: NFTItemProps,
    count: number
}

export interface BatchBuyProps {
    tokenId: string,
    url: string,
    name: string,
    quantity: number,
    price: number,
    tokenType: boolean,
    creater: string
}

export interface BatchBuyLogProps {
    transaction_id: string,
    nft_id: string,
    types: string,
    url: string,
    name: string,
    price: number,
    quantity: number,
    feetoken_type: boolean,
    from: string,
    to: string,
}

export interface NFTAttrProps {
    type: string,
    name: string
}

export interface NFTLevelProps {
    name: string,
    value: number
}