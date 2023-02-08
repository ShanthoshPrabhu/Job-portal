import { signIn } from "next-auth/react";

function Login({ providers }) {
    // console.log('providers',providers)
  return (
    <div className="flex flex-col items-center space-y-20 pt-48 h-screen bg-black">
      <div>
        {Object?.values(providers).map((provider) => (
          <div key={provider.name}>
            
            <button
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group mt-[150px]"
              onClick={() => signIn(provider.id, { callbackUrl: "http://localhost:3000/" })}
            >
                <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span class="relative text-white">Sign in with {provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;