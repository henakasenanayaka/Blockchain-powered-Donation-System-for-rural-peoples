import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { CustomButton, CountBox, Loader, SocialShare } from '../components'
import { calculateBarPercentage,daysLeft } from '../utils'
import {thirdweb} from '../assets'

const CampaignDetails = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const {donate, getDonations, contract, address} = useStateContext()
  // console.log(state)

  const[isLoading, setIsLoading] = useState(false)
  const[amount, setAmount] = useState('')
  const[donators, setDonators] = useState([])

  const remainingDays = daysLeft(state.deadline)

  const fetchDonators = async () => {
    const data = await getDonations(state.cId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.cId, amount);

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div className='sm:mx-[70px] mx-[20px]'>
      {isLoading && <Loader />}

      <div className='w-full flex md:flex-row flex-col 
      mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" 
          className='w-[1010px] h-[410px] object-cover
          rounded-xl'/>
          <div className='relative w-full h-[5px]
          bg-[#cddfce] mt-2'>
            <div className='absolute h-full bg-[#a8149e]
            ' style={{
              width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
              maxWidth: '100%'
            }}>

            </div>
          </div>

        </div>
        <div className='flex md:w-[150px] w-full
        flex-wrap justify-between gap-[30px]'>
          <CountBox 
          title="Days Left" value={remainingDays}/>
          <CountBox 
          title={`Amount of Donation `} 
          value={state.amountCollected}/>
          <CountBox 
          title="Total Donators" 
          value={donators.length}/>

        </div>
      </div>
      <div className='mt-[60px] flex lg:flex-row
      flex-col gap-5 '>
        <div className='flex-[2] flex
        flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue font-semibold
            text-[18px] text-white uppercase'> Creator</h4>
            <div className='mt-[20px] flex flex-row
            items-center flex-wrap gap-[14px]'>
              <div className='w-[52px] h-[52px]
              flex items-center justify-center
              rounded-full bg-[#e9faedfd]
              cursor-pointer'>
                <img src={thirdweb} alt="user"
                className='w-[60%] h-[60%] object-contain'/>
              </div>
              <div>
                <h4 className='font-epilogue font-semibold
                text-[14px] text-white break-all'>
                  {state.owner}
                </h4>
                <p className='mt[4px] font-epilogue
                font-normal text-[12px]
                text-[#808191]'>10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold
            text-[18px] text-white uppercase'> Story</h4>

            <div className='mt-[20px]'>
            <p className='font-epilogue
                font-normal text-[16px] leading-[26px]
                text-justify
                text-[#808191]'>{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold
            text-[18px] text-white uppercase'> Donators</h4>

            <div className='mt-[20px] flex flex-col gap-4'>
              {donators.length > 0 ? donators.map(
                (item, index) => (
                  <div key={`${item.donator}-${index}`}
                  className='flex justify-between items-center gap-4'>
                    <p className='font-epilogue font-normal text-[16px] text-[#5d5e5d] leading-26px
                    break-11'>{index+1}.{item.donator}</p>
                    <p className='font-epilogue font-normal text-[16px] text-[#5d5e5d] leading-26px
                    break-11'>{item.donation}</p>
                  </div>
                )): (<p className='font-epilogue
                font-normal text-[16px] leading-[26px]
                text-justify
                text-[#809187]'>No donators yet. Be the first one!
                </p>
              
                )}
   
            </div>
          </div>
        </div>
        <div className='flex-1'>
        <h4 className='font-epilogue font-semibold
            text-[18px] text-white p-3 uppercase'> FUND</h4>

            <div className='mt-[20px] flex flex-col p-4
            bg-[#1c1c24] rounded-[10px]'>
              <p className='font-epilogue 
              font-medium text-[20px] leading-[30px] text-center text-[#808191]'>
                Fund the Campaign
              </p>
              <div className='mt-[30px]'>
                <input type="number" 
                placeholder="ETH 0.1"
                step="0.01"
                className='w-full py-[10px] 
                sm:px-[20px] px-[15px] outline-none 
                border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px]
                 placeholder:text-[#4b5264] rounded-[10px]
                '
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

             

                <div className={`my-[20px] p-4 ${remainingDays <= 0 ? 'bg-[#f56863]' : 'bg-[#acfd98]'} 
                rounded-[10px]`}>
                  <p className='font-epilogue font-normal
                  leading-[22px] text-center'> {remainingDays <= 0 ? 'Time exeeded of this campaign. You can\'t donate anymore to this campaign.' : 'Your contribution can make a powerful impact.'}</p>
                </div>

                {/* $(remainingDays <= 0 ? #f0f8de : #e9faedfd) */}

                {/* #acfd98 */}
          
                {remainingDays <= 0 ? null : (
                <CustomButton 
                btnType='button'
                title='Fund Campaign'
                styles='w-full bg-[#1dc071] '
                handleClick={handleDonate}
                disabled={remainingDays <= 0 ? true : false}
                />
                )}
              </div>
            </div>
            <div className='mt-[20px]'>
              {remainingDays <= 0 ? null : (
          <SocialShare />
              )}
        </div>

        </div>
       
      </div>
    </div>
  )
}

export default CampaignDetails

// #808191
// customeButton bg-[#8c6dfd]