const Checkout = () => {
  return (
    <>
      {/* <!-- Right Component --> */}
      <div className="flex flex-col items-end">
        <div className="flex flex-col w-3/4 p-6 space-y-4 divide-y divide-gray-700 bg-white border text-gray-900 sticky top-28 rounded-md shadow-xl">
          <h2 className="text-2xl font-semibold">Order items</h2>
          <ul className="flex flex-col pt-4 space-y-2">
            <li className="flex items-start justify-between">
              <h3>
                Hard taco, chicken
                <span className="text-sm dark:text-red-500">x3</span>
              </h3>
              <div className="text-right">
                <span className="block">$7.50</span>
                <span className="text-sm dark:text-gray-400">à $2.50</span>
              </div>
            </li>
            <li className="flex items-start justify-between">
              <h3>
                Hard taco, beef
                <span className="text-sm dark:text-red-500">x3</span>
              </h3>
              <div className="text-right">
                <span className="block">$8.25</span>
                <span className="text-sm dark:text-gray-400">à $2.75</span>
              </div>
            </li>
          </ul>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>$0.50</span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>$4.00</span>
              </div>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:text-red-500"
              >
                How do our fees work?
              </a>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">$22.70</span>
              </div>
              <button
                type="button"
                className="block w-full p-3 text-center rounded-md bg-red-500 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 active:scale-90 hover:text-gray-100"
              >
                Go to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
