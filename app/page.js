import Searchbar from "../components/Searchbar";

export default function Home() {
  return (
    <section className="py-8 md:py-16 max-w-3xl mx-auto px-2">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-12">
          <span>
            FPL<span className="text-primary">24</span>.com
          </span>
        </h1>
        <p className=" md:w-4/5 w-full mx-auto mb-10 md:mb-10">
          Your Fantasy Premier League tool to make boldly bad decisions and
          track your underwhelming score in real-time!
        </p>
        <Searchbar />
      </div>

      <div className="flex justify-center text-center my-10 md:my-20">
        <h2 className="text-xl font-semibold ">How to find my FPL ID?</h2>
      </div>

      <div className="mockup-browser bg-base-300 border mb-10 md:mb-20">
        <div className="mockup-browser-toolbar flex">
          <div className="flex input !overflow-visible !w-4/5">
            <span className="hidden md:block">
              fantasy.premierleague.com/entry/
              <span className=" border-4 border-red-600">69420</span>/event/3
            </span>
            <span className="text-xs md:hidden">
              ..mierleague.com/entry/
              <span className=" border-4 border-red-600">69420</span>
              /event/3
            </span>
          </div>
        </div>
        <div className="bg-base-200 flex justify-center px-4 py-16 bg-[url('/images/pitch.svg')] bg-no-repeat bg-top bg-cover"></div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-center mb-6 md:mb-12">
          <h2 className="text-xl font-semibold">FAQ</h2>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-medium">
            Do I have to sign up?
          </div>
          <div className="collapse-content text-sm">
            <p>Nope.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-medium">
            Where can I pay for the use of this amazing and beautiful website?
          </div>
          <div className="collapse-content text-sm">
            <p>We don't accept payment, but FPL advice would be nice.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-medium">
            Why just not use LiveFPL?
          </div>
          <div className="collapse-content text-sm">
            <p>
              No reason. LiveFPL is better but this is more fun because it
              probably doesn't work half of the time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
