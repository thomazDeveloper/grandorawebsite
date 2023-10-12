import { useNavigate } from "react-router-dom";

const Mint = () => {

    const naviage = useNavigate();

    const goToPage = (para: string) => {
        naviage(para);
    }

    return (
        <div className="main-content">
            <div className="container">

                <div className="mint-content">
                    <div className="page-title">
                        <div className="title-1">
                            <p>Create</p>
                            <span>Your NFT</span>
                        </div>
                        <div className="title-2">
                            <span>Two easy way to creat your Item</span>
                        </div>
                    </div>

                    <div className="mint-main grid grid-cols-2 gap-5">
                        <div className="grid-box create" onClick={() => goToPage("upload")}>
                            <div className="logo">
                                <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.9637 26C52.9637 28.2113 51.1405 30.0013 48.8923 30.0013H30.5709V48.0013C30.5709 50.2125 28.7476 52 26.4994 52C24.2512 52 22.428 50.2125 22.428 48.0013V30.0013H4.10658C1.85839 30.0013 0.0351562 28.2113 0.0351562 26C0.0351562 23.7887 1.85839 22.0012 4.10658 22.0012H22.428V4.00125C22.428 1.79 24.2512 0 26.4994 0C28.7476 0 30.5709 1.79 30.5709 4.00125V22.0012H48.8923C51.1443 22 52.9637 23.7875 52.9637 26Z" fill="#2AB8F4" />
                                </svg>
                            </div>
                            <div className="title">
                                <p>Upload from</p>
                                <span>Your Computure</span>
                            </div>
                            <div className="description">
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                                <p>adipiscing elit, sed do eiusmod tempor</p>
                                <p>incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="grid-box inventor" onClick={() => goToPage("inventor")}>
                            <div className="logo">
                                <svg width="74" height="66" viewBox="0 0 74 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.19759 29.5606V61.174H9.88726V29.5606H4.19759ZM49.1858 29.5606V38.6104C49.1858 55.6192 24.7966 55.2499 24.7966 38.6104V29.5606H13.7591V61.174H60.2233V29.5606H49.1843H49.1858ZM28.67 29.5606V38.6104C28.67 50.2155 45.3109 49.96 45.3109 38.6104V29.5606H28.67ZM64.0966 5.08045V25.5001H69.7863V12.7684C69.7863 9.12231 67.3874 5.97328 64.0966 5.08045ZM64.0966 29.5606V61.174H69.7863V29.5606H64.0966ZM60.2248 25.5001V4.82803H13.7606V25.5001H60.2248ZM9.88726 25.5001V5.09136C6.59355 6.006 4.19759 9.16438 4.19759 12.8214V25.4985L9.88726 25.5001ZM11.8239 0.769043H62.2105C68.511 0.769043 73.6582 6.16337 73.6582 12.7699V63.2043C73.6582 64.3246 72.7917 65.233 71.723 65.233H2.25942C1.19075 65.233 0.324219 64.3246 0.324219 63.2043V12.8229C0.324219 6.1883 5.49367 0.769043 11.8225 0.769043H11.8239Z" fill="#EEBC4E" />
                                </svg>
                            </div>
                            <div className="title">
                                <p>Import from</p>
                                <span>Your Inventory</span>
                            </div>
                            <div className="description">
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                                <p>adipiscing elit, sed do eiusmod tempor</p>
                                <p>incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mint;