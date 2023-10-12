import { result } from 'lodash';
import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Select from 'react-select';


const DashboardDropDown = ({ options,item,handleNftList }: any) => {
    const options2 = [
        { value: 'recently-create', label: 'Recently Create' },
        { value: 'recently-sold', label: 'Recently Sold' },
        { value: 'recently-received', label: 'Recently Received' },
        { value: 'ending-soon', label: 'Ending Soon' },
        { value: 'price-low-to-high', label: 'Price [Low - High]' },
        { value: 'price-high-to-low', label: 'Price [High - Low]' },
        { value: 'hight-last-sale', label: 'Highest Last Sale' },
        { value: 'most-favorite', label: 'Most Favorite' },
        { value: 'most-view', label: 'Most View' },
        { value: 'oldest', label: 'Oldest' }
    ]
    const FilterNftList=(selectOption:any)=>{
        const filter=selectOption.value
        handleNftList(filter)

    }
    return (
        <div className='w-full'>
            <Select options={options} onChange={FilterNftList} defaultValue={options[0]} classNamePrefix="drop-select" className="uppercase text-[15px] font-Rajdhani text-cloudygrey font-semibold" />
        </div>
    )
}

export default DashboardDropDown