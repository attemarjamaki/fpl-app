import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <>
      <section className="px-6 md:px-20 py-24 max-w-4xl mx-auto">
        <div className="flex flex-col justify-center text-center">
          <h1 className=" text-5xl font-bold">
            <span>
              FPL<span className="text-primary">24</span>.com
            </span>
          </h1>
          <p className="mt-12 text-2xl md:w-4/5 w-full mx-auto">
            A Fantasy Premier League tool to help you make bad trasfers and
            giving you the stress of not captaining Haaland in real time.
          </p>
          <Searchbar />
        </div>
        <div className="flex justify-center text-center mt-20">
          <h2 className="text-3xl font-semibold ">How to find my FPL ID?</h2>
        </div>
        <div className="mockup-browser bg-base-300 border mt-10">
          <div className="mockup-browser-toolbar">
            <div className="input mx-6 !overflow-visible !w-4/5">
              fantasy.premierleague.com/entry/
              <span className=" border-4 border-red-600">69420</span>/event/3
            </div>
          </div>
          <div className="bg-base-200 flex justify-center px-4 py-16 bg-[url('/images/pitch.svg')] bg-no-repeat bg-top bg-cover"></div>
        </div>
      </section>
    </>
  );
}
