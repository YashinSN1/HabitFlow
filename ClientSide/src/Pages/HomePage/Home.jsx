import { useNavigate } from 'react-router-dom'

function Home() {


    const navigate = useNavigate()

    const scrollToFeatures = () => {
        const featuresSection = document.querySelector('.features-section')
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className='w-full h-fit bg-transparent text-center p-2 md:p-3   '>
            <div className='w-full h-fit mt-20 flex flex-col items-center'>
                <h1 className=' text-4xl sm:text-5xl md:text-6xl xl:text-8xl '>Transform Your <br /> Life with
                    <span className='text-red-500'> Smart Habits</span></h1>
                <p className='mt-5 text-black/90 max-w-110 sm:max-w-9/12 md:max-w-2/3 lg:max-w-200 text-sm md:text-md xl:text-xl'>The most intuitive habit tracking app that helps you build lasting routines, achieve your goals, and unlock your full potential through the power of consistent daily actions.</p>
            </div>

            <div className='w-full h-fit mt-7  flex justify-around max-w-100 mx-auto'>
                <div className='flex flex-col lgtext-md text-sm'><span className='text-lg xl:text-xl text-red-500'> 50K+</span> <span className=' xl:text-lg text-black/70'>Happy Users</span></div>
                <div className='flex flex-col lgtext-md text-sm'><span className='text-lg xl:text-xl text-red-500'>4.8</span> <span className=' xl:text-lg text-black/70'>App Rating</span></div>
                <div className='flex flex-col lgtext-md text-sm'><span className='text-lg xl:text-xl text-red-500'>1M+</span> <span className=' xl:text-lg text-black/70'>Habit Tracked</span></div>
            </div>
            <div className='w-full flex gap-4  align-center justify-center'>
                <button 
                    className='mt-7 px-6 py-2 bg-red-500 text-white rounded-xl sm:text-sm md:text-lg xl:text-xl hover:bg-red-400'
                    onClick={() => navigate('/auth/login')}
                >
                    Start Your Journey
                </button>
                <button 
                    className='mt-7 px-6 py-2 bg-red-500 text-white rounded-xl sm:text-sm md:text-lg xl:text-xl hover:bg-red-400'
                    onClick={scrollToFeatures}
                >
                    Why Choose Us?
                </button>
            </div>

        </div>
    )
}

export default Home 