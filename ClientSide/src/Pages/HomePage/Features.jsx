import assets from '@/assets/assets.js';


function Features() {


    return (
        <div className='w-full h-fit flex flex-col items-center bg-red-500 pb-12 px-5 features-section'>
            <div className="w-full h-fit mt-12 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white ">Why Choose Our Habit Tracker?</h2>
                <p className="mt-6 text-lg  max-w-2xl text-center text-white/90 ">Discover the powerful features that make habit building effortless and sustainable, helping you achieve more than you ever thought possible.</p>
            </div>
            <div className='md:flex-row flex flex-col mt-10 gap-5 text-center items-center '>
                <div className='bg-white/95 rounded-xl px-5  max-h-4/5 sm:max-h-85 xl:max-h-80 py-6 max-w-4/5 sm:max-w-95 xl:max-w-80 flex flex-col items-center'>
                    <svg className=' w-20 h-20 rounded-2xl bg-red-500' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            fill="none" stroke="white" stroke-width="2" />

                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 3C12.5523 3 13 3.44772 13 4V5.07089C16.0657 5.5094 18.4906 7.93431 18.9291 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H18.9291C18.4906 16.0657 16.0657 18.4906 13 18.9291V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V18.9291C7.93431 18.4906 5.5094 16.0657 5.07089 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H5.07089C5.5094 7.93431 7.93431 5.5094 11 5.07089V4C11 3.44772 11.4477 3 12 3ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
                            fill="none" stroke="white" stroke-width="2" />
                    </svg>
                    <h2 className='text-xl xl:text-2xl mt-5'>Smart Tracking</h2>
                    <p className='mt-2 text-sm text-black/90 xl:text-md'>Build habits faster with smart tracking that shows progress and why you miss</p>
                </div>
                <div className='bg-white/95 rounded-xl px-5 max-h-4/5 sm:max-h-85 xl:max-h-80  max-w-4/5 sm:max-w-95 py-6 xl:max-w-80 flex flex-col items-center'>
                    <img className='w-20 h-20 rounded-2xl bg-red-500' src={assets.dashcalander} alt="Flexible Scheduling" />
                    <h2 className='text-xl xl:text-2xl mt-5'>Flexible Scheduling</h2>
                    <p className='mt-2 text-sm text-black/90 xl:text-md'>Create custom schedules that work with your busy life. Daily, weekly, or custom intervals.</p>
                </div>
                <div className='bg-white/95 rounded-xl px-5 max-h-4/5 sm:max-h-85 xl:max-h-80  max-w-4/5 sm:max-w-95 py-6 xl:max-w-80 flex flex-col items-center'>
                    <img className='w-20 h-20 rounded-2xl bg-red-500' src={assets.risechart} alt="Progress Analytics" />
                    <h2 className='text-xl xl:text-2xl mt-5'>Progress Analytics</h2>
                    <p className='mt-2 text-sm text-black/90 xl:text-md'>Detailed insights and beautiful charts show your progress and help you stay motivated.</p>
                </div>
            </div>
        </div>
    )
}

export default Features
