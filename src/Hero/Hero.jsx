import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export function Hero() {
  return (
    <div className="flex flex-row justify-center items-center bg-zinc-100">
      <div className="text-left w-1/2">
        <h1 className="text-4xl font-bold font-serif text-center mb-7">Our Services</h1>
        <p className="ml-10 mr-10 text-xl text-justify"> Hotel Grand Atma Hotel offers various facilities to enhance your stay experience. 
        With extra bed facilities, you can ensure comfortable and spacious accommodation for your entire group. Additionally,
         take advantage of the convenient laundry service to keep your clothes fresh and clean. Pamper yourself with a relaxing 
         massage to unwind after a day of exploring the city. For business travelers, the hotel provides fully equipped meeting rooms for your 
         professional needs. Start your day with a delicious breakfast served at the hotel.  </p>
      </div>

      <div className="w-1/2 mr-10 mb-10 mt-10">
        <div className="max-w-[1000px] gap-10 grid grid-cols-12 ">
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 bottom-1 w-full items-center">
                <h4 className=" text-white text-2xl font-bold ml-14 ">Breakfast</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/assets/Food.jpg"
             />
          </Card>

          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
                <h4 className=" text-white text-2xl font-bold ml-20 ">Rooms</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="/assets/Room.jpg"
            />
          </Card>

          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 bottom-1 flex-col items-start">
                <h4 className=" text-white text-2xl font-bold ml-16 ">Massage</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="/assets/massages.jpeg"
            />
          </Card>

          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
             <CardHeader className="absolute z-10 bottom-1 flex-col items-start">
                <h4 className=" text-white text-2xl font-bold ml-24 ">Laundry</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="/assets/laundry.jpg"
            />
          </Card>

          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
             <CardHeader className="absolute z-10 bottom-1 flex-col items-start">
                <h4 className=" text-white text-2xl font-bold ml-2 ">Conferences & Mettings</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="/assets/meeting.jpg"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
