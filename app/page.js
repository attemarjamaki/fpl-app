import Searchbar from "../components/Searchbar";

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
            Your Fantasy Premier League tool to make boldly bad decisions and
            track your underwhelming score in real-time!
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

        <div className="space-y-2 mt-20">
          <div className="flex justify-center mb-10">
            <h2 className="text-3xl font-semibold">FAQ</h2>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Do I have to sign up?
            </div>
            <div className="collapse-content">
              <p>Nope.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Where can I pay for the use of this amazing and beautiful website?
            </div>
            <div className="collapse-content">
              <p>We don't accept payment, but FPL advice would be nice.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Why just not use LiveFPL?
            </div>
            <div className="collapse-content">
              <p>
                No reason. LiveFPL is better but this is more fun because it
                probably doesn't work half of the time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
