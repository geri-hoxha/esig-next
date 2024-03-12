import Image from "next/image";

const Comments = () => {
  return (
    <form action="#" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-esig focus-within:ring-1 focus-within:ring-esig">
        <label htmlFor="title" className="sr-only">
          Titulli i komentit
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Titulli i komentit"
        />
        <label htmlFor="description" className="sr-only">
          Pershkrimi i komentit
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=" Pershkrimi i komentit..."
          defaultValue={""}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-3 border-t absolute w-full bottom-0 left-0 border-gray-200 px-2 py-2 sm:px-3">
        <div className="flex">
          <button
            type="button"
            className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
          >
            <Image
              src={"/svg/upload.svg"}
              className="cursor-pointer -ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />

            <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
              Attach a file
            </span>
          </button>
        </div>
        <div className="flex-shrink-0 mt-0">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-esig px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-esig focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-esig"
          >
            Ruaj komentin
          </button>
        </div>
      </div>
    </form>
  );
};

export default Comments;
