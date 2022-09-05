import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header"

export default function SignIn({ providers }:any) {
  return (
    <>
    <Header/>
    <div className="flex flex-col justify-center items-center min-h-screen text-center -mt-36">
      <img className='h-20 object-contain cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" />
      <p className="font-semibold text-gray-400">Welcome to Instagram</p>
       
    <div className="">
      {Object.values(providers).map((provider:any) => (
        <div className="justify-center mx-auto" key={provider.name}>
          <button 
          className="p-3 border rounded-lg bg-blue-400 text-white font-semibold mt-5 hover:scale-105 transition-all duration-200 ease-out hover:bg-pink-500"
          onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context:any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}