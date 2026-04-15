import React from 'react'
import assets from '@/assets/assets.js';

function Impact() {


    return (
        <div className='w-full px-6 md:px-10 mt-12 pb-16'>
            <div className="w-full flex flex-col items-center text-center">
                <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold'>The Life-Changing Impact</h1>
                <p className='mt-6 text-lg max-w-2xl text-black/90'>
                    Join thousands who have transformed their lives through consistent habit tracking. Small daily actions create extraordinary long-term results.
                </p>
            </div>

            <div className='mt-12 flex flex-col md:flex-row md:gap-20 lg:gap-32 items-center justify-center'>

                <div className='w-1/2 rounded-xl flex items-center justify-center'>
                    <img className='rounded-2xl hidden md:block'  src={assets.people} />
                </div>

                <div className='flex flex-col gap-10 md:gap-8 w-full md:w-[45%]'>

                    {[
                        {
                            icon: assets.checkmark,
                            title: "Increased Productivity",
                            desc: "Users report 73% improvement in daily productivity."
                        },
                        {
                            icon: assets.medal,
                            title: "Goal Achievement",
                            desc: "89% of users achieve their primary goals within 90 days."
                        },
                        {
                            icon: assets.heart,
                            title: "Better Relationships",
                            desc: "Improved work-life balance leads to stronger relationships."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className='flex gap-5 items-center'>
                            <img className='p-3 w-12 h-12 rounded-3xl bg-red-500 flex shrink-0' src={item.icon} alt={item.title} />
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">{item.title}</h2>
                                <p className="text-base text-black/80">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className='mt-6 flex flex-col gap-4'>
                        <p className="text-base md:text-lg text-black/90 italic">
                            "This app completely transformed my morning routine. I've never been more consistent with my goals, and the progress tracking keeps me motivated every single day."
                        </p>
                        <div className='flex gap-4 md:gap-6 items-center'>
                            <div className='text-white bg-red-500 rounded-2xl p-3 text-center w-10 h-10 flex items-center justify-center'>
                                <span>SK</span>
                            </div>
                            <div>
                                <h2 className='text-lg md:text-xl font-semibold'>Sarah Kim</h2>
                                <p className='text-base text-black/80'>Marketing Executive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Impact
