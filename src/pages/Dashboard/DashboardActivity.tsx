import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
// import Activity from '../../components/Activity/Activity';
// import Chart from "react-apexcharts";
import DashboardBtnGroup from '../../components/Dashboard/DashboardBtnGroup';
import nft1 from '../../assets/images/Dashboard/items/nft1.png'
import { useEffect } from 'react';
import useAllNFT from 'hooks/useAllNFT';
import axios from 'axios';
import { SERVER_URL } from 'config/config';

const DashboardActivity = () => {

    const { getLatestNFTHistory } = useAllNFT();
    const [histories, setHistories] = useState<any[]>([]);
    const [sortDate, setSortDate] = useState("7");
    const [sortChain, setSortChain] = useState("all");
    const [sortType, setSortType] = useState("all");

    const [options, setOptions] = useState({
        chart: {
            id: "basic-line"
        },
        xaxis: {},
        colors: ['#EEBC4E'],
        yaxis: {
            min: 0,
        }
    })

    const [series, setSeries] = useState<any[]>([])

    useEffect(() => {
        getLatestNFTHistory()
            .then((response: any) => {
                let result = response.data;

                if (result.status) {
                    console.log(result.txs)
                    setHistories(result.txs);
                } else {
                    alert(result.message);
                }
            }).catch(error => {
                console.log(error)
            })

        changeSortBy("7")
    }, [])

    useEffect(() => {
        changeSortBy(sortDate)
    }, [sortDate])

    useEffect(() => {
        changeSortBy(sortDate)
    }, [sortChain, sortType])



    const changeSortBy = async (para: string) => {
        let currentDate = new Date(), y = currentDate.getFullYear(), m = currentDate.getMonth();
        let startDate = "";
        let lastDate = moment(new Date().valueOf()).format('YYYY-MM-DD')

        let flag = 0;

        if (para === "7") {
            startDate = getDateBeforNow(7);
            flag = 7;
        } else if (para === "14") {
            startDate = getDateBeforNow(14);
            flag = 14;

        } else if (para === "30") {
            startDate = getDateBeforNow(30);
            flag = 30;

        } else if (para === "60") {
            startDate = getDateBeforNow(60);
            flag = 60;
        } else if (para === "all") {
            startDate = getDateBeforNow(90);
            flag = 90;
        }

        await setChartLabel(flag);
        getChartDataFromServer(startDate, lastDate, flag);

    }

    const getDateBeforNow = (days: number) => {
        let date = new Date();
        let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        let day = last.getDate();
        let month = "";
        month = Number(last.getMonth() + 1) + "";
        let year = last.getFullYear();

        if (Number(month) < 10) {
            month = "0" + month;
        }

        return `${year}-${month}-${day}`
    }

    const setChartLabel = async (dur: number, currentDate = new Date()) => {
        let newLabel = [];
        let strLabel = [];
        // let currentDate = new Date(), y = currentDate.getFullYear(), m = currentDate.getMonth();

        for (let i = dur; i >= 0; i--) {
            let days = i;
            let last = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
            let day = last.getDate();
            let month = last.getMonth() + 1;
            let year = last.getFullYear();

            newLabel.push(`${day}/${month}/${year}`);
            // newLabel.push(`${year}-${month}-${day}`);

        }

        console.log(newLabel, "koko8989")

        setOptions({ ...options, xaxis: { categories: newLabel } });
        // return newLabel;

    }

    const getChartDataFromServer = async (startDate: string, lastDate: string, flag: number) => {

        axios.post(`${SERVER_URL}api/getChartDate`, { startDate, lastDate, chain: sortChain, type: sortType })
            .then(resp => {

                let result = resp.data;
                if (result.status) {
                    console.log(result)
                    setChartDatas(result.analyticsData, flag);
                    // alert('Transaction successed')
                } else {
                    alert(result.message);
                }
            }).catch(err => {
                console.log(err);
            })

    }

    const setChartDatas = async (data: any, dur: any) => {
        let chartDataArray = [];
        let currentDate = new Date(), y = currentDate.getFullYear(), m = currentDate.getMonth();

        for (let i = dur; i >= 0; i--) {
            let days = i;
            let last = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
            let day = last.getDate();
            let month = last.getMonth() + 1;
            let year = last.getFullYear();

            let d_key = `${year}-${month}-${day}`;
            let _chartData = Number(0).toFixed(2);

            for (let j = 0; j < data.length; j++) {
                if (data[j].name === d_key) {
                    _chartData = Number(data[j].Total).toFixed(2);
                }
            }

            chartDataArray.push(_chartData);
        }

        console.log(chartDataArray)
        setSeries([
            {
                name: "NFT",
                data: chartDataArray
            }
        ])
    }

    const reduceName = (name: string | undefined) => {
        if (name === undefined) {
            return "";
        } else {
            return name.substr(0, 6) + "....." + name.substr(-6, 6);
        }
    }

    return (
        <div className="container pt-70 font-Rajdhani">

            <div className="page-content">
                <DashboardBtnGroup />

                <div className='pt-1r px-[1.5rem] w-full flex justify-between items-center'>
                    <div className='flex justify-start items-center'>
                        <select
                            value={sortDate}
                            onChange={e => setSortDate(e.target.value)}
                            className="w-220 rounded-5 border-10 border-davygrey font-semibold text-15 tracking-6p uppercase text-davygrey"
                        >
                            <option value={"7"}>Last 7 days</option>
                            <option value={"14"}>LAST 14 DAYS</option>
                            <option value={"30"}>LAST 30 DAYS</option>
                            <option value={"60"}>LAST 60 DAYS</option>
                            <option value={"all"}>ALL TIME</option>
                        </select>
                        <div className='ml-1r flex flex-col justify-center items-start'>
                            <span className='font-medium text-12 leading-16 tracking-6p uppercase text-cloudygrey'>7 Day AVG. Price:</span>
                            <p className='font-semibold text-16 leading-18 tracking-10p uppercase text-default'>0.0184 ETH</p>
                        </div>
                        <div className='ml-1r flex flex-col justify-center items-start'>
                            <span className='font-medium text-12 leading-16 tracking-6p uppercase text-cloudygrey'>7 Day Volume:</span>
                            <p className='font-semibold text-16 leading-18 tracking-10p uppercase text-default'>27.4875 ETH</p>
                        </div>
                    </div>

                    <div className='flex justify-start items-center gap-3'>
                        <select
                            value={sortChain}
                            onChange={e => setSortChain(e.target.value)}
                            className="w-170 rounded-5 border-10 border-davygrey font-semibold text-15 tracking-6p uppercase text-davygrey"
                        >
                            <option value="all">ALL CHAINS</option>
                            <option value="bep">BEP20</option>
                            <option value="erc">ERC20</option>
                            {/* <option value="">BIDS</option> */}
                            {/* <option value="">TRANSFERS</option> */}
                        </select>
                        <select
                            value={sortType}
                            onChange={e => setSortType(e.target.value)}
                            className="w-170 rounded-5 border-10 border-davygrey font-semibold text-15 tracking-6p uppercase text-davygrey"
                        >
                            <option value="all">ALL TYPES</option>
                            <option value="list">LISTING</option>
                            <option value="sale">SALES</option>
                            {/* <option value="">BIDS</option> */}
                            {/* <option value="">TRANSFERS</option> */}
                        </select>
                    </div>
                </div>

                <div className='w-full py-1r px-1r'>
                    <ReactApexChart options={options} series={series} type="line" height={350} />
                </div>

                <div className='w-full pt-3r pb-5r'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>NFT TYPES</th>
                                <th className='w-1/4 text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>ITEM</th>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>PRICE</th>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>QUANTITY</th>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>FROM</th>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>TO</th>
                                <th className='text-center font-semibold text-15 tracking-6 uppercase text-davygrey'>TIME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='pt-1r'>
                                            <p className='flex justify-center items-center font-semibold text-16 tracking-6 capitalize text-davygrey'>{item.types}</p>
                                        </td>
                                        <td className='pt-1r'>
                                            <div className='flex justify-start items-center gap-2'>
                                                <img className="w-45 h-45 bg-no-repeat bg-center bg-cover object-cover" src={item.url ? item.url : nft1} alt="" />
                                                <p className='font-semibold text-16 tracking-6 capitalize text-davygrey'>
                                                    {item.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className='pt-1r'>
                                            <div className='flex justify-center items-start gap-1'>
                                                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.0923 9.61725L8.21729 0.867245C8.15882 0.792543 8.08412 0.73213 7.99885 0.690582C7.91357 0.649034 7.81996 0.627441 7.7251 0.627441C7.63024 0.627441 7.53662 0.649034 7.45135 0.690582C7.36607 0.73213 7.29137 0.792543 7.23291 0.867245L0.357908 9.61725C0.270391 9.72564 0.222656 9.86075 0.222656 10.0001C0.222656 10.1394 0.270391 10.2745 0.357908 10.3829L7.23291 19.1329C7.29137 19.2076 7.36607 19.268 7.45135 19.3095C7.53662 19.3511 7.63024 19.3727 7.7251 19.3727C7.81996 19.3727 7.91357 19.3511 7.99885 19.3095C8.08412 19.268 8.15882 19.2076 8.21729 19.1329L15.0923 10.3829C15.1798 10.2745 15.2275 10.1394 15.2275 10.0001C15.2275 9.86075 15.1798 9.72564 15.0923 9.61725ZM8.3501 3.05475L13.6157 9.75787L8.3501 12.1563V3.05475ZM7.1001 12.1563L1.83447 9.75787L7.1001 3.05475V12.1563ZM7.1001 13.5313V16.9454L2.92822 11.6329L7.1001 13.5313ZM8.3501 13.5313L12.522 11.6329L8.3501 16.9454V13.5313Z" fill="#585858" />
                                                </svg>
                                                <div className='flex flex-col justify-center items-start'>
                                                    <p className='font-semibold text-16 leading-15 tracking-6p text-davygrey'>{item.price}</p>
                                                    <span className='font-normal text-12 leading-12 tracking-6p text-davygrey'>$31.43</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='pt-1r'>
                                            <p className='flex justify-center items-center font-semibold text-16 tracking-6 capitalize text-davygrey'>{item.quantity}</p>
                                        </td>
                                        <td className='pt-1r'>
                                            <p className='flex justify-center items-center font-semibold text-16 tracking-6 capitalize text-default'>{reduceName(item.from)}</p>
                                        </td>
                                        <td className='pt-1r'>
                                            <p className='flex justify-center items-center font-semibold text-16 tracking-6 capitalize text-default'>{reduceName(item.to)}</p>
                                        </td>
                                        <td className='pt-1r'>
                                            <p className='flex justify-center items-center font-semibold text-16 tracking-6 capitalize text-davygrey'>{moment(item.updatedAt).fromNow()}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardActivity;