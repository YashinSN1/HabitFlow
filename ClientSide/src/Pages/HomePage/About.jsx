import { useNavigate } from 'react-router-dom'

function About() {

  const navigate = useNavigate()

  return (
    <div className=' flex flex-col w-full p-5 items-center bg-black/80 text-center gap-6 pb-12'>
      <div className='mt-8 ' >
        <h2 className='text-3xl xl:text-4xl text-white t'>Ready to Build Better Habits?</h2>
        <p className='mt-3 text-xl xl:text-2xl text-white/70'>Join the community of achievers who have made consistency their superpower.</p>
      </div>
      <button
        className='mt-5 px-6 py-2 bg-red-500 text-white rounded-xl sm:text-sm md:text-lg xl:text-xl hover:bg-red-400'
        onClick={() => navigate('/auth/login')}
      >
        Get Started For Free
      </button>
    </div>
  )
}

export default About
