import { useNavigate } from "react-router-dom"

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Página no encontrada</h1>
              <p className="mt-2 text-base text-gray-500">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
              <div className="mt-6">
                <a onClick={() => navigate('/')} className="text-base font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Regresa al buscador<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
