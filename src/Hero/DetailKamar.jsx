import { Card, CardBody, Image } from "@nextui-org/react";
import { FaSnowflake, FaWifi, FaUserClock, FaSwimmingPool,FaBed} from "react-icons/fa";

export function DetailKamar() {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold font-serif text-center mt-10">
        Hotel & Bedroom Type
      </h1>
      <p className="text-2xl md:text-xl font-semibold mb-7 text-center mt-3">
        You can choose the number of bedrooms that suits with your needs.
      </p>
        <div className="flex flex-row justify-center items-center">
          <div className="w-full w-100 mt-10 ml-48 mr-48 mb-10">
            <div className="flex justify-between gap-10">
              <Card className="w-[25%] ">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-[200px] object-cover"
                  src="/assets/Superior.jpg"
                />
                <CardBody className="pt-0">
                <h4 className=" text-xl font-bold card-title font-serif">Superior Room</h4>
                <h4 className=" text-l card-title text-justify mb-4 font-semibold">Capacity 2 People</h4>
                <div className="flex items-center gap-2 mt-2 text-justify">
                  <span className="text-yellow-800 text-2xl">
                    <FaSnowflake/>
                  </span>
                <p>Air Conditioner</p>
                </div>
                <div className="flex items-center gap-2 mt-2 ">
                  <span className=" text-yellow-800 text-2xl">
                    <FaWifi/>
                  </span>
                <p>Free Wifi</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaBed/>
                  </span>
                <p>1 Double Size, 1 Twin Size</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaUserClock/>
                  </span>
                <p>24 Hour Room Service</p>
                </div><div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaSwimmingPool/>
                  </span>
                <p>Swimming Pool</p>
                </div>
                </CardBody>
              </Card>

              <Card className="w-[25%] ">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-[200px] object-cover"
                  src="/assets/Doubles.jpg"
                />
              <CardBody className="pt-0">
                <h4 className=" text-xl font-bold card-title font-serif">Double Deluxe Room</h4>
                <h4 className=" text-l card-title text-justify mb-4 font-semibold">Capacity 2 People</h4>
                <div className="flex items-center gap-2 mt-2 text-justify">
                  <span className="text-yellow-800 text-2xl">
                    <FaSnowflake/>
                  </span>
                <p>Air Conditioner</p>
                </div>
                <div className="flex items-center gap-2 mt-2 ">
                  <span className=" text-yellow-800 text-2xl">
                    <FaWifi/>
                  </span>
                <p>Free Wifi</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaBed/>
                  </span>
                <p>1 Double Size, 2 Twin Size</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaUserClock/>
                  </span>
                <p>24 Hour Room Service</p>
                </div><div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaSwimmingPool/>
                  </span>
                <p>Swimming Pool</p>
                </div>
                </CardBody>
              </Card>

              <Card className="w-[25%] ">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-[200px] object-cover"
                  src="/assets/Exe.jpg"
                />
                <CardBody className="pt-0">
                <h4 className=" text-xl font-bold card-title font-serif">Executive Deluxe Room</h4>
                <h4 className=" text-l card-title text-justify mb-4 font-semibold">Capacity 2 People</h4>
                <div className="flex items-center gap-2 mt-2 text-justify">
                  <span className="text-yellow-800 text-2xl">
                    <FaSnowflake/>
                  </span>
                <p>Air Conditioner</p>
                </div>
                <div className="flex items-center gap-2 mt-2 ">
                  <span className=" text-yellow-800 text-2xl">
                    <FaWifi/>
                  </span>
                <p>Free Wifi</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaBed/>
                  </span>
                <p>1 King Size</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaUserClock/>
                  </span>
                <p>24 Hour Room Service</p>
                </div><div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaSwimmingPool/>
                  </span>
                <p>Swimming Pool</p>
                </div>
                </CardBody>
              </Card>

              <Card className="w-[25%] ">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-[200px] object-cover"
                  src="/assets/Junior.jpeg"
                />
                <CardBody className="pt-0">
                <h4 className=" text-xl font-bold card-title font-serif">Junior Suite Room</h4>
                <h4 className=" text-l card-title text-justify mb-4 font-semibold">Capacity 2 People</h4>
                <div className="flex items-center gap-2 mt-2 text-justify">
                  <span className="text-yellow-800 text-2xl">
                    <FaSnowflake/>
                  </span>
                <p>Air Conditioner</p>
                </div>
                <div className="flex items-center gap-2 mt-2 ">
                  <span className=" text-yellow-800 text-2xl">
                    <FaWifi/>
                  </span>
                <p>Free Wifi</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaBed/>
                  </span>
                <p>1 King Size</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaUserClock/>
                  </span>
                <p>24 Hour Room Service</p>
                </div><div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-800 text-2xl">
                    <FaSwimmingPool/>
                  </span>
                <p>Swimming Pool</p>
                </div>
                </CardBody>
              </Card>

            </div>
          </div>
        </div>
    </div>
  );
}
