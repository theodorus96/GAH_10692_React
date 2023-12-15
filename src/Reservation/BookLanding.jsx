import { Card, CardBody } from "@nextui-org/react";

export function BookLanding() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <Card className="w-[600px]">
        <CardBody className="">
          <h2 className="text-2xl font-bold  text-center font-serif">Reservation Room</h2>
          <p className="text-gray-700 mb-4 text-center ">Discover the Perfect Space for You!</p>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2 ">Date</label>
            <input
              type="date"
              id="date"
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="adults" className="block text-gray-700 font-bold mb-2 ">Adults</label>
            <input
              type="number"
              id="adults"
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="children" className="block text-gray-700 font-bold mb-2 ">Children</label>
            <input
              type="number"
              id="children"
              className="border rounded w-full p-2"
            />
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded ">Reservation Now</button>
        </CardBody>
      </Card>
    </div>
  );
}
