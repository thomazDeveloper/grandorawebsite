import React from 'react'
import DashboardDropDown from './DashboardDropDown'
import FavoriteCard from './FavoriteCard'
import ProductCard from './ProductCard'
import SearchInput from './SearchInput'

const Favorite = () => {

    const options1 = [
        { value: 'allitem', label: 'All item' },
        { value: 'singleitem', label: 'Single item' },
        { value: 'bundle', label: 'Bundle' }
    ]

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

    return (
        <div>
            <div className='pl-6 md:pl-0 flex pt-40 w-[100%] lg:w-[90%] mx-auto'>
                <div className='w-[55%] mr-12'>
                    <SearchInput />
                </div>
                <div className='w-[10%] md:w-[20%] mr-12'>
                    <DashboardDropDown options={options1} />
                </div>
                <div className='w-[10%] md:w-[25%]'>
                    <DashboardDropDown options={options2} />
                </div>

            </div>
            <div className='w-full grid md:grid-cols-4 grid-cols-2 gap-4 pt-15'>
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
            </div>
        </div>
    )
}

export default Favorite 