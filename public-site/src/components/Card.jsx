import { useNavigate } from "react-router-dom";
import foodPhoto from "../assets/food_1.jpg";
import { StarIcon } from "@heroicons/react/24/solid";

const Card = ({ tableTimeData }) => {
  const currencyFormatted = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const navigate = useNavigate();

  const clickToDetailPage = (id) => {
    navigate(`/cuisine/${id}`);
  };

  return (
    <>
      <div
        className="flex flex-col h-96 w-72 transition-all hover:scale-105"
        onClick={() => clickToDetailPage(tableTimeData.id)}
      >
        <img
          src={tableTimeData.imgUrl}
          className="rounded-xl w-72 h-64 object-cover"
        />
        <div className="flex flex-row justify-between mt-2">
          <p className="text-sm font-medium">{tableTimeData.name}</p>
          <div className="flex space-x-1 items-center justify-center">
            <i className="fa-solid fa-star"></i>
            <p className="text-sm font-light">5.0</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 w-[15em]">
          {tableTimeData.description}
        </p>
        <p className="text-sm font-medium mt-2">
          {currencyFormatted(tableTimeData.price)} /food
        </p>
      </div>
    </>
  );
};

export default Card;
