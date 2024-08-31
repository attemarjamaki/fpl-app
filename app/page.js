import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <>
      <section className="px-6 md:px-20 py-24 max-w-4xl mx-auto">
        <div className="flex flex-col justify-center text-center">
          <h1 className=" text-5xl font-bold">FPL Points Tracker</h1>
          <p className="mt-12 text-2xl md:w-4/5 w-full mx-auto">
            Download your favorite YouTube videos and music in high-quality MP4
            or MP3 effortlessly with our easy-to-use downloader.
          </p>
          <Searchbar />
        </div>
      </section>
    </>
  );
}
